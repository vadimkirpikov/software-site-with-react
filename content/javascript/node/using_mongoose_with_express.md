## Интеграция Mongoose в Express-приложение

Mongoose - это объектно-документная библиотека моделирования данных (ODM) для MongoDB и Node.js. Она предоставляет схему для моделирования данных приложения, упрощает взаимодействие с базой данных MongoDB и добавляет валидацию данных. В этом разделе мы рассмотрим, как интегрировать Mongoose в Express-приложение.

### Установка Mongoose

Для начала установим Mongoose с помощью npm:

```bash
npm install mongoose
```

### Подключение к базе данных

Перед использованием Mongoose необходимо подключиться к базе данных MongoDB. Для этого используйте метод `mongoose.connect()`:

```javascript
const mongoose = require('mongoose');

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключение к базе данных успешно установлено'))
  .catch(err => console.error('Ошибка подключения к базе данных:', err));
```

В этом примере мы подключаемся к локальной базе данных `mydatabase`. 

### Определение схемы и модели

Схема Mongoose определяет структуру документа в коллекции MongoDB. Модель - это скомпилированная версия схемы, которая используется для создания, обновления, удаления и запроса документов в коллекции.

```javascript
const mongoose = require('mongoose');

// Определение схемы
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: String,
});

// Создание модели
const Product = mongoose.model('Product', productSchema);
```

В этом примере мы определяем схему `productSchema` с полями `name`, `price` и `description`. Затем мы используем метод `mongoose.model()` для создания модели `Product` на основе этой схемы.

### Создание документа

Для создания нового документа используйте метод `create()` модели:

```javascript
const newProduct = new Product({
  name: 'Пример продукта',
  price: 100,
  description: 'Описание продукта',
});

newProduct.save()
  .then(product => console.log('Создан новый продукт:', product))
  .catch(err => console.error('Ошибка при создании продукта:', err));
```

В этом примере мы создаем новый экземпляр модели `Product`, заполняем его данными и сохраняем в базе данных с помощью метода `save()`.

### Чтение документов

Mongoose предоставляет множество методов для чтения документов из базы данных. Вот некоторые из них:

* `find()`: находит все документы, соответствующие запросу.
* `findById()`: находит документ по его ID.
* `findOne()`: находит первый документ, соответствующий запросу.

```javascript
// Найти все продукты
Product.find()
  .then(products => console.log('Все продукты:', products))
  .catch(err => console.error('Ошибка при получении продуктов:', err));

// Найти продукт по ID
Product.findById('646f938a5c5a9d868c2e705b')
  .then(product => console.log('Продукт по ID:', product))
  .catch(err => console.error('Ошибка при получении продукта:', err));
```

### Обновление документа

Для обновления документа используйте метод `findByIdAndUpdate()`:

```javascript
Product.findByIdAndUpdate('646f938a5c5a9d868c2e705b', {
  price: 120,
}, { new: true })
  .then(product => console.log('Обновленный продукт:', product))
  .catch(err => console.error('Ошибка при обновлении продукта:', err));
```

В этом примере мы находим продукт по ID и обновляем его цену. Опция `new: true` возвращает обновленный документ.

### Удаление документа

Для удаления документа используйте метод `findByIdAndDelete()`:

```javascript
Product.findByIdAndDelete('646f938a5c5a9d868c2e705b')
  .then(() => console.log('Продукт удален'))
  .catch(err => console.error('Ошибка при удалении продукта:', err));
```

### Использование Mongoose с Express

Теперь давайте посмотрим, как использовать Mongoose в Express-приложении. В следующем примере мы создадим простое API для управления продуктами.

```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключение к базе данных успешно установлено'))
  .catch(err => console.error('Ошибка подключения к базе данных:', err));

// Определение схемы продукта
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: String,
});

const Product = mongoose.model('Product', productSchema);

// Маршрут для получения всех продуктов
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Маршрут для создания нового продукта
app.post('/products', async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const newProduct = new Product({
      name,
      price,
      description,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
```

В этом примере мы создаем два маршрута: `/products` для получения всех продуктов и `/products` для создания нового продукта. 

Это всего лишь базовый пример использования Mongoose с Express. Mongoose предлагает гораздо больше возможностей, таких как валидация данных, middleware, populate и многое другое.