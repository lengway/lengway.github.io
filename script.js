document.getElementById('guess-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const guess = document.getElementById('guess').value;

    if (name && guess) {
        const url = `invitation.html?name=${encodeURIComponent(name)}&guess=${encodeURIComponent(guess)}`;
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.left = '-9999px';
        document.body.appendChild(iframe);

        iframe.onload = () => {
            html2pdf().from(iframe.contentDocument.body).save(`${name}_приглашение.pdf`);
            document.body.removeChild(iframe);
        };

        iframe.src = url;

        // Очистить форму
        document.getElementById('name').value = '';
        document.getElementById('guess').value = '';
    }
});
