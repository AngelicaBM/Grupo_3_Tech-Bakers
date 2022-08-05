// Acá nos falta express y el router
const express = require('express');
const router = express.Router();
const path= require('path')

const multer = require('multer');

const {body} = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/avatars');
    },
    filename: (req, file, cb)  => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, fileName);
    }
});

const uploadFile = multer({storage});

// Aća nos falta traer el controller
const userController = require('../controllers/userController');
const validations = [
    body('nombre').notEmpty().withMessage('Por favor ingrese su nombre.'),
    body('apellido').notEmpty().withMessage('Por favor ingrese su apellido.'),
    body('email').notEmpty().withMessage('Por favor introduzca un correo electrónico.'),
    body('telefono').notEmpty().withMessage('Por favor introduzca un telefono de contacto.'),
    body('direccion').notEmpty().withMessage('Indique su direccion'),
    body('ciudad').notEmpty().withMessage('Indique su ciudad'),
    body('password').notEmpty().withMessage('Escriba una contraseña'),
    body('repetirpassword').notEmpty().withMessage('Repita su contraseña'),
    body('image')
        .custom((value, { req }) => {
            // let file = req.file;
            let { file } = req;

            if (!file) {
                throw new Error('Tienes que subir una imagen');
            }

            let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
            let fileExtension = path.extname(file.originalname);

            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}');
            }

            return true;
        })
]

// Acá definimos las rutas
router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/register', uploadFile.single('avatar'), validations, userController.processRegister);

// Acá exportamos el router
module.exports = router;