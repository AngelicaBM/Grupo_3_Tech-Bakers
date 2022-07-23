// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const productController = require('../controllers/productController.js');

// Acá definimos las rutas

router.get('/productCart', productController.productCart);
router.get('/productDetails/:id', productController.productDetails);
router.get('/edit/:id', productController.edit);
router.get('/create', productController.create);

// Acá exportamos el router
module.exports = router;