const db = require('../../dataBase/models');

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
                ]
                res.status(200).json( {
                    meta: {
                        status:200,
                        total: products.length,
                        countByType: countTypes,
                    },
                    products
                })
            })
        }).catch(error => {res.send({error:'Not found'});})

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
            }).catch(error => {res.send({error:'Not found'});})

    }
}


module.exports = productController;