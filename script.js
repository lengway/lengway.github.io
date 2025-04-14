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
// });
document.getElementById('guess-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const guess = document.getElementById('guess').value;

    if (!name || !guess) return;

    // Заполняем скрытый блок
    document.getElementById('pdf-name').textContent = name;
    document.getElementById('pdf-guess').textContent = guess;

    const pdfElement = document.getElementById('pdf-content');

    const opt = {
        margin:       10,
        filename:     'priglashenie.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(pdfElement).save();
});

