let db = require("../dataBase/models");

function userLoggedMiddleware (req, res, next) {
  //si la coockie y el email existe, se toma y busca usuario
  if (req.cookies.userEmail) {
    db.User.findOne({
      where: {
        email: req.cookies.userEmail,
      },
    }).then((userFromCookie) => {

      if (userFromCookie) {
        req.session.userLogged = userFromCookie
      }

      if (req.session.userLogged) {

        res.locals.isLogged = true

        res.locals.userLogged = req.session.userLogged
      } else {
        res.locals.isLogged = false
      }

      next()
    })

  } else {

    if (req.session.userLogged) {

      res.locals.isLogged = true

      res.locals.userLogged = req.session.userLogged
    } else {

      res.locals.isLogged = false
    }

    next()
  }
}

module.exports = userLoggedMiddleware;
