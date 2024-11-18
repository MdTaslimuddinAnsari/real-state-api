import "dotenv/config";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes (You can define your routes here)

app.use('/', authRoutes);

// Start server
const port = 5000;
app.listen(port, () => console.log(`App is listening on port ${port}`));
