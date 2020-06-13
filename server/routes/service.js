const express = require('express');
const router = express.Router();
const { serviceController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');

Auth(router);

// Request a service owner for delivery
router.post('/available/owners', serviceController.filteredServiceOwners);

// Select one service owner
router.post('/order', serviceController.order);

// Get all transportation methods
router.get('/transportations', serviceController.transportation);

// Cancel submitted request
router.get('/order/:id/cancel', serviceController.cancel);

module.exports = router;