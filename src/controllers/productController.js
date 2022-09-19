const db = require('../dataBase/models');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const universalModel = require('../model/universalModel.js');
const productModel = universalModel ('products')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { Image, sequelize } = require("../dataBase/models");

const productController = {
    productCart : (req,res)=>{
        res.render('products/productCart');
    },

    productDetails : async (req,res)=>{
        try {
            const id = req.params.id;
            const product = await db.Product.findByPk(id, {
                include: [db.Image]
            });    
            const destacados = productModel.destacados("Destacados")
            res.render('products/productDetails', {product, destacados, toThousand});
        } catch (error) {
            res.json({error: error.message});
        }
    },

    create : async (req,res) => {
        try {
            const categories = await db.Category.findAll();
            const types = await db.Type.findAll();
            res.render('products/create', {categories,types})
        } catch (error) {
            res.json({error: error.message});
        }
    },

    store: (req, res) => {

        const { files } = req;
        
        files.forEach( file => {
            console.log(file.filename);
        })        
        
        const errores = validationResult(req);
       
        if (!errores.isEmpty()){
            files.forEach( file => {
                const filePath = path.join(__dirname, `../../public/images/products/${file.filename}`);
                fs.unlinkSync(filePath);
            })

            return res.render('./products/create', {
                errors: errores.mapped(),
                oldData: req.body
            })
        }
        let imagenes = [];

        files.forEach( imagen => {
            imagenes.push(imagen.filename);
        })

        const newProduct = {
            ...req.body,
            image: req.files.length >= 1 ? imagenes : ["default-image.png"]
        }
        productModel.create(newProduct);
        res.redirect('/')
    },

    edit : (req,res)=>{
        let product = productModel.find(req.params.id)
        let productToEdit = productModel.find(req.params.id);
        res.render('products/edit', { product , productToEdit })
    },

    update: (req, res) => {

        const { files } = req;
        const { id } = req.params;
        
        const errores = validationResult(req);
       
        if (!errores.isEmpty()){
            
            files.forEach( file => {
                const filePath = path.join(__dirname, `../../public/images/products/${file.filename}`);
                fs.unlinkSync(filePath);
            })

            const productToEdit = productModel.find(id);

            return res.render('./products/edit', {
                productToEdit,
                errors: errores.mapped(),
                oldData: req.body
            })
        }
        let productToEdit = productModel.find(req.params.id);

        let imagenes = [];

        for(let i = 0 ; i < req.files.length; i++){
            imagenes.push(req.files[i].filename)
        }

        productToEdit = {

            id: productToEdit.id,
            ...req.body,
            image: req.files.length >= 1  ? imagenes : productToEdit.image

        }

        productModel.update(productToEdit);
        res.redirect("/products/productedit");

    },
    destroy: function(req,res){
        let product = (req.params.id)
        productModel.delete(product);
        res.redirect("/products/productedit");
    },

    products: async (req,res) => {
        try {
            const images = await db.Image.findAll();
            const products =  await db.Product.findAll(
                {include: [db.Image]
            });
            res.render('products/products', {products,images,toThousand})
        } catch (error) {
            res.json({error: error.message});
        }
        
    },

    productedit : (req,res)=>{
        const products = productModel.all();
        res.render('products/productedit', {products, toThousand})
    },

    pasteleria : (req,res)=>{
        const products = productModel.findAllByField('type','Pastelería');
        res.render('products/products', {products, toThousand})
    },

    masas : (req,res)=>{
        const products = productModel.findAllByField('type','Masas');
        res.render('products/products', {products, toThousand})
    },

    tortas : (req,res)=>{
        const products = productModel.findAllByField('type','Tortas');
        res.render('products/products', {products, toThousand})
    },

};

module.exports = productController;