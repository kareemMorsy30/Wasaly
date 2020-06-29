const express = require('express');
const router = express.Router();
const { serviceOwnerController, serviceController, productOwnerController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');
const serviceOwner = require('../config/serviceOwner');

Auth(router, serviceOwner);
const multer  = require('multer');
const { serviceOwnerRouter } = require('./allRoutes');


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


// Check all incoming requests of customers
router.get('/orders', serviceOwnerController.allIncomingOrders);

// Update order status
router.get('/orders/:id/:status', serviceController.updateOrderStatus);

// Get service owner reviews
router.get('/reviews', serviceOwnerController.reviews);

// Retrieve product owners request details
router.get('/product-owner', productOwnerController.productOwnerDetails);

//get specific service owner by id
router.get('/',serviceOwnerController.getServiceOwner);

//update service owner data
router.patch('/modify', upload.single('avatar'),serviceOwnerController.updateServiceOwner);

//change status of service owner
router.get('/status',serviceOwnerController.changeStatus);

// Accept or reject product owner connection request
router.patch('/connection/:status', serviceOwnerController.updateConnection);

//get all connected service owner
router.get('/connected',serviceOwnerController.getAllConnectedServiceOwner);

//get all product owner details related to connected service owners
router.get('/details',serviceOwnerController.getProductOwnerDetails);

//select available service owner
router.post('/available/owners', serviceOwnerController.filteredServiceOwners);

//notification to taregt service owner
router.post('/notify', serviceOwnerController.deliverNewProduct);

//get all pending orders of the product owner that the service owner is connected with
router.get('/orders/connectedwithproductowner/',serviceOwnerController.getOrdersOfConnectedProductOwner)

// accept an order for the connected product owner
router.patch('/order/:orderId/status/productowner', serviceOwnerController.changeStatusOfOrderToDelieverForProductOwner)

module.exports = router;