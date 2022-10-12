const db = require('../dataBase/models');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const universalModel = require('../model/universalModel.js');
const productModel = universalModel ('products');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { where } = require('sequelize');
const { Op } = require("sequelize");
const {Product, Image, Type, Category} = require('../dataBase/models')

const productController = {
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
            res.render('products/create', {categories,types, page_name: 'create'})
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
        res.render('products/edit',{product, idToUpdate,categories,types, page_name: 'edit'});
    } catch (error) {
        res.json({error: error.message});
    }
    
},

update: (req, res) => {

        db.Product.update({
            
            name: req.body.name,
            price: req.body.price,
            description: req.body.descripcion,
            discount: req.body.discount,
            stock: req.body.stock,
            categoryId: req.body.category,
            typeId: req.body.type,
        },{
            where:{
                id: req.params.id
            }
        });
             res.redirect('/products')
    },
    
    delete: function (req, res) {
        let productIdd = req.params.id;
    
        db.Product.findByPk(productIdd, {
          include: ["Images"],
        }).then(() => {
          db.Image.destroy({
            where: {
              productId: productIdd,
            },
          }).then(() => {
            db.Product.destroy({
              where: {
                id: productIdd,
              },
            }).then(() => {
              return res.redirect("/");
            });
          });
        });
      },
 
    products: async (req,res) => {
        try {
            const images = await db.Image.findAll();
            const products =  await db.Product.findAll(
                {include: [db.Image]
            });
            res.render('products/products', {products,
                images,
                toThousand,
                page_name: 'productos' })
        } catch (error) {
            res.json({error: error.message});
        }
        
    },

    productedit : async (req,res) => {
        try {
            const images = await db.Image.findAll();
            const products =  await db.Product.findAll(
                {include: [db.Image]
            });
            res.render('products/productedit', {products,images,toThousand})
        } catch (error) {
            res.json({error: error.message});
        }
        
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


    
                
                res.render('products/products',{
                    allProducts,
                    images,
                    products,
                    toThousand,
                
                });
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

            res.render('products/products',{
                allProducts,
                images,
                products,
                toThousand,
                // hacer la consulta directamente de la base de datos
               
            });
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

            res.render('products/products',{
                allProducts,
                images,
                products,
                toThousand,
            
            });
        } catch (error) {
            res.json({error: error.message})
        }
    },

    search: async (req, res) => {
        try {  
            const  include = ['Type','Category','Images']

            
            let products = await Product.findAll({
                where: {
                    name: {[Op.like] : '%' + req.query.search + '%'}
                },
                include
            })
            
            res.render('./products/productSearch', {products,toThousand})
        } catch (error) {
            res.json(error)
        }
        
    },

    productCart: async (req, res) => {
        try {
            const order = await db.Sale.findAll({
                where: {
                    userId: req.session.userLogged.id,            
                },
                include: ["product"]
            });

            res.render("products/productCart", {order, toThousand});
        } catch (error) {
            res.json(error)
        }
    },

    addToCart: async (req, res) => {
        try {
            await db.Sale.create({
                userId: req.session.userLogged.id,
                productId: req.params.id,
            })

            res.redirect("/products/productCart");
        } catch (error) {
            res.json(error)
        }
    },

    deleteFromCart: async (req, res) => {
        try {
            await db.Sale.destroy({
                where: {
                    userId: req.session.userLogged.id,
                    productId: req.params.id
                },
                limit: 1
            })

            res.redirect("/products/productCart");
        } catch (error) {
            res.json(error)
        }
    },

}

module.exports = productController;