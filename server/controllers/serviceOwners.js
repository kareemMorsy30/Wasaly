const { Order, ServiceOwner } = require('./../models/allModels');

// Get all service owner orders
const allIncomingOrders = (req, res) => {
    const { user } = req;

    Order.find({service: user._id})
    .then(orders => {
        res.status(200).json(orders);
    })
    .catch(error => res.status(500).end());
}

module.exports = {
    allIncomingOrders
}