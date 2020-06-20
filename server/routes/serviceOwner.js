const express = require('express');
const router = express.Router();
const { serviceOwnerController, serviceController, productOwnerController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');
const serviceOwner = require('../config/serviceOwner');

Auth(router, serviceOwner);

// Check all incoming requests of customers
router.get('/orders', serviceOwnerController.allIncomingOrders);

// Update order status
router.get('/orders/:id/:status', serviceController.updateOrderStatus);

// Get service owner reviews
router.get('/reviews', serviceOwnerController.reviews);

//get specific service owner by id
router.get('/:id/',serviceOwnerController.getServiceOwner)

//update service owner data
router.patch('/:id', serviceOwnerController.updateServiceOwner);

//change status of service owner
router.get('/:id/status',serviceOwnerController.changeStatus)

// Retrieve product owners request details
router.get('/product-owner', productOwnerController.productOwnerDetails);

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

module.exports = router;