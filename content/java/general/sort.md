## Сортировка в Java

Сортировка данных - одна из базовых задач программирования. Java предоставляет мощные и гибкие инструменты для сортировки коллекций и массивов. В этой статье мы рассмотрим основные методы сортировки, доступные в Java, и научимся применять их на практике.

### Интерфейс `Comparable`

Интерфейс `Comparable` определяет естественный порядок элементов в коллекции. Классы, реализующие `Comparable`, могут быть отсортированы с помощью метода `Collections.sort()` или `Arrays.sort()`. 

Для реализации `Comparable` необходимо определить метод `compareTo(T o)`, который возвращает:

* **Отрицательное число**, если текущий объект меньше объекта `o`.
* **Ноль**, если объекты равны.
* **Положительное число**, если текущий объект больше объекта `o`.

**Пример:**

```java
public class Person implements Comparable<Person> {
    private String name;
    private int age;

    // Конструктор, геттеры и сеттеры

    @Override
    public int compareTo(Person other) {
        // Сортировка по возрасту
        return this.age - other.age; 
    }
}
```

В этом примере мы реализовали `Comparable` в классе `Person` и определили сортировку по возрасту. 

### Интерфейс `Comparator`

Интерфейс `Comparator` позволяет определить пользовательский порядок сортировки. Он особенно полезен, когда нужно реализовать несколько вариантов сортировки для одного класса или сортировать объекты, не реализующие `Comparable`.

Для реализации `Comparator` нужно определить метод `compare(T o1, T o2)`, который возвращает:

* **Отрицательное число**, если `o1` меньше `o2`.
* **Ноль**, если `o1` и `o2` равны.
* **Положительное число**, если `o1` больше `o2`.

**Пример:**

```java
public class PersonNameComparator implements Comparator<Person> {
    @Override
    public int compare(Person p1, Person p2) {
        // Сортировка по имени по алфавиту
        return p1.getName().compareTo(p2.getName());
    }
}
```

Здесь мы создали класс `PersonNameComparator`, реализующий `Comparator`, для сортировки объектов `Person` по имени.

### Методы сортировки

Java предлагает два основных метода для сортировки: `Collections.sort()` и `Arrays.sort()`.

#### `Collections.sort()`

Метод `Collections.sort()` используется для сортировки списков (`List`). Он принимает список в качестве аргумента и сортирует его элементы, используя естественный порядок (`Comparable`) или пользовательский компаратор (`Comparator`).

**Примеры:**

```java
List<Person> people = new ArrayList<>();
// ... Добавление элементов в список ...

// Сортировка по естественному порядку (возрасту)
Collections.sort(people); 

// Сортировка по имени с использованием компаратора
Collections.sort(people, new PersonNameComparator()); 
```

#### `Arrays.sort()`

Метод `Arrays.sort()` используется для сортировки массивов. Он работает аналогично `Collections.sort()`, принимая массив и, опционально, компаратор.

**Примеры:**

```java
Person[] peopleArray = new Person[10];
// ... Заполнение массива ...

// Сортировка по естественному порядку (возрасту)
Arrays.sort(peopleArray);

// Сортировка по имени с использованием компаратора
Arrays.sort(peopleArray, new PersonNameComparator()); 
```

### Примеры использования

Рассмотрим примеры сортировки списка объектов `Person` различными способами.

**1. Сортировка по возрасту (естественный порядок):**

```java
List<Person> people = new ArrayList<>();
people.add(new Person("Иван", 30));
people.add(new Person("Мария", 25));
people.add(new Person("Петр", 35));

Collections.sort(people); // Сортировка по возрасту

for (Person person : people) {
    System.out.println(person.getName() + " - " + person.getAge());
}
```

**Вывод:**

```
Мария - 25
Иван - 30
Петр - 35
```

**2. Сортировка по имени (компаратор):**

```java
Collections.sort(people, new PersonNameComparator()); // Сортировка по имени

for (Person person : people) {
    System.out.println(person.getName() + " - " + person.getAge());
}
```

**Вывод:**

```
Иван - 30
Мария - 25
Петр - 35
```

### Заключение

В этой статье мы рассмотрели основные методы сортировки в Java. Интерфейсы `Comparable` и `Comparator` предоставляют гибкие механизмы определения порядка сортировки, а методы `Collections.sort()` и `Arrays.sort()` позволяют легко сортировать коллекции и массивы.