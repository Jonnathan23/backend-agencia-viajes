import express from 'express';
import cors from 'cors';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import db from './config/db';
import { corsConfig } from './config/cors';
import router from './routers/router';

dotenv.config()

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexion exitosa a la BD'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Error al conectar a la BD'))
    }
}

connectDB()
const server = express();

server.use(cors(corsConfig))

server.use(morgan('dev'))
server.use(express.json());

server.use('/api/travels', router)


export default server;