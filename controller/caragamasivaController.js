const path = require('path')
const fs = require('fs')


exports.CargaMasivaCSV = async (req, res) =>{

    const filename = req.file?.originalname ?? 'importador';
    const file_name =path.parse(filename).name;
    const fileExtension = path.parse(filename).ext;
    const ruta_archivo = path.join(__dirname, `../public/uploads_Excel/${file_name}/${file_name}${fileExtension}`);

    //*Validar si el archivo es csv

    if(!req.file?.originalname || file_name.match(/\.(csv)$/)){
        res.sendStatus(400).json({msg: 'El archivo no es un .csv o no existe!'})
    }

    //*leer el archivo csv
    let csv_data = fs.readFileSync(ruta_archivo, {encoding: 'utf-8'});

    //*Convertir el archivo csv en json
    const array_data = csv_data.toString().split("\n");

    let json_object = [];

    let headers = array_data[0].split(",")

    headers = headers.map((item) => item.replace(/\s/g, ''));

    const funcionCompararHeaders = (array_entrada) => {
        let arrayComparar = [
            "carnet",
            "nombres",
            "apellidos",
            "carrera",
            "facultad",
            "campus",
            "frase_emotiva",
            "telefono_graduado",
            "correo_graduado",
            "year_graduado",
            "destacado_graduado",
            "qr_graduado"
        ];

        let arr1 = array_entrada.toString();
        let arr2 = arrayComparar.toString();

        if (arr1 === arr2){
            return true;
        }else{
            return false;
        }

    }
    
    if(funcionCompararHeaders(headers) === false){
        res.status(400).json({msg: 'El archivo no posee los headers correctos!', headers});
    }else if(funcionCompararHeaders(headers) === true){
        //*Recorrer el array y crear un objeto de tipo json
        for(let i=1; i<array_data.length; i++){

            //*Obtener datos de cada linea
            let data = array_data[i].split(",");

            //*Validar la longitud de los datos
            if(data.length !== headers.length){
                console.error(`Line ${i} no es valida`)
                continue;
            }

            let objeto_fila = {};

            for(let j=0; j < data.length; j++){
                if(data[j].trim() !== '""'){
                    objeto_fila[headers[j].trim()] = data[j].trim();
                }
            }

            json_object.push(objeto_fila)
        }

        //*Inicio de formateo en los datos
        try {

            res.json(json_object)
            
        } catch (error) {
            res.sendStatus(500).json({msg: error.message});
        }
    }
}