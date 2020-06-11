const { getDistance, asyncFilter } = require('./controller');
const { Order, ServiceOwner } = require('./../models/allModels');

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

const order = (req, res) => {
    availableServiceOwners(req).then(owners => {
        res.json(owners);
    });
}

const transportation = (req, res) => {
    ServiceOwner.distinct('transportation').then(owners => res.json(owners));
}

module.exports = {
    order,
    transportation
}