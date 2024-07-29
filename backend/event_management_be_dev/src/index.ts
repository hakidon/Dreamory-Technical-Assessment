import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import authRoutes from './routes/authRoutes';
import thumbnailRoutes from './routes/thumbnailRoutes';
import cors from 'cors';

import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
}));

app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', authRoutes);
app.use('/api', thumbnailRoutes);

dotenv.config();

const username: string = process.env.MONGODB_USERNAME || '';
const password: string = process.env.MONGODB_PASSWORD || '';
const uri: string = `mongodb+srv://${username}:${password}@event-management-dev.dw7pzcj.mongodb.net/?retryWrites=true&w=majority&appName=event-management-dev`;

const clientOptions: ConnectOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true }
};


async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB!");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run().catch(console.error);
