## Основы использования шаблонов в Next.js

Шаблоны — это мощный инструмент, позволяющий структурировать ваши компоненты Next.js и создавать более читаемый и удобный в обслуживании код. 

В Next.js шаблоны реализуются с помощью компонентов React, что позволяет использовать всю мощь экосистемы React для создания гибких и переиспользуемых шаблонов.

### Создание простого шаблона

Для начала создадим простой шаблон, который будет использоваться для отображения заголовка и футера на наших страницах.

1. Создайте новый файл `components/Layout.js`:

```jsx
// components/Layout.js

export default function Layout({ children }) {
  return (
    <div>
      <h1>Мой сайт</h1>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  );
}
```

2. Теперь вы можете использовать этот шаблон на любой странице, обернув содержимое страницы в компонент `Layout`:

```jsx
// pages/index.js

import Layout from '../components/Layout';

export default function HomePage() {
  return (
    <Layout>
      <h2>Добро пожаловать на главную страницу!</h2>
      <p>Это контент главной страницы.</p>
    </Layout>
  );
}
```

В этом примере `children` — это специальный пропс, который передается в компонент `Layout`. Он представляет собой содержимое, которое будет отображаться внутри тегов `<main>`.

### Использование пропсов для настройки шаблона

Чтобы сделать шаблон более гибким, вы можете использовать пропсы для передачи данных из дочерних компонентов.

1. Модифицируем компонент `Layout`:

```jsx
// components/Layout.js

export default function Layout({ title, children }) {
  return (
    <div>
      <h1>{title}</h1>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  );
}
```

2. Теперь вы можете передать значение для пропса `title` из дочернего компонента:

```jsx
// pages/about.js

import Layout from '../components/Layout';

export default function AboutPage() {
  return (
    <Layout title="О нас">
      <h2>О нашей компании</h2>
      <p>Это текст страницы "О нас".</p>
    </Layout>
  );
}
```

### Создание нескольких шаблонов

Вы можете создавать сколько угодно шаблонов и использовать их по мере необходимости. Например, вы можете создать отдельный шаблон для страницы блога:

1. Создайте новый файл `components/BlogLayout.js`:

```jsx
// components/BlogLayout.js

export default function BlogLayout({ title, children }) {
  return (
    <div>
      <h1>{title}</h1>
      <main>{children}</main>
      <div>
        <h3>Последние записи:</h3>
        <ul>
          <li>Запись 1</li>
          <li>Запись 2</li>
        </ul>
      </div>
    </div>
  );
}
```

2. Использовать этот шаблон на странице блога:

```jsx
// pages/blog/post-1.js

import BlogLayout from '../../components/BlogLayout';

export default function PostOne() {
  return (
    <BlogLayout title="Запись 1">
      <h2>Заголовок записи 1</h2>
      <p>Текст записи 1.</p>
    </BlogLayout>
  );
}
```

### Заключение

Шаблоны в Next.js – это простой и эффективный способ структурировать ваши компоненты и создавать более удобный в обслуживании код. Используя пропсы и создавая несколько шаблонов, вы можете добиться максимальной гибкости и переиспользования кода в вашем приложении.