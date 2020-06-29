const express = require('express')
const router = express.Router()
const {
     createProduct, listProducts, updateProduct,addToCart,showCategoryProducts ,productDetails,deleteProduct, getProduct, deleteImage, saveImage, changeProductStatus
 } = require('../controllers/product')
var multer = require('multer')
const Product = require('../models/product')
// const {pro} = require('../models/allModels')

const { route } = require('./search')
const productOwner= require('../config/productOwner')
const { Auth } = require('../middlewares/Auth');
const {getAllCategories}= require('../controllers/category')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).array('file')
//id:product
router.get('/:id/ownerinfo', productDetails)

Auth(router);
// router.get('/categoryproducts',showCategoryProducts);


//Get Cart Items CART PAGE 
router.get("/products_by_id", (req, res) => {
    let type = req.query.type
    console.log(type);
    console.log(typeof type);
    
    
    let productIds = req.query.id

    console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            console.log("item",item);
            
            return item
        })
    }

    console.log("productIds", productIds)


    //we need to find the product information that belong to product Id 
    Product.find({ '_id': { $in: productIds } }).
        populate({path:"owner",populate:{path:"user"} }).populate('user')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
});


Auth(router, productOwner);
router.get('/', listProducts)

// productDetails

// router.get('/', listProducts)
router.get('/categories', getAllCategories)
router.get('/:id', getProduct)
router.post('/',
    async function (req, res, next) {

        await upload(req, res, async function (err) {

            let owner = req.user._id
            let product = await Product.find({ name: req.body.name, owner })
            if (product.length > 0) return next("Duplicate product")

            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            next()
        })

    },
    createProduct
)
router.patch('/:id',
    async function (req, res, next) {

        await upload(req, res, async function (err) {   
            let owner = req.user._id
            let product = await Product.find({ name: req.body.name, owner, _id: { $nin: [req.params.id] }  })             
            if (product.length > 0) return next("Duplicate product")
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            next()
        })

    }, updateProduct
    )



router.delete('/:productID/images/:id', deleteImage)
router.delete('/:id', deleteProduct)
router.post('/:productID/images/', saveImage)

// //Product Cart
// //catid;
// // http://localhost:3000/categoryproducts/5ef22f89e8a8d609d7acb7ea
// //product_id/addToCart
// router.post(':id/addToCart',addToCart)
// product

module.exports = router