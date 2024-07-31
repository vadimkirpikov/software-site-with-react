## Регистрация, вход и выход

Безопасная аутентификация пользователей — критически важная часть практически любого веб-приложения.  В этом разделе мы рассмотрим, как реализовать базовые функции регистрации, входа и выхода в приложении Next.js версии 14.0.0. 

**Важно:** Представленный здесь подход является базовым примером. В реальных приложениях рекомендуется использовать более надежные методы аутентификации и авторизации, такие как JWT (JSON Web Token) и OAuth 2.0.

###  1. Создание формы регистрации

Первым шагом создадим форму регистрации. Она позволит пользователям вводить свои данные для создания учетной записи.

```jsx
// components/RegistrationForm.jsx
"use client";

import { useState } from 'react';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Здесь будет логика отправки данных формы на сервер
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
```

В этом коде мы используем хук `useState` для управления состоянием формы. Функция `handleSubmit` будет вызываться при отправке формы. 

### 2. Обработка данных регистрации на сервере

Далее, нам нужно обработать данные формы на сервере. Для этого создадим API-маршрут:

```javascript
// pages/api/register.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // Здесь будет логика сохранения пользователя в базе данных
      console.log('Регистрация пользователя:', username, password);

      res.status(201).json({ message: 'Пользователь успешно зарегистрирован!' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
```

Этот код проверяет, что запрос является POST-запросом, затем извлекает данные пользователя из тела запроса. В реальном приложении здесь вы будете взаимодействовать с базой данных для сохранения данных пользователя.

### 3. Создание формы входа

Форма входа будет похожа на форму регистрации:

```jsx
// components/LoginForm.jsx
"use client";

import { useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Здесь будет логика отправки данных формы на сервер
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Имя пользователя:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Войти</button>
    </form>
  );
}
```

### 4. Обработка данных входа на сервере

Создадим API-маршрут для обработки данных формы входа:

```javascript
// pages/api/login.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      // Здесь будет логика проверки пользователя в базе данных
      console.log('Вход пользователя:', username, password);

      res.status(200).json({ message: 'Вход выполнен!' });
    } catch (error) {
      res.status(401).json({ message: 'Неверные имя пользователя или пароль' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
```

Этот код проверяет, что запрос является POST-запросом, затем извлекает данные пользователя из тела запроса. В реальном приложении здесь вы будете проверять  имя пользователя и пароль в базе данных.

### 5.  Реализация выхода

Реализовать выход можно, очистив данные сессии пользователя. В упрощенном варианте можно просто удалить куки или данные локального хранилища, связанные с аутентификацией.

### Заключение

В этой статье мы рассмотрели базовые принципы реализации регистрации, входа и выхода в приложении Next.js. Помните, что это лишь отправная точка, и в реальных приложениях вам потребуется более надежная система аутентификации. 
