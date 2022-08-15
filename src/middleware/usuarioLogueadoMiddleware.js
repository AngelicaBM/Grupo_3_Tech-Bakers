const universalModel = require("../model/universalModel");
const userModel = universalModel("users");
const usuarioLogueadoMiddleware = (req, res, next) => {

    res.locals.estaLogueado = false;

    const emailEnCookie = req.cookies.userEmail;
    const usuarioDeLaCookie = userModel.findFirstByField("email", emailEnCookie);

    
    if(usuarioDeLaCookie){
        delete usuarioDeLaCookie.password;
        req.session.usuarioLogueado = usuarioDeLaCookie;
    }

    if(req.session.usuarioLogueado){
        res.locals.estaLogueado = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }

    next();

}

module.exports = usuarioLogueadoMiddleware