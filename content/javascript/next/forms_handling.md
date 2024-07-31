## Создание форм и обработка данных на стороне сервера

Формы - неотъемлемый элемент веб-приложений, обеспечивающий взаимодействие с пользователем. Next.js, будучи фреймворком для построения React-приложений, предоставляет гибкий и мощный инструментарий для создания форм и обработки отправленных данных. В этой статье мы рассмотрим базовые принципы работы с формами в Next.js и обработку данных на стороне сервера.

### Основы создания форм

Создание формы в Next.js ничем не отличается от создания обычной HTML-формы. Вы можете использовать стандартные HTML-теги, такие как `<form>`, `<input>`, `<textarea>`, `<select>` и другие.

```jsx
// components/ContactForm.js

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Обработка данных формы
    console.log({ name, email, message });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message">Сообщение:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
}
```

В этом примере мы создали простой компонент формы `ContactForm`. Используя хук `useState`, мы отслеживаем значения введенных данных. При отправке формы вызывается функция `handleSubmit`, которая предотвращает стандартное поведение браузера (перезагрузку страницы) и выводит в консоль отправленные данные.

### Обработка данных на стороне сервера

В большинстве случаев вам потребуется обработать данные формы на сервере. Next.js предоставляет удобный механизм для этого - API-маршруты. API-маршруты позволяют создавать серверные функции, доступные по определенным URL-адресам.

#### Создание API-маршрута

Создайте файл `pages/api/contact.js`. Этот файл будет обрабатывать отправку данных с формы `ContactForm`.

```jsx
// pages/api/contact.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Обработка данных формы, например, отправка email

    res.status(200).json({ message: 'Сообщение отправлено!' });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
```

В этом коде мы проверяем, что запрос является POST-запросом, и извлекаем данные формы из объекта `req.body`. Затем мы можем выполнить любую серверную обработку данных, например, отправить email или сохранить данные в базе данных.

#### Отправка данных формы на API-маршрут

Теперь нужно изменить компонент `ContactForm` для отправки данных на созданный API-маршрут.

```jsx
// components/ContactForm.js

import { useState } from 'react';

export default function ContactForm() {
  // ...

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { name, email, message };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Успешная отправка данных
        console.log('Сообщение отправлено!');
      } else {
        // Ошибка при отправке данных
        console.error('Ошибка при отправке сообщения');
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  // ...
}
```

В обновленном коде мы используем `fetch` для отправки POST-запроса на API-маршрут `/api/contact`. В теле запроса мы отправляем данные формы в формате JSON. 

### Заключение

В этой статье мы рассмотрели основы создания форм в Next.js и обработку данных на стороне сервера с помощью API-маршрутов. Эта информация является отправной точкой для создания более сложных форм и реализации различных сценариев обработки данных. 
