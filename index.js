const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Inicialización
const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json()); // Habilitamos el uso del formato JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Para procesar form data
app.use(express.static('public')); // Establecemos la carpeta public para acceder a las imágenes

//Conexion con mongoDB
conectarDB()

app.use('/api/agregar_graduados', require('./routes/agregar_graduados'));


//Definimos ruta principal
app.listen(4000, () =>{
    console.log('El servidor esta corriendo perfectamente');
})