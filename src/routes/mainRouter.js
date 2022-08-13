// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const mainController = require('../controllers/mainController.js');

// Acá definimos las rutas
router.get('/', mainController.index);
router.get('/search', mainController.search); 

// Acá exportamos el router
module.exports = router;