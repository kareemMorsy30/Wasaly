const { ServiceOwner, productOwner } = require('../models/allModels');

const connect = (req, res) => {
    const { serviceOwnerId } = req.body;

    ServiceOwner.findByIdAndUpdate(serviceOwnerId, {
        productOwner: {
            user: req.user._id,
            status: 'Pending'
        }
    }, {
        new: true
    }).then(owner => res.status(200).json(owner))
    .catch(error => res.status(500).end());
}

// Retrieve product owners request details
const productOwnerDetails = (req, res) => {
    const { user } = req;
    ServiceOwner.findOne({user: user._id})
    .populate('productOwner.user')
    .then(owner => {
        if(owner.productOwner.status === 'Not connected'){
            res.status(200).json({status: owner.productOwner.status});
        }else{
            res.status(200).json(owner);
        }
    })
    .catch(error => res.status(500).end());
}

module.exports = {
    connect,
    productOwnerDetails
}