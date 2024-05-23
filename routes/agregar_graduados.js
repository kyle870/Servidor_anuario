const express = require('express');
const router = express.Router();
const GraduadosController = require('../controller/graduadoController');
const subirImagen = require("../Middleware/Storage");

//Agregar graduado 
router.post('/', subirImagen.single('foto_graduado'), GraduadosController.agregarGraduado);

//Mostrar todos los graduados
router.get('/', GraduadosController.obtenerGraduados);

//Ver Imagen
router.get('/buscar/imagen/:carnet', GraduadosController.verImagengraduado)

//Editar/Actualizar graduado
router.put('/:id', subirImagen.single('foto_graduado'), GraduadosController.actualizarGraduado);

//Mostrar un graduado en especifico
router.get('/:id', GraduadosController.obtenerUngraduado);

//Eliminar graduado
router.delete('/:id', GraduadosController.eliminarGraduado);

// Ruta para mostrar un graduado por carnet
router.get('/buscar/:carnet', GraduadosController.mostrarPorCarnet);

//Guardar datos desde un archivo de excel
router.post('/guardar-desde-excel', GraduadosController.guardarDatosExcel);

// Ruta para filtrar graduados
router.get('/filtrar', GraduadosController.filtrarGraduados);

module.exports = router;