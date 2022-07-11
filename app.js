// requerimos express y path
const express = require('express')
const path= require('path');

// guardamos en un constante app la funcionalidad de express()
const app = express()

// definimos el puerto en el que se va a levantar el servidor
const port = 3000

// definimos las rutas para los archivos estáticos(públicos) y otra para las vistas
const viewsPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, 'public');

// Agregamos el middleware para configurar la carpeta de archivos estáticos
app.use(express.static(publicPath));

// Definimos la ruta que responda a GET "/" con la vista home.html
app.get('/', (req, res) => res.sendFile(path.join(viewsPath, 'index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(viewsPath, 'register.html')));
app.get('/login', (req, res) => res.sendFile(path.join(viewsPath, 'login.html')));
app.get('/product', (req, res) => res.sendFile(path.join(viewsPath, 'productDetails.html')));
app.get('/carrito', (req, res) => res.sendFile(path.join(viewsPath, 'carrito.html')));

// Levantamos el servidor con app.listen(port)
app.listen(process.env.PORT ||3000, () => console.log(`Servidor corriendo en el puerto ${port}!`))