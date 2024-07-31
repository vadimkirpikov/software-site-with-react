## Включение и наследование шаблонов в Next.js 14.0.0

Next.js предоставляет гибкие механизмы для создания и управления макетами вашего приложения. Это позволяет добиться единообразия дизайна и сократить дублирование кода. В этом разделе мы рассмотрим способы включения и наследования шаблонов, что упростит разработку вашего проекта.

### Включение компонентов

Простейший способ повторного использования разметки — это создание отдельных компонентов React и их включение в нужные страницы. Предположим, у вас есть компонент `Header`:

```jsx
// components/Header.jsx
export default function Header() {
  return (
    <header>
      <h1>Мой сайт</h1>
      <nav>
        <ul>
          <li>Главная</li>
          <li>О нас</li>
          <li>Контакты</li>
        </ul>
      </nav>
    </header>
  );
}
```

Вы можете легко включить его в любой странице:

```jsx
// pages/about.jsx
import Header from '../components/Header';

export default function AboutPage() {
  return (
    <div>
      <Header /> {/* Включение компонента Header */}
      <h2>О нас</h2>
      <p>Информация о компании...</p>
    </div>
  );
}
```

### Создание макета с помощью компонентов

Более структурированный подход — это создание компонента-макета, который будет содержать общую для нескольких страниц разметку. Например:

```jsx
// components/Layout.jsx
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main> {/* Здесь будет контент страницы */}
      <Footer />
    </div>
  );
}
```

Использование компонента `Layout`:

```jsx
// pages/contact.jsx
import Layout from '../components/Layout';

export default function ContactPage() {
  return (
    <Layout> {/* Оборачиваем страницу в Layout */}
      <h2>Контакты</h2>
      <p>Наши контакты...</p>
    </Layout>
  );
}
```

В этом случае `children` будет заменен на контент страницы `ContactPage`.

### Наследование макетов

Next.js не предоставляет механизма прямого наследования компонентов. Однако вы можете достичь аналогичного эффекта, используя композицию компонентов и пропсы. Например, для создания разных макетов для разных разделов сайта:

```jsx
// components/MainLayout.jsx
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// components/AdminLayout.jsx
import Header from './Header';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Header />
      <main>{children}</main>
    </div>
  );
}
```

Использование разных макетов:

```jsx
// pages/index.jsx
import MainLayout from '../components/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <h1>Главная страница</h1>
    </MainLayout>
  );
}

// pages/admin/dashboard.jsx
import AdminLayout from '../components/AdminLayout';

export default function DashboardPage() {
  return (
    <AdminLayout>
      <h1>Панель администратора</h1>
    </AdminLayout>
  );
}
```

### Заключение

Мы рассмотрели основные способы включения и наследования шаблонов в Next.js. Вы можете выбрать наиболее удобный для вас подход в зависимости от сложности и структуры вашего проекта. Комбинируя эти методы, вы сможете создавать гибкие и легко поддерживаемые макеты для вашего приложения.
