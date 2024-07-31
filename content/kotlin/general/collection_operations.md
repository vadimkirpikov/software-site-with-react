## Основные операции над коллекциями в Kotlin

Коллекции являются неотъемлемой частью разработки на Kotlin, позволяя удобно хранить и обрабатывать группы данных. Стандартная библиотека Kotlin предоставляет богатый набор функций для работы с коллекциями, делая обработку данных простой и эффективной. В этом разделе мы рассмотрим основные операции, которые можно выполнять над коллекциями.

### Типы коллекций

Перед тем как начать работу с коллекциями, важно понимать какие типы коллекций существуют в Kotlin:

* **List:** Упорядоченная коллекция с доступом к элементам по индексу. Может содержать дубликаты.
  * Пример: `listOf(1, 2, 2, 3)`
* **Set:** Неупорядоченная коллекция, содержащая только уникальные элементы. 
  * Пример: `setOf(1, 2, 3)`
* **Map:** Коллекция, хранящая данные в виде пар "ключ-значение".  Каждый ключ уникален.
  * Пример: `mapOf("apple" to 1, "banana" to 2)`

### Создание коллекций

Для создания коллекций используются функции: `listOf()`, `setOf()`, `mapOf()`. Можно создавать как изменяемые (mutable), так и неизменяемые (immutable) коллекции:

```kotlin
// Неизменяемые коллекции
val numbers: List<Int> = listOf(1, 2, 3) 
val fruits: Set<String> = setOf("apple", "banana", "orange")
val prices: Map<String, Int> = mapOf("apple" to 1, "banana" to 2)

// Изменяемые коллекции
val mutableNumbers: MutableList<Int> = mutableListOf(1, 2, 3)
val mutableFruits: MutableSet<String> = mutableSetOf("apple", "banana", "orange")
val mutablePrices: MutableMap<String, Int> = mutableMapOf("apple" to 1, "banana" to 2)
```

### Чтение данных из коллекции

Доступ к элементам коллекции можно получить различными способами:

**1. По индексу (для List):**

```kotlin
val numbers = listOf(1, 2, 3)
println(numbers[0]) // Вывод: 1
```

**2. С помощью цикла `for`:**

```kotlin
val fruits = setOf("apple", "banana", "orange")
for (fruit in fruits) {
    println(fruit)
}
```

**3. С помощью функции `forEach`:**

```kotlin
val prices = mapOf("apple" to 1, "banana" to 2)
prices.forEach { key, value ->
    println("$key стоит $value")
}
```

### Основные операции

Стандартная библиотека Kotlin предоставляет множество функций для работы с коллекциями. Рассмотрим наиболее часто используемые:

**1. Фильтрация:**

* `filter`: возвращает новую коллекцию, содержащую элементы, удовлетворяющие заданному предикату.

    ```kotlin
    val numbers = listOf(1, 2, 3, 4, 5)
    val evenNumbers = numbers.filter { it % 2 == 0 } // [2, 4]
    ```

* `filterNot`: возвращает новую коллекцию, содержащую элементы, не удовлетворяющие заданному предикату.

    ```kotlin
    val numbers = listOf(1, 2, 3, 4, 5)
    val oddNumbers = numbers.filterNot { it % 2 == 0 } // [1, 3, 5]
    ```

**2. Преобразование:**

* `map`: преобразует каждый элемент коллекции с помощью заданной функции и возвращает новую коллекцию с результатами.

    ```kotlin
    val numbers = listOf(1, 2, 3)
    val squaredNumbers = numbers.map { it * it } // [1, 4, 9]
    ```

* `flatMap`: применяет заданную функцию к каждому элементу коллекции, а затем объединяет результаты в одну коллекцию.

    ```kotlin
    val words = listOf("hello", "world")
    val letters = words.flatMap { it.toList() } // [h, e, l, l, o, w, o, r, l, d]
    ```

**3. Проверка условий:**

* `any`: проверяет, удовлетворяет ли хотя бы один элемент коллекции заданному предикату.

    ```kotlin
    val numbers = listOf(1, 2, 3)
    val hasEvenNumber = numbers.any { it % 2 == 0 } // true
    ```

* `all`: проверяет, удовлетворяют ли все элементы коллекции заданному предикату.

    ```kotlin
    val numbers = listOf(2, 4, 6)
    val allEven = numbers.all { it % 2 == 0 } // true
    ```

**4. Сортировка:**

* `sorted`: возвращает новую отсортированную коллекцию.

    ```kotlin
    val numbers = listOf(3, 1, 2)
    val sortedNumbers = numbers.sorted() // [1, 2, 3]
    ```

* `sortedBy`: возвращает новую коллекцию, отсортированную по значению, возвращаемому заданной функцией-селектором.

    ```kotlin
    data class Person(val name: String, val age: Int)

    val people = listOf(Person("Alice", 20), Person("Bob", 30), Person("Charlie", 25))
    val sortedByAge = people.sortedBy { it.age } // [Alice (20), Charlie (25), Bob (30)]
    ```

### Работа с изменяемыми коллекциями

Изменяемые коллекции предоставляют дополнительные методы для добавления, удаления и обновления элементов:

* `add`: добавляет элемент в коллекцию.
* `remove`: удаляет элемент из коллекции.
* `clear`: очищает коллекцию.

```kotlin
val mutableNumbers: MutableList<Int> = mutableListOf(1, 2, 3)
mutableNumbers.add(4) // [1, 2, 3, 4]
mutableNumbers.remove(2) // [1, 3, 4]
mutableNumbers.clear() // []
```

### Заключение

В этом разделе мы рассмотрели основные операции над коллекциями в Kotlin. Стандартная библиотека Kotlin предоставляет широкий набор функций, которые значительно упрощают работу с коллекциями, делая ваш код чище и эффективнее. 
