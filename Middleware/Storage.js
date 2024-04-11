const multer = require("multer");

const guardarImagen = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req,file,cb) => {
        if(file !== null){
            const ext = file.originalname.split('.').pop();
            cb(null, Date.now() + '.'+ext);
        }
    }
});

const filtroImagen = (req, file, cb) => {
    if(file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || 
    file.mimetype === 'image/png' )) {
        cb(null, true);
    } else {
        cb(new Error('Archivo no permitido'), false);
    }
};

const subirImagen = multer({ storage: guardarImagen, fileFilter: filtroImagen });

module.exports = { subirImagen };