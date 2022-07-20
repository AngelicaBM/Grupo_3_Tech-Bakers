const productController = {
    productCart : (req,res)=>{
        res.render('products/productCart');
    },

    productDetails : (req,res)=>{
        res.render('products/productDetails');
    },

    // addProducts : (req,res)=>{
    //     res.render('products/addProducts');
    // },
    
    // editProducts : (req,res)=>{
    //     res.render('products/editProducts');
    // }
}

module.exports = productController;