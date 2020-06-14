const serviceRouter = require('./service');
const serviceOwnerRouter = require('./serviceOwner');
const productRouter = require('./product');
const searchRouter = require('./search');
const userRoutes = require('./user.routes');



module.exports = {
    serviceRouter,
    serviceOwnerRouter,
    productRouter,
    searchRouter,
    userRoutes
}
