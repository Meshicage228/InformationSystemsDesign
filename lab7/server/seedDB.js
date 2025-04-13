const mongoose = require('mongoose');
const Poem = require('./models/Poem');

const poemsData = [
  {
    author: "Пушкин",
    text: "Я помню чудное мгновенье:\nПередо мной явилась ты,\nКак мимолетное виденье,\nКак гений чистой красоты."
  },
  {
    author: "Лермонтов",
    text: "Выхожу один я на дорогу;\nСквозь туман кремнистый путь блестит;\nНочь тиха. Пустыня внемлет Богу,\nИ звезда с звездою говорит."
  },
  {
    author: "Есенин",
    text: "Не жалею, не зову, не плачу,\nВсе пройдет, как с белых яблонь дым.\nУвяданья золотом охваченный,\nЯ не буду больше молодым."
  },
  {
    author: "Ахматова",
    text: "Я научилась просто, мудро жить,\nСмотреть на небо и молиться Богу,\nИ долго перед вечером бродить,\nЧтоб утомить ненужную тревогу."
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/poetryDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await Poem.deleteMany({});
    await Poem.insertMany(poemsData);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();