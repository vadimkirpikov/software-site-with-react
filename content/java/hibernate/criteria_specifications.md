## Критерии и спецификации

Hibernate предоставляет мощные механизмы для выборки данных из базы данных: **критерии** и **спецификации**. Они позволяют строить типобезопасные запросы, используя Java-код вместо SQL, что улучшает читаемость, переиспользуемость и поддерживаемость кода.

### Criteria API

Criteria API представляет собой объектно-ориентированный способ построения запросов к базе данных. Вместо написания SQL-запросов вы используете Java-объекты и методы для определения условий выборки.

#### Создание CriteriaQuery

Работа с Criteria API начинается с создания объекта `CriteriaQuery`:

```java
// Получаем EntityManager
EntityManager entityManager = entityManagerFactory.createEntityManager();

// Создаем CriteriaBuilder
CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

// Создаем CriteriaQuery для сущности Item
CriteriaQuery<Item> criteriaQuery = criteriaBuilder.createQuery(Item.class);

// Указываем корневой объект запроса (сущность Item)
Root<Item> root = criteriaQuery.from(Item.class); 
```

В этом примере:

- `EntityManager` используется для взаимодействия с контекстом персистентности.
- `CriteriaBuilder` предоставляет методы для создания различных компонентов запроса.
- `CriteriaQuery` определяет тип результата запроса (в данном случае `Item`).
- `Root` представляет корневую сущность запроса (`Item`), с которой будут связаны другие части запроса.

#### Добавление условий выборки

Для добавления условий выборки к запросу используйте предикаты:

```java
// Создаем предикат: цена товара больше 100
Predicate pricePredicate = criteriaBuilder.gt(root.get("price"), 100);

// Добавляем предикат в запрос
criteriaQuery.where(pricePredicate);

// Указываем, что нужно выбрать все поля сущности Item
criteriaQuery.select(root);
```

В этом примере мы создаем предикат `pricePredicate`, который проверяет, что значение поля `price` объекта `Item` больше 100. Затем этот предикат добавляется в запрос с помощью метода `where`.

#### Выполнение запроса и обработка результатов

Для выполнения запроса и получения списка сущностей используйте `TypedQuery`:

```java
// Создаем TypedQuery на основе CriteriaQuery
TypedQuery<Item> query = entityManager.createQuery(criteriaQuery);

// Выполняем запрос и получаем список сущностей
List<Item> items = query.getResultList();

// Обрабатываем полученные сущности
for (Item item : items) {
    System.out.println("Название: " + item.getName() + ", Цена: " + item.getPrice());
}
```

В этом примере мы создаем `TypedQuery` на основе созданного ранее `CriteriaQuery`. Затем мы выполняем запрос с помощью метода `getResultList`, который возвращает список объектов `Item`, удовлетворяющих условиям запроса. 

#### Дополнительные возможности Criteria API

Criteria API предоставляет множество других возможностей, таких как:

- Сортировка результатов (метод `orderBy`).
- Группировка результатов (методы `groupBy`, `having`).
- Запросы с подзапросами (метод `subquery`).
- Использование агрегатных функций (методы `count`, `sum`, `avg` и т.д.).
- Соединение таблиц (методы `join`, `fetch`).

### Спецификации (Specifications)

Спецификации - это механизм, позволяющий инкапсулировать логику построения предикатов для Criteria API. Это упрощает переиспользование и комбинирование сложных условий выборки.

#### Создание спецификации

Спецификация - это интерфейс с одним методом `toPredicate`:

```java
public interface Specification<T> {
    Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder);
}
```

Для создания спецификации нужно создать класс, реализующий интерфейс `Specification`, и реализовать метод `toPredicate`:

```java
public class ItemPriceSpecification implements Specification<Item> {

    private final int minPrice;

    public ItemPriceSpecification(int minPrice) {
        this.minPrice = minPrice;
    }

    @Override
    public Predicate toPredicate(Root<Item> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        // Возвращаем предикат: цена товара больше или равна minPrice
        return criteriaBuilder.ge(root.get("price"), minPrice);
    }
}
```

#### Использование спецификации в запросе

Для использования спецификации в запросе Criteria API используйте метод `where`:

```java
// Создаем спецификацию для цены товара от 100
Specification<Item> priceSpecification = new ItemPriceSpecification(100);

// Создаем CriteriaQuery
CriteriaQuery<Item> criteriaQuery = criteriaBuilder.createQuery(Item.class);
Root<Item> root = criteriaQuery.from(Item.class);

// Применяем спецификацию к запросу
criteriaQuery.where(priceSpecification.toPredicate(root, criteriaQuery, criteriaBuilder));

// ... остальной код запроса
```

#### Комбинирование спецификаций

Спецификации можно комбинировать с помощью статических методов интерфейса `Specification`:

- `where(Specification<T> spec)`: применяет одну спецификацию.
- `and(Specification<T> other)`: объединяет текущую спецификацию с другой через логическое "И".
- `or(Specification<T> other)`: объединяет текущую спецификацию с другой через логическое "ИЛИ".

Пример комбинирования спецификаций:

```java
// Создаем спецификацию для цены товара от 100
Specification<Item> priceSpecification = new ItemPriceSpecification(100);

// Создаем спецификацию для товара с названием "Товар 1"
Specification<Item> nameSpecification = (root, query, criteriaBuilder) ->
    criteriaBuilder.equal(root.get("name"), "Товар 1");

// Комбинируем спецификации через "И"
Specification<Item> combinedSpecification = priceSpecification.and(nameSpecification);

// Применяем комбинированную спецификацию к запросу
criteriaQuery.where(combinedSpecification.toPredicate(root, criteriaQuery, criteriaBuilder));
```

В этом примере мы создали две спецификации: `priceSpecification` и `nameSpecification`, а затем объединили их через логическое "И" с помощью метода `and`.

Использование Criteria API и спецификаций делает ваши запросы к базе данных более гибкими, читаемыми и легко поддерживаемыми. 
