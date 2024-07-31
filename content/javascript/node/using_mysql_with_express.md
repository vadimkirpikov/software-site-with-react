## Использование MySQL с Express

В этой статье мы рассмотрим, как интегрировать базу данных MySQL в ваше приложение Express.js. MySQL - это популярная система управления реляционными базами данных с открытым исходным кодом, которая широко используется в веб-разработке. 

### Подготовка к работе

Для начала работы вам понадобятся следующие компоненты:

1. **Node.js и npm (или yarn):** Убедитесь, что у вас установлена Node.js версии 21 или выше. Вы можете скачать последнюю версию с официального сайта: https://nodejs.org/. npm обычно устанавливается вместе с Node.js.
2. **Сервер MySQL:** Установите и запустите сервер MySQL на вашем компьютере или используйте удаленный сервер.
3. **Клиент MySQL (опционально):** Установите любой клиент MySQL (например, MySQL Workbench) для удобного взаимодействия с базой данных.

### Установка необходимых пакетов

Для работы с MySQL в Node.js нам понадобится пакет `mysql2`:

```bash
npm install mysql2 
```

### Подключение к базе данных

Создайте файл `db.js` для хранения кода подключения к базе данных:

```javascript
// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost', // адрес сервера MySQL
  user: 'username', // имя пользователя MySQL
  password: 'password', // пароль пользователя MySQL
  database: 'database_name', // имя базы данных
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
```

Замените `'localhost'`, `'username'`, `'password'` и `'database_name'` на соответствующие значения для вашего сервера MySQL.

### Выполнение запросов

Теперь, когда у нас есть подключение к базе данных, мы можем выполнять SQL-запросы. 

**Пример:** Получение данных из таблицы `users`:

```javascript
// app.js
const express = require('express');
const pool = require('./db');

const app = express();

app.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM users');
    res.json(rows); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
```

В этом примере мы:

1. Импортируем модуль `express` и создаем приложение Express.
2. Импортируем модуль `pool` из файла `db.js`.
3. Создаем маршрут GET `/users`.
4. Внутри обработчика маршрута выполняем запрос `SELECT * FROM users` с помощью `pool.query()`.
5. Метод `query()` возвращает Promise, который разрешается в массив с двумя элементами:
    * `rows`: массив объектов, представляющих строки, возвращенные запросом.
    * `fields`: объект с информацией о полях таблицы.
6. Отправляем полученные данные в формате JSON с помощью `res.json()`.
7. Обрабатываем ошибки с помощью блока `try...catch` и отправляем код состояния 500 в случае ошибки.

### Вставка данных

**Пример:** Добавление нового пользователя в таблицу `users`:

```javascript
// app.js
app.post('/users', async (req, res) => {
  const { name, email } = req.body; 

  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.send(`Пользователь с ID ${result.insertId} добавлен`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});
```

В этом примере:

1. Создаем маршрут POST `/users`.
2. Получаем имя и адрес электронной почты нового пользователя из тела запроса `req.body`.
3. Выполняем запрос `INSERT INTO` с помощью `pool.query()`, передавая имя пользователя и адрес электронной почты в качестве параметров.
4. Отправляем сообщение с ID нового пользователя.

### Обновление и удаление данных

Аналогично, вы можете использовать запросы `UPDATE` и `DELETE` для обновления и удаления данных в базе данных.

**Пример:** Обновление имени пользователя:

```javascript
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE users SET name = ? WHERE id = ?',
      [name, id]
    );
    res.send(`Пользователь с ID ${id} обновлен`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});
```

**Пример:** Удаление пользователя:

```javascript
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.send(`Пользователь с ID ${id} удален`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});
```

### Заключение

В этой статье мы рассмотрели основные принципы использования MySQL с Express.js. Вы научились подключаться к базе данных, выполнять запросы, добавлять, обновлять и удалять данные. 

Помните о безопасности! Используйте prepared statements для предотвращения SQL-инъекций. 

Это лишь базовые сведения о работе с MySQL и Express. Существует множество других возможностей, таких как использование ORM (Object-Relational Mapping), транзакций и пулов соединений, которые вы можете изучить самостоятельно. 
