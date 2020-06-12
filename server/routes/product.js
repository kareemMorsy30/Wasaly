const express = require('express')
const router = express.Router()
const { createProduct, listProducts, updateProduct, deleteProduct, getProduct, deleteImage, saveImage } = require('../controllers/product')
var multer = require('multer')
const Product = require('../models/product')
const { route } = require('./search')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).array('file')


router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/',
    async function (req, res, next) {

        await upload(req, res, async function (err) {

            let owner = "5ee027333b9d0e3fd1fe4e27"
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

        await upload(req, res, function (err) {          
            if (product.length > 0) return next("Duplicate product")
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            next()
        })

    }, updateProduct)
router.delete('/:productID/images/:id', deleteImage)
router.delete('/:id', deleteProduct)
router.post('/:productID/images/', saveImage)
module.exports = router