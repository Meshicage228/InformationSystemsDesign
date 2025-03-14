document.getElementById('form1').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const message = await response.text();
        alert(message);
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
    }
});

document.getElementById('loadData').addEventListener('click', async () => {
    try {
        const response = await fetch('/load');
        const data = await response.json();

        const form2 = document.getElementById('form2');
        Object.keys(data).forEach(key => {
            const element = form2.elements[key];
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = data[key] === element.value;
                } else if (element.type === 'radio') {
                    element.checked = element.value === data[key];
                } else {
                    element.value = data[key] || '';
                }
                element.disabled = false;
            }
        });


        form2.querySelectorAll('button, select').forEach(element => {
            element.disabled = false;
        });

        alert('Данные успешно загружены!');
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
});