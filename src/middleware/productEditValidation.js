const { body } = require("express-validator");

const path = require("path");

const productEditValidation = [
    body('name')
        .notEmpty().withMessage("No puede estar el campo vacio").bail()
        .isLength({ min: 3 }).withMessage('Debes escribir un nombre de producto con más de 3 caracteres'),
   
    body("type")
    .notEmpty().withMessage("Debe seleccionar un tipo"),

	body('price')
        .notEmpty().withMessage("No puede estar el campo vacio"),
    
    body("category")
    .notEmpty().withMessage("Debe seleccionar una categoría"),

	body('description')
        .notEmpty().withMessage('Debe escribir una descripción').bail()
	    .isLength({ min: 10 }).withMessage('Debe escribir como mínimo 10 caracteres'),

    body('stock')
    .notEmpty().withMessage("No puede estar el campo vacio"),

    body('image').custom((value, { req }) => {
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


module.exports = productEditValidation;