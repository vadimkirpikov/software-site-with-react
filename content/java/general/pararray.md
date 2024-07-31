## Параллельные операции над массивами

В Java 21 представлен мощный API для параллельной обработки данных, в том числе и над массивами. Он позволяет эффективно использовать многоядерные процессоры, разбивая задачи на подзадачи и выполняя их параллельно. 

### Класс Arrays

Класс `java.util.Arrays` содержит набор статических методов для работы с массивами, включая методы для параллельной обработки. 

#### Метод parallelSetAll()

Метод `parallelSetAll()` используется для инициализации массива значениями, сгенерированными переданным в качестве аргумента `IntFunction`. Этот метод выполняется параллельно, что ускоряет процесс инициализации, особенно для больших массивов.

**Пример:**

```java
import java.util.Arrays;

public class ParallelSetAllExample {
    public static void main(String[] args) {
        int[] numbers = new int[10];

        // Инициализируем массив значениями от 0 до 9
        Arrays.parallelSetAll(numbers, i -> i);

        // Выводим содержимое массива
        System.out.println(Arrays.toString(numbers)); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
}
```

В этом примере `parallelSetAll()` принимает массив `numbers` и лямбда-выражение `i -> i`, которое возвращает значение индекса `i`. В результате каждый элемент массива будет инициализирован своим индексом.

#### Метод parallelPrefix()

Метод `parallelPrefix()` вычисляет префиксные суммы элементов массива параллельно. Префиксная сумма элемента - это сумма всех элементов до этого элемента, включая его самого.

**Пример:**

```java
import java.util.Arrays;

public class ParallelPrefixExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        // Вычисляем префиксные суммы
        Arrays.parallelPrefix(numbers, Integer::sum);

        // Выводим содержимое массива
        System.out.println(Arrays.toString(numbers)); // [1, 3, 6, 10, 15]
    }
}
```

В данном примере `parallelPrefix()` принимает массив `numbers` и метод `Integer::sum`, который складывает два числа. В результате каждый элемент массива будет заменен на сумму всех предшествующих ему элементов и самого себя.

#### Методы parallelSort() и parallelSort(T[] a, Comparator<? super T> cmp)

Метод `parallelSort()` сортирует массив параллельно, используя алгоритм быстрой сортировки. Он доступен для примитивных типов и объектов, реализующих интерфейс `Comparable`. Для сортировки массива объектов с использованием собственного компаратора используется метод `parallelSort(T[] a, Comparator<? super T> cmp)`.

**Пример:**

```java
import java.util.Arrays;
import java.util.Comparator;

public class ParallelSortExample {
    public static void main(String[] args) {
        // Сортировка массива чисел
        int[] numbers = {5, 2, 8, 1, 9};
        Arrays.parallelSort(numbers);
        System.out.println(Arrays.toString(numbers)); // [1, 2, 5, 8, 9]

        // Сортировка массива строк по убыванию длины
        String[] words = {"apple", "banana", "orange", "kiwi"};
        Arrays.parallelSort(words, Comparator.comparingInt(String::length).reversed());
        System.out.println(Arrays.toString(words)); // [banana, orange, apple, kiwi]
    }
}
```

В этом примере первый вызов `parallelSort()` сортирует массив `numbers` по возрастанию. Второй вызов `parallelSort()` сортирует массив `words` по убыванию длины строк, используя компаратор, созданный с помощью `Comparator.comparingInt(String::length).reversed()`.

#### Методы spliterator() и stream()

Метод `spliterator()` возвращает объект `Spliterator`, который можно использовать для разделения массива на части для параллельной обработки. Метод `stream()` создает параллельный поток данных из массива.

**Пример:**

```java
import java.util.Arrays;

public class SpliteratorExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        // Создаем параллельный поток из массива
        int sum = Arrays.stream(numbers).parallel().sum();

        // Выводим сумму всех элементов
        System.out.println("Сумма: " + sum); // Сумма: 55
    }
}
```

В данном примере `Arrays.stream(numbers).parallel()` создает параллельный поток данных из массива `numbers`. Метод `sum()` вычисляет сумму всех элементов потока, используя возможности параллельной обработки.

### Заключение

Использование параллельных операций над массивами может значительно ускорить выполнение программ, особенно при работе с большими объемами данных. Класс `Arrays` предоставляет удобный API для выполнения таких операций, как инициализация, вычисление префиксных сумм, сортировка и создание параллельных потоков.