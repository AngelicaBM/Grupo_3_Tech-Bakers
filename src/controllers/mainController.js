const products = require('../dataBase/products.js')

const mainController = {
    index : (req,res)=>{
        res.render('products/index', {products})
    }
}

module.exports = mainController;