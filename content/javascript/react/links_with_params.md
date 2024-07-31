## Создание ссылок с параметрами в React

В React-приложениях, построенных на принципах SPA (Single Page Application), навигация между различными представлениями (view) осуществляется без перезагрузки страницы в браузере. Для создания навигации и передачи данных между представлениями часто используются ссылки с параметрами.  

### Использование `Link` из `react-router-dom`

Библиотека `react-router-dom` предоставляет компонент `Link`, который является основой для создания навигации в React-приложениях. 

**Установка `react-router-dom`:**

```bash
npm install react-router-dom
```

**Пример использования `Link`:**

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Домашняя страница</h1>
      <Link to="/products">Перейти к списку продуктов</Link>
    </div>
  );
}
```

В этом примере компонент `Link` создает ссылку на маршрут `/products`. При клике на эту ссылку React Router выполнит переход на соответствующий компонент без перезагрузки страницы.

### Передача параметров в ссылках

Для передачи данных между компонентами через ссылки можно использовать параметры. 

#### 1. Определение маршрута с параметром

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ...

<BrowserRouter>
  <Routes>
    <Route path="/products/:productId" element={<ProductDetails />} />
  </Routes>
</BrowserRouter>
```

В этом примере `:productId` является динамическим параметром.  Любое значение, переданное в URL после `/products/`, будет интерпретировано как `productId`.

#### 2. Создание ссылки с параметром

```javascript
import { Link } from 'react-router-dom';

function ProductItem({ id, name }) {
  return (
    <div>
      <Link to={`/products/${id}`}>
        {name}
      </Link>
    </div>
  );
}
```

Здесь мы используем шаблонные литералы (template literals) для динамического формирования ссылки с `id` продукта.

#### 3. Доступ к параметру в целевом компоненте

```javascript
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams();

  // ... логика для получения данных продукта по id
  
  return (
    <div>
      <h1>Детали продукта: {productId}</h1>
      {/* ... отображение данных продукта */}
    </div>
  );
}
```

Крюк `useParams` позволяет получить доступ к параметрам маршрута в виде объекта. В данном случае мы получаем значение параметра `productId` и можем использовать его для запроса данных о конкретном продукте.

### Передача нескольких параметров

Можно передавать несколько параметров в ссылке, разделяя их знаком `/`:

**Маршрут:**

```javascript
<Route path="/products/:category/:productId" element={<ProductDetails />} />
```

**Ссылка:**

```javascript
<Link to={`/products/${category}/${id}`}>
  {name}
</Link>
```

**Доступ к параметрам:**

```javascript
function ProductDetails() {
  const { category, productId } = useParams();

  // ...
}
```

### Передача параметров в query string

Помимо параметров в пути, можно передавать данные через query string.

**Ссылка:**

```javascript
<Link to="/products?sortBy=price&order=asc">
  Сортировать по цене
</Link>
```

**Доступ к query параметрам:**

```javascript
import { useLocation } from 'react-router-dom';

function ProductsList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const order = searchParams.get('order');

  // ... логика сортировки продуктов
}
```

В этом примере мы используем `useLocation` для доступа к объекту `location`, который содержит информацию о текущем URL.  С помощью `URLSearchParams` мы можем легко получать значения query параметров.

### Заключение

Использование ссылок с параметрами является важным аспектом разработки навигации в React-приложениях.  `react-router-dom` предоставляет удобные инструменты для работы с параметрами как в пути, так и в query string, позволяя создавать гибкие и динамические приложения.
