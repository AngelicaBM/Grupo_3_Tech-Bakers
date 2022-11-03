const jerarquiaMiddleware = function (req,res,next){
    if( !(req.session.userLogged && req.session.userLogged.user.roleId === 1) ) {
        return res.redirect('/')
    }
    next();
};

module.exports = jerarquiaMiddleware;