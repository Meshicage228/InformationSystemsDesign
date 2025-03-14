const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const dataDir = path.join(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

app.post('/save', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    const filePath = path.join(dataDir, 'data.json');

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            return res.status(500).send('Ошибка при сохранении данных');
        }
        res.send('Данные успешно сохранены');
    });
});

app.get('/load', (req, res) => {
    const filePath = path.join(dataDir, 'data.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при загрузке данных');
        }
        res.json(JSON.parse(data));
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});