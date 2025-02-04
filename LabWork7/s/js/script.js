const modalsMap = new Map();

document.getElementById("createModal").addEventListener("click", createModal);
document.getElementById("removeAllModals").addEventListener("click", removeAllModals);

function createModal() {
    const title = document.getElementById("modalTitleSelect").value;
    const content = document.getElementById("modalContent").value;
    const x = parseInt(document.getElementById("modalX").value);
    const y = parseInt(document.getElementById("modalY").value);

    const modalId = `modal-${modalsMap.size + 1}`;
    const modal = createModalElement(modalId, title, content, x, y);
    
    modalsMap.set(modalId, { title, content, x, y });
    document.getElementById("modalsContainer").appendChild(modal);
    updateActiveModalsCount();
}

function createModalElement(id, title, content, x, y) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = id;
    modal.style.left = `${x}px`;
    modal.style.top = `${y}px`;

    modal.innerHTML = `
        <div class="modal-header">${title}</div>
        <p>${content}</p>
        <button class="modal-button" onclick="closeModal('${id}')">Закрыть</button>
    `;

    modal.style.display = "block";
    return modal;
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.remove();
        modalsMap.delete(id);
        updateActiveModalsCount();
    }
}

function removeAllModals() {
    modalsMap.forEach((_, id) => {
        closeModal(id);
    });
}

function updateActiveModalsCount() {
    const count = modalsMap.size;
    document.getElementById("activeModalsCount").textContent = `Активные модальные окна: ${count}`;
}

function updateModalContent(id) {
    const newContent = prompt("Введите новое содержимое:");
    if (newContent) {
        const modalData = modalsMap.get(id);
        modalData.content = newContent;
        const modal = document.getElementById(id);
        const contentParagraph = modal.querySelector('p');
        contentParagraph.textContent = newContent;
    }
}

function changeModalPosition(id) {
    const newX = parseInt(prompt("Введите новую координату X:"));
    const newY = parseInt(prompt("Введите новую координату Y:"));
    if (!isNaN(newX) && !isNaN(newY)) {
        const modal = document.getElementById(id);
        modal.style.left = `${newX}px`;
        modal.style.top = `${newY}px`;
        const modalData = modalsMap.get(id);
        modalData.x = newX;
        modalData.y = newY;
    }
}

function updateModalTitle(id) {
    const newTitle = prompt("Введите новый заголовок:");
    if (newTitle) {
        const modal = document.getElementById(id);
        const header = modal.querySelector('.modal-header');
        header.textContent = newTitle;
        const modalData = modalsMap.get(id);
        modalData.title = newTitle;
    }
}

document.getElementById("modalsContainer").addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-header")) {
        const modalId = event.target.parentElement.id;
        const updateContentBound = updateModalContent.bind(null, modalId);
        const changeCoordinatesBound = changeModalPosition.bind(null, modalId);
        const updateTitleBound = updateModalTitle.bind(null, modalId);
        
        updateContentBound();
        changeCoordinatesBound();
        updateTitleBound();
    }
});