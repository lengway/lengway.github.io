// document.getElementById('guess-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const name = document.getElementById('name').value.trim();
//     const guess = document.getElementById('guess').value;
//
//     if (name && guess) {
//         const url = `invitation.html?name=${encodeURIComponent(name)}&guess=${encodeURIComponent(guess)}`;
//         const iframe = document.createElement('iframe');
//         iframe.style.position = 'absolute';
//         iframe.style.left = '-9999px';
//         document.body.appendChild(iframe);
//
//         iframe.onload = () => {
//             html2pdf().from(iframe.contentDocument.body).save(`${name}_приглашение.pdf`);
//             document.body.removeChild(iframe);
//         };
//
//         iframe.src = url;
//
//         // Очистить форму
//         document.getElementById('name').value = '';
//         document.getElementById('guess').value = '';
//     }
//  });
document.getElementById('guess-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const element = document.querySelector('.card'); // Получаем элемент, который нужно конвертировать в PDF
    const name = document.getElementById('name').value;
    const guess = document.getElementById('guess').value;

    const docContent = `
        <div style="text-align: center;">
            <h1>Приглашение на гендер-пати</h1>
            <p><strong>Имя:</strong> ${name}</p>
            <p><strong>Выбор:</strong> ${guess}</p>
            <p>🎉 Павел и Анита ждут тебя!</p>
            <p>📅 Дата: 3 мая в 16:00!</p>
            <p>📍 Место: Банкетный зал Voyage</p>
            <p>👕 Дресс-кода нет — просто приходи с настроением!</p>
        </div>
    `;

    const pdfElement = document.createElement('div');
    pdfElement.innerHTML = docContent;

    // Генерируем PDF
    html2pdf().from(pdfElement).save();
});
