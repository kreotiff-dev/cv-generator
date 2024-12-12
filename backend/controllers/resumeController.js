const fs = require('fs');
const path = require('path');

exports.generateResume = (req, res) => {
    const { userId, ruData, enData } = req.body;

    // Создание директории для хранения файлов пользователя
    const userDir = path.join(__dirname, '../../public/resumes', userId);
    if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
    }

    // Сохранение JSON файлов, если данные были переданы
    if (ruData && Object.keys(ruData).length > 0) {
        fs.writeFileSync(path.join(userDir, 'ru.json'), JSON.stringify(ruData, null, 2));
    }
    if (enData && Object.keys(enData).length > 0) {
        fs.writeFileSync(path.join(userDir, 'en.json'), JSON.stringify(enData, null, 2));
    }

    // Путь к HTML-шаблону
    const templatePath = path.join(__dirname, '../../public/template.html');
    
    // Путь к файлу пользователя
    const userHtmlPath = path.join(userDir, 'resume_user.html');

    // Копирование шаблона в директорию пользователя
    fs.copyFile(templatePath, userHtmlPath, (err) => {
        if (err) {
            return res.status(500).send('Ошибка при копировании шаблона HTML');
        }

        // Возвращаем путь к HTML файлу, который пользователь может открыть
        res.json({ message: 'Резюме создано', resumeUrl: `/public/resumes/${userId}/resume_user.html` });
    });
};
