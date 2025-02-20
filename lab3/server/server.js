const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../')));

app.get('/', (req, res) => {
    res.redirect('/html/index.html');
});

app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/result.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});