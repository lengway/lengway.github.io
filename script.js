document.getElementById('guess-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const guess = document.getElementById('guess').value;

    if (name && guess) {
        // Строим URL для страницы приглашения
        const url = `https://lengway.github.io/invitation.html?name=${encodeURIComponent(name)}&guess=${encodeURIComponent(guess)}`;

        // Подготовка авторизации с API ключом
        const apiKey = "sk_679eea642b0b6e9679b50ec4dc1e23189cfaa90a";  // Вставь свой API ключ
        const headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(`api:${apiKey}`));
        headers.append("Content-Type", "application/json");

        // Отправка запроса на API PDFShift
        try {
            const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    source: url,  // Отправляем ссылку на страницу
                    landscape: false,
                    use_print: false
                })
            });

            if (!response.ok) {
                throw new Error("Ошибка при генерации PDF");
            }

            // Получаем PDF в виде Blob
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            // Скачиваем PDF файл
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = `${name}_приглашение.pdf`;
            a.click();

            URL.revokeObjectURL(blobUrl); // Освобождаем URL после скачивания
        } catch (error) {
            console.error("Ошибка при создании PDF:", error);
        }

        // Очищаем форму после отправки
        document.getElementById('name').value = '';
        document.getElementById('guess').value = '';
    }
});
