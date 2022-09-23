const guestMiddleware = (req, res, next) => {
    
    if(req.session.userLogged){
        return res.redirect("/users/profile" + req.session.userLogged.id);
    }

    next();
} 

module.exports = guestMiddleware;