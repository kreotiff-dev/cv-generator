const express = require('express');
const cors = require('cors');
const resumeController = require('./controllers/resumeController');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Статическая директория для доступ к созданным резюме
app.use('/resumes', express.static(path.join(__dirname, '../public/resumes')));
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

// POST-запрос для генерации резюме
app.post('/generate-resume', resumeController.generateResume);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
