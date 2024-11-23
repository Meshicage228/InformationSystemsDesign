let db;
document.addEventListener("DOMContentLoaded", () => {
    initDatabase();
    loadRecords();
    populateRecordIds();
});

class Tool {
    constructor(toolName, ownerName, toolNumber, usageTime) {
        this.toolName = toolName;
        this.ownerName = ownerName;
        this.toolNumber = toolNumber;
        this.usageTime = usageTime;
    }

    addPhone(phone) {
        this.phone = phone;
    }
}

function initDatabase() {
    const request = indexedDB.open("ToolsDB", 1);

    request.onupgradeneeded = event => {
        db = event.target.result;
        const store = db.createObjectStore("tools", { keyPath: "toolId" });
        store.createIndex("toolName", "toolName", { unique: false });
        store.createIndex("ownerName", "ownerName", { unique: false });
        store.createIndex("toolNumber", "toolNumber", { unique: false });
        store.createIndex("usageTime", "usageTime", { unique: false });
        store.createIndex("phone", "phone", { unique: false });
    };

    request.onsuccess = event => {
        db = event.target.result;
        console.log("База данных успешно инициализирована");
    };

    request.onerror = event => {
        console.error("Ошибка при инициализации базы данных:", event.target.errorCode);
    };
}

function addRecord() {
    const toolId = parseInt(document.getElementById("toolId").value);
    const toolName = document.getElementById("toolName").value;
    const ownerName = document.getElementById("ownerName").value;
    const toolNumber = document.getElementById("toolNumber").value;
    const usageTime = parseInt(document.getElementById("usageTime").value);

    if (!toolName || !ownerName || !toolNumber || isNaN(usageTime)) {
        alert("Заполните все поля!");
        return;
    }

    const transaction = db.transaction(["tools"], "readwrite");
    const store = transaction.objectStore("tools");

    const record = {
        toolId,
        toolName,
        ownerName,
        toolNumber,
        usageTime,
        phone: "-"
    };

    const request = store.add(record);
    request.onsuccess = () => {
        alert("Запись добавлена!");
        clearForm();
    };

    request.onerror = () => {
        alert("Ошибка при добавлении записи.");
    };
}

function loadRecords() {
    const tableBody = document.querySelector("#toolsTable tbody");
    tableBody.innerHTML = "";

    const transaction = db.transaction(["tools"], "readonly");
    const store = transaction.objectStore("tools");

    const request = store.openCursor();
    request.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
            const row = cursor.value;
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row.toolId}</td><td>${row.toolName}</td><td>${row.ownerName}</td><td>${row.toolNumber}</td><td>${row.usageTime}</td><td>${row.phone || '—'}</td>`;
            tableBody.appendChild(tr);
            cursor.continue();
        }
    };
}

function clearForm() {
    document.getElementById("toolForm").reset();
}

function deleteRecord() {
    const toolId = document.getElementById("toolId").value;
    if (!toolId) {
        alert("Выберите ID для удаления.");
        return;
    }

    const transaction = db.transaction(["tools"], "readwrite");
    const store = transaction.objectStore("tools");
    const request = store.delete(Number(toolId));

    request.onsuccess = () => {
        console.log("Запись удалена.");
        loadRecords();
        populateRecordIds();
    };
}

function populateRecordIds() {
    const recordIdSelect = document.getElementById("recordIdSelect");
    recordIdSelect.innerHTML = '<option value="">Выберите ID</option>';

    const transaction = db.transaction(["tools"], "readonly");
    const store = transaction.objectStore("tools");

    const request = store.openCursor();
    request.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
            const option = document.createElement("option");
            option.value = cursor.value.toolId;
            option.textContent = cursor.value.toolId;
            recordIdSelect.appendChild(option);
            cursor.continue();
        }
    };
}

function showSelectedUsageTime() {
    const timeType = document.getElementById("timeSelection").value;
    if (!timeType) {
        alert("Выберите тип времени (минимальное или максимальное)!");
        return;
    }

    const transaction = db.transaction(["tools"], "readonly");
    const store = transaction.objectStore("tools");
    const index = store.index("usageTime");
    const request = (timeType === "min") ? index.openCursor(null, "next") : index.openCursor(null, "prev");

    request.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
            alert(`Инструмент с ${timeType === "min" ? "минимальным" : "максимальным"} временем использования: ${cursor.value.toolId}`);
        } else {
            alert("Записи не найдены.");
        }
    };
}

function openClientNumberModal() {
    document.getElementById("clientModal").style.display = "flex";
    populateRecordIds();
}

function closeClientModal() {
    document.getElementById("clientModal").style.display = "none";
}

function saveClientNumber() {
    const clientNumber = document.getElementById("clientNumber").value.trim();
    const toolId = document.getElementById("recordIdSelect").value;

    if (!clientNumber || !toolId) {
        alert("Введите номер клиента и выберите ID.");
        return;
    }

    const transaction = db.transaction(["tools"], "readwrite");
    const store = transaction.objectStore("tools");
    const request = store.get(parseInt(toolId));

    request.onsuccess = event => {
        const record = event.target.result;
        if (record) {
            record.phone = clientNumber;
            const updateRequest = store.put(record);

            updateRequest.onsuccess = () => {
                alert("Номер клиента сохранен!");
                populateRecordIds();
            };
        }
        closeClientModal();
    };
}