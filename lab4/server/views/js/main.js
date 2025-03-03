document.getElementById('addLetterForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const letterData = {
        sender: document.getElementById('sender').value,
        recipient: document.getElementById('recipient').value,
        date: document.getElementById('date').value,
        isRegistered: document.getElementById('isRegistered').checked
    };

    try {
        const response = await fetch('/api/letters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(letterData)
        });

        if (response.ok) {
            alert('Письмо успешно добавлено!');
            clearForm();
        } else {
            alert('Ошибка при добавлении письма');
        }
    } catch (error) {
        alert('Ошибка сети');
    }
});

function clearForm() {
    document.getElementById('sender').value = '';
    document.getElementById('recipient').value = '';
    document.getElementById('date').value = '';
    document.getElementById('isRegistered').checked = false;
}

document.getElementById('searchLettersForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchDate = document.getElementById('searchDate').value;

    try {
        const response = await fetch(`/api/letters?date=${searchDate}`);
        const data = await response.json();

        const lettersList = document.getElementById('lettersList');
        lettersList.innerHTML = '';

        if (data.length > 0) {
            const source = document.getElementById('letter-template').innerHTML;
            const template = Handlebars.compile(source);

            Handlebars.registerHelper('formatDate', function(date) {
                return new Date(date).toLocaleDateString();
            });

            lettersList.innerHTML = template(data);
        } else {
            lettersList.innerHTML = '<p>Писем на эту дату не найдено.</p>';
        }
    } catch (error) {
        alert('Ошибка при поиске писем');
    }
});