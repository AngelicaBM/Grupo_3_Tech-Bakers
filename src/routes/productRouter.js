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
const jerarquiaMiddleware = require("../middleware/jerarquiaMiddleware");
const productCreateValidation = require('../middleware/productCreateValidation');
const productEditValidation = require('../middleware/productEditValidation');
const authMiddleware = require("../middleware/authMiddleware");

// Acá definimos las rutas
/*** GET ALL PRODUCTS ***/ 
router.get('/', productController.products);
router.get('/pasteleria', productController.pasteleria);
router.get('/masas', productController.masas);
router.get('/tortas', productController.tortas);
router.get('/productCart',authMiddleware, productController.productCart);

/*** SEARCG ONE PRODUCT BY NAME ***/ 
router.get('/buscar', productController.search);

/*** GET ONE PRODUCT ***/ 
router.get('/productDetails/:id', productController.productDetails);

//CRUD de Products
/*** CREATE ONE PRODUCT ***/ 
router.get('/productedit',jerarquiaMiddleware, productController.productedit);
router.get('/create', jerarquiaMiddleware,productController.create);
// array() para subir muchos archivos
router.post('/create', upload.array('image'), productCreateValidation, productController.store);


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', jerarquiaMiddleware, productController.edit);
router.put('/edit/:id', upload.single('image'), productEditValidation, productController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productController.delete); 

/*** DELETE OR ADD PROUDCTCART***/ 
router.post("/addToCart/:id", authMiddleware, productController.addToCart);
router.delete("/deleteFromCart/:id", authMiddleware, productController.deleteFromCart);


// Acá exportamos el router
module.exports = router;