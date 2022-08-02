// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const userController = require('../controllers/userController');

// Acá definimos las rutas
router.get('/login', userController.login);
router.get('/register', userController.register);

// Acá exportamos el router
module.exports = router;