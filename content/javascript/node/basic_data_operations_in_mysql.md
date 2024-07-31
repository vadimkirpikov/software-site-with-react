## Основные операции с данными в MySQL с помощью Node.js

В этой статье мы рассмотрим базовые операции работы с данными в базе данных MySQL, используя Node.js и пакет `mysql2`. `mysql2` - это быстрый и популярный драйвер MySQL для Node.js, который предоставляет простой и удобный интерфейс для взаимодействия с базами данных.

### Установка и настройка

1. **Установка пакета `mysql2`:**

   ```bash
   npm install mysql2
   ```

2. **Импорт пакета `mysql2`:**

   ```javascript
   const mysql = require('mysql2');
   ```

3. **Создание объекта подключения:**

   ```javascript
   const connection = mysql.createConnection({
     host: 'localhost', // адрес сервера MySQL
     user: 'your_username', // имя пользователя MySQL
     password: 'your_password', // пароль MySQL
     database: 'your_database' // название базы данных
   });
   ```

   **Замените**:
   - `your_username` на ваше имя пользователя MySQL.
   - `your_password` на ваш пароль MySQL.
   - `your_database` на название вашей базы данных.

4. **Открытие соединения:**

   ```javascript
   connection.connect((err) => {
     if (err) {
       console.error('Ошибка подключения к базе данных:', err);
       return;
     }
     console.log('Успешное подключение к базе данных!');
   });
   ```

### Создание таблицы

```javascript
const sql = `
  CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
  )
`;

connection.query(sql, (err, result) => {
  if (err) {
    console.error('Ошибка при создании таблицы:', err);
    return;
  }
  console.log('Таблица успешно создана!');
});
```

**Описание кода:**

1.  Создается переменная `sql`, содержащая SQL-запрос для создания таблицы `products`, если она не существует. 
2.  Используется метод `connection.query()`, чтобы выполнить SQL-запрос.
3.  В случае ошибки, выводится сообщение об ошибке.
4.  В случае успеха, выводится сообщение об успешном создании таблицы.

### Добавление данных

```javascript
const product = { name: 'Телефон', price: 1000 };

connection.query('INSERT INTO products SET ?', product, (err, result) => {
  if (err) {
    console.error('Ошибка при добавлении данных:', err);
    return;
  }
  console.log('Данные успешно добавлены! ID:', result.insertId);
});
```

**Описание кода:**

1.  Создается объект `product` с данными для добавления в таблицу.
2.  Используется `connection.query()` с placeholder `?` для безопасной подстановки данных.
3.  В случае ошибки, выводится сообщение об ошибке.
4.  В случае успеха, выводится сообщение об успешном добавлении данных и ID новой записи.

### Чтение данных

```javascript
connection.query('SELECT * FROM products', (err, results) => {
  if (err) {
    console.error('Ошибка при чтении данных:', err);
    return;
  }
  console.log('Данные из таблицы products:', results);
});
```

**Описание кода:**

1.  Используется `connection.query()` для выполнения запроса `SELECT`, который выбирает все данные из таблицы `products`.
2.  В случае ошибки, выводится сообщение об ошибке.
3.  В случае успеха, выводится массив объектов, представляющих полученные данные.

### Обновление данных

```javascript
const update = { price: 1200 };
const id = 1;

connection.query(
  'UPDATE products SET ? WHERE id = ?',
  [update, id],
  (err, result) => {
    if (err) {
      console.error('Ошибка при обновлении данных:', err);
      return;
    }
    console.log('Данные успешно обновлены! Затронуто строк:', result.affectedRows);
  }
);
```

**Описание кода:**

1.  Создается объект `update` с данными для обновления.
2.  Задается `id` записи, которую нужно обновить.
3.  Используется `connection.query()` с placeholders `?` для безопасной подстановки данных.
4.  В случае ошибки, выводится сообщение об ошибке.
5.  В случае успеха, выводится сообщение об успешном обновлении данных и количестве затронутых строк.

### Удаление данных

```javascript
const id = 1;

connection.query('DELETE FROM products WHERE id = ?', id, (err, result) => {
  if (err) {
    console.error('Ошибка при удалении данных:', err);
    return;
  }
  console.log('Данные успешно удалены! Затронуто строк:', result.affectedRows);
});
```

**Описание кода:**

1.  Задается `id` записи, которую нужно удалить.
2.  Используется `connection.query()` с placeholder `?` для безопасной подстановки данных.
3.  В случае ошибки, выводится сообщение об ошибке.
4.  В случае успеха, выводится сообщение об успешном удалении данных и количестве затронутых строк.

### Закрытие соединения

```javascript
connection.end((err) => {
  if (err) {
    console.error('Ошибка при закрытии соединения:', err);
    return;
  }
  console.log('Соединение с базой данных закрыто!');
});
```

**Важно!** Всегда закрывайте соединение с базой данных после завершения работы, чтобы освободить ресурсы.

В этой статье мы рассмотрели основные операции с данными в MySQL с помощью Node.js и пакета `mysql2`. Вы узнали, как подключаться к базе данных, создавать таблицы, добавлять, читать, обновлять и удалять данные, а также закрывать соединение. 
