class SchoolClass {
    constructor(classNumber, studentCount, phone, teacherName) {
        this.classNumber = classNumber;
        this.studentCount = studentCount;
        this.phone = phone;
        this.teacherName = teacherName;
    }
}

class ClassManager {
    constructor() {
        this.classes = new Map();
        this.nextId = 1;
    }

    addClass(schoolClass) {
        this.classes.set(this.nextId++, schoolClass);
    }

    deleteClass(id) {
        return this.classes.delete(id);
    }

    getClass(id) {
        return this.classes.get(id);
    }

    getAllClasses() {
        return Array.from(this.classes.entries()).map(([id, cls]) => ({ id, ...cls }));
    }
}

const classManager = new ClassManager();

function addClass() {
    const classNumber = document.getElementById('classNumber').value;
    const studentCount = document.getElementById('studentCount').value;
    const phone = document.getElementById('phone').value;
    const teacherName = document.getElementById('teacherName').value;

    if (!classNumber || !studentCount || !phone || !teacherName) {
        alert('Пожалуйста, заполните все поля.');
        return;
    }

    const newClass = new SchoolClass(classNumber, studentCount, phone, teacherName);
    classManager.addClass(newClass);
    alert('Данные добавлены');
    clearForm();
}

function clearForm() {
    document.getElementById('classForm').reset();
}

function deleteClass() {
    const id = prompt('Введите ID записи для удаления:');
    if (id && classManager.deleteClass(Number(id))) {
        alert('Запись удалена');
    } else {
        alert('Запись не найдена или неверный ID');
    }
}

function showAllClasses() {
    const templateSource = document.getElementById('class-template').innerHTML;
    const template = Handlebars.compile(templateSource);
    const output = document.getElementById('output');

    output.innerHTML = classManager.getAllClasses()
                                   .map(cls => template(cls)).join('');
}

function showClassById() {
    const id = prompt('Введите ID записи:');
    const cls = classManager.getClass(Number(id));
    if (cls) {
        const templateSource = document.getElementById('class-template').innerHTML;
        const template = Handlebars.compile(templateSource);
        const output = document.getElementById('output');

        output.innerHTML = template({ id, ...cls });
    } else {
        alert('Запись не найдена');
    }
}