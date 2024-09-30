import express from 'express';
import pkg from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connect } from 'mongoose';
import athleteRoute from './routes/athleteRoute.js';
import investigatorRoutes from './routes/investigator.js';
import dopingFormRoutes from './routes/dopingFormRoutes.js';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const { json, urlencoded } = pkg;

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify the allowed methods
  credentials: true, // Allow credentials if needed
  optionsSuccessStatus: 204, // For legacy browser support
};

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));

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
