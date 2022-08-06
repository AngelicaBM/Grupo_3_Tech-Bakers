const { body } = require("express-validator");

const userLoginValidator = [
	body('email').notEmpty().withMessage("Tienes que escribir tu correo.").bail()
	.isEmail().withMessage("Debes escribir un correo válido."),
   
	body('password').notEmpty().withMessage('Debes escribir una contraseña').bail()
	.isLength({ min: 4 }).withMessage('Debes escribir una contraseña con más de 4 caracteres')
]

module.exports = userLoginValidator;