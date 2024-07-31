## CRUD операции с Mongoose

Mongoose - это объектно-документный инструмент моделирования данных (ODM) для MongoDB и Node.js. Он предоставляет строгую схему для моделирования данных приложения и взаимодействует с базой данных MongoDB, выполняя операции CRUD (Create, Read, Update, Delete).

### Установка Mongoose

Для начала работы с Mongoose необходимо установить его с помощью npm:

```bash
npm install mongoose
```

### Подключение к базе данных

Перед выполнением каких-либо операций с данными необходимо подключиться к базе данных MongoDB.

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключение к базе данных установлено'))
  .catch((err) => console.error('Ошибка подключения к базе данных:', err));
```

В этом коде мы:

1. Импортируем модуль `mongoose`.
2. Вызываем функцию `mongoose.connect()` для подключения к базе данных.
3. Передаем строку подключения к базе данных, например `mongodb://localhost:27017/mydatabase`.
4. Указываем опции `useNewUrlParser` и `useUnifiedTopology` для использования новых возможностей драйвера MongoDB.
5. Обрабатываем успешное подключение и ошибки подключения.

### Создание модели

Модель Mongoose определяет структуру документа в коллекции MongoDB. 

**Пример:**

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);

module.exports = User;
```

В этом коде мы:

1. Определяем схему `userSchema` с полями `name`, `email` и `password`.
2. Указываем тип данных, обязательность (`required`) и уникальность (`unique`) для каждого поля.
3. Создаем модель `User` с помощью `mongoose.model()`, передавая имя модели (`'User'`) и схему (`userSchema`).
4. Экспортируем модель `User` для использования в других частях приложения.

### Создание документа (Create)

Для создания нового документа в коллекции используйте метод `create()`.

**Пример:**

```javascript
const User = require('./models/User'); // Импортируем модель User

const newUser = new User({
  name: 'Иван',
  email: 'ivan@example.com',
  password: 'password123',
});

newUser.save()
  .then((user) => console.log('Новый пользователь создан:', user))
  .catch((err) => console.error('Ошибка при создании пользователя:', err));
```

В этом коде мы:

1. Создаем новый экземпляр модели `User` с данными нового пользователя.
2. Вызываем метод `save()` для сохранения нового пользователя в базе данных.
3. Обрабатываем успешное сохранение и ошибки.

### Чтение документов (Read)

Mongoose предоставляет несколько методов для чтения документов:

| Метод          | Описание                                                                   |
|---------------|----------------------------------------------------------------------------|
| `findOne()`   | Возвращает один документ, удовлетворяющий условию.                          |
| `find()`      | Возвращает массив документов, удовлетворяющих условию.                  |
| `findById()`  | Возвращает документ по его ID.                                              |

**Пример:**

```javascript
// Найти пользователя по email
User.findOne({ email: 'ivan@example.com' })
  .then((user) => {
    if (user) {
      console.log('Найден пользователь:', user);
    } else {
      console.log('Пользователь не найден');
    }
  })
  .catch((err) => console.error('Ошибка при поиске пользователя:', err));

// Найти всех пользователей
User.find()
  .then((users) => console.log('Все пользователи:', users))
  .catch((err) => console.error('Ошибка при поиске пользователей:', err));

// Найти пользователя по ID
User.findById('6461f777c4285a7700c12345') // Замените на реальный ID
  .then((user) => {
    if (user) {
      console.log('Найден пользователь:', user);
    } else {
      console.log('Пользователь не найден');
    }
  })
  .catch((err) => console.error('Ошибка при поиске пользователя:', err));
```

### Обновление документа (Update)

Mongoose предоставляет методы `updateOne()`, `updateMany()` и `findByIdAndUpdate()` для обновления документов.

**Пример:**

```javascript
// Обновить email пользователя по ID
User.findByIdAndUpdate(
  '6461f777c4285a7700c12345', // Замените на реальный ID
  { email: 'new.ivan@example.com' },
  { new: true } // Возвращает обновленный документ
)
  .then((updatedUser) => console.log('Обновленный пользователь:', updatedUser))
  .catch((err) => console.error('Ошибка при обновлении пользователя:', err));
```

### Удаление документа (Delete)

Mongoose предоставляет методы `deleteOne()`, `deleteMany()` и `findByIdAndDelete()` для удаления документов.

**Пример:**

```javascript
// Удалить пользователя по ID
User.findByIdAndDelete('6461f777c4285a7700c12345') // Замените на реальный ID
  .then((deletedUser) => {
    if (deletedUser) {
      console.log('Пользователь удален:', deletedUser);
    } else {
      console.log('Пользователь не найден');
    }
  })
  .catch((err) => console.error('Ошибка при удалении пользователя:', err));
```

Это базовые операции CRUD с Mongoose. Mongoose предоставляет  множество других функций, таких как валидация данных, middleware,  виртуальные поля и многое другое. Подробнее о  Mongoose можно узнать в официальной документации:  [https://mongoosejs.com/](https://mongoosejs.com/) 
