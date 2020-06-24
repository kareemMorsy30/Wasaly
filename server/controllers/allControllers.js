const serviceController = require('./service');
const serviceOwnerController = require('./serviceOwners');
const productOwnerController = require('./productOwner');
const categoryController = require('./category');
const userController = require('./user.controller');

module.exports = {
    serviceController,
    serviceOwnerController,
    productOwnerController,
    categoryController,
    userController
}