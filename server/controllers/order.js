const Order = require('../models/order')

exports.listOrders = async (req, res, next) => {
    try {
        const id = req.user._id
        const orders = await Order.find({ productOwner: id }).exec()
        res.json(orders)
    } catch (err) {
        next(err)
    }
}

exports.chaneOrderStatus = async (req, res, next) => {
    try {
        const orderID = req.params.id
        const userID = req.user._id

        const order = await Order.findOne({ _id: orderID, productOwner: userID }).exec()
        !order ? order = await Order.findOne({ _id: orderID, service: userID }).exec() :
            res.status(401).send({ message: "Order Not Found" })

        req.body.status && (product.status = req.body.status)

        await Order.findByIdAndUpdate(orderID, { $set: order }, { new: true })
        res.send("Status Updated Successfully")

    } catch (err) {
        next(err)
    }


}

exports.saveOrderForService = async (req, res, next) => {
    try {
        const orderID = req.params.id
        const userID = req.user._id
        const {
            serviceOwnerID,
            from,
            to,
            item,
            amount,
            cost,
            description } = req.body
        const status="Pending"
        await new Order({to, from, item, amount, cost, description, service: serviceOwnerID, status})
        res.send("Status Updated Successfully")

    } catch (err) {
        next(err)
    }
}