## Работа с критериями в Hibernate 6

Hibernate Criteria API предоставляет мощный и типобезопасный способ создания запросов к базе данных. В отличие от HQL, Criteria API использует объектно-ориентированный подход, что делает код более читаемым и поддерживаемым, особенно для сложных запросов.

### Основные концепции Criteria API

В основе Criteria API лежат следующие концепции:

1. **`EntityManager`**: Точка входа для работы с Criteria API. Предоставляет методы для создания объектов `CriteriaQuery` и `CriteriaBuilder`.

2. **`CriteriaBuilder`**: Фабрика для создания различных частей запроса, таких как предикаты, выражения, порядки сортировки.

3. **`CriteriaQuery`**: Представляет собой сам запрос. К нему добавляются предикаты, выражения, соединения и другие элементы запроса.

4. **`Root`**: Представляет собой корневую сущность, от которой начинается построение запроса.

5. **`Predicate`**: Условие, которое будет применено к запросу. Предикаты можно комбинировать с помощью логических операторов.

### Создание простого запроса с Criteria API

Рассмотрим пример простого запроса с использованием Criteria API. Допустим, у нас есть сущность `Product` с полями `id`, `name` и `price`:

```java
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    // Геттеры и сеттеры
}
```

Следующий код демонстрирует, как получить все продукты из базы данных:

```java
EntityManager entityManager = entityManagerFactory.createEntityManager();
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Product> query = cb.createQuery(Product.class);
Root<Product> root = query.from(Product.class);

// Выбираем все продукты
query.select(root);

// Выполняем запрос и получаем список продуктов
List<Product> products = entityManager.createQuery(query).getResultList();
```

**Пояснение кода:**

1. Получаем объект `EntityManager` из `EntityManagerFactory`.
2. Создаем объект `CriteriaBuilder` с помощью `entityManager.getCriteriaBuilder()`.
3. Создаем объект `CriteriaQuery<Product>`, указывая тип результата запроса - `Product`.
4. Получаем объект `Root<Product>` для сущности `Product` с помощью `query.from(Product.class)`.
5. Указываем, что нужно выбрать все поля сущности `Product` с помощью `query.select(root)`.
6. Создаем TypedQuery с помощью `entityManager.createQuery(query)`.
7. Выполняем запрос и получаем список продуктов `products` с помощью `getResultList()`.

### Добавление условий к запросу

Для добавления условий к запросу используются предикаты (`Predicate`). 
Рассмотрим пример запроса, который находит все продукты с ценой выше 100:

```java
// ... (предыдущий код)

// Создаем предикат: price > 100
Predicate pricePredicate = cb.gt(root.get("price"), 100);

// Добавляем предикат к запросу
query.where(pricePredicate);

// ... (остальная часть кода)
```

В этом примере мы использовали метод `cb.gt()` для создания предиката "больше чем". 

### Комбинирование предикатов

Предикаты можно комбинировать с помощью логических операторов `and`, `or` и `not`. Например, чтобы найти все продукты с ценой выше 100 и названием "Phone", можно использовать следующий код:

```java
// ... (предыдущий код)

Predicate namePredicate = cb.equal(root.get("name"), "Phone");

// Комбинируем предикаты с помощью "and"
Predicate finalPredicate = cb.and(pricePredicate, namePredicate);

// Добавляем комбинированный предикат к запросу
query.where(finalPredicate);

// ... (остальная часть кода)
```

### Сортировка результатов

Для сортировки результатов запроса используется метод `query.orderBy()`. Например, чтобы отсортировать продукты по возрастанию цены:

```java
// ... (предыдущий код)

// Сортировка по возрастанию цены
query.orderBy(cb.asc(root.get("price")));

// ... (остальная часть кода)
```

### Пагинация

Для пагинации результатов используются методы `setFirstResult()` и `setMaxResults()`:

```java
// ... (предыдущий код)

// Установка параметров пагинации
int pageNumber = 1; // Номер страницы
int pageSize = 10; // Количество записей на странице
query.setFirstResult((pageNumber - 1) * pageSize);
query.setMaxResults(pageSize);

// ... (остальная часть кода)
```

### Заключение

Criteria API предоставляет мощный и гибкий способ создания запросов к базе данных в Hibernate. Использование объектно-ориентированного подхода делает код более читаемым и поддерживаемым, особенно для сложных запросов. 

В этой статье мы рассмотрели только основы работы с Criteria API. Более подробную информацию можно найти в официальной документации Hibernate.
