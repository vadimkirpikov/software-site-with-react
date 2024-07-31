## Фильтрация данных и оптимизация запросов в Hibernate 6

Работа с базами данных часто подразумевает не просто получение всех данных из таблицы, а выборку только тех записей, которые соответствуют определенным критериям. Hibernate предоставляет мощные механизмы для фильтрации данных и оптимизации запросов, что позволяет получать нужную информацию быстро и эффективно.

### Критерии (Criteria API)

Criteria API - это объектно-ориентированный способ создания запросов к базе данных. Вместо написания SQL-запросов вручную, вы используете Java-код для определения критериев поиска, что делает код более читаемым, безопасным и переносимым.

#### Базовый пример

Предположим, у нас есть сущность `Product`:

```java
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    // конструкторы, геттеры и сеттеры
}
```

Для получения всех продуктов с ценой выше 100, можно использовать следующий код:

```java
CriteriaBuilder builder = entityManager.getCriteriaBuilder();
CriteriaQuery<Product> query = builder.createQuery(Product.class);
Root<Product> root = query.from(Product.class);

// Условие: цена больше 100
Predicate pricePredicate = builder.gt(root.get("price"), 100);

query.select(root).where(pricePredicate);

List<Product> products = entityManager.createQuery(query).getResultList();
```

1. `CriteriaBuilder` используется для создания различных частей запроса, таких как условия и выражения.
2. `CriteriaQuery` определяет тип результата запроса и корневую сущность.
3. `Root` представляет собой корневую сущность в запросе - в данном случае `Product`.
4. `Predicate` представляет собой условие фильтрации - цена продукта должна быть больше 100.
5. Метод `where` добавляет условие фильтрации к запросу.
6. `EntityManager` выполняет запрос и возвращает список продуктов.

#### Сочетание условий

Criteria API позволяет легко комбинировать несколько условий с помощью логических операторов:

```java
// Условие: имя содержит "Phone"
Predicate namePredicate = builder.like(root.get("name"), "%Phone%");

// Объединяем условия с помощью "and"
Predicate finalPredicate = builder.and(pricePredicate, namePredicate);

query.select(root).where(finalPredicate);
```

#### Сортировка и пагинация

Criteria API также предоставляет возможности для сортировки и пагинации:

```java
// Сортировка по имени по убыванию
query.orderBy(builder.desc(root.get("name")));

// Пагинация: получить 10 записей, начиная с 20-й
List<Product> products = entityManager.createQuery(query)
    .setFirstResult(20)
    .setMaxResults(10)
    .getResultList();
```

### JPQL (Java Persistence Query Language)

JPQL - это объектно-ориентированный язык запросов, который является частью спецификации JPA. Он похож на SQL, но работает с сущностями и их атрибутами, а не с таблицами и колоннами.

#### Базовый пример

Получение всех продуктов с ценой выше 100 с помощью JPQL:

```java
String jpql = "SELECT p FROM Product p WHERE p.price > 100";
List<Product> products = entityManager.createQuery(jpql, Product.class).getResultList();
```

#### Параметризованные запросы

Для повышения безопасности и производительности рекомендуется использовать параметризованные запросы:

```java
String jpql = "SELECT p FROM Product p WHERE p.name LIKE :productName";
List<Product> products = entityManager.createQuery(jpql, Product.class)
    .setParameter("productName", "%Phone%")
    .getResultList();
```

### Оптимизация запросов

Оптимизация запросов - важный аспект работы с базами данных. Hibernate предоставляет несколько механизмов для повышения производительности запросов:

#### Fetching strategies (стратегии выборки)

* **Lazy loading (ленивая загрузка):** загрузка связанных сущностей откладывается до момента их фактического использования.
* **Eager loading (жадная загрузка):** связанные сущности загружаются вместе с основной сущностью.

Выбор стратегии загрузки зависит от конкретной ситуации и может существенно влиять на производительность.

#### Кеширование

Hibernate использует кеширование для хранения часто используемых данных в памяти, что позволяет сократить количество обращений к базе данных.

#### Индексы

Индексы позволяют ускорить поиск данных в базе данных. Hibernate позволяет определять индексы для сущностей и атрибутов.

#### Native SQL (нативный SQL)

В некоторых случаях может потребоваться использование нативного SQL для выполнения сложных запросов, которые сложно или невозможно реализовать с помощью Criteria API или JPQL.

**Пример использования нативного SQL:**

```java
String sql = "SELECT * FROM Product WHERE price > ? AND name LIKE ?";
List<Product> products = entityManager.createNativeQuery(sql, Product.class)
    .setParameter(1, 100)
    .setParameter(2, "%Phone%")
    .getResultList();
```

Использование описанных выше инструментов и методов поможет вам эффективно фильтровать данные и оптимизировать запросы в Hibernate, что обеспечит высокую производительность вашего приложения.
