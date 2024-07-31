## Защита от CSRF в Next.js

Межсайтовая подделка запроса (CSRF) - это тип веб-уязвимости, при которой злоумышленник отправляет вредоносный запрос от имени пользователя, не подозревающего об этом. Next.js предоставляет встроенные механизмы и рекомендации, которые помогут защитить ваше приложение от CSRF-атак.

### Понимание CSRF

Представьте себе пользователя, вошедшего в систему своего интернет-банка. Злоумышленник может создать вредоносную веб-страницу с формой, которая при отправке выполняет перевод средств с учетной записи пользователя на счет злоумышленника. Если пользователь посетит эту страницу, пока он все еще авторизован в своем интернет-банке, браузер автоматически отправит файл cookie аутентификации вместе с вредоносным запросом. Банковский сервер, получив запрос, увидит файл cookie аутентификации и выполнит перевод, полагая, что это легитимный запрос от пользователя.

### Защита с помощью CSRF токена

Один из наиболее распространенных способов предотвращения CSRF-атак заключается в использовании CSRF-токена. CSRF-токен - это уникальный, непредсказуемый и непроверяемый токен, создаваемый на стороне сервера и передаваемый клиенту. Этот токен включается во все формы и AJAX-запросы, отправляемые серверу. Сервер проверяет наличие и действительность этого токена при обработке запроса. Если токен отсутствует или недействителен, запрос отклоняется.

### Реализация защиты от CSRF в Next.js

Next.js упрощает реализацию защиты от CSRF. Вот как вы можете добавить CSRF-токен в ваше приложение:

1. **Создание API-маршрута для генерации токена**:

```javascript
// pages/api/csrf/token.js

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Генерируем CSRF-токен
  const csrfToken = 'your_csrf_token_generation_logic_here';

  // Устанавливаем cookie с CSRF-токеном
  res.setHeader('Set-Cookie', `csrfToken=${csrfToken}; HttpOnly; Secure; Path=/`);

  res.status(200).json({ csrfToken });
}
```

В этом коде:

- Мы создаем API-маршрут `/api/csrf/token`.
- При GET-запросе к этому маршруту генерируется CSRF-токен.
- Токен сохраняется в cookie `csrfToken` с флагами `HttpOnly`, `Secure` и `Path=/`.
- Флаг `HttpOnly` предотвращает доступ к cookie через JavaScript.
- Флаг `Secure` гарантирует, что cookie передается только по HTTPS.
- Флаг `Path=/` указывает, что cookie доступен для всех маршрутов приложения.

2. **Получение и использование CSRF-токена на клиенте**:

```javascript
// components/MyForm.jsx

'use client'; // Используем компонент на стороне клиента

import React, { useState } from 'react';

const MyForm = () => {
  const [csrfToken, setCsrfToken] = useState('');

  // Получаем CSRF-токен при монтировании компонента
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await fetch('/api/csrf/token');
      const data = await response.json();
      setCsrfToken(data.csrfToken);
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Включаем CSRF-токен в заголовки запроса
    const response = await fetch('/api/submit-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken, // Используйте название заголовка, подходящее для вашего приложения
      },
      body: JSON.stringify({ /* Данные формы */ }),
    });

    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Поля формы */}
      <button type="submit">Отправить</button>
    </form>
  );
};

export default MyForm;
```

В этом коде:

- Мы используем хук `useEffect` для получения CSRF-токена при монтировании компонента.
- При отправке формы CSRF-токен включается в заголовки запроса.

3. **Валидация CSRF-токена на сервере**:

```javascript
// pages/api/submit-data.js

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Получаем CSRF-токен из заголовков запроса
  const csrfTokenFromRequest = req.headers['x-csrf-token'];

  // Получаем CSRF-токен из cookie
  const csrfTokenFromCookie = req.cookies.csrfToken;

  // Сравниваем токены из запроса и cookie
  if (!csrfTokenFromRequest || !csrfTokenFromCookie || csrfTokenFromRequest !== csrfTokenFromCookie) {
    return res.status(403).json({ message: 'Invalid CSRF token' });
  }

  // ... Обработка данных формы
}
```

В этом коде:

- Мы получаем CSRF-токен из заголовков запроса и cookie.
- Токены сравниваются для обеспечения их соответствия.
- Если токены не совпадают, запрос отклоняется.

### Дополнительные рекомендации

- Используйте надежные механизмы генерации CSRF-токенов.
- Не храните CSRF-токены в локальном хранилище браузера.
- Реализуйте защиту от CSRF для всех форм и AJAX-запросов, отправляемых на сервер.

Внедрив эти меры, вы сможете значительно повысить безопасность вашего приложения Next.js и защитить его от CSRF-атак. 
