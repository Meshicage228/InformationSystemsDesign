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
        } else {
            alert('Ошибка при добавлении письма');
        }
    } catch (error) {
        alert('Ошибка сети');
    }
});

document.getElementById('searchLettersForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchDate = document.getElementById('searchDate').value;

    try {
        const response = await fetch(`/api/letters?date=${searchDate}`);
        const data = await response.json();

        const lettersList = document.getElementById('lettersList');
        lettersList.innerHTML = '';

        if (data.length > 0) {
            data.forEach(letter => {
                const letterCard = document.createElement('div');
                letterCard.className = 'letter-card';

                letterCard.innerHTML = `
                    <p><strong>Отправитель:</strong> ${letter.sender}</p>
                    <p><strong>Получатель:</strong> ${letter.recipient}</p>
                    <p><strong>Дата:</strong> ${new Date(letter.date).toLocaleDateString()}</p>
                    <p><strong>Тип:</strong> ${letter.isRegistered ? 'Заказное' : 'Обычное'}</p>
                `;

                lettersList.appendChild(letterCard);
            });
        } else {
            lettersList.innerHTML = '<p>Писем на эту дату не найдено.</p>';
        }
    } catch (error) {
        alert('Ошибка при поиске писем');
    }
});