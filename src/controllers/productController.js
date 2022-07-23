const products = require ('../dataBase/products.js');

const productController = {
    productCart : (req,res)=>{
        res.render('products/productCart');
    },

    productDetails : (req,res)=>{
        const id = Number(req.params.id);
        const product = products.find(product => product.id === id);
        res.render('products/productDetails', {product, products});
    },

    create : (req,res)=>{
        res.render('products/create');
    },
    
    edit : (req,res)=>{
        const id = Number(req.params.id);
        const product = products.find(product => product.id === id);
        res.render('products/edit', {product});
    }
}

module.exports = productController;