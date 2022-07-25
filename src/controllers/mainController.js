const products = require('../dataBase/products.js');
const nosotros = require('../dataBase/nosotros.js');

const mainController = {
    index : (req,res)=>{
        const destacados = products.filter(product => product.category === "Destacados");
        res.render('products/index', {nosotros, destacados})
    },

}

module.exports = mainController;