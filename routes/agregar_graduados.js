const express = require('express');
const router = express.Router();
const GraduadosController = require('../controller/graduadoController');
const subirImagen = require("../Middleware/Storage");

router.post('/', subirImagen.single('foto_graduado'), GraduadosController.agregarGraduado);
router.get('/', GraduadosController.obtenerGraduados);
router.put('/:id', subirImagen.single('foto_graduado'), GraduadosController.actualizarGraduado);
router.get('/:id', GraduadosController.obtenerGraduado);
router.delete('/:id', GraduadosController.eliminarGraduado);

module.exports = router;
