## Установка сервера разработки

Next.js предоставляет встроенный сервер разработки, который значительно упрощает процесс разработки. Он автоматически перезагружает приложение при изменении файлов и поддерживает все возможности Next.js, такие как маршрутизация, SSR и SSG. В этом разделе мы рассмотрим, как установить и запустить сервер разработки Next.js.

### Шаг 1. Установка проекта Next.js

Прежде чем запускать сервер разработки, необходимо иметь установленный проект Next.js. Если у вас его еще нет, создайте новый проект, используя `create-next-app`:

```bash
npx create-next-app@latest my-next-app
cd my-next-app
```

Этот код создаст новую директорию `my-next-app` с базовой структурой проекта Next.js. 

### Шаг 2. Запуск сервера разработки

После создания проекта перейдите в его директорию и запустите следующую команду:

```bash
npm run dev
```

Эта команда запустит сервер разработки Next.js. Вы увидите сообщение в консоли, подобное этому:

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Это сообщение означает, что сервер запущен и доступен по адресу `http://localhost:3000/`. 

### Шаг 3. Открытие приложения в браузере

Откройте ваш веб-браузер и перейдите по адресу `http://localhost:3000/`. Вы увидите стартовую страницу вашего приложения Next.js. 

### Детальный разбор команды `npm run dev`

Команда `npm run dev` использует `package.json` для запуска сервера разработки. Откройте файл `package.json` в корне вашего проекта. Вы увидите секцию "scripts", содержащую следующее:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
},
```

Здесь `"dev": "next dev"` означает, что команда `npm run dev` вызывает команду `next dev`. 

Команда `next dev` запускает сервер разработки Next.js, предоставляя следующие возможности:

* **Горячая перезагрузка (Hot Reloading):** При изменении файлов проекта сервер автоматически перезагружает только измененные компоненты, что ускоряет процесс разработки.
* **Автоматическая компиляция:** Сервер компилирует код JavaScript, TypeScript, JSX и другие файлы в оптимизированный для браузера код.
* **Маршрутизация на стороне клиента:** Сервер обрабатывает маршрутизацию на стороне клиента, обеспечивая быструю навигацию между страницами.
* **Обработка ошибок:** Сервер отображает понятные сообщения об ошибках в браузере, что упрощает отладку.

### Настройка порта сервера

По умолчанию сервер разработки Next.js запускается на порту `3000`. Вы можете изменить порт, используя флаг `-p` или `--port` при запуске команды `next dev`:

```bash
npm run dev -p 3001 
# или
npm run dev --port 3001
```

Этот код запустит сервер на порту `3001`.

### Использование переменных окружения

Вы можете использовать переменные окружения для настройки поведения сервера разработки. 

Создайте файл `.env.local` в корне вашего проекта и добавьте в него переменные окружения:

```
PORT=3002
```

Эта настройка изменит порт сервера на `3002`.

### Заключение

Сервер разработки Next.js предоставляет мощный и удобный инструмент для разработки современных веб-приложений. Он прост в использовании, обладает богатым функционалом и значительно упрощает процесс разработки. В следующих разделах мы рассмотрим более подробно другие возможности Next.js, такие как маршрутизация, SSR, SSG и многое другое.