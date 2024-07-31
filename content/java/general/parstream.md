## Параллельные потоки

В Java работа с параллельными вычислениями и многопоточностью является важной частью разработки производительных и отзывчивых приложений. Параллельные потоки, представленные в Java 8, предоставляют мощный и гибкий инструмент для обработки данных в несколько потоков, что позволяет эффективно использовать многоядерные процессоры.

### Stream API и параллельные операции

Интерфейс `Stream` в Java предоставляет функциональный подход к обработке последовательностей данных. Помимо обычных потоков данных, существует возможность создавать *параллельные потоки*, которые автоматически распараллеливают выполнение операций над данными.

#### Создание параллельного потока

Получить параллельный поток можно несколькими способами:

1. **Вызов метода `parallel()`**:
   ```java
   List<Integer> numbers = List.of(1, 2, 3, 4, 5);
   Stream<Integer> parallelStream = numbers.stream().parallel();
   ```

2. **Использование метода `parallelStream()`**:
   ```java
   List<Integer> numbers = List.of(1, 2, 3, 4, 5);
   Stream<Integer> parallelStream = numbers.parallelStream();
   ```

#### Выполнение операций в параллельном потоке

После создания параллельного потока можно выполнять над ним любые операции, как и с обычным потоком данных. Разница заключается в том, что операции будут выполняться параллельно в нескольких потоках.

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
int sum = numbers.parallelStream()
                 .filter(n -> n % 2 == 0) // Фильтрация четных чисел
                 .map(n -> n * 2) // Умножение каждого элемента на 2
                 .reduce(0, Integer::sum); // Суммирование элементов
System.out.println("Сумма четных чисел, умноженных на 2: " + sum); // Вывод: 12
```

В данном примере:

1. Создается список целых чисел.
2. Создается параллельный поток из списка с помощью `parallelStream()`.
3. Применяется фильтр для выбора четных чисел.
4. К каждому элементу применяется функция умножения на 2.
5. Выполняется операция суммирования всех элементов с помощью `reduce()`.

### Важные моменты при работе с параллельными потоками

Важно помнить о следующих моментах при работе с параллельными потоками:

* **Порядок элементов**: В отличие от обычных потоков, порядок обработки элементов в параллельных потоках не гарантируется.
* **Разделяемые ресурсы**: При работе с разделяемыми ресурсами необходимо обеспечить синхронизацию доступа к ним. 
* **Затраты на распараллеливание**: Создание и управление потоками требует дополнительных ресурсов. Необходимо оценить целесообразность использования параллельных потоков для небольших объемов данных.

### Примеры использования

Рассмотрим несколько примеров использования параллельных потоков:

#### 1. Поиск максимального значения в списке

```java
List<Integer> numbers = List.of(5, 2, 8, 1, 9, 3);
Optional<Integer> max = numbers.parallelStream()
                               .max(Integer::compareTo);
max.ifPresent(System.out::println); // Вывод: 9
```

В данном примере ищется максимальное значение в списке чисел с помощью метода `max()`, который выполняется параллельно для повышения производительности.

#### 2. Преобразование списка объектов

```java
class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }
}

List<Person> people = List.of(
    new Person("Иван", 30), 
    new Person("Мария", 25), 
    new Person("Петр", 40));

List<String> names = people.parallelStream()
                           .map(Person::getName)
                           .collect(Collectors.toList());

System.out.println(names); // Вывод: [Иван, Мария, Петр]
```

В данном примере выполняется преобразование списка объектов `Person` в список строк, содержащий только имена. Метод `map()` применяется параллельно для ускорения обработки данных.

#### 3. Фильтрация и сортировка списка

```java
List<String> words = List.of("apple", "banana", "orange", "grape", "kiwi");
List<String> filteredAndSorted = words.parallelStream()
                                     .filter(w -> w.length() > 4)
                                     .sorted()
                                     .collect(Collectors.toList());

System.out.println(filteredAndSorted); // Вывод: [banana, orange]
```

В данном примере выполняется фильтрация списка строк, оставляя только строки длиной более 4 символов, и последующая сортировка отфильтрованного списка. Операции фильтрации и сортировки выполняются параллельно.

### Заключение

Параллельные потоки в Java предоставляют эффективный способ распараллеливания обработки данных, что позволяет создавать более производительные приложения. Важно помнить о особенностях работы с параллельными потоками, таких как порядок обработки элементов, доступ к разделяемым ресурсам и затраты на распараллеливание. 

Используя  параллельные потоки с умом, вы можете значительно улучшить производительность своих приложений. 