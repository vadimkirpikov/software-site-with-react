## Добавление данных в MongoDB с помощью Node.js

В этой статье мы рассмотрим, как добавлять данные в базу данных MongoDB, используя Node.js и драйвер `mongodb`. Драйвер `mongodb` предоставляет набор инструментов для взаимодействия с MongoDB из вашего JavaScript-кода.

### Установка драйвера `mongodb`

Перед началом работы убедитесь, что у вас установлен Node.js версии 21 или выше. Затем установите драйвер `mongodb` с помощью npm:

```bash
npm install mongodb
```

### Подключение к MongoDB

Для начала импортируйте объект `MongoClient` из библиотеки `mongodb`:

```javascript
const { MongoClient } = require('mongodb');
```

Затем создайте строку подключения к вашей базе данных. Замените `<username>`, `<password>`, `<cluster>`, `<database>` на ваши учетные данные:

```javascript
const uri = `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
```

Теперь вы можете подключиться к базе данных:

```javascript
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Успешное подключение к MongoDB');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
  }
}

connectToDatabase();
```

### Добавление одного документа

Чтобы добавить один документ в коллекцию, используйте метод `insertOne()`. 

**Пример:**

```javascript
async function addSingleDocument() {
  try {
    const database = client.db('test'); // Замените 'test' на имя вашей базы данных
    const collection = database.collection('users'); // Замените 'users' на имя вашей коллекции

    // Создаем объект с данными для добавления
    const newUser = {
      name: 'Иван',
      age: 30,
      city: 'Москва'
    };

    // Добавляем документ в коллекцию
    const result = await collection.insertOne(newUser);

    console.log(`Добавлен новый документ с ID: ${result.insertedId}`);
  } catch (error) {
    console.error('Ошибка при добавлении документа:', error);
  } finally {
    // Закрываем соединение
    await client.close();
  }
}

addSingleDocument();
```

В этом примере мы:

1. Получаем ссылку на базу данных и коллекцию.
2. Создаем объект `newUser` с данными для добавления.
3. Используем `collection.insertOne()` для добавления документа в коллекцию.
4. Выводим ID добавленного документа в консоль.
5. Закрываем соединение с базой данных.

### Добавление нескольких документов

Для добавления нескольких документов одновременно используйте метод `insertMany()`.

**Пример:**

```javascript
async function addMultipleDocuments() {
  try {
    const database = client.db('test');
    const collection = database.collection('users');

    // Создаем массив объектов с данными для добавления
    const newUsers = [
      { name: 'Петр', age: 25, city: 'Санкт-Петербург' },
      { name: 'Анна', age: 28, city: 'Новосибирск' },
    ];

    // Добавляем документы в коллекцию
    const result = await collection.insertMany(newUsers);

    console.log(`Добавлено ${result.insertedCount} документов`);
  } catch (error) {
    console.error('Ошибка при добавлении документов:', error);
  } finally {
    await client.close();
  }
}

addMultipleDocuments();
```

В этом примере мы:

1. Получаем ссылку на базу данных и коллекцию.
2. Создаем массив `newUsers` с объектами, содержащими данные для добавления.
3. Используем `collection.insertMany()` для добавления документов в коллекцию.
4. Выводим количество добавленных документов в консоль.
5. Закрываем соединение с базой данных.

### Заключение

В этой статье мы рассмотрели основы добавления данных в MongoDB с помощью драйвера `mongodb` для Node.js. Вы научились подключаться к базе данных, добавлять один и несколько документов в коллекцию. 

Драйвер `mongodb` предоставляет множество других возможностей для работы с MongoDB. Подробнее о них вы можете узнать из официальной документации: [https://www.mongodb.com/docs/drivers/node/](https://www.mongodb.com/docs/drivers/node/) 
