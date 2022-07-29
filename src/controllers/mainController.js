const fs = require('fs');
const path = require('path');
/* const products = require('../dataBase/products.js'); */
const nosotros = require('../dataBase/nosotros.js');
const productsJSON = fs.readFileSync(path.resolve(__dirname, '../dataBase/products.json'), 'utf8');
const products = JSON.parse(productsJSON);

const mainController = {
    index : (req,res)=>{
        const destacados = products.filter(product => product.category === "Destacados");
        res.render('products/index', {nosotros, destacados})
    },

}

module.exports = mainController;