const express = require('express');
const router = express.Router();
const { serviceOwnerController, serviceController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');
const serviceOwner = require('../config/serviceOwner');

Auth(router, serviceOwner);

// Check all incoming requests of customers
router.get('/orders', serviceOwnerController.allIncomingOrders);

// Accept order request
router.get('/orders/:id/accept', serviceController.accept);

// Reject order request
router.get('/orders/:id/reject', serviceController.reject);

module.exports = router;