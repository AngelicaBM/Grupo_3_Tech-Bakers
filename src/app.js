// requerimos express y path
const express = require('express')
const app = express();
const path= require('path');
const methodOverride = require('method-override');
const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');

// Configuración de la app
app.use(express.static(path.join(__dirname, '../public')));

// ************ Middlewares - (don't touch) ************
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "Un mensaje secreto de Pavlova",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);

// Acá falta la configuración de nuestra app para poder usar los template engine...
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
const mainRouter = require('../src/routes/mainRouter.js');
const productRouter = require('../src/routes/productRouter.js');
const userRouter = require('../src/routes/userRouter.js');

// Importar nuestros enrutadores y configurar nuestra app para poder usarlos...
app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

// Definimos el puerto en el que se va a levantar el servidor
const port = process.env.PORT ||3000


app.listen(port, () => console.log(`aplicación funcionando ${port}!`))