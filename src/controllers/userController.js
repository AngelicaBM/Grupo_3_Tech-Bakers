const path = require("path");
const fs = require("fs");
const {validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const universalModel = require('../model/universalModel.js');
const userModel = universalModel("users");
const { User, Role } = require('../dataBase/models');
const db = require('../dataBase/models');

const userController = {

    register: (req, res) => {

        return res.render('users/register');
    },

    processRegister: async (req,res) => {
        try {
            let newUser = req.body;
            let errores = validationResult(req);
            if (errores.isEmpty()) {
                if (await User.findOne({where:{'email' : req.body.email}})){

                    if(req.file){
                        const filePath = path.join(__dirname, `../../public/images/avatars/${file.filename}`);
                        fs.unlinkSync(filePath);
                    }

                    let errores = {
                        email : {
                            msg : 'Email existente'
                        }
                    }

                    delete req.body.password
                    delete req.body.repetirpassword;
                    res.render('users/register',{errores , oldData: req.body});
                } else {

                    newUser.image = req.file?.filename ? req.file.filename : 'default-user.png';
                    newUser.password = bcrypt.hashSync(newUser.password,10);
                    await User.create({
                        ...newUser
                    })
                    res.redirect('/users/login');
                }

            } else {

                if (req.file) {
                    fs.unlinkSync(path.resolve(__dirname, '../../public/images/users/'+req.file.filename))
                };

                delete req.body.password;
                delete req.body.repetirpassword;
                res.render('users/register',{errors : errores.mapped(), oldData: req.body});

            };

        } catch (error) {
            res.json(error.message);
        }
        
    },

        login: (req, res) => {
            return res.render('users/login');
        },

        processLogin: (req, res) => {
            
            const errores = validationResult(req)

            if(!errores.isEmpty()){
                return res.render('users/login', {
                    errors: errores.mapped(),
                    oldData: req.body
                })
            }

            const usuarioRegistrado = userModel.findFirstByField("email", req.body.email);

            if(!usuarioRegistrado){
                const error = {
                    email: {
                        msg: "Este email no se encuentra en nuestra base de datos"
                    }
                }
                return res.render('users/login', {
                    errors: error,
                    oldData: req.body
                })
            }

            const passwordCoincide = bcrypt.compareSync(req.body.password, usuarioRegistrado.password );

            if(!passwordCoincide){
                const error = {
                    password: {
                        msg: "Las credenciales son inválidas"
                    }
                }
                return res.render('users/login', {
                    errors: error,
                    oldData: req.body
                })
            }

            delete usuarioRegistrado.password;
            req.session.userLogged = usuarioRegistrado;
            if(req.body.rememberUser){
                res.cookie("userEmail", req.body.email, { maxAge: 60 * 1000 * 60 * 24 * 30 })
            }
            return res.redirect('/users/profile');
        },

        profile: (req, res) => {
            // return res.render('./users/profile', {
            // 	user: req.session.usuarioLogueado
            // });

            return res.render('./users/profile');
        },

        logout: (req, res) => {
            res.clearCookie('userEmail');
            req.session.destroy();
            // delete req.session.usuarioLogueado
            return res.redirect('/');
        }
    }


module.exports = userController;