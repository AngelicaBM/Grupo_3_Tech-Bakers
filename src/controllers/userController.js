const {validationResult} = require('express-validator');
const { memoryStorage } = require('multer');
const userController = {
    login : (req,res)=>{
        res.render('users/login')
    },

    register : (req,res)=>{
        res.render('users/register')},
    
    processRegister : (req,res)=>{
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(), 
                oldData: req.body
            });
        }
}
}


module.exports = userController;