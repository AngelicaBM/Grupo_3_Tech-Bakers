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
            const products =  await db.Product.findAll(
                {include: [db.Image]
            });
			const destacados = products.filter(product => product.Category =! 0);
            destacados.splice(4)
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

    store: async (req, res) => {
        try {
            let product = req.body;

                const errores = validationResult(req);
            if (errores.isEmpty()) {
                let imagenes= []
                const productId = await db.Product.create(product);
                for(let i = 0 ; i<req.files.length;i++) {
                    imagenes.push({
                        fileName: req.files[i].filename,
                        productId: productId.id
                    })
                }
                if (imagenes.length > 0) {
                    await db.Image.bulkCreate(imagenes)
                    res.redirect('/')
                } else {
                    await db.Image.create([{
                        fileName: 'default-image.png',
                        productId: productId,
                    }])
                    res.redirect('/')
                }
                                
            } else {
                if (req.files) {
                    let {files} = req;
                for (let i = 0 ; i< files.length; i++) {
                    fs.unlinkSync(path.resolve(__dirname, '../../public/images/products/'+files[i].filename))
                }
                };
                const categories = await db.Category.findAll();
                const types = await db.Type.findAll();
                res.render('products/create',{errors: errores.mapped(), oldData: req.body,types,categories});
            }
        } catch (error) {
            res.json({error: error.message});
        }
        
    },
   edit : async (req,res)=>{
    try {
        const categories = await db.Category.findAll();
        const types = await db.Type.findAll();
        const idToUpdate = +req.params.id;
        const product = await db.Product.findByPk(idToUpdate,{
            include: [db.Image,db.Category,db.Type]
        });    
        res.render('products/edit',{product, idToUpdate,categories,types});
    } catch (error) {
        res.json({error: error.message});
    }
    
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

    filter: async (req,res) => {
        try {
            let filter = req.query;
            const products = await db.Product.findAll({
                include: [db.Type,db.Image,db.Category]
            })
            res.render('products/products', {products,toThousand,filter})
        } catch (error) {
            res.json({error: error.message});
        }
        
    },

    pasteleria : async (req,res) => {
            try {
                const images = await db.Image.findAll();
                const allProducts =  await db.Product.findAll(
                    {include: [db.Image]
                });
                const products = allProducts.filter(i => i.typeId == 2);

                res.render('products/products',{allProducts,images,products,toThousand});
            } catch (error) {
                res.json({error: error.message})
            }
    },

    masas : async (req,res) => {
        try {
            const images = await db.Image.findAll();
            const allProducts =  await db.Product.findAll(
                {include: [db.Image]
            });
            const products = allProducts.filter(i => i.typeId == 3);

            res.render('products/products',{allProducts,images,products,toThousand});
        } catch (error) {
            res.json({error: error.message})
        }
},

    tortas : async (req,res) => {
        try {
            const images = await db.Image.findAll();
            const allProducts =  await db.Product.findAll(
                {include: [db.Image]
            });
            const products = allProducts.filter(i => i.typeId == 1);

            res.render('products/products',{allProducts,images,products,toThousand});
        } catch (error) {
            res.json({error: error.message})
        }
    },


};

module.exports = productController;