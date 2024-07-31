## Сортировка в Java: Интерфейсы Comparable и Comparator

Java предоставляет мощные инструменты для сортировки объектов: интерфейсы `Comparable` и `Comparator`. В этой статье мы рассмотрим оба интерфейса, их различия, а также примеры использования для сортировки объектов различных типов.

### Интерфейс Comparable

Интерфейс `Comparable` используется для определения естественного порядка сортировки объектов класса. Он содержит единственный метод `compareTo()`:

```java
public interface Comparable<T> {
    int compareTo(T o);
}
```

Метод `compareTo(T o)` сравнивает текущий объект (`this`) с объектом, переданным в качестве аргумента (`o`). 

Возвращаемое значение может быть:

* **Отрицательное число:** Если `this` объект меньше `o`.
* **Ноль:** Если объекты равны.
* **Положительное число:** Если `this` объект больше `o`.

#### Пример использования Comparable

Допустим, у нас есть класс `Person` с полями `name` и `age`:

```java
public class Person {
    private String name;
    private int age;

    // Конструктор, геттеры и сеттеры
}
```

Чтобы сделать объекты `Person` сравнимыми по возрасту, реализуем интерфейс `Comparable`:

```java
public class Person implements Comparable<Person> {
    // ... Поля, конструктор, геттеры и сеттеры

    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age);
    }
}
```

Теперь мы можем отсортировать список объектов `Person` по возрасту, используя `Collections.sort()`:

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

Результат:

```
Мария - 25
Иван - 30
Петр - 35
```

### Интерфейс Comparator

Интерфейс `Comparator` предоставляет возможность определить пользовательскую логику сравнения объектов, не затрагивая сам класс. 

Он содержит два метода:

```java
public interface Comparator<T> {
    int compare(T o1, T o2);

    boolean equals(Object obj);
}
```

* Метод `compare(T o1, T o2)` сравнивает два объекта, переданных в качестве аргументов. Логика сравнения определяется пользователем. 
* Метод `equals(Object obj)` используется для проверки на равенство двух компараторов.

#### Пример использования Comparator

Используя класс `Person` из предыдущего примера, создадим компаратор для сортировки по имени:

```java
public class PersonNameComparator implements Comparator<Person> {
    @Override
    public int compare(Person p1, Person p2) {
        return p1.getName().compareTo(p2.getName());
    }
}
```

Теперь отсортируем список `people` по имени, используя созданный компаратор:

```java
Collections.sort(people, new PersonNameComparator()); // Сортировка по имени

for (Person person : people) {
    System.out.println(person.getName() + " - " + person.getAge());
}
```

Результат:

```
Иван - 30
Мария - 25
Петр - 35
```

#### Лямбда-выражения и Comparator

В Java 8 появилась возможность использовать лямбда-выражения для создания компараторов, что делает код более лаконичным. Например, сортировка списка `people` по возрасту в обратном порядке:

```java
people.sort((p1, p2) -> Integer.compare(p2.getAge(), p1.getAge())); 
```

### Выбор между Comparable и Comparator

* Используйте `Comparable`, когда необходимо определить естественный порядок сортировки для класса.
* Используйте `Comparator`, когда требуется определить пользовательскую логику сравнения или необходимо использовать несколько вариантов сортировки для одного класса.

### Заключение

Интерфейсы `Comparable` и `Comparator` предоставляют гибкие возможности для сортировки объектов в Java. Выбор между ними зависит от конкретной задачи и требований к процессу сортировки.
