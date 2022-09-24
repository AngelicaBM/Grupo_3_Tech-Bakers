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
                            msg : 'Este email ya está registrado'
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
                    fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatars/'+req.file.filename))
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

    processLogin: async (req,res) => {
        try {
            const errores = validationResult(req);
            if(!errores.isEmpty()){
                return res.render('users/login',{errors : errores.mapped(), oldData : req.body});
            }
            let user = await User.findOne({where:{'email' : req.body.email}});
               if (user && (bcrypt.compareSync(req.body.password, user.password))) {
                delete user.password; 
                req.session.userLogged = user;
                if(req.body.rememberUser) {
                    res.cookie('userEmail', req.body.username, { maxAge: 1000 * 60 * 60 });
                }
                                return res.redirect('/users/profile');
            } else {
                let errores = {
                    username : {
                        msg: 'Este email no se encuentra en nuestra base de datos'
                    },
                    password : {
                        msg: 'Las credenciales son inválidas'
                    }
                }
                delete req.body.password;
                return res.render('users/login',{errores , oldData : req.body});
            };
        } catch (error) {
            res.json(error.message)
        }
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
            return res.redirect('/');
        }
    }


module.exports = userController;