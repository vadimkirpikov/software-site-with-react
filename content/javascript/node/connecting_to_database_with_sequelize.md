## Подключение к базе данных через Sequelize

Node.js, будучи легковесной и эффективной средой выполнения JavaScript, отлично подходит для разработки backend-приложений. Важной составляющей большинства веб-приложений является взаимодействие с базой данных. В этом разделе мы рассмотрим использование Sequelize — популярного объектно-реляционного преобразователя (ORM), который упрощает работу с базами данных в Node.js.

### Что такое Sequelize?

Sequelize — это ORM для Node.js, предоставляющий инструменты для определения моделей данных, взаимодействия с ними и выполнения различных операций над базой данных с использованием JavaScript. Вместо написания SQL-запросов, Sequelize позволяет работать с базой данных, используя более привычные JavaScript-объекты и методы.

### Установка Sequelize и драйвера базы данных

Перед началом работы необходимо установить Sequelize и драйвер для вашей базы данных. В данном примере мы будем использовать PostgreSQL, но Sequelize поддерживает и другие СУБД, такие как MySQL, SQLite, MSSQL.

```bash
npm install --save sequelize pg pg-hstore
```

В этой команде:

- `sequelize` —  сам ORM;
- `pg` — драйвер для работы с PostgreSQL;
- `pg-hstore` —  дополнительный пакет для работы с типом данных hstore в PostgreSQL.

### Подключение к базе данных

Первым шагом создадим файл для подключения к базе данных, например `db.js`:

```javascript
const { Sequelize } = require('sequelize');

// Настройки подключения к базе данных
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres', 
});

// Проверка подключения
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Ошибка при подключении к базе данных:', error);
  }
})();

module.exports = sequelize;
```

В этом коде:

- Создается экземпляр класса `Sequelize` с параметрами подключения к базе данных: имя базы данных, имя пользователя, пароль, хост и диалект (тип базы данных).
- Вызывается асинхронная функция для проверки подключения.
- В случае успешного подключения выводится сообщение в консоль.
- В случае ошибки выводится сообщение об ошибке.

### Определение модели

Модель в Sequelize представляет собой таблицу в базе данных. Определим простую модель `User` с полями `id`, `name` и `email`:

```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Путь к файлу с подключением

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // Дополнительные настройки модели (необязательно)
});

module.exports = User;
```

В этом коде:

- Импортируется объект `DataTypes` из Sequelize для определения типов данных полей модели.
- Вызывается метод `define` объекта `sequelize` для определения модели `User`.
- В объекте конфигурации модели определяются поля: `id` (целочисленный, автоинкрементный, первичный ключ), `name` (строковый, обязательный), `email` (строковый, обязательный, уникальный).

### Синхронизация с базой данных

Для создания таблицы в базе данных на основе определенной модели необходимо выполнить синхронизацию:

```javascript
const User = require('./user'); // Путь к файлу с моделью

(async () => {
  try {
    await User.sync(); // Синхронизирует модель с базой данных
    console.log('Таблица User успешно создана (если не существовала).');
  } catch (error) {
    console.error('Ошибка при синхронизации модели:', error);
  }
})();
```

### Выполнение CRUD-операций

Sequelize предоставляет удобные методы для выполнения CRUD-операций (Create, Read, Update, Delete) над данными в базе данных.

#### Создание записи

```javascript
(async () => {
  try {
    const newUser = await User.create({
      name: 'Иван',
      email: 'ivan@example.com',
    });
    console.log('Новая запись успешно создана:', newUser.toJSON()); 
  } catch (error) {
    console.error('Ошибка при создании записи:', error);
  }
})();
```

#### Чтение записей

```javascript
(async () => {
  try {
    const users = await User.findAll();
    console.log('Все пользователи:', users.map(user => user.toJSON()));
  } catch (error) {
    console.error('Ошибка при чтении записей:', error);
  }
})();
```

#### Обновление записи

```javascript
(async () => {
  try {
    const updatedUser = await User.update({ name: 'Иван Иванович' }, {
      where: { id: 1 }
    });
    console.log('Запись успешно обновлена:', updatedUser);
  } catch (error) {
    console.error('Ошибка при обновлении записи:', error);
  }
})();
```

#### Удаление записи

```javascript
(async () => {
  try {
    const deletedUser = await User.destroy({
      where: { id: 1 }
    });
    console.log('Запись успешно удалена:', deletedUser);
  } catch (error) {
    console.error('Ошибка при удалении записи:', error);
  }
})();
```

Это лишь базовые примеры работы с Sequelize. Библиотека предоставляет гораздо больше возможностей, таких как:

- Определение отношений между моделями (один-к-одному, один-ко-многим, многие-ко-многим).
- Использование миграций для управления схемой базы данных.
- Выполнение сложных запросов и транзакций.

Более подробную информацию о Sequelize можно найти в [официальной документации](https://sequelize.org/). 
