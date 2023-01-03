import mongoose from 'mongoose';

mongoose.set("strictQuery", false);

export const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL || '');
        console.log('Database connection established');
    } catch (err) {
        console.log("Database connection error");
    }
};
