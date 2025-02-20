function generateRandomArray() {
    return Array.from({length: 20}, () => Math.floor(Math.random() * 101));
}

function displayArray(arr, elementId) {
    const table = document.getElementById(elementId);
    table.innerHTML = '';
    
    for (let i = 0; i < 2; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 10; j++) {
            const cell = row.insertCell();
            cell.textContent = arr[i * 10 + j];
        }
    }
}

if (window.location.pathname.endsWith('index.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        const array = generateRandomArray();
        localStorage.setItem('originalArray', JSON.stringify(array));
        displayArray(array, 'originalArray');
    });
}

if (window.location.pathname.endsWith('result.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        const storedArray = JSON.parse(localStorage.getItem('originalArray'));
        
        if (storedArray) {
            const sortedArray = [...storedArray].sort((a, b) => b - a);
            const minValue = Math.min(...storedArray);
            
            displayArray(sortedArray, 'sortedArray');
            document.getElementById('minValue').textContent = 
                `Минимальный элемент: ${minValue}`;
        } else {
            document.body.innerHTML = '<h1>Данные не найдены! Вернитесь на главную страницу.</h1>';
        }
    });
}

function navigateToResult() {
    window.location.href = '../html/result.html';
}