const serviceController = require('./service');
const serviceOwnerController = require('./serviceOwners');
const productOwnerController = require('./productOwner');
const categoryController = require('./category');
const userController = require('./user.controller');
const controller = require('./controller');
const service = require('./service');

module.exports = {
    serviceController,
    serviceOwnerController,
    productOwnerController,
    categoryController,
    userController,
    controller,
    service
}