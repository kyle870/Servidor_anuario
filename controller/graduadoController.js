const GraduadoEstudent = require("../models/GraduadoEstudent");


exports.agregarGraduado = async (req,res) => {
    try {
        // Comprueba si todos los campos requeridos están presentes
        const { carnet, nombres, apellidos, carrera, facultad, campus, year_graduado, estado_graduado, destacado_graduado, qr_graduado } = req.body;
        if (!carnet || !nombres || !apellidos || !carrera || !facultad || !campus || !year_graduado || estado_graduado === undefined
            || destacado_graduado === undefined || !qr_graduado) {
            return res.status(400).json({msg: "Todos los campos requeridos deben estar presentes"});
        }

        // Crea el nuevo graduado
        let graduado = new GraduadoEstudent({...req.body, foto_graduado: '/uploads/' + req.file.filename});
        
        await graduado.save();
        res.send(graduado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerGraduado = async (req,res) => {


    try {

        const graduados = await GraduadoEstudent.find();
        res.json(graduados)

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarGraduado = async (req, res) =>{

    try {

        const { carnet, nombres, apellidos, carrera, facultad, campus, frase_emotiva, year_graduado,
            estado_graduado, destacado_graduado, foto_graduado, qr_graduado } = req.body;
        let graduado = await GraduadoEstudent.findById(req.params.id);

        if (!graduado){
            return res.status(400).jason({msg: "No existe el graduado"});
        } 

        graduado.carnet = carnet;
        graduado.nombres = nombres;
        graduado.apellidos = apellidos;
        graduado.carrera = carrera;
        graduado.facultad = facultad;
        graduado.campus = campus;
        graduado.frase_emotiva = frase_emotiva;
        graduado.year_graduado = year_graduado;
        graduado.estado_graduado = estado_graduado;
        graduado.destacado_graduado = destacado_graduado;
        graduado.foto_graduado = foto_graduado;
        graduado.qr_graduado = qr_graduado;

        graduado = await GraduadoEstudent.findOneAndUpdate({ _id: req.params.id}, graduado, {new: true})
        res.json(graduado)

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 


exports.obtenerGraduados = async (req, res) =>{

    try {

        let graduado = await GraduadoEstudent.findById(req.params.id);

        if (!graduado){
            return res.status(400).jason({msg: "No existe el graduado"});
        } 

        res.json(graduado)

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 

exports.eliminarGraduado = async (req, res) =>{

    try {

        let graduado = await GraduadoEstudent.findById(req.params.id);

        if (!graduado){
            return res.status(400).jason({msg: "No existe el graduado"});
        } 

        await GraduadoEstudent.findOneAndDelete({ _id: req.params.id })
        res.json({msg: 'El graduado a sido eliminado con exito'})

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
} 