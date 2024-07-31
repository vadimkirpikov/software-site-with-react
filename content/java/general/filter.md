## Фильтрация, перебор и отображение данных в Java

Работа с коллекциями данных часто требует выполнения трёх основных операций: фильтрации, перебора и отображения. Java предоставляет мощные инструменты для эффективной реализации этих операций с использованием Stream API.

### Фильтрация элементов

Фильтрация позволяет отобрать элементы коллекции, удовлетворяющие определенному условию. Метод `filter()` принимает на вход объект типа `Predicate<T>`, который представляет собой функцию, проверяющую элемент на соответствие условию.

**Пример:**

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Фильтрация четных чисел
List<Integer> evenNumbers = numbers.stream()
        .filter(n -> n % 2 == 0)
        .toList();

System.out.println(evenNumbers); // Вывод: [2, 4, 6, 8, 10]
```

В этом примере `filter(n -> n % 2 == 0)` отбирает только те числа, которые делятся на 2 без остатка. 

### Перебор элементов

Для перебора элементов коллекции используется метод `forEach()`, который принимает на вход объект типа `Consumer<T>`. `Consumer<T>` представляет собой функцию, выполняющую определенное действие над каждым элементом коллекции.

**Пример:**

```java
List<String> names = List.of("Alice", "Bob", "Charlie", "David");

// Вывод каждого имени на консоль
names.stream()
        .forEach(name -> System.out.println("Hello, " + name + "!"));
```

В этом примере `forEach(name -> System.out.println("Hello, " + name + "!"))` выводит приветствие для каждого имени в списке.

### Отображение элементов

Отображение (или mapпинг) позволяет преобразовать каждый элемент коллекции в другой объект или значение. Метод `map()` принимает на вход объект типа `Function<T, R>`, где `T` - тип исходного элемента, а `R` - тип результирующего элемента. 

**Пример:**

```java
List<String> words = List.of("apple", "banana", "cherry");

// Получение длин каждого слова
List<Integer> wordLengths = words.stream()
        .map(String::length)
        .toList();

System.out.println(wordLengths); // Вывод: [5, 6, 6]
```

В этом примере `map(String::length)` преобразует каждое слово в его длину, используя метод `length()` класса `String`.

### Цепочки операций

Одним из главных преимуществ Stream API является возможность объединять операции фильтрации, перебора и отображения в цепочки. Это позволяет создавать лаконичный и выразительный код для обработки данных.

**Пример:**

```java
List<Person> people = List.of(
        new Person("Alice", 25),
        new Person("Bob", 30),
        new Person("Charlie", 20)
);

// Получение имен людей старше 25 лет
List<String> namesOfAdults = people.stream()
        .filter(person -> person.getAge() > 25) // Фильтрация по возрасту
        .map(Person::getName) // Получение имен
        .toList();

System.out.println(namesOfAdults); // Вывод: [Bob]
```

В этом примере сначала фильтруются люди старше 25 лет, затем из отобранных объектов извлекаются имена, и, наконец, формируется список имен.

### Дополнительные методы

Stream API предоставляет множество других полезных методов для работы с коллекциями:

* `sorted()`: сортировка элементов
* `distinct()`: удаление дубликатов
* `limit()`: ограничение количества элементов
* `reduce()`: агрегация элементов (например, суммирование или нахождение максимального значения)

### Заключение

Stream API является мощным инструментом для эффективной обработки данных в Java. Использование лямбда-выражений и функциональных интерфейсов делает код более лаконичным и выразительным. Фильтрация, перебор и отображение - это базовые операции, которые можно комбинировать и расширять для решения самых разных задач.