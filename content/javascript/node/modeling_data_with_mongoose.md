## Моделирование данных с Mongoose

В этой части руководства мы познакомимся с Mongoose - популярной библиотекой ODM (Object Data Mapping) для Node.js, которая значительно упрощает взаимодействие с базами данных MongoDB.

### Что такое Mongoose и зачем он нужен?

Mongoose предоставляет удобный интерфейс для работы с MongoDB, позволяя:

- **Определять схемы данных:** Mongoose позволяет создавать схемы, которые описывают структуру документов в коллекции MongoDB.
- **Валидировать данные:** Схемы Mongoose позволяют задавать правила валидации для полей документов, обеспечивая целостность данных.
- **Легко взаимодействовать с базой данных:** Mongoose предоставляет простой и интуитивно понятный API для выполнения CRUD-операций (создание, чтение, обновление, удаление) с документами.
- **Использовать связи между документами:** Mongoose поддерживает различные типы связей между документами, такие как один-к-одному, один-ко-многим и многие-ко-многим.

### Установка и подключение

Для начала работы установим Mongoose:

```bash
npm install mongoose
```

Затем подключимся к базе данных MongoDB:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключение к базе данных установлено'))
  .catch(err => console.error('Ошибка подключения:', err));
```

В этом коде мы:

- Импортируем модуль `mongoose`.
- Вызываем метод `mongoose.connect()` для подключения к базе данных `mydatabase` на локальном сервере MongoDB.
- Передаем объект опций `{ useNewUrlParser: true, useUnifiedTopology: true }`, чтобы использовать новые парсеры URL и движок топологии.
- Обрабатываем успешное подключение и ошибку подключения.

### Создание схемы и модели

Схема Mongoose - это JavaScript-объект, который определяет структуру документа. Модель - это скомпилированная версия схемы, которая используется для создания документов в коллекции.

Создадим простую схему для модели `User`:

```javascript
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model('User', userSchema);

module.exports = User;
```

В этом коде мы:

- Импортируем `Schema` и `model` из модуля `mongoose`.
- Создаем новую схему `userSchema` с полями `name`, `email` и `password`.
- Указываем тип данных и другие параметры для каждого поля, например, делаем поля обязательными (`required: true`) и уникальными (`unique: true`).
- Создаем модель `User` из схемы `userSchema` и передаем ее имя ('User').
- Экспортируем модель `User`.

### Создание и сохранение документов

Для создания нового документа используем метод `create()` модели:

```javascript
const User = require('./models/User'); // Импортируем модель User

const newUser = new User({
  name: 'Иван',
  email: 'ivan@example.com',
  password: 'password123',
});

newUser.save()
  .then(user => console.log('Новый пользователь сохранен:', user))
  .catch(err => console.error('Ошибка сохранения пользователя:', err));
```

Этот код создает новый документ `User` с заданными данными и сохраняет его в базу данных.

### Поиск документов

Mongoose предоставляет мощные методы для поиска документов в коллекции. Например, чтобы найти всех пользователей:

```javascript
User.find()
  .then(users => console.log('Все пользователи:', users))
  .catch(err => console.error('Ошибка поиска пользователей:', err));
```

Чтобы найти пользователя по email:

```javascript
User.findOne({ email: 'ivan@example.com' })
  .then(user => console.log('Найденный пользователь:', user))
  .catch(err => console.error('Ошибка поиска пользователя:', err));
```

### Обновление документов

Для обновления документа используем метод `findOneAndUpdate()`:

```javascript
User.findOneAndUpdate({ email: 'ivan@example.com' }, { name: 'Иван Иванович' }, { new: true })
  .then(updatedUser => console.log('Обновленный пользователь:', updatedUser))
  .catch(err => console.error('Ошибка обновления пользователя:', err));
```

В этом коде мы:

- Находим пользователя по email.
- Обновляем поле `name`.
- Передаем опцию `{ new: true }`, чтобы получить обновленный документ.

### Удаление документов

Для удаления документа используем метод `findOneAndDelete()`:

```javascript
User.findOneAndDelete({ email: 'ivan@example.com' })
  .then(deletedUser => console.log('Удаленный пользователь:', deletedUser))
  .catch(err => console.error('Ошибка удаления пользователя:', err));
```

### Заключение

В этой части руководства мы рассмотрели основы работы с Mongoose: подключение к базе данных, создание схем и моделей, создание, поиск, обновление и удаление документов. Mongoose - это мощная библиотека, которая значительно упрощает взаимодействие с MongoDB в приложениях Node.js. 
