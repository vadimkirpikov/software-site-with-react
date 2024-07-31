## Введение в MongoDB с Node.js

В этой статье мы рассмотрим основы работы с MongoDB, популярной NoSQL базой данных, используя Node.js. 

### Что такое MongoDB?

MongoDB - это документоориентированная база данных с открытым исходным кодом, не требующая описания схемы. Вместо таблиц и строк, как в реляционных базах данных, MongoDB хранит данные в документах JSON-подобного формата (BSON - Binary JSON). 

**Преимущества MongoDB:**

- **Гибкость схемы:** Отсутствие жесткой схемы упрощает изменение структуры данных в процессе разработки.
- **Масштабируемость и производительность:** MongoDB хорошо масштабируется горизонтально и подходит для работы с большими объемами данных.
- **Поддержка геопространственных данных:** Встроенные функции работы с геопространственными данными делают MongoDB отличным выбором для приложений с географической привязкой.

### Установка MongoDB и драйвера Node.js

1. **Установка MongoDB:** Скачайте и установите MongoDB Community Edition с официального сайта [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community), следуя инструкциям для вашей операционной системы. 

2. **Установка драйвера Node.js для MongoDB:** Используйте npm для установки официального драйвера:

```bash
npm install mongodb
```

### Подключение к MongoDB

Для работы с MongoDB из Node.js приложения необходимо подключиться к серверу базы данных. 

```javascript
const { MongoClient } = require('mongodb');

// URL подключения к базе данных
const uri = "mongodb://localhost:27017"; 

// Имя базы данных
const dbName = 'test';

async function connectToDatabase() {
  try {
    // Создаем новый клиент MongoDB
    const client = new MongoClient(uri);

    // Подключаемся к серверу
    await client.connect();

    // Выбираем базу данных
    const db = client.db(dbName);

    console.log('Успешное подключение к базе данных!');

    return db;

  } catch (err) {
    console.error('Ошибка подключения к базе данных:', err);
  }
}

// Используем функцию подключения
connectToDatabase()
  .then(db => {
    // Выполняем операции с базой данных
    // ... 

    // Закрываем соединение
    db.close();
  });
```

В этом примере:

- `MongoClient` используется для создания клиента MongoDB.
- `uri` содержит URL подключения к базе данных. По умолчанию MongoDB использует порт `27017`.
- `dbName` указывает имя базы данных, к которой мы хотим подключиться.
- Функция `connectToDatabase()` асинхронно подключается к базе данных и возвращает объект `db`, который используется для дальнейшей работы.
- Обратите внимание на использование `await` для ожидания завершения асинхронных операций.

### Основные операции с документами

#### Вставка документов

```javascript
// Вставка одного документа
async function insertDocument(collectionName, document) {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);

  const result = await collection.insertOne(document);

  console.log(`Вставлен документ с ID: ${result.insertedId}`);
}

// Пример использования
const newDocument = { name: "Иван", age: 30, city: "Москва" };
insertDocument('users', newDocument);
```

В этом примере:

- `insertOne()` метод используется для вставки одного документа в коллекцию.
- `result.insertedId` содержит ID вставленного документа.

#### Чтение документов

```javascript
// Поиск всех документов
async function findAllDocuments(collectionName) {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);

  const documents = await collection.find({}).toArray();

  console.log("Найденные документы:");
  console.log(documents);
}

// Поиск документа по условию
async function findDocumentByQuery(collectionName, query) {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);

  const document = await collection.findOne(query);

  console.log("Найденный документ:");
  console.log(document);
}

// Пример использования
findAllDocuments('users');
findDocumentByQuery('users', { name: "Иван" });
```

В этом примере:

- `find()` метод используется для поиска документов по заданному условию. 
- Пустой объект `{}` в качестве условия означает поиск всех документов.
- `toArray()` метод преобразует курсор в массив документов.
- `findOne()` метод используется для поиска первого документа, удовлетворяющего условию.

#### Обновление документов

```javascript
// Обновление одного документа
async function updateDocument(collectionName, filter, update) {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);

  const result = await collection.updateOne(filter, update);

  console.log(`Обновлено документов: ${result.modifiedCount}`);
}

// Пример использования
const filter = { name: "Иван" };
const update = { $set: { age: 31 } };
updateDocument('users', filter, update);
```

В этом примере:

- `updateOne()` метод используется для обновления одного документа, удовлетворяющего условию `filter`.
- `$set` оператор используется для обновления значений полей.

#### Удаление документов

```javascript
// Удаление одного документа
async function deleteDocument(collectionName, filter) {
  const db = await connectToDatabase();
  const collection = db.collection(collectionName);

  const result = await collection.deleteOne(filter);

  console.log(`Удалено документов: ${result.deletedCount}`);
}

// Пример использования
const filter = { name: "Иван" };
deleteDocument('users', filter);
```

В этом примере:

- `deleteOne()` метод используется для удаления одного документа, удовлетворяющего условию `filter`.

### Заключение

В этой статье мы рассмотрели основы работы с MongoDB из Node.js приложения. Вы научились подключаться к базе данных, выполнять базовые операции с документами: вставку, чтение, обновление и удаление. Это лишь базовые возможности MongoDB. 

Более подробную информацию о MongoDB и драйвере Node.js можно найти в официальной документации:

- [https://www.mongodb.com/docs/](https://www.mongodb.com/docs/)
- [https://www.mongodb.com/docs/drivers/node/current/](https://www.mongodb.com/docs/drivers/node/current/)