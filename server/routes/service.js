const express = require('express');
const router = express.Router();
const { serviceController,serviceOwnerController, userController } = require('./../controllers/allControllers');
const { Auth } = require('../middlewares/Auth');

// Get all transportation methods
router.get('/transportations', serviceController.transportation);

Auth(router);

// Request a service owner for delivery
router.post('/available/owners', serviceController.filteredServiceOwners);

// Select one service owner
router.post('/orders', serviceController.order);

// Cancel submitted request
router.get('/orders/:id/cancel', serviceController.cancel);

//save review
router.patch('/:serviceOwnerID/reviews', serviceController.saveReview);

//save Rating
router.patch('/:serviceOwnerID/rates', serviceController.saveRate);

router.get('/:id/reviews', serviceOwnerController.reviews);

router.get('/:id/rate', serviceController.getUserRateForOrder);

// Submit service owner report
router.put('/service-owners/:id/report', userController.saveReport);

// Submit product owner report
router.put('/product-owners/:id/report', userController.saveProductOwnerReport);

module.exports = router;