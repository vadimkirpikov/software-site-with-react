## Аутентификация API в Next.js

Приложения Next.js часто взаимодействуют с API для получения и отправки данных. Защита этих API с помощью аутентификации имеет решающее значение для обеспечения безопасности данных и функциональности приложения. В этой статье мы рассмотрим, как реализовать аутентификацию API в приложении Next.js с использованием JWT (JSON Web Tokens).

### Что такое JWT?

JWT - это стандартный отраслевой метод безопасной передачи информации между сторонами в виде JSON-объекта. JWT состоит из трех частей:

- **Заголовок**: Содержит информацию о типе токена и алгоритме шифрования.
- **Полезная нагрузка (Payload)**: Содержит информацию, которая передается в токене, например, идентификатор пользователя, роли и время истечения срока действия.
- **Подпись**: Используется для проверки целостности токена и подтверждения того, что он не был изменен.

### Реализация аутентификации API с использованием JWT

Рассмотрим пошаговую реализацию аутентификации API с помощью JWT в Next.js:

**1. Настройка серверной части API:**

Предположим, у нас есть следующий код серверной части API на Node.js с использованием Express.js:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Секретный ключ для подписи JWT
const secretKey = 'your_secret_key';

// Роут для аутентификации
app.post('/api/login', (req, res) => {
  // Проверка учетных данных пользователя
  const { username, password } = req.body;

  // В реальном приложении здесь будет проверка базы данных
  if (username === 'user' && password === 'password') {
    // Создание JWT
    const token = jwt.sign({ userId: 1, username: 'user' }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Неверные учетные данные' });
  }
});

// Защищенный роут
app.get('/api/profile', authenticateToken, (req, res) => {
  // Получение информации о пользователе из JWT
  const { userId, username } = req.user;

  res.json({ userId, username });
});

// Функция промежуточного ПО для проверки JWT
function authenticateToken(req, res, next) {
  // Получение токена из заголовка авторизации
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Отсутствует токен авторизации' });
  }

  // Проверка и декодирование JWT
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Недействительный токен' });
    }

    // Сохранение информации о пользователе в запросе
    req.user = user;
    next();
  });
}

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
```

**2. Создание клиента API в Next.js:**

Создадим простой клиент API в Next.js:

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Функция для установки токена авторизации в заголовок запроса
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
```

**3. Реализация страниц входа и профиля:**

Создадим страницы входа и профиля:

```javascript
// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await apiClient.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Имя пользователя:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Войти</button>
    </form>
  );
}
```

```javascript
// pages/profile.js
import { useEffect, useState } from 'react';
import apiClient from '../lib/api';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/profile');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Профиль</h1>
      {user ? (
        <div>
          <p>Идентификатор пользователя: {user.userId}</p>
          <p>Имя пользователя: {user.username}</p>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
```

В этом примере мы создали простую систему аутентификации API с использованием JWT в Next.js. 

**Важно:** Хранение токена в localStorage подходит только для демонстрационных целей. В реальном приложении рекомендуется использовать более безопасный способ хранения токена, например, HTTP-only cookies.

### Заключение

Аутентификация API - важный аспект безопасности приложений Next.js. JWT предоставляет безопасный и стандартизированный способ аутентификации пользователей и защиты API. 

В этой статье мы рассмотрели основы реализации аутентификации API с помощью JWT в Next.js. Более сложные сценарии могут потребовать дополнительных мер безопасности и более надежных методов хранения токенов. 
