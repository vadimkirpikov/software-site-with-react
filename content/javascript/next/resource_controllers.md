## Использование Resource Controllers в Next.js 14

Next.js 14 представляет Resource Controllers - новый подход к обработке запросов на стороне сервера.  Resource Controllers позволяют вам определять маршруты и обработчики HTTP-запросов в декларативном стиле, улучшая читаемость и maintainability кода. 

Resource Controllers функционируют, определяя RESTful API для конкретного ресурса. Вместо определения отдельных обработчиков для каждого HTTP-метода, вы определяете функции внутри класса контроллера, каждая из которых отвечает за определенное действие над ресурсом.

### Создание Resource Controller

Чтобы создать Resource Controller, определите новый класс, который расширяет `NextResource` из `next/server`. Внутри класса определите методы, соответствующие HTTP-методам (GET, POST, PUT, DELETE и т.д.). Каждый метод будет обработчиком для соответствующего запроса.

**Пример:**

```typescript
// app/api/posts/[[...id]]/route.ts

import { NextResource, type NextRequest } from 'next/server';

export class PostResource extends NextResource {
  // Обработчик для GET-запроса по адресу /api/posts/:id
  async GET(request: NextRequest, { params }: { params: { id: string } }) {
    const postId = params.id;

    // Получение данных поста из базы данных или API
    const postData = await fetch(`https://api.example.com/posts/${postId}`);
    const post = await postData.json();

    return new Response(JSON.stringify(post));
  }

  // Обработчик для POST-запроса по адресу /api/posts
  async POST(request: NextRequest) {
    const postData = await request.json();

    // Сохранение данных поста в базе данных или API
    const response = await fetch('https://api.example.com/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });

    return new Response(JSON.stringify({ message: 'Пост создан' }), { status: 201 });
  }
}

export const GET = (request: NextRequest) => {
  return new Response("Hello, Next.js!");
};
```

В этом примере:

* `PostResource` - это контроллер для ресурса "пост".
* Метод `GET` обрабатывает GET-запросы к `/api/posts/:id` и возвращает данные поста с указанным ID.
* Метод `POST` обрабатывает POST-запросы к `/api/posts` и создает новый пост с данными из тела запроса.

### Определение маршрутов

Resource Controllers сами по себе не обрабатывают маршрутизацию. Для связывания контроллера с определенным маршрутом используется файл `route.ts` внутри директории маршрута.

В файле `route.ts` экспортируйте экземпляр вашего Resource Controller:

```typescript
// app/api/posts/route.ts

import { PostResource } from './[[...id]]/route';

export const POST = new PostResource(); 
```

В этом примере:

* `POST` - это экземпляр класса `PostResource`.
* Он будет обрабатывать все запросы к `/api/posts`, перенаправляя их соответствующим методам контроллера.

### Динамические маршруты

Для создания динамических маршрутов используйте квадратные скобки в имени файла маршрута:

```
// app/api/posts/[[...id]]/route.ts
```

В этом случае `id` будет доступен как параметр в методах контроллера.

### Использование Middleware

Вы можете использовать middleware в Resource Controllers, определяя метод `middleware` в классе контроллера. Этот метод будет вызываться перед каждым запросом к контроллеру.

**Пример:**

```typescript
// app/api/posts/[[...id]]/route.ts

import { NextResource, type NextRequest } from 'next/server';

export class PostResource extends NextResource {
  // ...

  async middleware(request: NextRequest) {
    // Проверка авторизации пользователя
    const token = request.headers.get('Authorization');
    if (!token) {
      return new Response('Не авторизован', { status: 401 });
    }

    // Проверка прав доступа
    const hasAccess = await checkAccess(token);
    if (!hasAccess) {
      return new Response('Доступ запрещен', { status: 403 });
    }
  }
}
```

В этом примере:

* Метод `middleware` проверяет наличие токена авторизации в заголовке запроса.
* Если токен отсутствует, возвращается ошибка 401 (Unauthorized).
* Если токен присутствует, проверяются права доступа пользователя.
* Если у пользователя нет прав доступа, возвращается ошибка 403 (Forbidden).

### Обработка ошибок

Для обработки ошибок в Resource Controllers используйте блок `try...catch`:

```typescript
// app/api/posts/[[...id]]/route.ts

import { NextResource, type NextRequest } from 'next/server';

export class PostResource extends NextResource {
  // ...

  async GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      // ...
    } catch (error) {
      return new Response('Произошла ошибка', { status: 500 });
    }
  }
}
```

### Заключение

Resource Controllers - мощный инструмент для организации кода API на стороне сервера в Next.js. Они делают код более читаемым, maintainable и тестируемым. Используя Resource Controllers, вы можете создавать RESTful API для любых ресурсов вашего приложения.
