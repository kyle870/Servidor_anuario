const express = require('express');
const router = express.Router();
const CSVController = require("../controller/caragamasivaController")
const Cargamasiva = require("../Middleware/cargaGenerica")

router.post('/subir_csv', Cargamasiva.single('file'), CSVController.CargaMasivaCSV )

module.exports = router;