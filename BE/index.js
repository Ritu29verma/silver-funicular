import express from 'express';
import pkg from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connect } from 'mongoose';
import athleteRoute from './routes/athleteRoute.js';
import investigatorRoutes from './routes/investigator.js';
import dopingFormRoutes from './routes/dopingFormRoutes.js'
import dotenv from "dotenv";
dotenv.config();


import cors from 'cors'

const app = express();
const { json, urlencoded } = pkg;
// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors())

// Connect to MongoDB
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Static folder for file uploads
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Routes
app.use('/api/athletes', athleteRoute);
app.use('/api/investigators', investigatorRoutes);
app.use('/api/doping-form', dopingFormRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
