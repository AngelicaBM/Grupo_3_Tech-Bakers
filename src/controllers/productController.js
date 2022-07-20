const productController = {
    productCart : (req,res)=>{
        res.render('products/productCart');
    },

    productDetails : (req,res)=>{
        res.render('products/productDetails');
    },

    create : (req,res)=>{
        res.render('products/create');
    },
    
    edit : (req,res)=>{
        res.render('products/edit');
    }
}

module.exports = productController;