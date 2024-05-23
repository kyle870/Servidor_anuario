const fs = require('fs');
const multer = require('multer');
const subirColeccionFotos = require("../Middleware/Storage_Coleccionfotos");
const ColeccionGraduacion = require("../models/ColeccionGraduacion");
const path = require('path');
const mongoose = require('mongoose');

exports.agregarColeccionFotos = async (req, res) => {
    try {
        // Array para almacenar las rutas de los archivos subidos
        let rutasFotos = [];

        // Si hay archivos, agregar sus rutas al array
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                rutasFotos.push(file.path);
            });
        }

        // Añadir las rutas de las fotos al cuerpo de la solicitud
        req.body.fotos_graduacion = rutasFotos;

        // Verificar que year_graduacion y sesion estén presentes
        const { year_graduacion, sesion } = req.body;

        if (!year_graduacion || !sesion) {
            return res.status(400).json({ msg: 'Los campos year_graduacion y sesion son requeridos' });
        }

        // Crear una nueva instancia del modelo con los datos recibidos
        const graduacion = new ColeccionGraduacion(req.body);

        // Guardar la instancia en la base de datos
        await graduacion.save();

        // Enviar la respuesta con los datos guardados
        res.status(200).send(graduacion);
    } catch (error) {
        console.error("Error al agregar colección de fotos:", error);
        res.status(500).json({ msg: 'Hubo un error al agregar graduado' });
    }
};

exports.verImagenesgraduaciones = async (req, res) => {
    const { campus, year } = req.params;
    try {
        const estudiante = await ColeccionGraduacion.findOne({ campus, year });

        if (!estudiante || !estudiante.fotos_graduacion || estudiante.fotos_graduacion.length === 0) {
            return res.status(404).json({ msg: "No se encontro ninguna foto de las graduaciones" });
        }

        const imagenes = estudiante.fotos_graduacion;
        const imagenesPromesas = imagenes.map(async (imagen) => {
            const ruta_imagen = path.join(__dirname, `../${imagen}`);
            if (!fs.existsSync(ruta_imagen)) {
                return null;
            }
            return fs.promises.readFile(ruta_imagen);
        });

        const imagenesData = await Promise.all(imagenesPromesas);

        if (imagenesData.some((data) => data === null)) {
            return res.status(404).json({ msg: "Algunas fotos de graduación no se encontraron" });
        }

        imagenesData.forEach((data) => {
            res.write(data);
        });

        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};