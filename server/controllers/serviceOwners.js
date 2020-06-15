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

// Get service owner reviews
const reviews = (req, res) => {
    const { user } = req;

    const perPage = req.query.page ? 8 : null; // Reviews per page
    const page = perPage ? parseInt(req.query.page) : 0; // Check if there is a query string for page number

    ServiceOwner.findOne({ user: user._id }, null, { skip: perPage * (page-1), limit: perPage })
    .then(owner => {
        
        const count = owner.reviews ? owner.reviews.length : 0;

        const data = perPage ? {
            // return review data with current page number and all pages available
            reviews: owner.reviews,
            page,
            pages: parseInt(count/perPage)+1 // Count number of available pages
        } 
        : 
        {reviews: owner.reviews};

        res.status(200).json(data);
    })
    .catch(error => res.status(500).end());
}

// Get all service owners
const all = (req, res) => {
    const perPage = req.query.page ? 8 : null; // Service owners per page
    const page = perPage ? parseInt(req.query.page) : 0; // Check if there is a query string for page number

    ServiceOwner.find({}, null, { skip: perPage * (page-1), limit: perPage })
    .populate('user')
    .then(owners => {
        ServiceOwner.countDocuments().exec((err, count) => {
            if (err) res.status(500).end();

            const data = perPage ? {
                // return service owner data with current page number and all pages available
                owners,
                page,
                pages: parseInt(count/perPage)+1 // Count number of available pages
            } : owners;

            res.status(200).json(data);
        });

        res.status(200).json(data);
    })
    .catch();
}

// Get all unconnected service owners
const allIdle = (req, res) => {
    const perPage = req.query.page ? 8 : null; // Service owners per page
    const page = perPage ? parseInt(req.query.page) : 0; // Check if there is a query string for page number

    ServiceOwner.find({'productOwner.status': 'Not connected'}, null, { skip: perPage * (page-1), limit: perPage })
    .populate('user')
    .then(owners => {
        ServiceOwner.countDocuments().exec((err, count) => {
            if (err) res.status(500).end();

            const data = perPage ? {
                // return service owner data with current page number and all pages available
                owners,
                page,
                pages: parseInt(count/perPage)+1 // Count number of available pages
            } : owners;

            res.status(200).json(data);
        });

        res.status(200).json(data);
    })
    .catch();
}

const updateConnection = (req, res) => {
    const { status } = req.params;
    const { user } = req;
    
    ServiceOwner.findOneAndUpdate({user: user._id}, {
        'productOwner.status': status === 'accept' ? 'Connected' : 'Rejected'
    }, { new: true })
    .then(owner => res.status(200).json({status: owner.productOwner.status}))
    .catch(error => res.status(500).end());
}

module.exports = {
    allIncomingOrders,
    reviews,
    all,
    allIdle,
    updateConnection
}