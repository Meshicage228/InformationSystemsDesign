import { generateRandomArray, displayArray } from './arrayModule.js';
import { ORIGINAL_ARRAY_KEY } from './constants/constant.js'

if (window.location.pathname.endsWith('index.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        const array = generateRandomArray();
        localStorage.setItem(ORIGINAL_ARRAY_KEY, JSON.stringify(array));
        displayArray(array, ORIGINAL_ARRAY_KEY);
    });
}

if (window.location.pathname.endsWith('result.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        const storedArray = JSON.parse(localStorage.getItem(ORIGINAL_ARRAY_KEY));

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

window.navigateToResult = function() {
    window.location.href = '../html/result.html';
};