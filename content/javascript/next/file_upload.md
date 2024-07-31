## Загрузка файлов в Next.js

Загрузка файлов является важной частью многих веб-приложений. Будь то загрузка аватара пользователя, добавление изображений в блог или отправка документов, понимание того, как обрабатывать файлы в Next.js, необходимо для создания полнофункциональных приложений.

### Встроенная обработка файлов API Routes

Next.js упрощает обработку загрузки файлов с помощью API Routes. API Routes - это функции, которые находятся в папке `pages/api` и позволяют создавать серверные API-маршруты в вашем приложении Next.js.

**Шаг 1: Создание API Route**

Создайте новый файл `pages/api/upload.js` и добавьте следующий код:

```javascript
export const config = {
  api: {
    bodyParser: false, // Отключаем встроенный bodyParser
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Обработка загрузки файла (подробнее ниже)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при загрузке файла' });
    }
  } else {
    res.status(405).end(); // Метод не разрешен
  }
}
```

В этом коде мы:

- Отключаем встроенный `bodyParser` для самостоятельной обработки тела запроса.
- Создаем обработчик `handler`, который принимает объект запроса (`req`) и объект ответа (`res`).
- Обрабатываем только запросы `POST` и возвращаем ошибку 405 (Method Not Allowed) для других методов.

**Шаг 2: Обработка загрузки файла**

Для обработки загрузки файла мы будем использовать библиотеку `formidable`. Установите ее с помощью npm или yarn:

```bash
npm install formidable
```

Добавьте следующий код внутри блока `try` в `pages/api/upload.js`:

```javascript
import formidable from 'formidable';
import fs from 'fs';

// ...

const form = new formidable.IncomingForm();

form.parse(req, async (err, fields, files) => {
  if (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при обработке формы' });
    return;
  }

  const file = files.file; // Получаем загруженный файл

  if (!file) {
    res.status(400).json({ message: 'Файл не найден' });
    return;
  }

  const data = fs.readFileSync(file.filepath); // Читаем файл

  // ... Сохранение файла (подробнее ниже)

  res.status(200).json({ message: 'Файл успешно загружен' });
});
```

Здесь мы:

- Создаем экземпляр `formidable.IncomingForm()`.
- Используем `form.parse()` для обработки запроса и получения полей формы и файлов.
- Получаем загруженный файл из объекта `files`.
- Читаем содержимое файла с помощью `fs.readFileSync()`.
- Отправляем ответ с сообщением об успехе.

**Шаг 3: Сохранение файла**

Существует множество способов сохранить загруженный файл. Вы можете сохранить его в файловой системе сервера, загрузить в облачное хранилище или обработать другим способом.

**Пример: сохранение файла в папке `public`:**

```javascript
// ...

const newPath = `${process.cwd()}/public/uploads/${file.originalFilename}`;

fs.writeFileSync(newPath, data);

// ...
```

В этом примере мы:

- Создаем путь к новому файлу в папке `public/uploads`.
- Записываем данные файла в новый файл с помощью `fs.writeFileSync()`.

**Шаг 4: Создание формы загрузки на стороне клиента**

Создайте компонент React, который будет отображать форму загрузки:

```javascript
'use client'; // Для использования FormData API

import React, { useState } from 'react';

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleChange} />
      <button type="submit">Загрузить</button>
    </form>
  );
}
```

В этом компоненте мы:

- Используем `useState` для хранения выбранного файла.
- Создаем обработчик `handleSubmit`, который отправляет форму на API Route.
- Создаем обработчик `handleChange`, который обновляет состояние при выборе файла.
- Отображаем форму с полем `input` типа `file` и кнопкой отправки.

**Заключение**

Это базовый пример загрузки файлов в Next.js. Вы можете настроить этот код для своих нужд, добавляя валидацию, обработку ошибок, интеграцию с облачным хранилищем и другие функции. 

Помните, что загрузка файлов - это операция, которая выполняется на стороне сервера. API Routes в Next.js предоставляют простой и эффективный способ обработки загрузки файлов, позволяя вам сосредоточиться на создании отличных пользовательских интерфейсов.
