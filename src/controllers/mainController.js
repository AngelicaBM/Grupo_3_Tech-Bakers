const universalModel = require('../model/universalModel.js');
const nosotros = require('../dataBase/nosotros.js');
const productModel = universalModel('products')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const mainController = {
    index : (req,res)=>{
		
        const destacados = productModel.destacados('Destacados')
        res.render('products/index', { nosotros, destacados,toThousand})
    },

    search: (req, res) => {
		let search = req.query.keywords;
		let productsToSearch = products.filter(product => product.name.toLowerCase().includes(search));	
		res.render('results', { 
			products: productsToSearch, 
			search,
			toThousand,
		});
	},
}

module.exports = mainController;