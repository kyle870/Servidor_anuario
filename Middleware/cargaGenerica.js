const multer = require ('multer');
const path = require ('path');
const fs = require ('fs');

const storage_generico =  multer.diskStorage({
    destination: function (req, file, cb){

        let nombreArchivo = path.parse(file.originalname).name;
        let nombre_extension = path.parse(file.originalname).ext

        const rutaDeCarga = path.join(__dirname, `../public/uploads_Excel/${nombreArchivo}`)

        fs.mkdirSync(rutaDeCarga, {recursive: true})
        cb(null, rutaDeCarga);
    },

    filename: (req, file, cb) => {
        const originalName = file.originalname;
        cb(null, originalName);
    }
});

const upload_archivo_generico = multer({storage: storage_generico})

module.exports = upload_archivo_generico;