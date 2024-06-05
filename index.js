const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

//* Inicialización
const app = express();

app.use(express.json({limit:'100mb'}))

app.use(cors());
app.use(bodyParser.json());

app.use(express.json()); //* Habilitamos el uso del formato JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); //* Para procesar form data

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/' ,express.static('public/uploads')); //* Establecemos la carpeta public para acceder a las imágenes
app.use('/',express.static('public/uploads_coleccionfotos'))

//* Conexion con mongoDB
conectarDB()

app.use('/api/agregar_graduados', require('./routes/agregar_graduados'));
app.use('/api/agregar_coleccionfotos', require('./routes/agregar_coleccionfotos'));
app.use('/api/filtro_gallery', require('./routes/filtroFotos'));
app.use('/api/carga_masiva', require('./routes/cargamasiva'));



//* Definimos ruta principal
app.listen(4000, () =>{
    console.log('El servidor esta corriendo perfectamente');
})