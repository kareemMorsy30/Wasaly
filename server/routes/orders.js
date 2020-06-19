const express = require('express')
const router = express.Router()
const {  listOrders, changeOrderStatus, listCustomerOrders,getOrder } = require('../controllers/order')
const { route } = require('./search')
const productOwner= require('../config/productOwner')
const passport = require('passport');
const { Auth } = require('../middlewares/Auth');

Auth(router);


// list product owner's orders
router.get('/',productOwner, listOrders)

//change order status
router.post('/:id/status', changeOrderStatus)

//get customer orders
router.get('/user', listCustomerOrders)


router.get('/:orderId', getOrder)


module.exports = router