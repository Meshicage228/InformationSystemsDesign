const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const lettersRouter = require('../routes/Letter');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

app.use('/api/letters', lettersRouter);

mongoose.connect('mongodb://localhost:27017/lettersDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});