## Работа с базами данных в Express: Sequelize

В этой статье мы рассмотрим использование Sequelize, популярного ORM для Node.js, для взаимодействия с базами данных в вашем приложении Express. 

### Что такое Sequelize?

Sequelize - это ORM (Object-Relational Mapper), который предоставляет абстракцию над реляционными базами данных, позволяя работать с ними, используя JavaScript объекты вместо SQL запросов. Это упрощает разработку, делая код более чистым и лаконичным, а также обеспечивает переносимость между различными базами данных.

### Подключение Sequelize к проекту

1. **Установка необходимых пакетов:**

```bash
npm install --save sequelize pg pg-hstore
```

   В данном примере мы подключаем Sequelize и драйвер для PostgreSQL (`pg`). 

2. **Создание экземпляра Sequelize:**

```javascript
// ./src/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
```

   Здесь мы создаем экземпляр Sequelize, передавая ему параметры подключения к базе данных (название базы данных, имя пользователя, пароль, хост и диалект).

### Определение модели

Модель в Sequelize представляет собой таблицу в базе данных. 

```javascript
// ./src/models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // Дополнительные опции модели
});

module.exports = User;
```

   В этом примере мы определяем модель `User` с полями `id`, `firstName`, `lastName` и `email`.

### Синхронизация с базой данных

Для создания таблицы в базе данных на основе модели, используем метод `sync()`:

```javascript
const User = require('./src/models/user');

(async () => {
  await sequelize.sync(); // Синхронизация всех моделей
  // await User.sync(); // Синхронизация только модели User

  // ... остальной код приложения
})();
```

### CRUD операции

Sequelize предоставляет методы для выполнения основных операций CRUD (Create, Read, Update, Delete):

#### Создание записи:

```javascript
const newUser = await User.create({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
});
```

#### Получение записей:

```javascript
// Получение всех пользователей
const users = await User.findAll();

// Получение пользователя по id
const user = await User.findByPk(1);

// Поиск по условию
const usersWithEmail = await User.findAll({
  where: {
    email: 'john.doe@example.com',
  },
});
```

#### Обновление записи:

```javascript
const user = await User.findByPk(1);

await user.update({
  firstName: 'Jane',
});

// Или

await User.update({ firstName: 'Jane' }, {
  where: {
    id: 1
  }
});
```

#### Удаление записи:

```javascript
const user = await User.findByPk(1);
await user.destroy();

// Или

await User.destroy({
  where: {
    id: 1
  }
});
```

### Интеграция с Express

Пример использования Sequelize с Express:

```javascript
const express = require('express');
const sequelize = require('./src/db');
const User = require('./src/models/user');

const app = express();

// ... другой код Express

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const newUser = await User.create({ firstName, lastName, email });
  res.status(201).json(newUser);
});

// ... обработчики для других маршрутов

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
  });
});
```

В этом примере мы создали два маршрута: `/users` для получения всех пользователей и `/users` (POST) для создания нового пользователя.

### Заключение

Это лишь базовый обзор использования Sequelize с Express. 
Sequelize обладает широким набором функций, таких как ассоциации, миграции, валидация и многое другое, что делает его мощным инструментом для работы с базами данных в Node.js приложениях. 
Подробную информацию можно найти в официальной документации Sequelize: https://sequelize.org/