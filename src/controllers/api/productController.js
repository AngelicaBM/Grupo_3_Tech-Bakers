const db = require('../../dataBase/models');
const Sequelize = require('sequelize');

const productController = {
    list: (req, res) => {

        let tortas = db.Product.count({
            where: { typeId: 1 }
        });
        let pasteleria = db.Product.count({
            where: { typeId: 2 }
        });
        let masas = db.Product.count({
            where: { typeId: 3 }
        });

        Promise.all([tortas, pasteleria, masas])
        .then(data => {
            db.Product.findAll()
            .then(allProducts => {
                
                let products = [];
                let countByCategory = {
                    tortas: 0,
                    pasteleria: 0,
                    masas: 0
                };

                allProducts.forEach(data => {
                    let product = {
                        id: data.id,
                        name: data.name,
                        price: data.price,
                        description: data.description,
                        type: data.typeId,
                        category: data.categoryId,
                        detail: `/api/products/${data.id}`
                    };
                    products.push(product);
                })
                let countTypes = [
                    {
                        name: "Tortas",
                        amount: data[0]
                    },
                    {
                        name: "Pastelería",
                        amount: data[1]
                    },
                    {
                        name: "Masas",
                        amount: data[2]
                    }
                ]; 

                countByCategory.tortas = countTypes[0].amount; 
                countByCategory.pasteleria = countTypes[1].amount; 
                countByCategory.masas = countTypes[2].amount;


                res.status(200).json( {
                    status:200,
                    count: products.length,
                    countByCategory,
                    
                    data: products
                })
            })
        }).catch(error => {res.send({error:'Not found'});})

    },

    listDetails: (req, res) => {
        db.Product.findAll({
            include: ["Type"]
        })
        .then(allProducts =>{
            let data = [];
            //allProducts[0].Type.name

            allProducts.forEach(product => {
                let productx ={
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: {
                        id: product.Type.id, 
                        name: product.Type.name,
                        createdAt: product.Type.createdAt,
                        updatedAt: product.Type.updatedAt
                    },
                    detalle: "techbakers.herokuapp.com/products/productDetails/"+product.id
                }
                data.push(productx);
            });

            res.status(200).json({
                status: 200,
                data
            })
        });
    },

    productDetails : (req, res) => {
        db.Product.findByPk(req.params.id,{
            include : ["Images","Category","Type"]
        })
        .then(data => {
                
                let product = {
                    id: data.id,
                    name: data.name,
                    typeId: data.typeId,
                    type: data.Type.name,
                    price: data.price,
                    discount: data.discount,
                    description: data.description,
                    stock: data.stock,
                    categoryId: data.categoryId,
                    category: data.Category.name,
                    image: `http://localhost:3000/images/products/`+ data.Images[0].fileName
                };
                res.status(200).json( {
                    meta: {
                        status:200,
                        url: "api/products/"+data.id
                    },
                    product
                });
            }).catch(error => {res.send({error: error});})

    },

    lastProduct: (req, res) => {
        let maxid = db.Product.findAll({
            attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxId']]
        });
        Promise.all([maxid])
        .then(maxId =>{
        let idmaxproduct = maxId[0][0].dataValues.maxId;
        db.Product.findByPk(idmaxproduct,{
            include: ["Images"]
        })
        .then(productJoin => {
            let object = productJoin.dataValues;
            let producto = {
                id: object.id,
                name: object.name,
                typeId: object.typeId,
                type: object.Type,
                price: object.price,
                discount: object.discount,
                image: `http://localhost:3000/images/products/`+ object.Images[0].fileName,
                description: object.description,
            };
            
            res.status(200).json( {
                status:200,
                producto,
                detalle: "api/products/"+object.id,
                
            });
        })
    }
 )}

}

module.exports = productController;