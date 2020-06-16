const express = require('express');
const router = express.Router();
const { serviceOwnerController, serviceController, productOwnerController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');
const serviceOwner = require('../config/serviceOwner');

Auth(router, serviceOwner);

// Check all incoming requests of customers
router.get('/orders', serviceOwnerController.allIncomingOrders);

// Accept order request
router.get('/orders/:id/accept', serviceController.accept);

// Reject order request
router.get('/orders/:id/reject', serviceController.reject);

// Get service owner reviews
router.get('/reviews', serviceOwnerController.reviews);

//get specific service owner by id
router.get('/:id/',serviceOwnerController.getServiceOwner)

//update service owner data
router.patch('/:id', serviceOwnerController.updateServiceOwner);

//change status of service owner
router.get('/:id/status',serviceOwnerController.changeStatus)
// Ship order for delivery
router.get('/orders/:id/out-for-delivery', serviceController.outForDelivery);

// Reject order request
router.get('/orders/:id/delivered', serviceController.delivered);

// Retrieve product owners request details
router.get('/product-owner', productOwnerController.productOwnerDetails);

// Accept or reject product owner connection request
router.patch('/connection/:status', serviceOwnerController.updateConnection);


module.exports = router;