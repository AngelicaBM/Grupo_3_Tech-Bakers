// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const productController = require('../controllers/productController.js');

// ************ Middlewares Require & Configuration ************
// Multer
const multerMiddleware = require('../middleware/middlemulter.js');
const upload = multerMiddleware('products', 'Product');

// Middlewares de express-validator
const productCreateValidation = require('../middleware/productCreateValidation');
const productEditValidation = require('../middleware/productEditValidation');

// Acá definimos las rutas
/*** GET ALL PRODUCTS ***/ 
router.get('/', productController.products);

router.get('/pasteleria', productController.pasteleria);
router.get('/masas', productController.masas);
router.get('/tortas', productController.tortas);
router.get('/productedit', productController.productedit);
router.get('/productCart', productController.productCart);


/*** CREATE ONE PRODUCT ***/ 
router.get('/create',productController.create);
// array() para subir muchos archivos
router.post('/', upload.array('image'), productCreateValidation, productController.store);

/*** GET ONE PRODUCT ***/ 
router.get('/productDetails/:id', productController.productDetails);

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productController.edit);
router.put('/edit/:id', upload.array('image'), productEditValidation, productController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productController.destroy); 


// Acá exportamos el router
module.exports = router;