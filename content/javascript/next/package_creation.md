## Создание собственных пакетов в проекте Next.js

В процессе разработки приложений на Next.js часто возникает необходимость в использовании одних и тех же компонентов, функций или утилит в разных частях проекта. Для удобства повторного использования и организации кода рекомендуется создавать собственные пакеты.

### Преимущества использования собственных пакетов:

- **Повторное использование кода:** Пакеты позволяют использовать один и тот же код в разных частях проекта, избегая дублирования и упрощая его поддержку.
- **Модульность:** Разбиение проекта на модули делает его более структурированным и понятным.
- **Упрощение тестирования:** Пакеты, содержащие логически связанные компоненты, проще тестировать изолированно.
- **Возможность повторного использования в других проектах:** Созданные вами пакеты могут быть использованы в других проектах, что экономит время на разработку.

### Создание простого пакета:

Рассмотрим создание простого пакета `my-utils`, который будет содержать функцию для форматирования даты.

1. **Создайте папку для пакета:**

```
mkdir packages/my-utils
```

2. **Инициализируйте проект npm в папке пакета:**

```
cd packages/my-utils
npm init -y
```

3. **Создайте файл `index.js`:**

```javascript
// packages/my-utils/index.js

/**
 * Функция форматирует дату в строку вида "ДД.ММ.ГГГГ".
 *
 * @param {Date} date Дата для форматирования.
 * @returns {string} Отформатированная дата.
 */
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
```

4. **Добавьте файл `package.json`:**

```json
{
  "name": "my-utils",
  "version": "1.0.0",
  "description": "Пакет с утилитами",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/your-username/your-repo.git"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

### Использование пакета в проекте Next.js:

1. **Импортируйте функцию из пакета:**

```javascript
// pages/index.js
import { formatDate } from 'my-utils';

const HomePage = () => {
  const currentDate = new Date();

  return (
    <div>
      <h1>Текущая дата: {formatDate(currentDate)}</h1>
    </div>
  );
};

export default HomePage;
```

2. **Запустите сервер разработки Next.js:**

```
npm run dev
```

Теперь на странице вашего приложения будет отображаться текущая дата в отформатированном виде.

### Заключение:

Создание собственных пакетов в Next.js позволяет эффективно организовывать код и использовать его повторно. Вы можете создавать пакеты с компонентами, функциями, утилитами и другими элементами, которые необходимы в вашем проекте.