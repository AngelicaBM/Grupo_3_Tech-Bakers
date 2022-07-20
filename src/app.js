// requerimos express y path
const express = require('express')
const path= require('path');
const mainRouter = require('../src/routes/mainRouter.js');
const productRouter = require('../src/routes/productRouter.js');
const userRouter = require('../src/routes/userRouter.js');

// guardamos en un constante app la funcionalidad de express()
const app = express()

// definimos el puerto en el que se va a levantar el servidor
const port = 3000

// Configuración de la app
app.use(express.static(path.join(__dirname, '../public')));

// Acá falta la configuración de nuestra app para poder usar los template engine...
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Acá falta importar nuestros enrutadores y configurar nuestra app para poder usarlos...
app.use('/', mainRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

// Levantamos el servidor con app.listen(port)
app.listen(process.env.PORT ||3000, () => console.log(`Servidor corriendo en el puerto ${port}!`))