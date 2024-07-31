## Настройка Multer для обработки файлов в Node.js

Multer - это популярный middleware для Express.js, который упрощает обработку multipart/form-data запросов, обычно используемых для загрузки файлов. Он предоставляет простой и удобный способ доступа к загруженным файлам,  их валидации и сохранения.

### Установка Multer

Для начала работы с Multer, его необходимо установить в ваш проект. Откройте терминал и выполните следующую команду:

```bash
npm install multer
```

### Подключение и базовая настройка

После установки Multer можно подключить к вашему Express приложению. Для этого импортируйте модуль и создайте экземпляр объекта `multer`, указав желаемые опции.

```javascript
const express = require('express');
const multer = require('multer');

const app = express();

// Настройка хранилища файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Указываем папку для сохранения файлов
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Генерируем уникальное имя файла
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Создание middleware multer с указанными настройками
const upload = multer({ storage: storage });

// Пример использования multer для обработки загрузки одного файла
app.post('/upload', upload.single('avatar'), (req, res) => {
  // Доступ к загруженному файлу через req.file
  console.log(req.file); 
  res.send('Файл загружен!');
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
```

В этом примере мы настроили Multer на сохранение файлов в папку "uploads" с уникальным именем, сгенерированным на основе текущей даты и времени. Затем мы создали middleware `upload.single('avatar')`, которое обрабатывает загрузку одного файла с полем формы "avatar". 

### Опции конфигурации Multer

Multer предоставляет ряд опций для настройки его поведения. Рассмотрим некоторые из них:

**1. `storage`**

Эта опция определяет, где и как будут сохраняться загруженные файлы.  Существуют два встроенных типа хранилищ:

   * **`multer.diskStorage`**: Сохраняет файлы на диск. Принимает два параметра:
      *  `destination`: Функция, определяющая папку для сохранения файлов.
      *  `filename`: Функция, генерирующая уникальное имя файла.
   * **`multer.memoryStorage`**: Хранит файлы в памяти (буфере). Полезно для небольших файлов, которые нужно обработать быстро.

**2. `limits`**

Позволяет ограничить размер загружаемых файлов. Принимает объект с параметрами:

   * `fileSize`: Максимальный размер файла в байтах.
   * `files`: Максимальное количество загружаемых файлов. 
   * `fields`: Максимальное количество полей формы.
   * `parts`: Максимальное количество частей в multipart/form-data запросе.
   * `headerPairs`: Максимальное количество пар заголовков.

**3. `fileFilter`**

Позволяет фильтровать загружаемые файлы по типу, расширению и другим параметрам. 

```javascript
const fileFilter = (req, file, cb) => {
  // Разрешаем только загрузку изображений
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Допустимы только изображения!'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter 
});
```

### Обработка ошибок

Важно обрабатывать ошибки, которые могут возникнуть во время загрузки файлов. Multer предоставляет объект `err` в коллбэке для обработки ошибок.

```javascript
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  } else if (!req.file) {
    return res.status(400).send('Файл не выбран!');
  }

  // Обработка загруженного файла
});
```

### Загрузка нескольких файлов

Multer позволяет загружать несколько файлов одновременно. Для этого используются методы `upload.array()` и `upload.fields()`. 

**`upload.array(fieldName, maxCount)`:**  Загружает массив файлов с одним именем поля.

```javascript
app.post('/upload-multiple', upload.array('photos', 3), (req, res) => {
  // Доступ к массиву файлов через req.files
  console.log(req.files);
  res.send('Файлы загружены!');
});
```

**`upload.fields(fields)`:** Позволяет загружать файлы с разными именами полей. 

```javascript
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/upload-profile', cpUpload, (req, res) => {
  // Доступ к файлам по имени поля
  console.log(req.files.avatar); 
  console.log(req.files.gallery); 
  res.send('Файлы профиля загружены!');
});
```

### Заключение

Multer - это мощный и простой в использовании инструмент для обработки загрузки файлов в Node.js приложениях. Он предоставляет гибкую конфигурацию, позволяющую настроить процесс загрузки файлов под ваши нужды. В этой статье мы рассмотрели основные возможности Multer, но библиотека предлагает еще больше функций для более сложных сценариев.
