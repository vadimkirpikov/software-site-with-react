## Модульное тестирование в Next.js

Модульное тестирование — неотъемлемая часть разработки надежных и легко поддерживаемых приложений. Next.js, фреймворк для создания серверных приложений React, предоставляет все необходимые инструменты для написания и запуска модульных тестов.

### Основы

Для модульного тестирования в Next.js чаще всего используется Jest в сочетании с библиотекой React Testing Library. Jest – это фреймворк для запуска тестов, а React Testing Library предоставляет удобные утилиты для тестирования React-компонентов.

### Настройка тестовой среды

Прежде чем начать писать тесты, необходимо настроить тестовую среду. Для этого выполните следующие действия:

1. **Установка зависимостей**: 

```
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

2. **Создание файла конфигурации Jest**: 

Создайте файл `jest.config.js` в корне проекта со следующим содержимым:

```javascript
/** @type {import('jest').Config} */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Предоставьте путь к каталогу вашего приложения Next.js
  dir: './',
})

// Любые пользовательские настройки Jest должны быть здесь
const customJestConfig = {
  // ...
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

// Создайте и экспортируйте конфигурацию Jest с объединением настроек
module.exports = createJestConfig(customJestConfig)
```

3. **Настройка скрипта запуска тестов**: 

Добавьте следующую строку в раздел `scripts` файла `package.json`:

```json
"test": "jest"
```

### Создание простого теста

Рассмотрим пример простого теста для компонента `Counter`:

```javascript
// components/Counter.jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

Создайте файл теста `Counter.test.jsx` рядом с компонентом:

```javascript
// components/Counter.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('отображает начальное значение счетчика', () => {
  render(<Counter />);
  const counterElement = screen.getByText(/Count: 0/i); // Найти элемент с текстом "Count: 0", игнорируя регистр
  expect(counterElement).toBeInTheDocument(); // Проверить, что элемент присутствует в документе
});

test('увеличивает счетчик при клике на кнопку', () => {
  render(<Counter />);
  const buttonElement = screen.getByRole('button', { name: /increment/i }); // Найти кнопку по роли и тексту, игнорируя регистр
  fireEvent.click(buttonElement); // Симулировать клик на кнопку
  const counterElement = screen.getByText(/Count: 1/i); // Найти элемент с текстом "Count: 1", игнорируя регистр
  expect(counterElement).toBeInTheDocument(); // Проверить, что элемент присутствует в документе
});
```

В этом примере мы используем следующие методы:

* `render`: рендерит компонент `Counter`.
* `screen.getByText`: находит элемент по его текстовому содержимому.
* `expect`: проверяет, что переданное значение удовлетворяет определенному условию.
* `fireEvent.click`: симулирует клик на кнопке.

### Запуск тестов

Для запуска тестов выполните команду:

```
npm run test
```

Jest найдет все файлы с расширением `.test.js(x)` и выполнит содержащиеся в них тесты.

### Заключение

В этой статье мы рассмотрели основы модульного тестирования в Next.js. Вы узнали, как настроить тестовую среду, написать простой тест и запустить его. 

Модульное тестирование — это важная часть разработки качественного программного обеспечения. Регулярное написание тестов позволяет избежать множества ошибок и упрощает поддержку кода.
