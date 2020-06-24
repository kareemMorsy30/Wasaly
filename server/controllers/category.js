const { Category, Product } = require('../models/allModels');
const fs = require('fs');

const add = (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    const image = req.file && req.file.path.substring(6);
    console.log(image)
    const category = new Category({name, image});
    category.save()
    .then(category => res.status(200).json(category))
    .catch(error => {
        console.log(error);
        res.status(500).end()
    });
}

const update = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file && req.file.path.substring(6);
    
    Category.findByIdAndUpdate(
        id, 
        {name, image},
        {new: true}
    ).then(category => {
        // if a new image is added remove old one
        if(image){
            const imgDir = `public${category.image}`;
            if(fs.existsSync(imgDir)) fs.unlinkSync(imgDir);
        }

        res.status(200).json(category);
    })
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
const showCategoryProducts=  async(req, res)=>{
    const resPerPage = 8; // results per page
    const{page}= req.query || 1;
  
    try {
        const products = await Product.find({category:req.params.id}).populate('owner','marketName')
        .skip((resPerPage * page)- resPerPage)
        .limit(resPerPage)  
        const numOfProducts= products.length

        res.json({
            products,
            currentPage:page,
            pages: Math.ceil(numOfProducts / resPerPage), 
            numOfResults: numOfProducts
        })
    } catch (error) {
        // error=new Error("No products there ")

     res.send({error,id:req.params.id}).status(400);   
    }
   
}

const getAllCategories= async (req,res,next)=>{
    try{
        categories= await Category.find({})
        .sort({_id: 'desc'})
        .select('_id name image').exec()
        res.json(categories)
    }catch(error){
        next(error)
    }
}

module.exports = {
    add,
    remove,
    getAllCategories,
    showCategoryProducts,
    update
}