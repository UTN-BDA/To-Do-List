import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log(colors.bgWhite('Conectado a MongoDB'));
    } catch (err) {
        console.error('❌ Error al conectar a MongoDB:', err);
        process.exit(1);
    }
};

export default connectMongo;
