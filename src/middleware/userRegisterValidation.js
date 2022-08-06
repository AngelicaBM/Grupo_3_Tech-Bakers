const {body} = require('express-validator');
const path= require('path')

const userRegisterValidation = [
    
    body('nombre').notEmpty().withMessage('Por favor ingrese su nombre.').bail()
    .isLength({ min: 2 }).withMessage("El nombre debe contener al menos 2 caracteres"),
    
    body('apellido').notEmpty().withMessage('Por favor ingrese su apellido.').bail()
    .isLength({ min: 2 }).withMessage("El nombre debe contener al menos 2 caracteres"),
    
    body('email').notEmpty().withMessage('Por favor introduzca un correo electrónico.').bail()
    .isEmail().withMessage("El formato de correo no es válido"),
    
    body('telefono').notEmpty().withMessage('Por favor introduzca un telefono de contacto.'),
    
    body('direccion').notEmpty().withMessage('Indique su direccion'),
    
    body('ciudad').notEmpty().withMessage('Indique su ciudad'),
    
    body('password').notEmpty().withMessage('Escriba una contraseña').bail()
    .isLength({ min: 4 }).withMessage("La contraseña debe contener al menos 8 caracteres").bail()
    .custom((value, { req }) => {

        if(value != req.body.repetirpassword){
            throw new Error('Las contraseñas no coinciden');
        }
        
        return true;
    }),
    
    body('repetirpassword').notEmpty().withMessage('Repita su contraseña').bail()
    .isLength({ min: 4 }).withMessage("La contraseña debe contener al menos 8 caracteres"),
    
    body('avatar')
    .custom((value, { req }) => {
        // const files = req.files; // La linea de abajo hace lo mismo
        const { file } = req;

        if(file){
            const acceptedExtensions = [".png", ".jpg", ".jpeg"];

            const fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Los formatos de imagen validos son ${acceptedExtensions.join(', ')}`);
            }
        }   
        
        return true; 
    })

]

module.exports = userRegisterValidation;