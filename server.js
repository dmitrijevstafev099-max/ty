const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 🔓 Разрешаем запросы с твоего фронта
app.use(cors({
  origin: 'http://127.0.0.1:5500', // можно '*' для тестов
}));

app.get('/', (req, res) => {
  res.send('Сервер работает! Попробуй GET /data');
});

app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).json({ error: 'Не удалось прочитать файл' });
    }

    try {
      const jsonData = JSON.parse(fileData);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Ошибка парсинга JSON:', parseErr);
      res.status(500).json({ error: 'Некорректный JSON в файле' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
