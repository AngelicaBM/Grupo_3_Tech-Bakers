const fs = require('fs');
const path = require('path');
const nosotros = require('../dataBase/nosotros.js');
const {Product, Image} = require('../dataBase/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../dataBase/models');
const universalModel = require('../model/universalModel.js');
const productModel = universalModel ('products')

const mainController = {
    index : async (req,res) => {
        try {
            const images = await db.Image.findAll();
            const products =  await db.Product.findAll(
                {include: [db.Image]
            });
			const destacados = products.filter(product => product.Category =! 0);
            destacados.splice(4)

            res.render('products/index',{products,images,nosotros,destacados,toThousand});
        } catch (error) {
            res.json({error: error.message})
        }
        
    },
};
    

module.exports = mainController;