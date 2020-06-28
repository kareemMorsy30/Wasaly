const express = require('express')
const router = express.Router()
const productOwner= require('../config/productOwner')
const { Auth } = require('../middlewares/Auth');
const { serviceOwnerController, productOwnerController } = require('../controllers/allControllers');

const multer  = require('multer');


const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'public/uploads/users/images');
},
filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
}
});

// Set filters to image upload
const fileFilter = (req, file, cb) => {
if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null,true)
} else {
    cb(new Error('only allowed types are jpeg, png, jpg'), false)
}
}

// Apply multer option to image upload
const upload = multer({
storage,
fileFilter
});


// call authentication and authorization for product owner routes
Auth(router, productOwner);

// Product owner can list all unconnected service owners
router.get('/idle', serviceOwnerController.allIdle);

// Product owner can list all available service owners
router.get('/service-owners/all', serviceOwnerController.all);

// Product owner connect to one of service owners
router.patch('/connect', productOwnerController.connect);

// Product owner disconnect of one of service owners
router.patch('/disconnect', productOwnerController.disconnect);

// get all product owners
router.get('', productOwnerController.getAllproductsOwner);

//get specific product owner by id
router.get('/one', productOwnerController.getProductOwner);

//changing status of product owners
router.get('/one/status',productOwnerController.changeStatus);

//update data of product owner
router.patch('/one/modify',upload.single('avatar'),productOwnerController.updateProducteOwner);

module.exports = router;