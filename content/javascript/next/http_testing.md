## Тестирование HTTP-запросов в Next.js

Тестирование — важная составляющая разработки любого приложения, и Next.js не исключение. В этой статье мы рассмотрим тестирование HTTP-запросов в Next.js с использованием библиотеки Jest и вспомогательной библиотеки `testing-library/react`. 

### Подготовка к тестированию

Перед началом тестирования убедитесь, что у вас установлены необходимые пакеты:

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
```

### Создание тестового компонента

Создайте компонент `pages/api/hello.js`:

```javascript
// pages/api/hello.js

export default function handler(req, res) {
  res.status(200).json({ message: 'Hello!' });
}
```

Этот компонент обрабатывает GET-запросы по пути `/api/hello` и возвращает JSON-ответ со строкой "Hello!".

### Написание теста

Создайте файл `__tests__/hello.test.js` со следующим содержимым:

```javascript
// __tests__/hello.test.js

import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import handler from '../pages/api/hello';

// Создаем мок-сервер
const server = setupServer(
  rest.get('/api/hello', (req, res, ctx) => {
    return res(ctx.json({ message: 'Hello from MSW!' }));
  })
);

// Запускаем сервер перед всеми тестами
beforeAll(() => server.listen());
// Останавливаем сервер после всех тестов
afterAll(() => server.close());
// Сбрасываем обработчики перед каждым тестом
afterEach(() => server.resetHandlers());

describe('API Route /api/hello', () => {
  it('fetches data from the API endpoint', async () => {
    // Используем fetch для отправки запроса
    const response = await fetch('/api/hello');
    const data = await response.json();

    expect(data.message).toBe('Hello from MSW!');
  });

  it('renders the message on the page', async () => {
    // Рендерим компонент, который будет использовать API
    render(
      <div>
        <p>Message: {data.message}</p>
      </div>
    );

    // Ожидаем, что сообщение будет отображаться на странице
    expect(await screen.findByText('Message: Hello from MSW!')).toBeInTheDocument();
  });
});
```

### Разбор теста

- **Импорт**: Мы импортируем необходимые функции из `@testing-library/react`, `msw/node` и `msw`, а также обработчик `handler` из `pages/api/hello.js`.

- **Mock-сервер**: Мы используем `msw` для создания мок-сервера. `setupServer` создает экземпляр сервера, а `rest.get` определяет обработчик GET-запросов для пути `/api/hello`. Внутри обработчика мы возвращаем моковый JSON-ответ.

- **Жизненный цикл тестов**: 
    - `beforeAll` запускает мок-сервер перед всеми тестами.
    - `afterAll` останавливает сервер после всех тестов.
    - `afterEach` сбрасывает обработчики перед каждым тестом, чтобы тесты были изолированы.

- **Тестовые случаи**:
    - `fetches data from the API endpoint`: Этот тест использует `fetch` для отправки запроса к `/api/hello` и проверяет, что полученный JSON-ответ содержит ожидаемое сообщение.
    - `renders the message on the page`: Этот тест рендерит компонент React, который будет использовать данные, полученные из API. Затем он использует `screen.findByText` для поиска элемента на странице с текстом, содержащим сообщение из API.

### Запуск тестов

Запустите тесты с помощью команды:

```bash
npm test
```

Jest найдет файл `__tests__/hello.test.js` и выполнит тесты. Вы увидите отчет о прохождении тестов.

## Заключение

В этой статье мы рассмотрели основные принципы тестирования HTTP-запросов в Next.js. Мы научились создавать мок-серверы с помощью `msw`, отправлять запросы к API с помощью `fetch` и проверять ответы. Не забывайте писать тесты для своих API-маршрутов, чтобы гарантировать их корректную работу. 
