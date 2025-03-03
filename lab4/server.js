const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const lettersRoutes = require('./server/routes/LetterRoute');
const path = require('path');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/lettersDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './server/views')));

app.use('/api', lettersRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './server/views/index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});