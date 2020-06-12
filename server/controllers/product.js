const Product = require('../models/product')
const multer = require('multer')
const fs = require("fs")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).array('file')


exports.createProduct = async (req, res, next) => {

    try {
        const { name, price, quantity, description } = req.body
        let owner = "5ee027333b9d0e3fd1fe4e27"
        let images = req.files
        images_path = images.map(image => image.filename)
        product = await new Product({
            name,
            owner,
            price,
            quantity,
            images_path,
            description
        }).save()
        res.json("done")
    }
    catch (err) {
        next(err)
    }

}

exports.listProducts = async (req, res, next) => {
    const { id } = "5ee027333b9d0e3fd1fe4e27" || req.user._id
    try {
        const products = await Product.find({ owner: id }).exec()
        res.json(products)
    } catch (err) {
        next(err)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const productID = req.params.id
        const product = await Product.findById(productID).exec()
        console.log(product)

        // product.owner!==req.user._id&&res.send("You are not Authorized for this action")
        console.log(req.body.name)
        req.body.name && (product.name = req.body.name)
        req.body.price && (product.price = req.body.price)
        req.body.quantity && (product.quantity = req.body.quantity)
        req.body.images_path && (product.images_path = req.body.images_path)
        req.body.description && (product.description = req.body.description)

        await Product.findByIdAndUpdate(productID, { $set: product }, { new: true })
        res.send("Updated Successfully")

    } catch (err) {
        next(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const productID = req.params.id
        const userId = "5ee027333b9d0e3fd1fe4e27" || req.user._id

        const product = await Product.findOneAndDelete({
            _id: productID,
            owner: userId
        });

        if (!product) {
            res.status(403).json('Product NOT_FOUND with id: ' + productID);
        }
        res.status(200).json("Deleted Successfully")
    } catch (err) {
        next(err)
    }
}

exports.getProduct = async (req, res, next) => {

    try {
        const productID = req.params.id
        const product = await Product.findById(productID).exec()
        if (!product) res.status(404).json("Product NOT_FOUND with id: ' + productID")
        res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}

exports.deleteImage = async (req, res, next) => {
    const {productID, id}= req.params

    const pathToFile = `./public/${req.params.id}`
    fs.unlink(pathToFile, function (err) {
        if (err) {
            throw err
        } else {

            console.log(productID,id)
            Product.updateOne({ _id: productID }, { "$pull": { "images_path": id  }}, { safe: true, multi:true }, function(err, obj) {
                if(err)console.log(err)
                console.log("deleted")
            })
            res.status(200).send("Deleted Successfully")
        }
    })


}
exports.saveImage = async (req, res, next) => {
    const {productID}= req.params
    await upload(req, res, function (err) {
        
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        
        let images = req.files.map(async (image) =>{             
            const product= await Product.updateOne({ _id: productID }, { "$push": { "images_path": image.filename  }}, { safe: true, multi:true })
        })
        images= req.files.map( (image) => image.filename)
        console.log(images)
        res.json(images)
    })

}