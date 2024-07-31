## Встроенная аутентификация в Next.js

Next.js, фреймворк для создания серверных приложений React, предлагает встроенные механизмы аутентификации, упрощающие реализацию защищенных маршрутов и управление сеансами пользователей.

### Основные принципы

В основе аутентификации Next.js лежит концепция **Middleware**. Middleware — это функции, которые перехватывают запрос до того, как он достигнет обработчика маршрута. Это позволяет проверять наличие авторизации, перенаправлять неавторизованных пользователей или извлекать данные пользователя из сеанса.

### Реализация аутентификации

Рассмотрим пошаговую реализацию простой системы аутентификации в приложении Next.js 14.0.0:

1. **Создание Middleware:**

   Создайте файл `middleware.js` в корневой директории приложения:

   ```javascript
   import { NextResponse } from 'next/server';

   export const middleware = async (request) => {
     // Пример: проверка наличия куки 'token'
     const token = request.cookies.get('token')?.value;

     if (token) {
       // Пользователь аутентифицирован
       return NextResponse.next();
     } else {
       // Перенаправление на страницу входа
       return NextResponse.redirect(new URL('/login', request.url));
     }
   };

   // Укажите пути, к которым будет применяться Middleware
   export const config = {
     matcher: ['/profile'], // Применяем Middleware к странице профиля
   };
   ```

   В этом примере Middleware проверяет наличие куки `token`. Если кука существует, пользователь считается аутентифицированным, и запрос передается дальше. В противном случае пользователь перенаправляется на страницу входа.

2. **Создание страницы входа:**

   Создайте страницу `/login` с формой входа:

   ```javascript
   'use client';

   import { useState } from 'react';

   export default function LoginPage() {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const handleSubmit = async (event) => {
       event.preventDefault();

       // Отправка запроса на сервер для аутентификации
       const response = await fetch('/api/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ username, password }),
       });

       // Обработка ответа сервера
       if (response.ok) {
         // Установка куки 'token' в браузере
         document.cookie = `token=${await response.text()}; path=/`;

         // Перенаправление на защищенную страницу
         window.location.href = '/profile';
       } else {
         // Отображение ошибки аутентификации
         alert('Неверный логин или пароль');
       }
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

3. **Обработка аутентификации на сервере:**

   Создайте API-маршрут `/api/login` для обработки запросов аутентификации:

   ```javascript
   import { NextApiRequest, NextApiResponse } from 'next';

   export default async function handler(req, res) {
     if (req.method === 'POST') {
       const { username, password } = req.body;

       // Проверка логина и пароля (замените на свою логику)
       if (username === 'admin' && password === 'password') {
         // Генерация токена (замените на свою логику)
         const token = 'your-secret-token';

         // Отправка токена в ответе
         res.status(200).send(token);
       } else {
         res.status(401).json({ message: 'Неверный логин или пароль' });
       }
     } else {
       res.status(405).end();
     }
   }
   ```

4. **Защищенная страница:**

   Создайте страницу `/profile`, доступ к которой разрешен только авторизованным пользователям:

   ```javascript
   'use client';

   export default function ProfilePage() {
     return (
       <div>
         <h1>Добро пожаловать в профиль!</h1>
       </div>
     );
   }
   ```

   Благодаря Middleware, определенной в первом шаге, доступ к этой странице будет возможен только при наличии куки `token`.

Это базовый пример реализации аутентификации в Next.js. Существуют более сложные сценарии, которые могут включать использование библиотек управления состоянием, сторонних провайдеров аутентификации и JWT. 
