## Маршруты для API в Next.js

Next.js предоставляет встроенную поддержку для создания API-маршрутов, что позволяет вам легко обрабатывать серверные функции, такие как обработка данных форм, взаимодействие с базами данных и многое другое, не прибегая к настройке отдельного сервера. 

### Основы API-маршрутов

API-маршруты определяются путем создания файлов JavaScript или TypeScript внутри папки `pages/api` в вашем проекте Next.js. Каждый файл в этой папке становится конечной точкой API, соответствующей своему имени файла. 

Например, файл `pages/api/hello.js` будет доступен по адресу `/api/hello`.

Вот простой пример API-маршрута, который возвращает JSON-ответ:

```javascript
// pages/api/hello.js

export default function handler(req, res) {
  res.status(200).json({ message: 'Привет из API!' });
}
```

В этом примере:
- `handler` - это функция-обработчик, которая принимает два аргумента: `req` (объект запроса) и `res` (объект ответа).
- `res.status(200)` устанавливает код состояния HTTP 200 (OK).
- `res.json()` отправляет JSON-ответ с сообщением.

### Обработка HTTP-методов

API-маршруты Next.js могут обрабатывать все стандартные HTTP-методы, такие как GET, POST, PUT, DELETE и др. Вы можете определить, какой метод используется, проверив свойство `req.method` в функции-обработчике.

Вот пример обработки запросов GET и POST:

```javascript
// pages/api/users.js

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Обработка запроса GET
    res.status(200).json({ users: ['Пользователь 1', 'Пользователь 2'] });
  } else if (req.method === 'POST') {
    // Обработка запроса POST
    const newUser = req.body.user;
    res.status(201).json({ message: `Пользователь ${newUser} добавлен!` });
  } else {
    res.status(405).end(); // Метод не разрешен
  }
}
```

### Доступ к данным запроса

Next.js предоставляет доступ к данным запроса через объект `req`. Вот некоторые полезные свойства:

- `req.method`: HTTP-метод запроса (GET, POST и др.)
- `req.body`: Тело запроса (для POST, PUT и др.)
- `req.query`: Параметры строки запроса
- `req.headers`: Заголовки запроса
- `req.cookies`: Файлы cookie запроса

### Ответы API

Объект `res` используется для отправки ответов с вашего API-маршрута. Вот некоторые часто используемые методы:

- `res.status(statusCode)`: Устанавливает код состояния HTTP.
- `res.json(data)`: Отправляет JSON-ответ.
- `res.send(data)`: Отправляет текстовый ответ.
- `res.redirect(url)`: Перенаправляет пользователя на другой URL.

### Пример использования API-маршрута

Давайте рассмотрим пример использования API-маршрута для создания простого приложения для заметок:

1. **Создание API-маршрута для получения всех заметок:**

```javascript
// pages/api/notes.js

const notes = ['Заметка 1', 'Заметка 2'];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(notes);
  } 
}
```

2. **Создание API-маршрута для добавления новой заметки:**

```javascript
// pages/api/notes.js

// ... (предыдущий код)

  else if (req.method === 'POST') {
    const newNote = req.body.note;
    notes.push(newNote);
    res.status(201).json({ message: 'Заметка добавлена!' });
  } 
```

3. **Использование API-маршрутов в компоненте Next.js:**

```javascript
// pages/index.js

import { useState, useEffect } from 'react';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note: newNote }),
    });
    if (res.ok) {
      setNewNote('');
      setNotes([...notes, newNote]);
    }
  };

  return (
    <div>
      <h1>Мои заметки</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newNote} 
          onChange={e => setNewNote(e.target.value)} 
        />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}
```

Это простой пример, демонстрирующий использование API-маршрутов Next.js. Вы можете использовать эту мощную функцию для создания сложных серверных приложений, обрабатывающих данные, взаимодействующих с базами данных и выполняющих другие серверные операции.
