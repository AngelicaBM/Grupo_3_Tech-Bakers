const products = require('../dataBase/products.js');
const nosotros = require('../dataBase/nosotros.js');

const mainController = {
    index : (req,res)=>{
        res.render('products/index', {nosotros, products})
    }
}

module.exports = mainController;