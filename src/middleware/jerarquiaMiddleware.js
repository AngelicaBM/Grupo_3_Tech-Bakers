jerarquiaMiddleware = function (req,res,next){
    if( !(req.session.userLogged && req.session.userLogged.roleId == 1) ) {
        return res.redirect('/')
    }
    next();
};
module.exports = jerarquiaMiddleware;