## Извлечение данных из MongoDB

В этом разделе мы рассмотрим, как извлекать данные из базы данных MongoDB в приложении Node.js. Предполагается, что у вас уже установлен MongoDB и Node.js версии 21.

### Подключение к MongoDB

Первым шагом является установка драйвера MongoDB для Node.js и подключение к базе данных. Используйте `npm` для установки драйвера:

```bash
npm install mongodb
```

Затем импортируйте необходимый класс `MongoClient` и создайте новый объект клиента:

```javascript
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017"; // замените на вашу строку подключения
const client = new MongoClient(uri);
```

В коде выше `uri` - это строка подключения к вашей базе данных. Замените `localhost:27017` на адрес и порт вашего сервера MongoDB. 

### Получение данных из коллекции

После подключения к MongoDB можно получать данные из коллекций.  

#### Подключение к коллекции

Получите ссылку на базу данных и коллекцию, из которой нужно извлечь данные:

```javascript
const dbName = 'myDatabase'; // название вашей базы данных
const collectionName = 'myCollection'; // название вашей коллекции

const db = client.db(dbName);
const collection = db.collection(collectionName);
```

#### Метод `find()`

Метод `find()` используется для поиска документов в коллекции. 

##### Получение всех документов

Для получения всех документов из коллекции вызовите `find()` без аргументов:

```javascript
async function findAllDocuments() {
  try {
    await client.connect(); 

    const result = await collection.find({}).toArray(); // получаем все документы

    console.log(result); 

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

findAllDocuments();
```

В этом примере `find({})` возвращает курсор на все документы в коллекции. Метод `toArray()` преобразует курсор в массив документов.

##### Фильтрация документов

Для поиска документов по определенным критериям передайте объект с критериями в метод `find()`:

```javascript
async function findSpecificDocuments() {
  try {
    await client.connect(); 

    const query = { name: "John" }; // ищем документы, где поле "name" равно "John"
    const result = await collection.find(query).toArray(); 

    console.log(result); 

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

findSpecificDocuments();
```

##### Операторы сравнения

MongoDB поддерживает различные операторы сравнения для фильтрации документов:

| Оператор   | Описание                                          |
|------------|---------------------------------------------------|
| `$eq`      | Равно                                              |
| `$ne`      | Не равно                                           |
| `$gt`      | Больше чем                                         |
| `$lt`      | Меньше чем                                         |
| `$gte`     | Больше или равно                                |
| `$lte`     | Меньше или равно                                |
| `$in`      | Соответствует любому значению в массиве       |
| `$nin`     | Не соответствует ни одному значению в массиве |

Пример использования оператора `$gt`:

```javascript
const query = { age: { $gt: 18 } }; // ищем документы, где поле "age" больше 18
```

#### Метод `findOne()`

Метод `findOne()` используется для поиска одного документа, соответствующего указанным критериям. 

```javascript
async function findOneDocument() {
  try {
    await client.connect(); 

    const query = { name: "Jane" }; 
    const result = await collection.findOne(query); 

    console.log(result); 

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

findOneDocument();
```

Если не найден ни один документ, соответствующий запросу, `findOne()` вернет `null`. 

### Заключение

В этом разделе мы рассмотрели основные способы извлечения данных из MongoDB с помощью драйвера Node.js.  Более подробная информация о доступных методах и опциях доступна в [документации MongoDB](https://www.mongodb.com/docs/). 
