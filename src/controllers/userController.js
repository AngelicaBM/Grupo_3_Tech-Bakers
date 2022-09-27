const path = require("path");
const fs = require("fs");
const {validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const universalModel = require('../model/universalModel.js');
const userModel = universalModel("users");
const { User, Photo, Role } = require('../dataBase/models');
const db = require('../dataBase/models');

const userController = {

    register: (req, res) => {

        return res.render('users/register');
    },

    processRegister: async (req,res) => {
        try {
            let user = req.body;
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                if (await User.findOne({where:{'email' : req.body.email}})){
                    if (req.file) {
                        fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatars/'+req.file.filename))
                    };
                    let errors = {
                        email : {
                            msg : 'Este email ya está registrado'
                        }
                    }
                    delete req.body.password;
                    res.render('users/register',{errors , oldData: req.body});
                } else {                   
                    delete user["repetirpassword"];
                    user.password = bcrypt.hashSync(user.password,10);
                    let fotos= []
                    const userId = await db.User.create(user);
                    for(let i = 0 ; i<req.files.length;i++) {
                        fotos.push({
                            fileName: req.files[i].filename,
                            userId: userId.id
                        })
                    }
                    if (fotos.length > 0) {
                        await db.Photo.bulkCreate(fotos)
                        res.redirect('/')
                    } else {
                        await db.Photo.create([{
                            fileName: 'default-user.png',
                            userId: userId.id
                        }])
                    }
                        res.redirect('/')
                    
                }
            } else {
                if (req.file) {
                    fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatars/'+req.file.filename))
                };
                delete req.body.password;
                res.render('users/register',{errors : errors.mapped(), oldData: req.body});
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
                    return res.redirect('/');
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

    profile: async (req, res) => {
        try {
        const id = req.params.id;
        const photos = await db.Photo.findAll();
        const user = await db.User.findByPk(id, {
            include: [db.Photo]
        })

        if(req.session.userLogged && user.email == req.session.userLogged.email) {
            res.render('users/profile', {user,photos});
        } else {
            res.redirect('/users/login');
        }  

        } catch (error) {
            res.json({error: error.message});
        }

       
    },        
    logout: (req, res) => {
            res.clearCookie('userEmail');
            req.session.destroy();
            return res.redirect('/');
        },
    
     edit: async (req,res) => { 

            try {
                const id = +req.params.id;
                const user = await User.findByPk(id);    
                res.render('users/edit',{user});  
            } catch (error) {
                res.json(error.message);
            }
        },
    
     
    update:async (req,res) => {

        try {

            let idToUpdate = req.params.id;
            const userToUpdate = await User.findByPk(idToUpdate);  
            let errores = validationResult(req);
            if (errores.isEmpty()) {
                const emailVerification = await User.findOne({where: { 'email': req.body.email }})
                if (userToUpdate.email !== req.body.email && emailVerification) {
                    if (req.file) {
                        fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatars/'+req.file.filename))
                    };
                    let errores = {
                        email : {
                            msg : 'Este email ya existe'
                        }
                    }
                    delete req.body.password;
                    return res.render('users/edit',{errores , oldData: req.body, idToUpdate, user:userToUpdate});
                }
                let dataUpdate = req.body;
                dataUpdate.photo = req.file?.filename ? req.file.filename : userToUpdate.photo;
                if (userToUpdate.photo != dataUpdate.photo ) {
                    fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatars/'+userToUpdate.photo));
                };
                if(dataUpdate.password != "") {

                    delete dataUpdate["repetirpassword"];
                    let userUpdate = {
                        ...dataUpdate,
                    }
                    userUpdate.password = bcrypt.hashSync(userUpdate.password,10);
                    await User.update({...userUpdate},{where: {id: idToUpdate}});
                    delete userUpdate.password;
                    userUpdate.id = idToUpdate
                    req.session.userLogged = userUpdate;
                    res.redirect('/');    
                } else {

                    delete dataUpdate["repetirpassword"];
                    dataUpdate.password = userToUpdate.password;
                    let userUpdate = {
                        ...dataUpdate,
                    }
                    await User.update({...userUpdate},{where: {id: idToUpdate}});
                    delete userUpdate.password;
                    userUpdate.id = idToUpdate
                    req.session.userLogged = userUpdate;
                    res.redirect('/');
                }
            } else {
                if (req.file) {
                    fs.unlinkSync(path.resolve(__dirname, '../../public/images/avatars/'+req.file.filename))
                };
                delete req.body.password;
                delete userToUpdate.password;
                res.render('users/edit',{errors: errores.mapped(), oldData : req.body, idToUpdate, user:userToUpdate});
            }
        } catch (error) {
            res.json(error.message)
        }      
    },
    
        delete: function (req, res) {
            let userIdd = req.params.id;
        
            db.User.findByPk(userIdd, {
              include: ["Photos"],
            }).then(() => {
              db.Photo.destroy({
                where: {
                  userId: userIdd,
                },
              }).then(() => {
                db.User.destroy({
                  where: {
                    id: userIdd,
                  },
                }).then(() => {
                  return res.redirect("/");
                });
              });
            });
          },
    
   
    }   

module.exports = userController;


        