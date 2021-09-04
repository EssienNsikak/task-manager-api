const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const taskRoutes = require('./routes/taskRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');


const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/v1', taskRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  return next();
});

const MONGO_URL = process.env.MONGO_URL
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true    
  })
  .then(() => console.log('DB Connected Successfully'))
  .catch((err) => {
    console.error(err.message);
  });

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Backend server is running on PORT ${PORT}`);
});