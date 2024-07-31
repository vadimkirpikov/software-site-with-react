## Основы запросов с использованием ORM

ORM (Object-Relational Mapping) библиотеки являются неотъемлемой частью многих современных веб-приложений, включая приложения, построенные на Next.js. Они предоставляют удобный способ взаимодействия с базами данных, абстрагируя от написания сырых SQL-запросов и позволяя работать с данными как с объектами JavaScript.

В этой статье мы рассмотрим основы работы с ORM в Next.js на примере популярной библиотеки Prisma.

### Установка Prisma

Перед началом работы необходимо установить Prisma и Prisma Client:

```bash
npm install prisma --save-dev
npm install @prisma/client
```

### Инициализация Prisma

После установки запустите команду инициализации Prisma:

```bash
npx prisma init
```

Эта команда создаст файл схемы Prisma (`prisma/schema.prisma`) и файл конфигурации `.env`.

### Определение модели данных

В файле `schema.prisma` определим модель данных, с которой будем работать. Например, создадим модель `Post`:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

В этом примере мы:

- Определили источник данных (`datasource`) с использованием PostgreSQL.
- Создали модель `Post` с полями `id`, `title`, `content`, `createdAt` и `updatedAt`.
- Использовали аннотации Prisma для определения первичного ключа (`@id`), автоинкремента (`@default(autoincrement())`), значений по умолчанию (`@default(now())`) и автоматического обновления (`@updatedAt`).

### Генерация Prisma Client

После определения модели данных сгенерируйте Prisma Client:

```bash
npx prisma generate
```

Эта команда создаст директорию `node_modules/@prisma/client`, содержащую сгенерированный Prisma Client, который будет использоваться для взаимодействия с базой данных.

### Подключение к базе данных

Импортируйте Prisma Client в файл `pages/api/posts.js`:

```javascript
// pages/api/posts.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // ...
}
```

### Создание записи

Для создания новой записи в базе данных используйте метод `create` Prisma Client:

```javascript
// pages/api/posts.js

// ...

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    const result = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    res.status(201).json(result);
  }
  // ...
}
```

В этом примере мы:

- Проверяем, что HTTP-метод запроса - `POST`.
- Извлекаем `title` и `content` из тела запроса.
- Используем метод `create` Prisma Client для создания новой записи в таблице `Post`.
- Возвращаем созданную запись в ответе сервера.

### Получение записей

Для получения записей из базы данных используйте метод `findMany` Prisma Client:

```javascript
// pages/api/posts.js

// ...

export default async function handler(req, res) {
  // ...
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany();

    res.status(200).json(posts);
  }
  // ...
}
```

В этом примере мы:

- Проверяем, что HTTP-метод запроса - `GET`.
- Используем метод `findMany` Prisma Client для получения всех записей из таблицы `Post`.
- Возвращаем полученные записи в ответе сервера.

### Фильтрация и сортировка

Prisma предоставляет мощные возможности для фильтрации и сортировки данных. Например, чтобы получить все посты с определенным заголовком, можно использовать следующий код:

```javascript
const posts = await prisma.post.findMany({
  where: {
    title: 'Мой заголовок',
  },
});
```

Для сортировки постов по дате создания в порядке убывания используйте следующий код:

```javascript
const posts = await prisma.post.findMany({
  orderBy: {
    createdAt: 'desc',
  },
});
```

### Обновление записи

Для обновления записи используйте метод `update` Prisma Client:

```javascript
// pages/api/posts.js

// ...

export default async function handler(req, res) {
  // ...
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { title, content } = req.body;

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        content,
      },
    });

    res.status(200).json(updatedPost);
  }
  // ...
}
```

В этом примере мы:

- Проверяем, что HTTP-метод запроса - `PUT`.
- Извлекаем `id` поста из параметров запроса.
- Извлекаем `title` и `content` из тела запроса.
- Используем метод `update` Prisma Client для обновления записи с указанным `id`.
- Возвращаем обновленную запись в ответе сервера.

### Удаление записи

Для удаления записи используйте метод `delete` Prisma Client:

```javascript
// pages/api/posts.js

// ...

export default async function handler(req, res) {
  // ...
  if (req.method === 'DELETE') {
    const { id } = req.query;

    const deletedPost = await prisma.post.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(deletedPost);
  }
  // ...
}
```

В этом примере мы:

- Проверяем, что HTTP-метод запроса - `DELETE`.
- Извлекаем `id` поста из параметров запроса.
- Используем метод `delete` Prisma Client для удаления записи с указанным `id`.
- Возвращаем удаленную запись в ответе сервера.

Это лишь базовые примеры работы с Prisma в Next.js. Prisma предоставляет широкий спектр возможностей для работы с базами данных, таких как:

- **Отношения:** Определение связей между моделями данных (один-к-одному, один-ко-многим, многие-ко-многим).
- **Миграции:** Управление изменениями схемы базы данных.
- **Транзакции:** Группировка нескольких операций с базой данных в одну атомарную операцию.

Более подробную информацию о Prisma можно найти в [официальной документации](https://www.prisma.io/docs/).
