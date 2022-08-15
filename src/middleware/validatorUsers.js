// const { body } = require("express-validator")
// const path = require("path");

// const usersValidation = [
//     body('name')
// 		.notEmpty().withMessage("Usamos tu nombre para identificar tus pedidos.").bail()
//     	.isLength({ min: 2 }).withMessage('Debes escribir un nombre de usuario con más de 2 caracteres'),
   
// 	body('email')
// 		.notEmpty().withMessage("Tienes que escribir tu correo.").bail()
// 		.isEmail().withMessage("Debes escribir un correo válido."),
   
// 	body('password')
// 		.notEmpty().withMessage('Debes escribir una contraseña').bail()
// 		.isLength({ min: 8 }).withMessage('Debes escribir una contraseña con más de 8 caracteres'),
    
// 	body('telefono')
// 		.notEmpty().withMessage("tienes que escribir tu números de telefono"),
    
// 	body('persona')
// 		.notEmpty().withMessage("Tienes que elegir una categoría"),
   
// 	body('image')
// 		.custom((value, { req }) => {
// 			// let file = req.file;
// 			let { file } = req;
			
// 			if (!file) {
// 				throw new Error('Tienes que subir una imagen');
// 			}
			
// 			let acceptedExtensions = ['.jpg', '.jpeg', '.png'];
// 			let fileExtension = path.extname(file.originalname);

// 			if (!acceptedExtensions.includes(fileExtension)) {
// 				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
// 			}
			
// 			return true;
// 		})	
// ]

// module.exports = usersValidation;