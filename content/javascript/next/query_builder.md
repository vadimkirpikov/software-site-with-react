## Запросы с использованием Query Builder

В разработке веб-приложений работа с данными является неотъемлемой частью. Для удобной и эффективной обработки данных, особенно в контексте сложных запросов к базам данных, используются Query Builder'ы. Они позволяют писать структурированный и безопасный код для взаимодействия с базой данных, избегая написания "сырых" SQL-запросов.

В этой статье мы рассмотрим использование Query Builder'ов в Next.js приложениях. Для примера будем использовать библиотеку Prisma, которая является популярным инструментом для работы с базами данных в JavaScript-проектах.

### Настройка Prisma

Перед началом работы с Prisma необходимо установить библиотеку и настроить подключение к базе данных. Для этого выполните следующие шаги:

1. **Установка Prisma:**

```bash
npm install prisma --save-dev
```

2. **Инициализация Prisma:**

```bash
npx prisma init
```

   Эта команда создаст файл `prisma/schema.prisma`, в котором вы будете описывать структуру вашей базы данных.

3. **Настройка подключения к базе данных:**

   Откройте файл `.env` в корне вашего проекта и укажите данные для подключения к вашей базе данных. Например:

```
DATABASE_URL="postgresql://user:password@host:port/database"
```

   Замените `user`, `password`, `host`, `port` и `database` на ваши реальные данные.

4. **Создание модели данных:**

   Откройте файл `prisma/schema.prisma` и опишите структуру вашей базы данных. Например, создадим модель `Post`:

```prisma
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
  content   String
  published Boolean @default(false)
}
```

   Здесь мы создаем модель `Post` с полями `id`, `title`, `content` и `published`.

5. **Генерация Prisma Client:**

```bash
npx prisma generate
```

   Эта команда сгенерирует Prisma Client, который будет использоваться для взаимодействия с базой данных.

### Создание запросов с помощью Prisma Client

После настройки Prisma вы можете использовать Prisma Client для создания запросов к вашей базе данных.

**Пример 1: Получение всех записей из таблицы:**

```javascript
// pages/api/posts.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const posts = await prisma.post.findMany();

  res.status(200).json(posts);
}
```

   В этом примере мы используем метод `findMany()` для получения всех записей из таблицы `Post`.

**Пример 2: Получение записи по ID:**

```javascript
// pages/api/posts/[id].js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query; // Получаем ID записи из URL

  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id), // Преобразуем ID в число
    },
  });

  res.status(200).json(post);
}
```

   В этом примере мы используем метод `findUnique()` для получения записи с указанным ID.

**Пример 3: Создание новой записи:**

```javascript
// pages/api/posts/create.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { title, content } = req.body;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  res.status(201).json(newPost);
}
```

   В этом примере мы используем метод `create()` для создания новой записи в таблице `Post`.

**Пример 4: Обновление записи:**

```javascript
// pages/api/posts/update/[id].js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
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
```

   В этом примере мы используем метод `update()` для обновления записи с указанным ID.

**Пример 5: Удаление записи:**

```javascript
// pages/api/posts/delete/[id].js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.status(204).end(); // Возвращаем пустой ответ с кодом 204 (No Content)
}
```

   В этом примере мы используем метод `delete()` для удаления записи с указанным ID.

### Заключение

Использование Query Builder'ов, таких как Prisma, значительно упрощает работу с базами данных в Next.js приложениях. Они позволяют писать более чистый, безопасный и структурированный код, избегая написания "сырых" SQL-запросов. В этой статье мы рассмотрели основные примеры использования Prisma Client для выполнения CRUD-операций с базой данных.