const express = require('express')
const router = express.Router()
const productOwner= require('../config/productOwner')
const { Auth } = require('../middlewares/Auth');
const { serviceOwnerController, productOwnerController } = require('../controllers/allControllers');

// call authentication and authorization for product owner routes
Auth(router, productOwner);

// Product owner can list all unconnected service owners
router.get('/idle', serviceOwnerController.allIdle);

// Product owner can list all available service owners
router.get('/service-owners/all', serviceOwnerController.all);

// Product owner connect to one of service owners
router.patch('/connect', productOwnerController.connect);

// get all product owners
router.get('', productOwnerController.getAllproductsOwner);

//get specific product owner by id
router.get('/:id', productOwnerController.getProductOwner);

//changing status of product owners
router.get('/:id/status',productOwnerController.changeStatus);

//update data of product owner
router.patch('/:id',productOwnerController.updateProducteOwner);

module.exports = router;