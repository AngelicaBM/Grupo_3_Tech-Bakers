const fs = require('fs');
const path = require('path');
const nosotros = require('../dataBase/nosotros.js');
const {Product, Image} = require('../dataBase/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let db = require("../database/models");
const universalModel = require('../model/universalModel.js');
const productModel = universalModel ('products')

const mainController = {
    index : async (req,res) => {
        try {
            const products = await db.Product.findAll({
                include: [db.Image]
            });
			const destacados = productModel.destacados("Destacados")
            res.render('products/index',{products,nosotros, destacados,toThousand});
        } catch (error) {
            res.json({error: error.message})
        }
        
    },
};
    

module.exports = mainController;