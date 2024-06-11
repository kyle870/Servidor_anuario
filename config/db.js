const mongoose = require( 'mongoose' );
const dotenv = require('dotenv').config();

const conectarDB = async () => {

    try{
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Conexión a la BD exitosa');
    }catch(error){
        console.log(error);
        process.exit(1); //Detemos la aplicación
    }

}

module.exports = conectarDB
