// Express
import express from 'express';

// Dotenv
import 'dotenv/config.js';

// CORS
import cors from 'cors';

// db config
import { dbConnection } from './database/config';

// Routes
import authRouter from './routes/auth';

const app = express();

dbConnection();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// CORS
app.use(cors(corsOptions));

// Public folder
app.use(express.static('public'));

// Body parser
app.use(express.json());

// Routes
// Auth
app.use('/api/auth', authRouter);

// Port
app.listen(4000, () => {
  console.log('App listening on port 4000!');
});
