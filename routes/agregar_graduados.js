const { subirImagen } = require('../Middleware/Storage');
const express = require('express');
const router = express.Router();
const GraduadosController = require('../controller/graduadoController');

router.post('/', subirImagen.single('foto_graduado'), GraduadosController.agregarGraduado);
router.get('/', GraduadosController.obtenerGraduado);
router.put('/:id', GraduadosController.actualizarGraduado);
router.get('/:id', GraduadosController.obtenerGraduados);
router.delete('/:id', GraduadosController.eliminarGraduado);

module.exports = router;
