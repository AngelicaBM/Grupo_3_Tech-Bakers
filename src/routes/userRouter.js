const express = require('express');
const router = express.Router();

// Middlewares
// multer
const middlemulter = require("../middleware/middlemulter");
const uploadFile = middlemulter("avatars", "Avatar");

// Express-Validator
const userRegisterValidation = require("../middleware/userRegisterValidation");
const userLoginValidator = require("../middleware/userLoginValidator");
const userEditValidation = require("../middleware/userEditValidation");

// AuthMiddleware y GuestMiddleware
const authMiddleware = require("../middleware/authMiddleware");
const guestMiddleware = require("../middleware/guestMiddleware");

// Controllers
const userController = require('../controllers/userController');

// ACÁ DEFINIMOS LAS RUTAS

// rutas para registrar usuarios
router.get('/register', guestMiddleware, userController.register);
router.post('/register', uploadFile.array('avatar'), userRegisterValidation, userController.processRegister);

// rutas para login de usuarios
router.get('/login', guestMiddleware, userController.login);
router.post('/login', userLoginValidator, userController.processLogin);

// ruta para obtener el perfil del usuario
router.get('/profile/:id', authMiddleware, userController.profile);

// ruta para realizar el logout
router.get("/logout", userController.logout);

// ruta para editar el usuario
router.get("/edit/:id", userController.edit);
router.put("/edit/:id",uploadFile.array('avatar'),  userEditValidation,userController.update);
router.delete('/:id', userController.delete);

// Acá exportamos el router
module.exports = router;
