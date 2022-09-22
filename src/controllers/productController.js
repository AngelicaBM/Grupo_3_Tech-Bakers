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
        const errores = validationResult(req);  
        if (errores.isEmpty()) {
          //asi que simplmente tomare todos los datos que vienen y hare el update si los campos estan correctos
          let idToUpdate = req.params.id;
          //busco la imagen que este vinculada al producto a editar para usarlo luego
          let image = db.Image.findOne({
            where: {
              productId: idToUpdate,
            },
          }).then(() => {
            //verifico si se eligio una nueva imagen o no
            if (req.file == undefined) {
              //en el caso de que no se haya elegido una nueva imagen, se usara la que ya estaba vinculada
              db.Image.update({
                name : image.name,
            },{
                where : {
                    productId : idToUpdate
                }
            })
            } else {
              //en caso de elegir una nueva imagen se tomara esa y se hara el update de la misma, antes de que se haga
              //el update de los campos del body
              db.Image.update({
                name : req.file.filenamee,
            },{
                where : {
                    productId : idToUpdate
                }
            })
              imageController.edit(productId, req.file.filename);
            }
            //update del body
            db.Product.update(
              {
                name: req.body.name,
                typeId: req.body.ype,
                price: req.body.price,
                description: req.body.description,
                stock: req.body.stock,
                categoryId: req.body.category,
                discount: req.body.discount,
              },
              {
                where: {
                  id: idToUpdate,
                },
              }
            ).then(() => {
              return res.redirect(`/products/productDetails/${req.params.id}`);
            });
          });

        } else {
            //en caso de que hayan errores en las validaciones requerimos todos los datos del producto
            let id = req.params.id;
            let product = db.Product.findByPk(id);
            let categories = db.Category.findAll();
            let types = db.Type.findAll();
            //procedemos a cargarlas junto al renderizado de la vista de editar, ademas tambien pasamos los errores
            //y los datos previos para que estos no se pierdan
            Promise.all([product,categories,types,]
              ).then(
              ([
                product,categories,types,
              ]) => {
                res.render("products/edit", {
                  product,categories,types,errors: errores.mapped(),oldData: req.body,
                });
              }
            );
          }
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
            res.render('products', {products,images,toThousand})
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