const { getDistance, asyncFilter, changeOrderStatus } = require('./controller');
const { Order, ServiceOwner } = require('./../models/allModels');
const { io } = require('../server');
const serviceOwner = require('../config/serviceOwner');

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
    const serviceOwnerId = order.id;

    ServiceOwner.findById(serviceOwnerId).then(owner => {
        let newOrder = new Order({
            customer: req.user._id,
            service: owner.user,
            ...order,
            cost: 0
        });

        newOrder.save().then(order => {
            io.on('connection', (socket) => {
                socket.emit(`notify:${owner && owner.user.email}`, { success: true, msg: `A new request delivery from ${req.user ? req.user.username : 'Anonymous'}` });
            });

            res.status(200).json(order);
        }).catch(error => console.log(error));
    })
}

const cancel = (req, res) => {
    changeOrderStatus(req.params.id, 'Canceled')
        .then(order => res.status(200).json({ status: order.status }))
        .catch(err => res.status(500).end());
}

const accept = (req, res) => {
    changeOrderStatus(req.params.id, 'Accepted')
        .then(order => {
            io.on('connection', (socket) => {
                socket.emit(`notify:${order.customer.email && order.customer.email}`, { success: true, msg: `Congratulations! Your order is accepted` });
            });
            res.status(200).json(order);
        })
        .catch(err => res.status(500).end());
}

const reject = (req, res) => {
    changeOrderStatus(req.params.id, 'Rejected')
        .then(order => {
            io.on('connection', (socket) => {
                socket.emit(`notify:${order.customer.email && order.customer.email}`, { success: true, msg: `Sorry! Your order is rejected` });
            });
            res.status(200).json({ status: order.status })
        })
        .catch(err => res.status(500).end());
}

const outForDelivery = (req, res) => {
    changeOrderStatus(req.params.id, 'Out for delivery')
        .then(order => {
            io.on('connection', (socket) => {
                socket.emit(`notify:${order.customer.email && order.customer.email}`, { success: true, msg: `Your order is on his way to you` });
            });
            res.status(200).json({ status: order.status })
        })
        .catch(err => res.status(500).end());
}

const delivered = (req, res) => {
    changeOrderStatus(req.params.id, 'Delivered')
        .then(order => {
            io.on('connection', (socket) => {
                socket.emit(`notify:${order.customer.email && order.customer.email}`, { success: true, msg: `Order has been delivered! leave a rating on the service` });
            });
            res.status(200).json({ status: order.status })
        })
        .catch(err => res.status(500).end());
}
// save customer review to service owner
const saveReview = async (req, res, next) => {
    const {user} = req
    const { serviceOwnerID } = req.params
    const { review } = req.body
    try {
        const serviceOwner = await ServiceOwner.findById(serviceOwnerID)
        for(let i=0; i<serviceOwner.rates.length; i++){
            //if he already gave review
            if (serviceOwner.rates[i].user.toString() == user._id.toString()) {                
                serviceOwner.rates[i].reviews.push(review)
                serviceOwner.save()
                return res.json("Review added successfully")                    
            }
        }
        // save review for first time
        serviceOwner.rates.push({reviews:[review], user: user._id})
        serviceOwner.save()
        return res.json("Review added successfully")
    } catch (err) {
        next(err)
    }
}

// save customer rate to service owner
const saveRate = async (req, res, next) => {
    const {user} = req
    const { serviceOwnerID } = req.params
    const { rate } = req.body
    try {
        const serviceOwner = await ServiceOwner.findById(serviceOwnerID)
        for(let i=0; i<serviceOwner.rates.length; i++){
            //if he already gave review
            if (serviceOwner.rates[i].user.toString() == user._id.toString()) {                
                serviceOwner.rates[i].rating= rate
                serviceOwner.save()
                return res.json("Rate added successfully")                    
            }
        }
        // save review for first time
        serviceOwner.rates.push({rating:rate, user: user._id})
        serviceOwner.save()
        return res.json("Rate added successfully")
    } catch (err) {
        next(err)
    }
}

var options = {
    select:   'rates user',
    sort:     { date: -1 },
    lean:     true,
    offset:   0, 
    limit:    10
};
 



module.exports = {
    filteredServiceOwners,
    transportation,
    order,
    cancel,
    accept,
    reject,
    outForDelivery,
    delivered,
    saveReview,
    saveRate,
}