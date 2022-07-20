// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const productController = require('../controllers/productController.js');

// Acá definimos las rutas

router.get('/productCart', productController.productCart);
router.get('/productDetails', productController.productDetails);
// router.get('/editProduct', productController.editProduct);
// router.get('/addProduct', productController.addProduct);

// Acá exportamos el router
module.exports = router;