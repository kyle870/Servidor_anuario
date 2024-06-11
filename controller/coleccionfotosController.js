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
        req.body.fotos_graduaciones = rutasFotos;

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

        const {campus, year, sesion} = req.params;
    try{
        const fotosGraduaciones = await ColeccionGraduacion.find({campus, year_graduacion: year, sesion });

        let ruta_imagen = path.join(__dirname,`../${fotosGraduaciones.fotos_graduacion}`)

        //*Codigo para recorrer el array de imagenes
        let array_imagenes = fotosGraduaciones.map(item=>{
            return item.fotos_graduaciones
        });

        let coleccion_flat = array_imagenes.flat(1)

        let coleccion_ruta_completa = []

        coleccion_flat.forEach(item =>{
            let ruta_imagen = path.join(__dirname,`../${item}`)
            coleccion_ruta_completa.push(ruta_imagen)
        })

        let coleccion_base64 = [];

        coleccion_ruta_completa.forEach(ruta_item =>{
            
            let imagen = fs.readFileSync(ruta_item);
            let imagenBase64 = Buffer.from(imagen).toString('base64');
            let mimeType = path.extname(ruta_imagen).substring(1);

            coleccion_base64.push(`data:image/${mimeType};base64,${imagenBase64}`)

        })

        res.json({coleccion_base64})
        
    }catch(error){
        console.log(error);
    }
};