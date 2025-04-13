const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

const projectRoot = path.join(__dirname, '..');
const htmlPath = path.join(projectRoot, 'html');
const osHtmlPath = path.join(htmlPath, 'OS');
const resourcePath = path.join(projectRoot, 'resource');
const jsPath = path.join(projectRoot, 'js');
const imagePath = path.join(projectRoot, 'img');
const cssPath = path.join(projectRoot, 'css');

app.use(express.static(htmlPath));
app.use('/OS', express.static(osHtmlPath));
app.use('/js', express.static(jsPath));
app.use('/img', express.static(imagePath));
app.use('/css', express.static(cssPath));
app.use(express.json());

app.get('/', (req, res) => {
    const indexPath = path.join(htmlPath, 'index.html');
    console.log('Отправка index.html:', indexPath);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Ошибка при отправке index.html:', err);
            res.status(404).send('Главная страница не найдена');
        }
    });
});

app.get('/os/:filename', async (req, res) => {
    const allowedFiles = [
        'Android OS.html', 
        'Bada OS.html', 
        'iPhone OS.html', 
        'Symbian OS.html'
    ];
    
    const filename = req.params.filename;
    
    if (!allowedFiles.includes(filename)) {
        return res.status(403).send('Доступ запрещен');
    }

    try {
        const filePath = path.join(osHtmlPath, filename);
        console.log('Отправка файла ОС:', filePath);
        const data = await fs.readFile(filePath, 'utf-8');
        res.send(data);
    } catch (err) {
        console.error('Ошибка загрузки файла ОС:', err);
        res.status(404).send('Файл ОС не найден');
    }
});

app.get('/resources/:filename', async (req, res) => {
    const allowedFiles = [
        'Android OS.json', 
        'Bada OS.json', 
        'iPhone OS.json', 
        'Symbian OS.json'
    ];
    
    const filename = req.params.filename;
    
    if (!allowedFiles.includes(filename)) {
        return res.status(403).send('Доступ запрещен');
    }

    try {
        const filePath = path.join(resourcePath, filename);
        console.log('Отправка JSON:', filePath);
        const data = await fs.readFile(filePath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Ошибка загрузки JSON:', err);
        res.status(404).send('JSON файл не найден');
    }
});

app.get('/company_info', async (req, res) => {
    try {
        const filePath = path.join(projectRoot, 'text', 'company_info.txt');
        const data = await fs.readFile(filePath, 'utf-8');
        res.send(data);
    } catch (err) {
        console.error('Error loading company info:', err);
        res.status(404).send('Company information not available');
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Корневая директория:', projectRoot);
    console.log('Путь к HTML:', htmlPath);
    console.log('Путь к OS HTML:', osHtmlPath);
    console.log('Путь к ресурсам:', resourcePath);
    console.log('Путь к медиа:', imagePath);
});