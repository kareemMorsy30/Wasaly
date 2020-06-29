const Order = require('../models/order')
const Product = require('../models/product');
const User = require('../models/user');

exports.listOrders = async (req, res, next) => {
    try {
        const id = req.user._id
        const orders = await Order.find({ productOwner: id }).exec()
        res.json(orders)
    } catch (err) {
        next(err)
    }
}

exports.changeOrderStatus = async (req, res, next) => {
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

exports.cancelOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params
        const userID = req.user._id
        console.log(userID)
        console.log(orderId)

        let order = await Order.findOne({ _id: orderId, customer: userID, status: 'Pending' }).exec()

        order.status = "Canceled"

        await Order.findByIdAndUpdate(orderId, { $set: order }, { new: true })
        res.send("Status Updated Successfully")

    } catch (err) {
        next(err)
    }
}

exports.listCustomerOrders = async (req, res, next) => {
    try {
        const id = req.user._id
        const orders = await Order.find({ customer: id }).select("service status description cost amount item products productOwner rate").exec()
        res.json(orders)
    } catch (err) {
        next(err)
    }
}

exports.getOrder = async (req, res, next) => {

    try {
        const id = req.user._id
        const { orderId } = req.params
        const orders = await Order.findOne({ _id: orderId, customer: id })
            .populate('products')
            .populate('products.product')
            .populate('products.product.owner')
            .populate({
                path: 'products.product',
                populate: { path: 'owner' }
            })
            .populate('service', 'name')
            .exec()

        res.json(orders)
    } catch (err) {
        next(err)
    }
}
exports.addOrder = async (req, res, next) => {
    const { to, status, phone, description } = req.body
    // console.log(from,to,status);

    await User.findOne(
        { _id: req.user._id },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => {
                return item.id
            })

            console.log("cart", cart);
            let total = 0;

            Product.find({ '_id': { $in: array } })
                .populate('owner').exec
                ((err, cartDetail) => {

                    cart.map((cartproduct) => {
                        // cartDetail.map((product)=>{
                        total += cartproduct.price * cartproduct.amount;
                        // console.log(product);

                        console.log("CART DETAIL ", cartDetail);
                        // console.log("CART Product ",cartproduct);

                        // console.log(product.price*cartproduct.amount);
                        // console.log(product.name);
                        console.log('====================================');
                        console.log("CART IN  PRODUCTS ", cart);
                        console.log('====================================');

                        const products = [...cart]
                        console.log('====================================');
                        // console.log(products);
                        console.log('====================================');
                   
                        // console.log("new Order",newOrder);
                        // const order =  newOrder.save()
                        // res.send(order)
                        // console.log(" Order",order);




                    });
                    // User.findOneAndUpdate({ _id: req.user._id }, {
                    //     address: {
                    //         area: to.area
                    //     }
                    // }, { new: true }, (error, user) => {
                       

                    //     // res.status(200).json({ "data": user });
                    // }).catch((err) => {
                    //     console.log(err);
                    //     res.status(400).json({ "error": err });
                    // })
                    const newOrder = new Order({
                        products: [...cart]

                        // products:[...cartDetail]
                        ,
                        item: 'item',
                        cost: total,

                        to: to, customer: req.user._id, phone, description, from: { area: "undefined", latitude: 0, longitude: 0, }

                    }).save().then((result) => {
                        res.send(result)
                    }).catch(err => console.log(err)
                    );

                    if (err) return res.status(400).send(err);
                    // return res.status(200).send({ success: true, cartDetail, cart })
                })

        }
    
    
        )


    // console.log("checkout");
    // req.user
    //     .populate('cart.id').populate('cart.product')
    //     .execPopulate()
    //     .then((user) => {
    //         console.log(user);

    //         const products = user.cart;
    //         console.log(products);

    //         //Get the total sum
    //         let totalSum = 0;
    //         products.forEach((product) => {
    //             totalSum += product.quantity ;
    //         });
    //         res.send( {
    //             products: products,
    //             totalSum: totalSum
    //         });
    //     }, (err) => next(err)) //sends the error to the error handler
    //     .catch((err) => next(err));

    //     Product.findById(req.body.productId)
    //     .then(product => {
    //       if (!product) {
    //         return res.status(404).json({
    //           message: "Product not found"
    //         });}
    //     update = { expire: new Date() },
    // var    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    //      Order.findOneAndUpdate({},options,
    //         products:[
    //             {
    //                 product:req.body.product,
    //                 amount:req.body.amount,

    //             }
    //         ]
    //     )
    //       return order.save();
    //     })
    //     .then(result => {
    //       console.log(result);
    //       res.status(201).json({
    //         message: "Order stored",
    //         createdOrder: {
    //           _id: result._id,
    //           product: result.product,
    //           quantity: result.quantity
    //         },
    //         request: {
    //           type: "GET",
    //           url: "http://localhost:3000/orders/" + result._id
    //         }
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       res.status(500).json({
    //         error: err
    //       });
    //     });
};

//  exports.addOrder()= async (req,res,next)=>{
// const userID=req.user._id;
// const productId=req.body.productId;


// Order.update({_id:id},{$push:})





//  }