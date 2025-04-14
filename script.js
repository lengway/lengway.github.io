document.getElementById('guess-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const guess = document.getElementById('guess').value;

    if (!name || !guess) return;

    const button = e.target.querySelector('button');
    button.disabled = true;
    button.textContent = "Генерация PDF...";

    try {
        // Загружаем invitation.html как текст
        const res = await fetch('invitation.html');
        let html = await res.text();

        // Подставляем имя и выбор прямо в HTML
        html = html.replace('id="user-name"></strong>', `id="user-name">${name}</strong>`);
        html = html.replace('id="user-guess"></strong>', `id="user-guess">${guess}</strong>`);

        // Создаём временный контейнер для рендера
        const container = document.createElement('div');
        container.innerHTML = html;
        container.style.display = 'none';
        document.body.appendChild(container);

        // Генерируем PDF
        await html2pdf().from(container).save();

        // Удаляем контейнер
        document.body.removeChild(container);
    } catch (error) {
        console.error('Ошибка генерации PDF:', error);
    }

    button.disabled = false;
    button.textContent = "Получить приглашение";
});