const express = require('express');
const conectarDB = require('./config/db');
const cors = require( 'cors' );
const multer = require('multer');
const path = require('path');

//Inicializacion
const app = express();

app.use(cors());

app.use(express.json());//Habilitamos el uso del formato JSON en las solicitudes
app.use(express.static('public')); //Establecemos la carpeta public para acceder a las imagenes

//Conexion con mongoDB
conectarDB()

app.use('/api/agregar_graduados', require('./routes/agregar_graduados'));


//Definimos ruta principal
app.listen(4000, () =>{
    console.log('El servidor esta corriendo perfectamente');
})