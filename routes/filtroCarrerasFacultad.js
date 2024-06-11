const express = require('express');
const router = express.Router();
const Data = require('../models/Facultad_Carreras');

// Obtener datos filtrados
router.get('/:year/:campus/:faculty/:career', async (req, res) => {
    const { year, campus, faculty, career } = req.params;
    console.log('Parámetros recibidos:', { year, campus, faculty, career });

    let filter = {};
    if (year) filter.year = parseInt(year);
    if (campus) filter.campus = decodeURIComponent(campus); // Decodificar el componente URI
    if (faculty) filter.faculty = decodeURIComponent(faculty); // Decodificar el componente URI
    if (career) filter.career = decodeURIComponent(career); // Decodificar el componente URI

    console.log('Usando filtro:', filter);

    try {
        const data = await Data.find(filter);
        console.log('Datos encontrados:', data);
        res.json(data);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
