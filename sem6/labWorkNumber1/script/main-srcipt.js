document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const adModal = document.getElementById('adModal');
    const endMessage = document.getElementById('endMessage');
    const closeModal = document.querySelector('.close');
    const iterationsInput = document.getElementById('iterations');
    const video = adModal.querySelector('video');
    const showInfo = document.getElementById('showInfo');

    let currentIteration = 0;
    let totalIterations = 0;
    const showMap = new Map();

    const validateInput = () => {
        totalIterations = parseInt(iterationsInput.value);
        if (isNaN(totalIterations) || totalIterations < 1) {
            alert("Пожалуйста, введите корректное количество показов (n > 0).");
            return false;
        }
        return true;
    };

    const showAd = () => {
        adModal.style.display = 'block';
        video.currentTime = 0;
        video.play();

        showMap.set(currentIteration, {
            startTime: new Date(),
            duration: null
        });
    };

    const recordShowDuration = () => {
        const showInfoData = showMap.get(currentIteration);
        if (showInfoData) {
            showInfoData.duration = (new Date() - showInfoData.startTime) / 1000;
            showMap.set(currentIteration, showInfoData);
        }
    };

    const handleIteration = () => {
        if (currentIteration < totalIterations) {
            setTimeout(showAd, 2000);
        } else {
            endMessage.style.display = 'block';

            showInfo.innerHTML = "<h3>Информация о показах:</h3>";
            showMap.forEach((value, key) => {
                showInfo.innerHTML += `Показ ${key + 1}: 
                Начало - ${value.startTime.toLocaleTimeString()}, Продолжительность - ${value.duration.toFixed(2)} сек.<br>`;
            });
        }
    };

    startButton.addEventListener('click', () => {
        if (!validateInput()) {
            return;
        };

        currentIteration = 0;
        endMessage.style.display = 'none';
        showInfo.innerHTML = '';
        showAd();
    });

    closeModal.addEventListener('click', () => {
        adModal.style.display = 'none';
        video.pause();
        video.currentTime = 0;

        recordShowDuration();
        currentIteration++;
        handleIteration();
    });

    video.addEventListener('ended', () => {
        recordShowDuration();
        currentIteration++;
        adModal.style.display = 'none';
        handleIteration();
    });
});