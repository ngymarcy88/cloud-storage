'use strict';

import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './api/routes/auth';
//import fileRoutes from './api/routes/file';

import router from './api/routes/index'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

mongoose.connect('mongodb://localhost:27017/cloud-storage')
  .then(() => console.log('Connected to MongoDB!'));

app.use(express.json());

app.use('/api/users', authRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
