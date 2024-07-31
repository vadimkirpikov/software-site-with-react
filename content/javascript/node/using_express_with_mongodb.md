## Работа с MongoDB в Express.js

В этой части руководства мы рассмотрим, как интегрировать базу данных MongoDB в ваши Express.js приложения. MongoDB - это популярная NoSQL база данных, которая отлично подходит для хранения и обработки больших объемов неструктурированных данных. Вместе с Express.js она предоставляет мощную основу для разработки современных веб-приложений.

### Настройка проекта

1. **Установка зависимостей**: Для начала установим необходимые пакеты npm:

```bash
npm install express mongodb body-parser
```

  - `express`: Фреймворк для создания веб-приложений.
  - `mongodb`: Официальный драйвер Node.js для MongoDB.
  - `body-parser`: Middleware для Express, который парсит тела запросов в удобный для использования объект.

2. **Создание базового сервера Express.js**: Создайте файл `index.js` и добавьте следующий код:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017"; // Замените на ваш URI подключения к MongoDB

app.use(bodyParser.json());

// Подключаемся к базе данных
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Подключено к MongoDB!');
    const db = client.db('mydatabase'); // Замените 'mydatabase' на имя вашей базы данных
    const collection = db.collection('users'); // Замените 'users' на имя вашей коллекции

    // Здесь будут размещаться маршруты для работы с базой данных

    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  })
  .catch(error => console.error(error));
```

  В этом коде мы:

  - Импортируем необходимые модули.
  - Создаем экземпляр приложения Express.
  - Настраиваем `body-parser` для парсинга JSON.
  - Подключаемся к базе данных MongoDB, используя URI подключения и указанные опции.
  - Получаем ссылку на базу данных и коллекцию.
  - Запускаем сервер и выводим сообщение в консоль.

### Создание маршрутов для работы с данными

Теперь давайте добавим маршруты для выполнения основных CRUD операций (Create, Read, Update, Delete) с нашей коллекцией `users`:

```javascript
// ... (предыдущий код)

// Создание нового пользователя
app.post('/users', (req, res) => {
  collection.insertOne(req.body)
    .then(result => {
      res.status(201).send({ message: 'Пользователь успешно создан!', id: result.insertedId });
    })
    .catch(error => {
      res.status(500).send({ message: 'Ошибка при создании пользователя', error });
    });
});

// Получение всех пользователей
app.get('/users', (req, res) => {
  collection.find({}).toArray()
    .then(users => {
      res.send(users);
    })
    .catch(error => {
      res.status(500).send({ message: 'Ошибка при получении пользователей', error });
    });
});

// Получение пользователя по ID
app.get('/users/:id', (req, res) => {
  collection.findOne({ _id: new mongodb.ObjectId(req.params.id) })
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch(error => {
      res.status(500).send({ message: 'Ошибка при получении пользователя', error });
    });
});

// Обновление пользователя
app.put('/users/:id', (req, res) => {
  collection.updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: req.body })
    .then(result => {
      if (result.modifiedCount > 0) {
        res.send({ message: 'Пользователь успешно обновлен!' });
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch(error => {
      res.status(500).send({ message: 'Ошибка при обновлении пользователя', error });
    });
});

// Удаление пользователя
app.delete('/users/:id', (req, res) => {
  collection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) })
    .then(result => {
      if (result.deletedCount > 0) {
        res.send({ message: 'Пользователь успешно удален!' });
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch(error => {
      res.status(500).send({ message: 'Ошибка при удалении пользователя', error });
    });
});

// ... (код запуска сервера)
```

### Объяснение кода маршрутов

- Каждый маршрут обрабатывает HTTP-запрос определенного типа (POST, GET, PUT, DELETE) и пути.
- Внутри каждого маршрута мы используем методы драйвера MongoDB (`insertOne`, `find`, `findOne`, `updateOne`, `deleteOne`) для взаимодействия с базой данных.
- Мы обрабатываем результаты запросов к базе данных и отправляем соответствующие ответы клиенту с помощью объекта `res`.

### Запуск и тестирование приложения

1. Запустите приложение командой `node index.js`.
2. Вы можете использовать инструменты, такие как Postman или curl, для отправки HTTP-запросов к вашему API и тестирования созданных маршрутов.

### Заключение

В этой части руководства мы рассмотрели базовые принципы работы с MongoDB в приложении Express.js. Вы узнали, как подключиться к базе данных, создавать маршруты для выполнения CRUD операций и обрабатывать результаты запросов. 

Это лишь основы, и MongoDB предлагает множество других возможностей для работы с данными. Рекомендуем обратиться к официальной документации MongoDB и Express.js для более глубокого изучения.
