let removedItems = [];

function removeItem() {
    const select = document.getElementById('itemSelect');
    const selectedItem = select.value;

    if (selectedItem) {
        removedItems.push(selectedItem);
        const index = select.selectedIndex;
        select.remove(index);
    }
}

function addItem() {
    const newItem = document.getElementById('newItem').value;
    const select = document.getElementById('itemSelect');

    if (newItem) {
        const option = document.createElement('option');
        option.value = newItem;
        option.textContent = newItem;

        if (select.options.length < 2) {
            select.appendChild(option);
        } else {
            select.insertBefore(option, select.options[2]);
        }
        
        document.getElementById('newItem').value = ''; 
    }
}

function showRemovedItems() {
    const removedItemsList = document.getElementById('removedItemsList');
    removedItemsList.innerHTML = ''; 

    if (removedItems.length === 0) {
        removedItemsList.innerHTML = '<p>Нет уволенных сотрудников.</p>';
    } else {
        removedItems.forEach(item => {
            const p = document.createElement('p');
            p.textContent = item;
            removedItemsList.appendChild(p);
        });
    }
}