## Использование спецификаций

Спецификации в Hibernate представляют собой мощный инструмент для построения типобезопасных, многократно используемых и расширяемых критериев поиска. Они позволяют абстрагироваться от деталей реализации запросов, делая код более чистым и понятным.

Вместо прямого использования Criteria API или JPQL, спецификации позволяют определить критерии выборки в виде отдельных компонентов, которые затем можно комбинировать и использовать повторно в разных частях приложения.

### Создание спецификаций

Начиная с версии Hibernate 6, рекомендуется использовать функциональный API для создания спецификаций. 

Для начала определим интерфейс, расширяющий `org.springframework.data.jpa.domain.Specification`:

```java
import org.springframework.data.jpa.domain.Specification;

public interface EntitySpecifications<T> extends Specification<T> {
}
```

Затем создадим класс, реализующий данный интерфейс, и определим статические методы для каждого критерия поиска:

```java
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class ProductSpecifications implements EntitySpecifications<Product> {

    public static Specification<Product> nameContains(String name) {
        return (root, query, builder) -> builder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Product> priceGreaterThan(Double price) {
        return (root, query, builder) -> builder.greaterThan(root.get("price"), price);
    }

    public static Specification<Product> categoryEquals(String category) {
        return (root, query, builder) -> builder.equal(root.get("category"), category);
    }
}
```

В данном примере мы определили три статических метода:

- `nameContains`: возвращает спецификацию, проверяющую, содержит ли поле `name` указанную подстроку.
- `priceGreaterThan`: возвращает спецификацию, проверяющую, больше ли значение поля `price` указанного значения.
- `categoryEquals`: возвращает спецификацию, проверяющую, равно ли значение поля `category` указанному значению.

### Применение спецификаций

Для применения спецификаций используется метод `findAll` репозитория Spring Data JPA с передачей объекта `Specification`:

```java
// Находим все продукты, название которых содержит "phone"
List<Product> products = productRepository.findAll(ProductSpecifications.nameContains("phone"));

// Находим все продукты дороже 100
List<Product> expensiveProducts = productRepository.findAll(ProductSpecifications.priceGreaterThan(100.0));

// Находим все продукты категории "electronics"
List<Product> electronics = productRepository.findAll(ProductSpecifications.categoryEquals("electronics"));
```

### Комбинирование спецификаций

Одним из главных преимуществ спецификаций является возможность их комбинирования с помощью логических операторов `and`, `or` и `not`. 

Например, чтобы найти все продукты категории "electronics" дороже 500, можно скомбинировать две спецификации:

```java
List<Product> expensiveElectronics = productRepository.findAll(
        ProductSpecifications.categoryEquals("electronics")
                .and(ProductSpecifications.priceGreaterThan(500.0))
);
```

Аналогично, можно использовать операторы `or` и `not` для построения более сложных условий выборки.

### Передача параметров в спецификации

Для создания более гибких спецификаций можно передавать параметры в статические методы:

```java
public class ProductSpecifications implements EntitySpecifications<Product> {

    public static Specification<Product> priceBetween(Double minPrice, Double maxPrice) {
        return (root, query, builder) -> builder.between(root.get("price"), minPrice, maxPrice);
    }
}
```

Данная спецификация принимает два параметра - минимальную и максимальную цену - и возвращает все продукты, цена которых находится в указанном диапазоне.

### Использование спецификаций с пагинацией и сортировкой

Спецификации можно использовать совместно с механизмами пагинации и сортировки, предоставляемыми Spring Data JPA. 

Например, для получения первой страницы (размер страницы - 10) продуктов, отсортированных по цене по возрастанию, можно использовать следующий код:

```java
Pageable pageable = PageRequest.of(0, 10, Sort.by("price").ascending());
Page<Product> products = productRepository.findAll(ProductSpecifications.categoryEquals("books"), pageable);
```

В данном примере мы сначала создаем объект `Pageable`, определяющий параметры пагинации и сортировки. Затем мы передаем его вместе со спецификацией в метод `findAll` репозитория.

### Заключение

Использование спецификаций в Hibernate позволяет создавать типобезопасные, многократно используемые и расширяемые критерии поиска. Они делают код более чистым, понятным и простым в поддержке, особенно при работе со сложными запросами.