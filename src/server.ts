import Express, { Router } from 'express';
import connectMongo from './config/dbMongo';
import router from './routers/taskRoutes'; 
import cors from 'cors';

connectMongo()

const cors=require('cors')

// Create an Express server
const server = Express();

// Middleware
server.use(Express.json());
server.use(cors({ origin: 'http://localhost:3000' }))

server.use('/api/lista',router)

server.get('/', (req, res) => {
    res.json('REST API')
})
export default server;