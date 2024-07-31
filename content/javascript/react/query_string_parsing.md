## Обработка и парсинг строки запроса в React

Строка запроса (query string) - это часть URL-адреса, которая следует за знаком вопроса (`?`) и содержит пары "ключ-значение". Она используется для передачи данных на сервер или между различными частями веб-приложения. 

В React работа со строкой запроса часто требуется при:

* Фильтрации и сортировке данных на странице
* Передаче параметров для инициализации компонента
* Отслеживании переходов пользователей с помощью UTM-меток

### Получение строки запроса

В React для получения строки запроса можно воспользоваться объектом `window.location`. Свойство `search` этого объекта содержит строку запроса, начиная со знака вопроса.

```jsx
const queryString = window.location.search;
console.log(queryString); // Например: ?city=Moscow&category=restaurants
```

### Парсинг строки запроса

Для удобной работы с данными из строки запроса, ее необходимо преобразовать (распарсить) в объект.  Существует несколько способов парсинга строки запроса в React:

**1. Использование объекта URLSearchParams**

`URLSearchParams` - это встроенный объект JavaScript, предоставляющий удобный интерфейс для работы со строкой запроса.

```jsx
const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);

console.log(searchParams.get('city')); // Выведет: Moscow
console.log(searchParams.get('category')); // Выведет: restaurants

// Проверка наличия параметра
console.log(searchParams.has('city')); // Выведет: true
```

**2. Ручная обработка строки запроса**

Можно распарсить строку запроса самостоятельно, используя методы для работы со строками.

```jsx
function parseQueryString(queryString) {
  const params = {};
  // Убираем знак вопроса в начале
  const query = queryString.substring(1);

  if (query) {
    query.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  }

  return params;
}

const params = parseQueryString(window.location.search);
console.log(params.city); // Выведет: Moscow
```

### Использование параметров запроса в компоненте

Полученные после парсинга параметры можно использовать в компоненте React, например, для фильтрации данных или установки начального состояния.

```jsx
import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    // Загрузка данных с учетом выбранной категории
    const fetchData = async () => {
      const response = await fetch(`/api/products?category=${category}`);
      const data = await response.json();
      setProducts(data);
    };

    fetchData();
  }, [category]); 

  // ... отображение списка продуктов
}
```

### Создание ссылок с параметрами запроса

Для создания ссылок с параметрами запроса можно использовать компонент `<Link>` из библиотеки `react-router-dom` или формировать URL-адреса вручную.

**1. Использование `<Link>` из `react-router-dom`**

```jsx
import { Link } from 'react-router-dom';

function ProductFilter() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Все категории</option>
        <option value="electronics">Электроника</option>
        <option value="clothes">Одежда</option>
      </select>
      <Link to={`/products?category=${selectedCategory}`}>
        Показать результаты
      </Link>
    </div>
  );
}
```

**2. Ручное формирование URL-адреса**

```jsx
function ProductFilter() {
  // ...

  const handleClick = () => {
    const url = `/products?category=${selectedCategory}`;
    window.location.href = url;
  };

  return (
    // ...
    <button onClick={handleClick}>Показать результаты</button>
    // ...
  );
}
```

### Важные моменты

* **Декодирование параметров:** Значения параметров запроса могут содержать закодированные символы (например, пробелы заменяются на `%20`). Используйте `decodeURIComponent()` для декодирования значений.
* **Валидация данных:** Всегда валидируйте данные, полученные из строки запроса, перед их использованием в приложении.

Работа со строкой запроса - важная часть разработки веб-приложений на React. Используйте описанные выше методы для парсинга, обработки и формирования URL-адресов с параметрами запроса. 
