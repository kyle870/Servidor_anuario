const express = require('express');
const ColeccionFotosController = require('../controller/coleccionfotosController');
const subirColeccionFotos = require("../Middleware/Storage_Coleccionfotos");
const router = express.Router();


router.post('/coleccion', subirColeccionFotos.array('fotos_graduacion', 200), ColeccionFotosController.agregarColeccionFotos);


router.get('/buscar/imagen/:campus/:year', ColeccionFotosController.verImagenesgraduaciones)

module.exports = router;