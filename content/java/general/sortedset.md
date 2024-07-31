## Упорядоченные коллекции: SortedSet, NavigableSet и TreeSet

В Java, помимо стандартных коллекций Set, существуют специализированные интерфейсы и классы для работы с упорядоченными множествами: `SortedSet`, `NavigableSet` и `TreeSet`. Давайте разберемся, что они из себя представляют и как их использовать.

### SortedSet

`SortedSet` расширяет интерфейс `Set`, добавляя гарантию упорядоченности элементов. Это означает, что все элементы в `SortedSet` хранятся в отсортированном виде, что упрощает поиск и итерацию.

**Основные методы SortedSet:**

| Метод                  | Описание                                                                         |
|-------------------------|-----------------------------------------------------------------------------------|
| `first()`              | Возвращает первый (минимальный) элемент множества.                               |
| `last()`               | Возвращает последний (максимальный) элемент множества.                             |
| `headSet(E toElement)`| Возвращает представление части множества, элементы которой строго меньше `toElement`.|
| `tailSet(E fromElement)`| Возвращает представление части множества, элементы которой больше или равны `fromElement`.|
| `subSet(E fromElement, E toElement)` | Возвращает представление части множества, элементы которой находятся в диапазоне от `fromElement` (включительно) до `toElement` (исключительно). |

**Пример использования SortedSet:**

```java
import java.util.SortedSet;
import java.util.TreeSet;

public class SortedSetExample {
    public static void main(String[] args) {
        SortedSet<String> names = new TreeSet<>();

        // Добавляем элементы в множество
        names.add("Bob");
        names.add("Alice");
        names.add("Charlie");

        // Выводим элементы в отсортированном порядке
        System.out.println("Sorted names: " + names); // Вывод: [Alice, Bob, Charlie]

        // Получаем первый и последний элементы
        System.out.println("First name: " + names.first()); // Вывод: Alice
        System.out.println("Last name: " + names.last()); // Вывод: Charlie

        // Получаем подмножество
        SortedSet<String> subSet = names.subSet("Bob", "Charlie");
        System.out.println("Subset: " + subSet); // Вывод: [Bob]
    }
}
```

В этом примере мы создаем `TreeSet`, который является одной из реализаций `SortedSet`. Затем мы добавляем элементы в множество и выводим их в отсортированном порядке. Методы `first()`, `last()` и `subSet()` демонстрируют основные возможности работы с `SortedSet`.

### NavigableSet

`NavigableSet` расширяет `SortedSet`, предоставляя дополнительные методы навигации по множеству. Он предлагает методы для поиска ближайших соседей элементов, а также для обратного обхода множества.

**Основные методы NavigableSet, помимо унаследованных от SortedSet:**

| Метод                  | Описание                                                                         |
|-------------------------|-----------------------------------------------------------------------------------|
| `lower(E e)`          | Возвращает наибольший элемент, строго меньший, чем `e`, или null, если такого нет. |
| `floor(E e)`          | Возвращает наибольший элемент, меньший или равный `e`, или null, если такого нет.   |
| `ceiling(E e)`        | Возвращает наименьший элемент, больший или равный `e`, или null, если такого нет.  |
| `higher(E e)`         | Возвращает наименьший элемент, строго больший, чем `e`, или null, если такого нет.  |
| `pollFirst()`         | Извлекает и возвращает первый (минимальный) элемент, удаляя его из множества.   |
| `pollLast()`          | Извлекает и возвращает последний (максимальный) элемент, удаляя его из множества.  |
| `descendingSet()`     | Возвращает представление множества в обратном порядке.                           |

**Пример использования NavigableSet:**

```java
import java.util.NavigableSet;
import java.util.TreeSet;

public class NavigableSetExample {
    public static void main(String[] args) {
        NavigableSet<Integer> numbers = new TreeSet<>();
        numbers.addAll(List.of(1, 3, 5, 7, 9));

        System.out.println("Lower than 4: " + numbers.lower(4)); // Вывод: 3
        System.out.println("Floor of 4: " + numbers.floor(4)); // Вывод: 3
        System.out.println("Ceiling of 4: " + numbers.ceiling(4)); // Вывод: 5
        System.out.println("Higher than 4: " + numbers.higher(4)); // Вывод: 5

        // Обратный обход множества
        NavigableSet<Integer> descendingNumbers = numbers.descendingSet();
        System.out.println("Descending order: " + descendingNumbers); // Вывод: [9, 7, 5, 3, 1]
    }
}
```

В этом примере мы используем `TreeSet` как реализацию `NavigableSet`. Мы демонстрируем методы `lower()`, `floor()`, `ceiling()`, `higher()` для поиска ближайших соседей, а также `descendingSet()` для обратного обхода множества.

### TreeSet

`TreeSet` - это конкретная реализация `NavigableSet`, основанная на красно-черном дереве. Это обеспечивает логарифмическую временную сложность для большинства операций, таких как добавление, удаление и поиск элементов.

**Создание TreeSet:**

```java
// Пустой TreeSet
TreeSet<String> treeSet = new TreeSet<>();

// TreeSet с компаратором для пользовательского порядка элементов
TreeSet<String> customTreeSet = new TreeSet<>(String::compareToIgnoreCase);

// TreeSet, инициализированный элементами из другой коллекции
TreeSet<Integer> initializedTreeSet = new TreeSet<>(List.of(5, 2, 8, 1));
```

**Важно помнить:**

* `TreeSet` хранит элементы в отсортированном порядке, поэтому важно, чтобы элементы были сравнимыми (реализовывали интерфейс `Comparable` или использовался `Comparator`).
* `TreeSet` не допускает null значения.

### Заключение

`SortedSet`, `NavigableSet` и `TreeSet` предоставляют мощные инструменты для работы с упорядоченными множествами в Java. Они обеспечивают высокую производительность и гибкость в управлении данными. Выбор между `SortedSet` и `NavigableSet` зависит от требуемой функциональности, а `TreeSet` - это надежная и эффективная реализация, которую можно использовать в большинстве случаев.
