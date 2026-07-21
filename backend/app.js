const dns = require('dns');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const tasksRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Connection error:', err));

app.use(cors({
    origin: [
        //'http://localhost:3000',    //local React dev
        'https://task-manager-sana-fatima.vercel.app'    //deployed frontend (add after deploy)
    ],
    credentials: true
}));
app.use(logger);

app.use('/tasks', tasksRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

module.exports = app;