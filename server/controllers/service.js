const { getDistance, asyncFilter, changeOrderStatus } = require('./controller');
const { Order, ServiceOwner } = require('./../models/allModels');
const { io } = require('../server');

const availableServiceOwners = async ({ body }) => {
    const transportation = body.transportation;
    const {from, to} = body;
    
    const owners = await ServiceOwner.find({ transportation }).populate({
        path: 'user',
        match: {status: 'online'}
    });

    return await asyncFilter(owners, async owner => {
        if(owner.user != null){
            console.log(owner);
            const location = owner.user.address.length != 0 ? owner.user.address[0].location : null;
            const distance = await getDistance(from, to, location);
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
    .then(order => res.status(200).json({status: order.status}))
    .catch(err => res.status(500).end());
}

const accept = (req, res) => {
    changeOrderStatus(req.params.id, 'Accepted')
    .then(order => {
        io.on('connection', (socket) => { 
            socket.emit(`notify:${owner && owner.user.email}`, { success: true, msg: `Congratulations! Your order is accepted` });
        });
        res.status(200).json({status: order.status})
    })
    .catch(err => res.status(500).end());
}

const reject = (req, res) => {
    changeOrderStatus(req.params.id, 'Rejected')
    .then(order => {
        io.on('connection', (socket) => { 
            socket.emit(`notify:${owner && owner.user.email}`, { success: true, msg: `Sorry! Your order is rejected` });
        });
        res.status(200).json({status: order.status})
    })
    .catch(err => res.status(500).end());
}

module.exports = {
    filteredServiceOwners,
    transportation,
    order,
    cancel,
    accept,
    reject
}