document.getElementById('guess-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const guess = document.getElementById('guess').value;

    if (name && guess) {
        const url = `https://lengway.github.io/invitation.html?name=${encodeURIComponent(name)}&guess=${encodeURIComponent(guess)}`;

        const apiKey = "sk_679eea642b0b6e9679b50ec4dc1e23189cfaa90a";
        const headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(`api:${apiKey}`));
        headers.append("Content-Type", "application/json");

        try {
            const response = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    source: url,
                    landscape: false,
                    use_print: false,
                    page_size: "letter",
                    margin_top: 0,
                    margin_bottom: 0,
                    margin_left: 0,
                    margin_right: 0
                })
            });

            if (!response.ok) {
                throw new Error("Ошибка при генерации PDF");
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = `${name}_приглашение.pdf`;
            a.click();

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Ошибка при создании PDF:", error);
        }

        document.getElementById('name').value = '';
        document.getElementById('guess').value = '';
    }
});
