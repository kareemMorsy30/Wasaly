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
    .catch(err => console.error(err));
}

module.exports = {
    allIncomingOrders,
    reviews
}