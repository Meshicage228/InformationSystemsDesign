const button1 = document.querySelector('.button1');
    const inputFields = document.querySelectorAll('input[type="text"]');

    button1.addEventListener('click', () => {
        inputFields.forEach((input) => {
            if (!input.value.includes('hello')) {
                input.value += 'hello';
            }
        });
    });