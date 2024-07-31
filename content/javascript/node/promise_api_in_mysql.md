## Promise API в MySQL с Node.js

Node.js, будучи асинхронной платформой, отлично подходит для работы с базами данных, в частности с MySQL.  Одним из способов взаимодействия с MySQL является использование Promise API, что делает код более читаемым и управляемым, особенно при работе с асинхронными операциями. 

### Подключение к базе данных

Для начала работы с MySQL необходимо установить соответствующий пакет:

```bash
npm install mysql2
```

`mysql2` - это популярная библиотека, предоставляющая Promise API для работы с MySQL. 

Далее подключимся к базе данных:

```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'mydb'
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения: ' + err.stack);
    return;
  }
  console.log('Успешное подключение с ID ' + connection.threadId);
});
```

В этом коде мы:

1. Импортируем модуль `mysql2`.
2. Создаем объект `connection`, передавая параметры подключения (хост, имя пользователя, пароль, база данных).
3. Вызываем метод `connect()`, чтобы установить соединение с базой данных.
4. В случае ошибки подключения выводим сообщение об ошибке.
5. В случае успеха выводим сообщение об успешном подключении.

### Выполнение запросов

После подключения к базе данных можно выполнять SQL-запросы. Рассмотрим пример получения данных из таблицы:

```javascript
connection.execute('SELECT * FROM users', (err, results, fields) => {
  if (err) {
    console.error('Ошибка выполнения запроса: ' + err.stack);
    return;
  }
  console.log(results); 
});
```

В этом примере мы используем метод `execute()`, передавая ему SQL-запрос и callback-функцию. Callback-функция принимает три аргумента:

- `err`: объект ошибки, если произошла ошибка.
- `results`: массив объектов, содержащий результаты запроса.
- `fields`: информация о полях результата запроса.

### Использование Promise

Promise API делает код более чистым и читаемым, особенно при работе с несколькими асинхронными операциями. `mysql2` предоставляет Promise-based версию методов для работы с базой данных.

Перепишем предыдущий пример с использованием Promise:

```javascript
connection.promise().execute('SELECT * FROM users')
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch(err => {
    console.error('Ошибка выполнения запроса: ' + err.stack);
  });
```

В этом коде мы:

1. Используем метод `promise()`, чтобы получить Promise-based версию объекта `connection`.
2. Вызываем метод `execute()`, передавая ему SQL-запрос. Метод возвращает Promise.
3. Используем `then()`, чтобы обработать успешное выполнение запроса. 
4. Используем `catch()`, чтобы обработать ошибку при выполнении запроса.

### Вставка данных

Для вставки данных в таблицу используется оператор SQL `INSERT`. Рассмотрим пример:

```javascript
const data = {
  name: 'Иван',
  email: 'ivan@example.com'
};

connection.promise().query('INSERT INTO users SET ?', data)
  .then(([result]) => {
    console.log('ID вставленной записи: ', result.insertId);
  })
  .catch(err => {
    console.error('Ошибка при вставке данных: ' + err.stack);
  });
```

В этом коде мы:

1. Создаем объект `data` с данными для вставки.
2. Вызываем метод `query()`, передавая ему SQL-запрос с плейсхолдером `?` и объект `data`.
3. Метод `query()` возвращает Promise.
4. Используем `then()`, чтобы обработать успешное выполнение запроса. В данном случае, мы выводим ID вставленной записи.
5. Используем `catch()`, чтобы обработать ошибку при выполнении запроса.

### Обновление и удаление данных

Аналогично вставке данных, для обновления и удаления используются операторы SQL `UPDATE` и `DELETE` соответственно.

Пример обновления данных:

```javascript
const data = {
  name: 'Иван Иванович'
};

const id = 1;

connection.promise().query('UPDATE users SET ? WHERE id = ?', [data, id])
  .then(([result]) => {
    console.log('Затронуто строк: ', result.affectedRows);
  })
  .catch(err => {
    console.error('Ошибка при обновлении данных: ' + err.stack);
  });
```

Пример удаления данных:

```javascript
const id = 1;

connection.promise().query('DELETE FROM users WHERE id = ?', id)
  .then(([result]) => {
    console.log('Удалено строк: ', result.affectedRows);
  })
  .catch(err => {
    console.error('Ошибка при удалении данных: ' + err.stack);
  });
```

### Заключение

Использование Promise API с библиотекой `mysql2` делает код для работы с базой данных MySQL в Node.js более читаемым и простым в управлении, особенно при работе с асинхронными операциями. Подробную информацию о  `mysql2` и доступных методах можно найти в документации библиотеки: [https://www.npmjs.com/package/mysql2](https://www.npmjs.com/package/mysql2).
