const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const todosRoutes = require('./routes/todosRoutes');

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todosRoutes);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });

app.listen(PORT, () => {
  console.log(`Server is on: http://localhost:${PORT}`);
});
