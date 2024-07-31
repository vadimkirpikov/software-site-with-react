## Загрузка файлов с помощью Multer

Часто в веб-приложениях требуется реализовать функционал загрузки файлов. Будь то загрузка изображения профиля, отправка документа или публикация видео, обработка файлов является неотъемлемой частью многих современных веб-сервисов. 

В Node.js, для работы с HTTP-запросами, используется модуль `http`.  Однако, он не предоставляет удобных инструментов для обработки многокомпонентных форм, которые используются при загрузке файлов. 

Для упрощения работы с загрузкой файлов в Node.js,  используется библиотека **Multer**.  Multer - это middleware для Express.js, который разбирает multipart/form-data запросы и предоставляет удобный доступ к загруженным файлам.

### Установка Multer

Перед началом работы необходимо установить Multer в ваш проект. Вы можете сделать это с помощью npm или yarn:

```bash
npm install multer
```

### Подключение и базовая настройка Multer

Для начала, подключите Multer в ваш проект и создайте экземпляр объекта `multer`. Далее, с помощью метода `.single()`, укажите имя поля в HTML-форме, которое будет использоваться для загрузки файла: 

```javascript
const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // 'uploads/' - папка для сохранения

const app = express();

app.post('/profile', upload.single('avatar'), (req, res) => {
  // req.file - объект с информацией о загруженном файле
  res.send('Файл загружен!');
});

app.listen(3000);
```

В этом примере: 

* `upload.single('avatar')`  указывает, что ожидается один файл с именем поля 'avatar' в HTML-форме.
* `dest: 'uploads/'`  -  указывает папку, куда будут сохраняться загруженные файлы. 

### Доступ к информации о загруженном файле

Multer сохраняет информацию о загруженном файле в объекте `req.file`. 
Основные свойства объекта `req.file`:

| Свойство | Описание |
|---|---|
| `fieldname`  | Имя поля в форме |
| `originalname`  | Исходное имя файла |
| `encoding`  | Кодировка файла |
| `mimetype`  | MIME-тип файла |
| `destination` | Путь к папке, куда сохранен файл |
| `filename` | Имя файла, сгенерированное Multer |
| `path` | Полный путь к загруженному файлу |
| `size` | Размер файла в байтах |

```javascript
app.post('/profile', upload.single('avatar'), (req, res) => {
  console.log(req.file); 
  res.send('Файл загружен!');
});
```

###  Обработка нескольких файлов

Для загрузки нескольких файлов используйте метод `.array()`. В качестве первого аргумента укажите имя поля в форме, а вторым аргументом - максимальное количество файлов:

```javascript
// ...
app.post('/photos', upload.array('photos', 12), (req, res) => {
  // req.files - массив объектов с информацией о загруженных файлах
  console.log(req.files); 
  res.send('Файлы загружены!');
});
```

###  Настройка имени файла

По умолчанию, Multer генерирует случайное имя для загруженного файла.  Для настройки имени используйте опцию `storage` с объектом `diskStorage`:

```javascript
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    // Генерируем имя файла:  исходное_имя-текущая_дата.расширение
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });
```

### Валидация файлов

Multer позволяет валидировать загружаемые файлы по типу, размеру и другим параметрам.  Для этого используйте опцию `fileFilter`:

```javascript
const fileFilter = (req, file, cb) => {
  // разрешаем загрузку только изображений
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Допустима загрузка только изображений!'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});
```

### Обработка ошибок

При загрузке файла могут возникнуть ошибки, например, превышение максимально допустимого размера файла. Multer передает информацию об ошибках через объект `err`. 

Обработать ошибки можно с помощью middleware:

```javascript
app.post('/profile', upload.single('avatar'), (req, res, next) => {
  // ...
}, 
(error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    res.status(400).send(error.message);
  } else {
    res.status(500).send('Ошибка сервера');
  }
});
```

Это лишь базовые примеры работы с Multer.  Библиотека предоставляет множество других опций и возможностей для гибкой настройки загрузки и обработки файлов.  Подробную информацию вы можете найти в официальной документации Multer:  [https://www.npmjs.com/package/multer](https://www.npmjs.com/package/multer) 
