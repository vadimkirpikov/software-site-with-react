## Аутентификация и авторизация в Vue.js

Создание безопасного и функционального веб-приложения невозможно без реализации механизмов аутентификации и авторизации.  Аутентификация - это процесс проверки подлинности пользователя, а авторизация -  определение его прав доступа к ресурсам приложения. В этой статье мы рассмотрим, как реализовать эти механизмы в вашем Vue.js 3.3 приложении.

### Выбор стратегии аутентификации

Перед тем как писать код, определимся с выбором стратегии аутентификации. Существует несколько распространенных подходов:

**1. Сессионная аутентификация:**

*   **Принцип:** Сервер генерирует уникальную сессию для пользователя после успешной аутентификации и выдает cookie с идентификатором сессии. При каждом запросе клиент отправляет этот cookie, а сервер проверяет его валидность.
*   **Плюсы:** Простая реализация, широкая поддержка браузерами.
*   **Минусы:** Уязвимость к CSRF атакам, сложности с масштабированием.

**2. Токен-based аутентификация (JWT):**

*   **Принцип:** Сервер генерирует JSON Web Token (JWT) после успешной аутентификации. JWT содержит информацию о пользователе и его правах доступа. Клиент хранит токен и отправляет его в заголовке Authorization при каждом запросе.
*   **Плюсы:**  Высокая безопасность, хорошая масштабируемость, возможность хранения информации о пользователе в токене.
*   **Минусы:**  Требует более сложной реализации,  возможны проблемы с хранением токена на клиенте (localStorage vs. cookies).

В рамках данной статьи мы сфокусируемся на реализации **токен-based**  аутентификации с использованием JWT, так как этот подход является более современным и гибким.

### Создание бэкенда

Предполагается, что у вас уже есть бэкенд, отвечающий за аутентификацию и авторизацию. Если нет, вы можете быстро создать его, используя Node.js и Express:

```javascript
// server.js

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// В реальном приложении используйте более надежный секретный ключ
const SECRET_KEY = 'your_secret_key';

// Маршрут для регистрации
app.post('/api/register', (req, res) => {
    // Реализация логики регистрации
    // ...
});

// Маршрут для аутентификации
app.post('/api/login', (req, res) => {
    // Реализация логики аутентификации
    // ...

    // Генерация JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);

    res.json({ token });
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
```

### Реализация на Vue.js

Для работы с JWT на клиенте мы будем использовать библиотеку **jsonwebtoken**:

```bash
npm install jsonwebtoken
```

Создайте сервис для работы с аутентификацией:

```javascript
// src/services/AuthService.js

import jwtDecode from 'jsonwebtoken';

const API_URL = 'http://localhost:3000/api';

class AuthService {
    async login(username, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            this.setToken(data.token);
            return data;
        } else {
            throw new Error(data.message);
        }
    }

    logout() {
        localStorage.removeItem('token');
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getLoggedInUser() {
        const token = this.getToken();
        return token ? jwtDecode(token) : null;
    }
}

export default new AuthService();
```

В этом сервисе мы:

1.  Отправляем POST-запрос на бэкенд для аутентификации.
2.  Сохраняем JWT в localStorage после успешной аутентификации.
3.  Предоставляем методы для получения, установки и удаления токена.
4.  Реализуем метод `getLoggedInUser` для получения информации о пользователе из JWT.

### Создание компонентов

Создайте компоненты для входа и регистрации:

```vue
// src/components/LoginForm.vue

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">Имя пользователя:</label>
      <input type="text" id="username" v-model="username" />
    </div>
    <div>
      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" />
    </div>
    <button type="submit">Войти</button>
  </form>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await AuthService.login(this.username, this.password);
        // Перенаправление на защищенный маршрут
        this.$router.push('/profile'); 
      } catch (error) {
        console.error(error);
        // Обработка ошибки
      }
    },
  },
};
</script>
```

```vue
// src/components/RegistrationForm.vue

// Аналогично LoginForm.vue, но с другим методом handleSubmit, 
// отправляющим POST-запрос на /api/register
```

### Защита маршрутов

Для защиты маршрутов, требующих аутентификации, используйте глобальный навигационный защитник:

```javascript
// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import AuthService from '@/services/AuthService';

const routes = [
  {
    path: '/login',
    component: () => import('@/components/LoginForm.vue'),
  },
  {
    path: '/register',
    component: () => import('@/components/RegistrationForm.vue'),
  },
  {
    path: '/profile',
    component: () => import('@/components/Profile.vue'),
    meta: { requiresAuth: true }, 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !AuthService.getLoggedInUser()) {
    next('/login'); 
  } else {
    next();
  }
});

export default router;
```

В этом примере мы защитили маршрут `/profile`.  Если пользователь не аутентифицирован, он будет перенаправлен на страницу входа.

### Вывод

В этой статье мы рассмотрели основные принципы реализации аутентификации и авторизации в Vue.js 3.3 приложении.  Мы выбрали токен-based подход с использованием JWT и реализовали базовые функции для входа, выхода и защиты маршрутов.  Надеемся, эта информация поможет вам создать безопасное и удобное приложение для ваших пользователей. 
