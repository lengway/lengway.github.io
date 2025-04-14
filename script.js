document.getElementById('guess-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const guess = document.getElementById('guess').value;

    if (!name || !guess) return;

    // Показываем заглушку или дизейблим кнопку — по желанию
    const button = e.target.querySelector('button');
    button.disabled = true;
    button.textContent = "Генерация PDF...";

    // Ждём 300-500 мс, чтобы всё точно прогрузилось
    setTimeout(() => {
        const element = document.querySelector('.card'); // или #pdf-content, если используешь его

        const opt = {
            margin:       10,
            filename:     'priglashenie.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            // Восстанавливаем кнопку
            button.disabled = false;
            button.textContent = "Получить приглашение";
        });
    }, 500); // 500 мс = безопасная задержка
});
