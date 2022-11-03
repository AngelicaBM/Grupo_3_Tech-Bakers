let db = require("../dataBase/models");
const { User, Photo } = require("../dataBase/models");


async function userLoggedMiddleware(req, res, next) {
  //si la cookie y el email existe, se toma y busca usuario
  if (req.cookies.userEmail) {
    const user = await User.findOne({
      where: {
        email: req.cookies.userEmail,
      },
    });

    if (user) {
      const avatar = await Photo.findOne({
        where: {
          userId: user.id,
        },
      });
      req.session.userLogged = { user, avatar };
    }

    if (req.session.userLogged) {
      res.locals.isLogged = true;

      res.locals.userLogged = req.session.userLogged;
    } else {
      res.locals.isLogged = false;
    }

    next();
  } else {
    if (req.session.userLogged) {
      res.locals.isLogged = true;

      res.locals.userLogged = req.session.userLogged;
    } else {
      res.locals.isLogged = false;
    }

    next();
  }
}

module.exports = userLoggedMiddleware;
