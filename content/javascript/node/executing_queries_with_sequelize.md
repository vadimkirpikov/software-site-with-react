## Выполнение запросов с Sequelize

Sequelize — это объектно-реляционный преобразователь (ORM) для Node.js, который предоставляет удобный интерфейс для работы с базами данных. Вместо написания сырых SQL-запросов, вы можете использовать JavaScript-функции и объекты Sequelize для взаимодействия с базой данных. 

В этой статье мы рассмотрим основы выполнения запросов с помощью Sequelize: создание, чтение, обновление и удаление данных. 

**Предварительные требования:**

* Установленный Node.js версии 21 или выше.
* Настроенный проект Node.js.
* Установленный Sequelize: `npm install --save sequelize pg pg-hstore` (для PostgreSQL).
* Выбранная и настроенная база данных. В примерах будет использоваться PostgreSQL.

**Подключение к базе данных:**

Первым шагом необходимо подключиться к вашей базе данных. Для этого создайте экземпляр Sequelize и передайте ему параметры подключения:

```javascript
const { Sequelize } = require('sequelize');

// Создание экземпляра Sequelize
const sequelize = new Sequelize('имя_базы_данных', 'пользователь', 'пароль', {
  host: 'localhost',
  dialect: 'postgres', // Используемый диалект (postgres, mysql, mssql и др.)
});

// Проверка подключения
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error);
  }
})();
```

Замените `имя_базы_данных`, `пользователь` и `пароль` на ваши реальные данные для подключения.

**Определение модели:**

Модель Sequelize представляет собой таблицу в вашей базе данных. Определите модель, используя метод `sequelize.define()`:

```javascript
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  // Определение атрибутов модели
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
    unique: true,
  },
});

// Синхронизация модели с базой данных (создание таблицы, если она не существует)
(async () => {
  await User.sync();
  console.log('Таблица User успешно создана (если не существовала).');
})();
```

В этом примере мы определили модель `User` с атрибутами `id`, `firstName`, `lastName` и `email`. 

**CRUD операции:**

Sequelize предоставляет удобные методы для выполнения CRUD операций:

* **Создание (Create):**

```javascript
// Создание новой записи в базе данных
(async () => {
  try {
    const newUser = await User.create({
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan.ivanov@example.com',
    });
    console.log('Новая запись успешно создана:', newUser.toJSON());
  } catch (error) {
    console.error('Ошибка при создании записи:', error);
  }
})();
```

* **Чтение (Read):**

```javascript
// Поиск всех пользователей
(async () => {
  const users = await User.findAll();
  console.log('Все пользователи:', JSON.stringify(users, null, 2));
})();

// Поиск пользователя по id
(async () => {
  const user = await User.findByPk(1); 
  console.log('Пользователь с id 1:', JSON.stringify(user, null, 2));
})();

// Поиск пользователя по email
(async () => {
  const user = await User.findOne({ where: { email: 'ivan.ivanov@example.com' } });
  console.log('Пользователь с email ivan.ivanov@example.com:', JSON.stringify(user, null, 2));
})();
```

* **Обновление (Update):**

```javascript
// Обновление записи по id
(async () => {
  const [updatedRowsCount, updatedRows] = await User.update({ lastName: 'Петров' }, { where: { id: 1 } });
  console.log('Количество обновленных строк:', updatedRowsCount);
  console.log('Обновленные строки:', updatedRows);
})();
```

* **Удаление (Delete):**

```javascript
// Удаление записи по id
(async () => {
  const deletedRowCount = await User.destroy({ where: { id: 1 } });
  console.log('Количество удаленных строк:', deletedRowCount);
})();
```

Это лишь базовые примеры выполнения запросов с помощью Sequelize. 

Sequelize предоставляет широкий спектр возможностей, включая:

* **Ассоциации:** определение отношений между моделями (один-к-одному, один-ко-многим, многие-ко-многим).
* **Валидация данных:** проверка данных перед сохранением в базу данных.
* **Миграции:** управление изменениями в схеме базы данных.
* **Сырые запросы:** выполнение произвольных SQL-запросов.

Подробную информацию о возможностях Sequelize вы можете найти в [официальной документации](https://sequelize.org/). 
