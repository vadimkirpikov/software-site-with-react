## Компоненты и слоты в Next.js

Компоненты являются основой разработки в Next.js, позволяя создавать модульные и переиспользуемые блоки пользовательского интерфейса. Слоты, в свою очередь, предоставляют механизм для передачи динамического контента внутрь компонентов, делая их более гибкими и универсальными.

### Создание и использование компонентов

Компоненты в Next.js представляют собой JavaScript-функции или классы, которые возвращают JSX-код, описывающий внешний вид и поведение элемента UI.

**Пример простого компонента:**

```javascript
// components/Button.js
function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
```

**Описание кода:**

- Компонент `Button` принимает два пропса: `children` и `onClick`.
- `children` представляет собой любой контент, который будет передан внутрь компонента.
- `onClick` - функция, которая будет вызвана при клике на кнопку.

**Использование компонента:**

```javascript
// pages/index.js
import Button from '../components/Button';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to my website!</h1>
      <Button onClick={() => alert('Button clicked!')}>
        Click me!
      </Button>
    </div>
  );
}
```

**Результат:**

На странице будет отображена кнопка с текстом "Click me!". При клике на кнопку будет выполнена функция, переданная в пропс `onClick`.

### Работа со слотами

Слоты позволяют передавать динамический контент внутрь компонента, который будет отображаться в определенном месте.

**Пример компонента со слотом:**

```javascript
// components/Card.js
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;
```

**Описание кода:**

- Компонент `Card` принимает два пропса: `children` и `title`.
- `title` - заголовок карточки.
- Внутри `div` с классом `card-content` будет отображаться контент, переданный в `children`.

**Использование компонента со слотом:**

```javascript
// pages/about.js
import Card from '../components/Card';

export default function AboutPage() {
  return (
    <Card title="About us">
      <p>This is the about page content.</p>
    </Card>
  );
}
```

**Результат:**

На странице будет отображена карточка с заголовком "About us", внутри которой будет находиться параграф с текстом "This is the about page content.".

### Именованные слоты

В Next.js 14.0.0 для именованных слотов можно использовать синтаксис React 18.

**Пример компонента с именованными слотами:**

```javascript
// components/Layout.js
function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>My Website</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2023 My Website</p>
      </footer>
    </div>
  );
}

export default Layout;
```

**Использование компонента с именованными слотами:**

```javascript
// pages/contact.js
import Layout from '../components/Layout';

export default function ContactPage() {
  return (
    <Layout>
      <h1>Contact us</h1>
      <p>Email: info@example.com</p>
    </Layout>
  );
}
```

**Результат:**

На странице будет отображен макет сайта с шапкой, подвалом и контентом, переданным в компонент `Layout`.

### Заключение

Компоненты и слоты - мощные инструменты для создания гибких и переиспользуемых UI-элементов в Next.js.  С их помощью можно разделить интерфейс на независимые блоки, упростить разработку и повысить читаемость кода.
