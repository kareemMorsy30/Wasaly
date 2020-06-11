const { Order, ServiceOwner } = require('./../models/allModels');
const { getDistance } = require('./controller');

const availableServiceOwners = async ({ body }) => {
    const transportation = body.transportation;
    const {from, to} = body;
    
    const owners = await ServiceOwner.find({ transportation }).populate({
        path: 'user',
        match: {status: 'online'}
    });

    async function filter(arr, callback) {
        const fail = Symbol()
        return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
    }

    return await filter(owners, async owner => {
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

module.exports = {
    order
}