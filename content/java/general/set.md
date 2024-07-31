## Интерфейс Set и класс HashSet

В Java интерфейс `Set` представляет собой коллекцию, которая не допускает хранения дубликатов элементов. Все объекты, добавляемые в `Set`, должны быть уникальными. 

Интерфейс `Set` расширяет интерфейс `Collection`, наследуя его методы.

**Основные характеристики интерфейса `Set`:**

*   Не допускает хранения дубликатов.
*   Не гарантирует порядок элементов.
*   Может содержать `null` значение (но только одно).

### Класс HashSet

`HashSet` – это одна из наиболее часто используемых реализаций интерфейса `Set`. 

**Особенности класса `HashSet`:**

*   Хранит элементы в хэш-таблице.
*   Обеспечивает высокую производительность для операций добавления, удаления и поиска элементов.
*   Порядок элементов не гарантируется и может меняться.

### Создание HashSet

Для создания объекта `HashSet` можно использовать конструкторы:

*   `HashSet()`: Создает пустой `HashSet` с начальной емкостью 16 и коэффициентом загрузки 0.75.
*   `HashSet(Collection<? extends E> c)`: Создает `HashSet`, содержащий элементы из заданной коллекции `c`.
*   `HashSet(int initialCapacity)`: Создает пустой `HashSet` с заданной начальной емкостью.
*   `HashSet(int initialCapacity, float loadFactor)`: Создает пустой `HashSet` с заданной начальной емкостью и коэффициентом загрузки.

**Пример создания HashSet:**

```java
// Создание пустого HashSet
Set<String> names = new HashSet<>(); 

// Создание HashSet из списка
List<String> citiesList = List.of("Москва", "Санкт-Петербург", "Новосибирск");
Set<String> cities = new HashSet<>(citiesList);
```

### Основные операции с HashSet

**1. Добавление элементов:**

Для добавления элементов в `HashSet` используется метод `add()`.

```java
Set<String> fruits = new HashSet<>();
fruits.add("Яблоко"); // Добавляет "Яблоко" в HashSet
fruits.add("Банан");  // Добавляет "Банан" в HashSet
fruits.add("Яблоко"); // Не добавит дубликат "Яблоко"
```

**2. Проверка наличия элемента:**

Метод `contains()` позволяет проверить, содержится ли элемент в `HashSet`.

```java
boolean containsApple = fruits.contains("Яблоко"); // true
boolean containsGrape = fruits.contains("Виноград"); // false
```

**3. Удаление элементов:**

Для удаления элементов из `HashSet` используется метод `remove()`.

```java
fruits.remove("Банан"); // Удаляет "Банан" из HashSet
```

**4. Итерация по элементам:**

Для перебора элементов `HashSet` можно использовать цикл `for-each` или итератор.

```java
// Итерация с помощью for-each
for (String fruit : fruits) {
    System.out.println(fruit); 
}

// Итерация с помощью итератора
Iterator<String> iterator = fruits.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}
```

**5. Другие полезные методы:**

*   `size()`: Возвращает количество элементов в `HashSet`.
*   `isEmpty()`: Проверяет, пуст ли `HashSet`.
*   `clear()`: Удаляет все элементы из `HashSet`.

### Пример использования HashSet

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {

    public static void main(String[] args) {
        // Создаем HashSet для хранения имен студентов
        Set<String> students = new HashSet<>();

        // Добавляем имена студентов в HashSet
        students.add("Иван");
        students.add("Мария");
        students.add("Петр");
        students.add("Анна");
        students.add("Иван"); // Дубликат, не будет добавлен

        // Выводим количество студентов
        System.out.println("Количество студентов: " + students.size()); // Вывод: 4

        // Проверяем, есть ли студент с именем "Елена"
        System.out.println("Есть ли студент с именем Елена? " + students.contains("Елена")); // Вывод: false

        // Выводим список всех студентов
        System.out.println("Список студентов:");
        for (String student : students) {
            System.out.println(student);
        }
    }
}
```

### Заключение

`HashSet` - это мощная и эффективная реализация интерфейса `Set` в Java, которая идеально подходит для задач, где важна скорость добавления, удаления и поиска элементов, а порядок не имеет значения. Понимание принципов работы `HashSet` поможет вам выбрать наиболее подходящую коллекцию для решения ваших задач. 
