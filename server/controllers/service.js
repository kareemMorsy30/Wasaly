const { getDistance, asyncFilter, changeOrderStatus, pushNotification } = require('./controller');
const { Order, ServiceOwner, User } = require('./../models/allModels');
const serviceOwner = require('../config/serviceOwner');
<<<<<<< HEAD
const { io } = require("../server");
=======
const serviceOwners = require('./serviceOwners');
>>>>>>> 96ee4956b9f9f190184a550e0c266018808a8c07

const availableServiceOwners = async ({ body }) => {
    const transportation = body.transportation;
    const { from, to } = body;

    const owners = await ServiceOwner.find({ transportation }).populate({
        path: 'user',
        match: { status: 'online' }
    });

    return await asyncFilter(owners, async owner => {
        if (owner.user != null) {
            console.log(owner);
            const location = owner.user.address.length != 0 ? owner.user.address[0].location : null;
            const distance = await getDistance(from, to, location);
            console.log(distance);
            return owner.distance >= distance;
        }
    });
};

const filteredServiceOwners = (req, res) => {
    availableServiceOwners(req).then(owners => {
        res.status(200).json(owners);
    });
}

const transportation = (req, res) => {
    ServiceOwner.distinct('transportation').then(owners => res.status(200).json(owners));
}

const order = (req, res) => {
    const order = req.body;
    const serviceOwnerId = order.serviceOwnerId;

    ServiceOwner.findById(serviceOwnerId)
        .populate('user')
        .then(owner => {
            const location = owner.user.address.length != 0 ? owner.user.address[0].location : null;

            getDistance(order.from, order.to, location)
                .then(distance => {
                    let newOrder = new Order({
                        customer: req.user._id,
                        service: owner.user,
                        ...order,
                        cost: distance * 0.5
                    });

                    newOrder.save().then(order => {
                        io.on('connection', (socket) => {
                            socket.emit(`notify:${owner && owner.user.email}`, { success: true, msg: `A new request delivery from ${req.user ? req.user.username : 'Anonymous'}` });
                        });

                        res.status(200).json(order);
                    }).catch(error => console.log(error));
                })
        })
}

const cancel = (req, res) => {
    changeOrderStatus(req.params.id, 'Canceled')
    .then(order => res.status(200).json({ status: order.status }))
    .catch(err => res.status(500).end());
}

const updateOrderStatus = (req, res) => {
    changeOrderStatus(req.params.id, req.params.status)
    .then(order => {
        const info = { 
            title: 'Order status has been updated',
            message: `Your order has been ${order.status}`,
            link: 'http://localhost:3000/orders',
            body: order
        }
        pushNotification(order.customer.email, info);
        res.status(200).json(order);
    })
    .catch(err => res.status(500).end());
}

// save customer review to service owner
const saveReview = async (req, res, next) => {
    const { user } = req
    const { serviceOwnerID } = req.params
    const { review, order } = req.body
    try {
        const serviceOwner = await ServiceOwner.findOne({user:serviceOwnerID})
        for (let i = 0; i < serviceOwner.rates.length; i++) {
            //if he already gave review
            if (serviceOwner.rates[i].user.toString() == user._id.toString() && serviceOwner.rates[i].order.toString() == order.toString()) {
                serviceOwner.rates[i].reviews.push({review})
                serviceOwner.save()
                return res.json("Review added successfully")
            }
        }
        // save review for first time
        serviceOwner.rates.push({ reviews: [{review}], user: user._id, order })
        serviceOwner.save()
        //save review to order
        await Order.updateOne({ _id: order }, { $push: { 'rate.reviews': review } })
        return res.json("Review added successfully")
    } catch (err) {
        next(err)
    }
}

// save customer rate to service owner
const saveRate = async (req, res, next) => {
    const { user } = req
    const { serviceOwnerID } = req.params
    const { rating, order } = req.body

    try {
        const serviceOwner = await ServiceOwner.findOne({ user: serviceOwnerID })
        let averageRating = 0;


        //if he already gave rate
        for (let i = 0; i < serviceOwner.rates.length; i++) {
            if (serviceOwner.rates[i].user.toString() == user._id.toString() && serviceOwner.rates[i].order.toString() == order.toString()) {
                serviceOwner.rates[i].rating = rating
                //save rate to order
                await Order.updateOne({ _id: order }, { "rate.rating": rating })
                return res.json("Rate added successfully")
            }
        }

        // save rate for first time
        serviceOwner.rates.push({ rating, user: user._id, order })
        //save rate to order
        await Order.updateOne({ _id: order }, { "rate.rating": rating })


        if (serviceOwner.rates.length == 1) {
          
            //average rating     
            serviceOwner.rating = rating
        } else {
            averageRating = (serviceOwner.rating * serviceOwner.rates.length + rating) / (serviceOwner.rates.length + 1);
            serviceOwner.rating = averageRating
        }
        serviceOwner.save()
        return res.json("Rate added successfully")
    } catch (err) {
        next(err)
    }
}
// get user review and rate to the service owner
const getUserRateForOrder = async (req, res, next) => {
    const { user } = req
    const { orderId } = req.params

    try {
        const Order = await Owner.findOne({ _id: orderId })
        for (let i = 0; i < serviceOwner.rates.length; i++) {
            //get his previous rating
            if (serviceOwner.rates[i].user.toString() == user._id.toString()) {
                return res.json(serviceOwner.rates[i].rating)
            }
        }
        return res.json('');

    } catch (err) {
        next(err)
    }

}





module.exports = {
    filteredServiceOwners,
    transportation,
    order,
    cancel,
    updateOrderStatus,
    saveReview,
    saveRate,
    getUserRateForOrder
}