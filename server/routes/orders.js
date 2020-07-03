const express = require('express')
const router = express.Router()
const {  listOrders, changeOrderStatus, addOrder,listCustomerOrders,getOrder, cancelOrder } = require('../controllers/order')
const { route } = require('./search')
const productOwner= require('../config/productOwner')
const passport = require('passport');
const { Auth } = require('../middlewares/Auth');
// const Order = require('../models/order')

Auth(router);
router.post("/addOrder",addOrder)


// list product owner's orders
router.get('/',productOwner, listOrders)

//user can cancel order if pending
router.post('/:orderId/cancel', cancelOrder)

//change order status
router.post('/:id/status', changeOrderStatus)

//get customer orders
router.get('/user', listCustomerOrders)


router.get('/:orderId', getOrder)






          
        
module.exports = router