document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('partnerForm');

    form.addEventListener('submit', (e) => {
        // Forhindrer at skjemaet lastes på nytt automatisk
        e.preventDefault();

        const userName = document.getElementById('userName').value.trim();
        const message = document.getElementById('message').value.trim();

        // Hent alle avkryssede partnere
        const checkedPartners = Array.from(document.querySelectorAll('input[name="partner"]:checked'))
            .map(cb => cb.value);

        // Validere at minst én er valgt
        if (checkedPartners.length === 0) {
            alert('Du må velge minst én ung kjæreste! 🌺');
            return;
        }

        // Bygger opp innholdet til e-posten
        const subject = `Ny bestilling: Ung kjæreste til ${userName}`;

        let bodyText = `Aloha!\n\nJeg, ${userName}, kjenner krisen nærme seg og vil bestille følgende unge kjæreste(r):\n\n`;

        checkedPartners.forEach(partner => {
            bodyText += `- ${partner}\n`;
        });

        if (message) {
            bodyText += `\nBeskjed til universet:\n"${message}"\n`;
        }

        bodyText += `\nMahalo og god krise! 🌴`;

        // Vis at noe skjer
        const submitBtn = form.querySelector('.tiki-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sender... 🥥';
        submitBtn.disabled = true;

        // Bruker Formspree for å sende dataene direkte til e-posten din i bakgrunnen
        fetch("https://formspree.io/f/mykbklvp", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: subject,
                Melding: bodyText
            })
        })
            .then(response => response.json())
            .then(data => {
                alert('Krisen din er bestilt og universet er varslet! 🌺🌴');
                form.reset();
            })
            .catch(error => {
                console.error(error);
                alert('Oi, noe gikk galt! 📉 Prøv igjen.');
            })
            .finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
});
