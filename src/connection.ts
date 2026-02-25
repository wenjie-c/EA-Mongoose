import mongoose from "mongoose";

await mongoose.connect('mongodb://127.0.0.1:27017/ea_mongoose');

const cnx = mongoose.connection;
cnx.on('connected',()=>{
    console.log('Conexion correcta a MongoDB');
});
cnx.on('error',()=>{
    console.log('Error en la conexion a MongoDB')
});

export default mongoose;