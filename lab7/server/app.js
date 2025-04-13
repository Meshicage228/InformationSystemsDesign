const express = require('express');
const mongoose = require('mongoose');
const poemRoutes = require('./routes/poems');
const app = express();

mongoose.connect('mongodb://localhost:27017/poetryDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use(express.json());

app.use('/api/poems', poemRoutes);

app.use(express.static('../client/build'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});