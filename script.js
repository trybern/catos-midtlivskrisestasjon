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
        const destinationEmail = "midtlivskrise@example.com";
        const subject = encodeURIComponent(`Ny bestilling: Ung kjæreste til ${userName}`);

        let bodyText = `Aloha!\n\nJeg, ${userName}, kjenner krisen nærme seg og vil bestille følgende unge kjæreste(r):\n\n`;

        checkedPartners.forEach(partner => {
            bodyText += `- ${partner}\n`;
        });

        if (message) {
            bodyText += `\nBeskjed til universet:\n"${message}"\n`;
        }

        bodyText += `\nMahalo og god krise! 🌴`;

        const body = encodeURIComponent(bodyText);

        // Konstruerer en mailto-lenke for å åpne standard e-postklient
        const mailtoLink = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;

        // Åpne e-postklienten
        window.location.href = mailtoLink;
    });
});
