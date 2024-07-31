## Тип Optional в Java

В Java 8 был представлен тип `Optional`, который служит для явного указания на возможное отсутствие значения. Он является контейнером, который может либо содержать одно значение, либо быть пустым. Использование `Optional` помогает избежать `NullPointerException` и делает код более читаемым и понятным.

### Создание объекта Optional

Существует несколько способов создать объект `Optional`:

1. **`Optional.empty()`**: Возвращает пустой `Optional`.

   ```java
   Optional<String> emptyOptional = Optional.empty();
   ```

2. **`Optional.of(value)`**: Создает `Optional` с заданным значением. Выбрасывает `NullPointerException`, если `value` равен `null`.

   ```java
   String name = "John";
   Optional<String> optionalName = Optional.of(name);
   ```

3. **`Optional.ofNullable(value)`**: Создает `Optional` с заданным значением, если оно не равно `null`. В противном случае возвращает пустой `Optional`.

   ```java
   String city = null;
   Optional<String> optionalCity = Optional.ofNullable(city);
   ```

### Проверка наличия значения

Чтобы проверить, содержит ли `Optional` значение, используется метод `isPresent()`:

```java
Optional<Integer> optionalValue = Optional.of(10);

if (optionalValue.isPresent()) {
    System.out.println("Значение присутствует");
} else {
    System.out.println("Значение отсутствует");
}
```

### Получение значения

Получить значение из `Optional` можно с помощью следующих методов:

1. **`get()`**: Возвращает значение, если оно присутствует. Выбрасывает `NoSuchElementException`, если `Optional` пуст.

   ```java
   Optional<String> optionalName = Optional.of("Alice");
   String name = optionalName.get(); // "Alice"
   ```

2. **`orElse(other)`**: Возвращает значение, если оно присутствует. В противном случае возвращает `other`.

   ```java
   Optional<Integer> optionalAge = Optional.empty();
   int age = optionalAge.orElse(18); // 18
   ```

3. **`orElseGet(supplier)`**: Возвращает значение, если оно присутствует. В противном случае возвращает результат выполнения `supplier`.

   ```java
   Optional<String> optionalAddress = Optional.empty();
   String address = optionalAddress.orElseGet(() -> "Unknown address"); // "Unknown address"
   ```

4. **`orElseThrow()`**: Возвращает значение, если оно присутствует. В противном случае выбрасывает исключение, указанное в `Supplier`.

   ```java
   Optional<Double> optionalPrice = Optional.empty();
   double price = optionalPrice.orElseThrow(() -> new IllegalArgumentException("Price is missing"));
   ```

### Преобразование значения

`Optional` предоставляет методы для преобразования значения:

1. **`map(function)`**: Применяет функцию к значению, если оно присутствует, и возвращает новый `Optional` с результатом.

   ```java
   Optional<String> optionalText = Optional.of("hello");
   Optional<Integer> optionalLength = optionalText.map(String::length); // Optional[5]
   ```

2. **`flatMap(function)`**: Применяет функцию, которая возвращает `Optional`, к значению, если оно присутствует.

   ```java
   Optional<User> optionalUser = getUser(123);
   Optional<String> optionalEmail = optionalUser.flatMap(User::getEmail); 
   ```

### Фильтрация значения

Метод `filter(predicate)` позволяет отфильтровать значение по условию:

```java
Optional<Integer> optionalNumber = Optional.of(7);
Optional<Integer> filteredNumber = optionalNumber.filter(n -> n > 5); // Optional[7]

Optional<Integer> anotherNumber = Optional.of(3);
Optional<Integer> anotherFilteredNumber = anotherNumber.filter(n -> n > 5); // Optional.empty
```

### Пример использования

Представим класс `User` с полями `name` и `email`:

```java
class User {
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public Optional<String> getEmail() {
        return Optional.ofNullable(email);
    }
}
```

Используя `Optional`, можно безопасно получить email пользователя:

```java
User user = new User("Bob", null);

String email = user.getEmail()
                   .map(String::toLowerCase)
                   .orElse("no email");

System.out.println(email); // "no email"
```

В этом примере, метод `getEmail()` возвращает `Optional<String>`. Затем, с помощью `map()`, мы преобразуем email в нижний регистр, если он присутствует. Наконец, метод `orElse()` возвращает "no email", если email отсутствует.

Использование `Optional` делает код более безопасным, читаемым и позволяет избежать `NullPointerException`. 
