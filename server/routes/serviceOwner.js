const express = require('express');
const router = express.Router();
const { serviceOwnerController, serviceController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');
const serviceOwner = require('../config/serviceOwner');

Auth(router);

// Check all incoming requests of customers
router.get('/orders', serviceOwner, serviceOwnerController.allIncomingOrders);

// Accept order request
router.get('/orders/:id/accept', serviceController.accept);

// Reject order request
router.get('/orders/:id/reject', serviceController.reject);

//get all service owners
router.get('',serviceOwnerController.getAllServiceOwners)

//get specific service owner by id
router.get('/:id/',serviceOwnerController.getServiceOwner)

//update service owner data
router.patch('/:id', serviceOwnerController.updateServiceOwner);

//change status of service owner
router.get('/:id/status',serviceOwnerController.changeStatus)
module.exports = router;