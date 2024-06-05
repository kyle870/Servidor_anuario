const facultadSchema = new mongoose.Schema({
    nombre_facultad: String,
});

const carreraSchema = new mongoose.Schema({
    nombre_carrera: String,
    facultad: { type: mongoose.Schema.Types.ObjectId, ref: 'Facultad' },
    año: Number,
});

const campusSchema = new mongoose.Schema({
    nombre_campus: String,
    facultades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Facultad' }],
});

const Facultad = mongoose.model('Facultad', facultadSchema);
const Carrera = mongoose.model('Carrera', carreraSchema);
const Campus = mongoose.model('Campus', campusSchema);