
const Product= require('../models/product')

exports.search= async (req,res,next)=>{
    const{q}= req.query
    try{
        const products= await Product.find({ name: { $regex: q, $options: "i" } } )      
        res.json(products)
    }catch(err){
        next(err)
    }
}
exports.suggestion= async (req,res,next)=>{
    const{q}= req.query
    if(q.length>1){
    try{
        const products= await Product.find({ name: { $regex: q, $options: "i" } } ).select("id name description images_path").limit(10)      
        res.json(products)

    }catch(err){
        next(err)
    }

    }    
}
