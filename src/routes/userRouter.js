// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Middlewares
// multer
const middlemulter = require("../middleware/middlemulter");
const upload = middlemulter("avatars", "Avatar");

// Express-Validator
const userRegisterValidation = require("../middleware/userRegisterValidation");
const userLoginValidator = require("../middleware/userLoginValidator");

// Controllers
const userController = require('../controllers/userController');

// ACÁ DEFINIMOS LAS RUTAS

// rutas para registrar usuarios
router.get('/register', userController.register);
router.post('/register', upload.single('avatar'), userRegisterValidation, userController.processRegister);

// rutas para login de usuarios
router.get('/login', userController.login);
router.post('/login', userLoginValidator, userController.processLogin);

// Acá exportamos el router
module.exports = router;