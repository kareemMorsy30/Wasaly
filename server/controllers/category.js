const { Category } = require('../models/allModels');
const fs = require('fs');

const add = (req, res) => {
    const { name } = req.body;
    const image = req.file && req.file.path.substring(6);
    console.log(image)
    const category = new Category({name, image});
    category.save().then(category => res.status(200).json(category))
    .catch(error => res.status(500).end());
}

const remove = (req, res) => {
    const { id } = req.params;

    Category.findByIdAndDelete(id).then((category) => {
        // if a new image is added remove old one
        const imgDir = `public${category.image}`;
        if(fs.existsSync(imgDir))
            fs.unlinkSync(imgDir);
            
        res.status(200).json(category);
    }).catch(error => console.log(error));

}
// const showCategoryProducts=  async(req, res)=>{
//     try {
//         const products = await Prod.findById(req.params.id).populate('products');
//         res.send(products);
//     } catch (error) {
//         // error=new Error("No products there ")

//      res.send({error,id:req.params.id}).status(400);   
//     }
   
// }

const getAllCategories= async (req,res,next)=>{
    try{
        categories= await Category.find({}).select('_id name image').exec()
        res.json(categories)
    }catch(error){
        next(error)
    }
}

module.exports = {
    add,
    remove,
    getAllCategories
    // showCategoryProducts
}