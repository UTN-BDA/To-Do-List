import Express, { Router } from 'express';
import connectMongo from './config/dbMongo';
import router from './routers/taskRoutes'; 
import cors from 'cors';
import mongoSanitizer from 'express-mongo-sanitize';
import adminRouter from './routers/adminRoutes';

connectMongo()

// Create an Express server
const server = Express();

// Middleware
server.use(Express.json());
server.use(mongoSanitizer());
server.use(cors({ origin: 'http://localhost:3000' }))

server.use('/api/lista',router)
server.use('admin',adminRouter)


server.get('/', (req, res) => {
    res.json('REST API')
})
export default server;