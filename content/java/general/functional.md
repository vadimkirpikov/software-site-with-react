## Встроенные функциональные интерфейсы

Java предоставляет набор стандартных функциональных интерфейсов в пакете `java.util.function`. Эти интерфейсы покрывают большинство типовых ситуаций, избавляя от необходимости создавать свои функциональные интерфейсы для каждой задачи. 

### Типы встроенных функциональных интерфейсов

Встроенные функциональные интерфейсы можно разделить на несколько групп:

1. **Интерфейсы для функций с одним аргументом:**

    * **`Function<T, R>`:** Представляет функцию, которая принимает аргумент типа `T` и возвращает значение типа `R`.

       ```java
       Function<Integer, String> intToString = i -> "Число: " + i;
       String result = intToString.apply(10); // result = "Число: 10"
       ```

    * **`UnaryOperator<T>`:**  Является специализацией `Function`, где тип аргумента и тип результата совпадают (`T`).

       ```java
       UnaryOperator<String> toUpperCase = s -> s.toUpperCase();
       String upperCaseString = toUpperCase.apply("hello"); // upperCaseString = "HELLO"
       ```

    * **`Predicate<T>`:** Представляет функцию, которая принимает аргумент типа `T` и возвращает значение типа `boolean`. Используется для проверки условий.

       ```java
       Predicate<Integer> isEven = i -> i % 2 == 0;
       boolean isEvenNumber = isEven.test(4); // isEvenNumber = true
       ```

    * **`Consumer<T>`:** Представляет функцию, которая принимает аргумент типа `T` и ничего не возвращает. Используется для выполнения действий над объектами.

       ```java
       Consumer<String> printString = s -> System.out.println(s);
       printString.accept("Привет!"); // Выведет "Привет!" в консоль
       ```

2. **Интерфейсы для функций с двумя аргументами:**

    * **`BiFunction<T, U, R>`:**  Представляет функцию, которая принимает два аргумента типов `T` и `U` и возвращает значение типа `R`.

       ```java
       BiFunction<Integer, Integer, Integer> sum = (a, b) -> a + b;
       int result = sum.apply(5, 7); // result = 12
       ```

    * **`BinaryOperator<T>`:**  Специализация `BiFunction`, где все типы аргументов и тип результата совпадают (`T`).

       ```java
       BinaryOperator<Integer> multiply = (a, b) -> a * b;
       int result = multiply.apply(3, 4); // result = 12
       ```

    * **`BiPredicate<T, U>`:**  Представляет функцию, которая принимает два аргумента типов `T` и `U` и возвращает значение типа `boolean`. 

       ```java
       BiPredicate<Integer, Integer> areEqual = (a, b) -> a.equals(b);
       boolean isEqual = areEqual.test(5, 5); // isEqual = true
       ```

    * **`BiConsumer<T, U>`:** Представляет функцию, которая принимает два аргумента типов `T` и `U` и ничего не возвращает.

       ```java
       BiConsumer<String, Integer> printEntry = (k, v) -> System.out.println(k + ": " + v);
       printEntry.accept("Возраст", 30); // Выведет "Возраст: 30" в консоль
       ```

3. **Интерфейсы для примитивных типов:**

    Существуют специализированные интерфейсы для работы с примитивными типами данных, например:
    * **`IntFunction<R>`:** принимает аргумент типа `int` и возвращает значение типа `R`.
    * **`IntUnaryOperator`:** принимает и возвращает значение типа `int`.
    * **`IntPredicate`:**  принимает аргумент типа `int` и возвращает значение типа `boolean`.
    * **`IntConsumer`:** принимает аргумент типа `int` и ничего не возвращает.
    * **`ToIntFunction<T>`:**  принимает аргумент типа `T` и возвращает значение типа `int`.
    * **`IntToLongFunction`:**  принимает аргумент типа `int` и возвращает значение типа `long`.

    Аналогичные интерфейсы существуют и для других примитивных типов (`long`, `double`). 

###  Пример использования встроенных функциональных интерфейсов

Рассмотрим пример использования встроенных функциональных интерфейсов для обработки списка чисел:

```java
import java.util.List;
import java.util.function.Predicate;

public class FunctionalInterfacesExample {

    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Найти все четные числа
        filterAndPrint(numbers, n -> n % 2 == 0); 

        // Найти все числа больше 5
        filterAndPrint(numbers, n -> n > 5); 
    }

    // Метод принимает список чисел и предикат
    // Выводит на экран все числа, удовлетворяющие предикату
    public static void filterAndPrint(List<Integer> list, Predicate<Integer> predicate) {
        list.stream()
            .filter(predicate)
            .forEach(System.out::println);
    }
}
```

В этом примере мы используем интерфейс `Predicate<Integer>` для определения условия фильтрации списка. Метод `filterAndPrint` принимает список чисел и предикат, а затем выводит на экран все числа, которые удовлетворяют этому предикату. 

### Заключение

Использование встроенных функциональных интерфейсов делает код более лаконичным, понятным и выразительным. Важно знать основные типы этих интерфейсов и уметь применять их на практике для решения различных задач. 
