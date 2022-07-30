// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const productController = require('../controllers/productController.js');
const upload = require('../middleware/middlemulter')

// Acá definimos las rutas

router.get('/', productController.products);
router.get('/pasteleria', productController.pasteleria);
router.get('/masas', productController.masas);
router.get('/tortas', productController.tortas);
router.get('/productedit', productController.products);

router.get('/productCart', productController.productCart);
router.get('/productDetails/:id', productController.productDetails);
router.get('/edit/:id', productController.edit);
router.put('/edit/:id', upload.array('image'), productController.update); 

router.get('/create', productController.create);
router.post('/', upload.array('image'), productController.store);
router.delete('/delete/:id', productController.destroy); 


// Acá exportamos el router
module.exports = router;