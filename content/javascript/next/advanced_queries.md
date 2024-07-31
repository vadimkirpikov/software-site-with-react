## Продвинутые запросы и фильтрация данных в Next.js

Работа с данными - неотъемлемая часть практически любого веб-приложения. В то время как базовые запросы позволяют получать информацию, продвинутые методы открывают возможности для более точной выборки и фильтрации, что особенно актуально при работе с большими объемами данных. В этой статье мы рассмотрим, как реализовать продвинутые запросы и фильтрацию данных в вашем Next.js приложении версии 14.0.0.

### Использование API Routes для гибкой обработки данных

API Routes в Next.js предоставляют удобный способ создания серверных функций, которые идеально подходят для обработки запросов к базе данных и выполнения логики фильтрации. Рассмотрим пример работы с гипотетической базой данных продуктов:

```javascript
// pages/api/products.js

import { products } from '../../data/products'; // Предположим, у нас есть массив данных products

export default function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      // Обработка GET-запросов для получения продуктов
      const { category, minPrice, maxPrice } = query;
      
      // Фильтрация продуктов по заданным параметрам
      let filteredProducts = products;
      if (category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }
      if (minPrice) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= parseInt(minPrice)
        );
      }
      if (maxPrice) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= parseInt(maxPrice)
        );
      }

      res.status(200).json(filteredProducts);
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```

В данном примере:

- `products` - это массив объектов, каждый из которых представляет собой продукт с полями `category` и `price`.
- API Route обрабатывает GET-запросы с параметрами `category`, `minPrice`, `maxPrice`.
- Функция фильтрует данные на основе переданных параметров.

### Динамическая фильтрация на стороне клиента

Для более интерактивного пользовательского опыта можно реализовать динамическую фильтрацию данных на стороне клиента. В этом случае данные загружаются один раз, а затем фильтруются с помощью JavaScript без дополнительных запросов к серверу.

```javascript
// components/ProductList.jsx

import { useState, useEffect } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    // Загрузка данных о продуктах
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Фильтрация продуктов на основе выбранных фильтров
  const filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.minPrice && product.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && product.price > parseInt(filters.maxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div>
        {/* Поля для ввода фильтров */}
        <input
          type="text"
          name="category"
          placeholder="Категория"
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Минимальная цена"
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Максимальная цена"
          onChange={handleFilterChange}
        />
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {/* Отображение информации о продукте */}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

В этом примере:

- Компонент `ProductList` загружает данные о продуктах, используя `fetch`.
- Состояние `filters` хранит выбранные пользователем фильтры.
- Метод `handleFilterChange` обновляет состояние `filters` при изменении значений в полях ввода.
- Данные фильтруются динамически с помощью `filter` на основе значений `filters`.

### Пагинация для больших наборов данных

При работе с большим количеством данных важно использовать пагинацию, чтобы отображать данные порционно и не перегружать браузер. 

```javascript
// pages/api/products.js

// ... (код из предыдущего примера)

export default function handler(req, res) {
  // ... (код для обработки методов запроса)

  case 'GET':
    // ... (код для фильтрации продуктов)

    // Пагинация
    const pageSize = 10; // Количество продуктов на странице
    const page = parseInt(query.page) || 1; // Текущая страница
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.status(200).json(paginatedProducts);
    break;

// ... (остальной код)
```

В этом примере:

- Добавлены параметры `pageSize` и `page` для управления пагинацией.
- Логика пагинации реализована с помощью `slice` для выборки нужной порции данных.

### Заключение

Продвинутые запросы и фильтрация данных - важные инструменты для разработки эффективных и удобных веб-приложений. Комбинируя API Routes, клиентскую фильтрацию и пагинацию, вы можете создавать динамические и отзывчивые интерфейсы для работы с данными.
