const serviceRouter = require('./service');
const serviceOwnerRouter = require('./serviceOwner');
const productRouter = require('./product');
const searchRouter = require('./search');
const userRoutes = require('./user.routes');
const userRouter = require('./user');


module.exports = {
    serviceRouter,
    serviceOwnerRouter,
    productRouter,
    searchRouter,
    userRouter,
    userRoutes
}
