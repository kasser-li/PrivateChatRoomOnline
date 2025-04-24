import app from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
dotenv.config();
(async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await connectDB();
    app.listen(process.env.PORT || 8099, () => {
      // console.log(`Server running on http://localhost:${process.env.PORT || 8099}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
