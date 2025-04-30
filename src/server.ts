import Express, { Router } from 'express';
import db from './config/db';
import colors from 'colors';
import router from './routers/router';

//Conection to the database
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgBlue.white('Conexion Exitosa a la BD'))
    } catch (error) {
        console.log(error)
        console.log(colors.bgRed.white('Hubo un error al conectar a la BD'))
    }
}

connectDB()

const server = Express();
server.use(Express.json());

server.use('/api/lista',router)

server.get('/', (req, res) => {
    res.json('REST API')
})
export default server;