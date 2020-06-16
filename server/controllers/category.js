const { Category } = require('../models/allModels');
const fs = require('fs');

const add = (req, res) => {
    const { name } = req.body;
    const image = req.file && req.file.path.substring(6);

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

module.exports = {
    add,
    remove
}