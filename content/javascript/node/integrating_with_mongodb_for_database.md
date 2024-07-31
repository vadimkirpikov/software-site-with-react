<h2>Интеграция с MongoDB</h2>

MongoDB — это документоориентированная база данных NoSQL, которая отлично подходит для хранения данных различных структур. В этой статье мы рассмотрим, как интегрировать MongoDB в ваше приложение Node.js с помощью библиотеки Mongoose.

<h3>Что такое Mongoose?</h3>

Mongoose — это объектно-документный преобразователь (ODM) для MongoDB и Node.js. Он предоставляет схему для моделирования данных вашего приложения, упрощая взаимодействие с базой данных.

<h3>Установка</h3>

Для начала работы установите Mongoose с помощью npm или yarn:

```bash
npm install mongoose
```

<h3>Подключение к базе данных</h3>

Чтобы подключиться к базе данных MongoDB, используйте метод `mongoose.connect()`:

```javascript
const mongoose = require('mongoose');

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключение к MongoDB установлено'))
  .catch(err => console.error('Ошибка подключения:', err));
```

**Важно:** Замените `mydatabase` на имя вашей базы данных.

<h3>Создание модели</h3>

Модель в Mongoose определяет структуру документа в вашей коллекции. Создайте файл `models/user.js` для модели пользователя:

```javascript
const mongoose = require('mongoose');

// Определение схемы пользователя
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Создание модели User на основе схемы
const User = mongoose.model('User', userSchema);

module.exports = User;
```

<h3>Создание документа</h3>

Для создания нового пользователя используйте метод `create()`:

```javascript
const User = require('./models/user');

// Создание нового пользователя
const newUser = new User({
  name: 'Иван',
  email: 'ivan@example.com',
  password: 'password123',
});

// Сохранение пользователя в базе данных
newUser.save()
  .then(user => console.log('Пользователь создан:', user))
  .catch(err => console.error('Ошибка при создании пользователя:', err));
```

<h3>Чтение документа</h3>

Для поиска пользователей используйте методы `find()`, `findOne()` или `findById()`:

```javascript
// Найти всех пользователей
User.find()
  .then(users => console.log('Все пользователи:', users))
  .catch(err => console.error('Ошибка при поиске пользователей:', err));

// Найти пользователя по email
User.findOne({ email: 'ivan@example.com' })
  .then(user => console.log('Найденный пользователь:', user))
  .catch(err => console.error('Ошибка при поиске пользователя:', err));

// Найти пользователя по ID
User.findById('64d8e6123456789012345678')
  .then(user => console.log('Найденный пользователь:', user))
  .catch(err => console.error('Ошибка при поиске пользователя:', err));
```

<h3>Обновление документа</h3>

Для обновления данных пользователя используйте методы `updateOne()`, `findOneAndUpdate()` или `findByIdAndUpdate()`:

```javascript
// Обновить имя пользователя по ID
User.findByIdAndUpdate('64d8e6123456789012345678', { name: 'Иван Иванов' }, { new: true })
  .then(user => console.log('Обновленный пользователь:', user))
  .catch(err => console.error('Ошибка при обновлении пользователя:', err));
```

<h3>Удаление документа</h3>

Для удаления пользователя используйте методы `deleteOne()` или `findByIdAndDelete()`:

```javascript
// Удалить пользователя по email
User.deleteOne({ email: 'ivan@example.com' })
  .then(result => console.log('Результат удаления:', result))
  .catch(err => console.error('Ошибка при удалении пользователя:', err));

// Удалить пользователя по ID
User.findByIdAndDelete('64d8e6123456789012345678')
  .then(user => console.log('Удаленный пользователь:', user))
  .catch(err => console.error('Ошибка при удалении пользователя:', err));
```

<h3>Валидация</h3>

Mongoose предоставляет встроенную валидацию данных. Вы можете определить правила валидации в схеме:

```javascript
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Пожалуйста, введите имя'], 
    minlength: [3, 'Имя должно быть не короче 3 символов'] 
  },
  // ... другие поля
});
```

<h3>Индексы</h3>

Для ускорения поиска создайте индексы для часто используемых полей:

```javascript
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  // ... другие поля
});
```

В этой статье мы рассмотрели основы интеграции MongoDB в ваше приложение Node.js с помощью Mongoose. Mongoose предоставляет множество других возможностей, таких как связи между моделями, middleware, виртуальные поля и многое другое. 
