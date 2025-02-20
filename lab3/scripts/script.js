document.addEventListener("DOMContentLoaded", function() {
    const array = Array.from({length: 20}, () => Math.floor(Math.random() * 101));
    const sortedArray = [...array].sort((a, b) => b - a);
    const minValue = Math.min(...array);

    if (window.location.pathname.endsWith('index.html')) {
        displayArray(array, 'originalArray');
    } else if (window.location.pathname.endsWith('result.html')) {
        displayArray(sortedArray, 'sortedArray');
        document.getElementById('minValue').textContent = `Минимальный элемент: ${minValue}`;
    }
});

function displayArray(arr, elementId) {
    const table = document.getElementById(elementId);
    for (let i = 0; i < 2; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 10; j++) {
            const cell = row.insertCell();
            cell.textContent = arr[i * 10 + j];
        }
    }
}

function processArray() {
    window.location.href = '../html/result.html';
}