const authMiddleware = (req, res, next) => {
    
    if(!req.session.usuarioLogueado && req.session.userLogged.roleId == 1){
        return res.redirect("/users/login");
    }
   
    next()
} 

module.exports = authMiddleware;