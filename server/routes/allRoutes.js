const serviceRouter = require('./service');
const serviceOwnerRouter = require('./serviceOwner');
const productRouter = require('./product');
const searchRouter = require('./search');
const userRoutes = require('./user.routes');
const adminRouter = require('./admin');
const productOwnerRouter = require('./productOwner');
const OrderRouter= require("./orders")



module.exports = {
    serviceRouter,
    serviceOwnerRouter,
    productRouter,
    searchRouter,
    userRoutes,
    adminRouter,
    productOwnerRouter,
    OrderRouter
}
