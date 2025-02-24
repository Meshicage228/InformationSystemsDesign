export function generateRandomArray() {
    return Array.from({ length: 20 }, () => Math.floor(Math.random() * 101));
}

export function displayArray(arr, elementId) {
    const table = document.getElementById(elementId);
    if (!table) {
        console.error("Элемент таблицы не найден!");
        return;
    }
    table.innerHTML = '';

    for (let i = 0; i < 2; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 10; j++) {
            const cell = row.insertCell();
            cell.textContent = arr[i * 10 + j];
        }
    }
}