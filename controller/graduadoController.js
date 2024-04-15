const multer = require('multer');
const subirImagen = require("../Middleware/Storage");
const Graduado = require("../models/GraduadoEstudent");

exports.agregarGraduado = async (req, res) => {
    try {
        let graduado;

        // Si hay una imagen, añadir la ruta de la imagen al cuerpo de la solicitud
        if (req.file) {
            req.body.foto_graduado = req.file.path;
        }

        graduado = new Graduado(req.body)

        await graduado.save();
        res.send(graduado);
    } catch (error) {
        console.error("Error al agregar graduado:", error);
        res.status(500).json({ msg: 'Hubo un error al agregar graduado' });
    }
};


exports.obtenerGraduados = async (req, res) => {

    try {

        const graduados = await Graduado.find();
        res.json(graduados)


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarGraduado = async (req, res) => {

    try {

        let graduado = await Graduado.findById(req.params.id);

        if (!graduado) {
            return res.status(400).json({ msg: "No existe el graduado" });
        }

        // Si hay una imagen, actualizar la ruta de la imagen en el cuerpo de la solicitud
        if (req.file) {
            req.body.foto_graduado = req.file.path;
        }

        graduado.set(req.body);

        await graduado.save();

        res.json(graduado);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerGraduado = async (req, res) => {

    try {

        let graduado = await Graduado.findById(req.params.id);

        if (!graduado) {
            return res.status(400).json({ msg: "No existe el graduado" });
        }

        res.json(graduado)


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarGraduado = async (req, res) => {

    try {

        let graduado = await Graduado.findById(req.params.id);

        if (!graduado) {
            return res.status(400).json({ msg: "No existe el graduado" });
        }

        await Graduado.findOneAndDelete({ _id: req.params.id })
        res.json({ msg: 'El graduado a sido eliminado con exito' })


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
