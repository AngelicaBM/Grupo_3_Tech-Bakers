const path = require("path");
const fs = require("fs");
const {validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const universalModel = require('../model/universalModel.js');
const userModel = universalModel("users");

const userController = {

    register: (req, res) => {

        return res.render('users/register');
    },

    processRegister: (req, res) => {

            const { file } = req;

            const errores = validationResult(req);

            if(!errores.isEmpty()){
                if(file){
                    const filePath = path.join(__dirname, `../../public/images/avatars/${file.filename}`);
                    fs.unlinkSync(filePath);
                }

                console.log(req.body);

                delete req.body.password;   
                delete req.body.repetirpassword;

                console.log(req.body);

                return res.render('users/register', {
                    errors: errores.mapped(),
                    oldData: req.body,
                })
            }
            const existeEmail = userModel.findFirstByField("email", req.body.email);
            if(existeEmail){
                if(file){
                    const filePath = path.join(__dirname, `../../public/images/avatars/${file.filename}`);
                    fs.unlinkSync(filePath);
                }

                const error = {
                    email: {
                        msg: "Este email ya está registrado"
                    }
                }

                return res.render('users/register', {
                    errors: error,
                    oldData: req.body,
                })
            }

            delete req.body.repetirpassword;

            const newUsuario = {
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
                image: file ? file.filename : "default-user.png"
            };

            userModel.create(newUsuario);

            return res.redirect('/users/login');
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
            req.session.usuarioLogueado = usuarioRegistrado;
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