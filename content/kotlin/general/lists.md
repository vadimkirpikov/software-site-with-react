## List в Kotlin

В Kotlin, `List` - это неизменяемая коллекция упорядоченных элементов. Это означает, что после создания списка, вы не можете изменять его содержимое: добавлять, удалять или изменять элементы.  Для работы с изменяемыми списками используется интерфейс `MutableList`. 

### Создание списков

#### Создание неизменяемого списка

Для создания неизменяемого списка используйте функцию `listOf()`:

```kotlin
val numbers: List<Int> = listOf(1, 2, 3, 4, 5) 
// Список целых чисел
val names: List<String> = listOf("Alice", "Bob", "Charlie") 
// Список строк
```

#### Создание пустого списка

Для создания пустого списка используйте функцию `emptyList()`:

```kotlin
val emptyList: List<Any> = emptyList() 
// Пустой список любого типа
```

### Доступ к элементам списка

Для доступа к элементам списка по индексу используется оператор `[]`:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
println(numbers[0]) // Вывод: 1
println(numbers[2]) // Вывод: 3
```

### Итерация по списку

#### Цикл for

Вы можете итерировать элементы списка с помощью цикла `for`:

```kotlin
val names = listOf("Alice", "Bob", "Charlie")
for (name in names) {
    println(name)
}
// Вывод:
// Alice
// Bob
// Charlie
```

#### Функция forEach

Другой способ итерации - использование функции `forEach`:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
numbers.forEach { number ->
    println(number * 2)
}
// Вывод:
// 2
// 4
// 6
// 8
// 10
```

### Основные операции со списками

#### Получение размера списка

Для получения количества элементов в списке используйте свойство `size`:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
println(numbers.size) // Вывод: 5
```

#### Проверка на пустоту

Для проверки, пуст ли список, используйте свойство `isEmpty()` или `isNotEmpty()`:

```kotlin
val emptyList = listOf<Int>()
println(emptyList.isEmpty()) // Вывод: true

val numbers = listOf(1, 2, 3)
println(numbers.isNotEmpty()) // Вывод: true
```

#### Проверка на содержание элемента

Для проверки, содержит ли список определенный элемент, используйте оператор `in` или `!in`:

```kotlin
val names = listOf("Alice", "Bob", "Charlie")
println("Bob" in names) // Вывод: true
println("David" !in names) // Вывод: true
```

#### Поиск элемента

*   **indexOf(element)**: Возвращает индекс первого вхождения элемента в списке. Если элемент не найден, возвращает -1.

```kotlin
val numbers = listOf(1, 2, 3, 2, 1)
println(numbers.indexOf(2)) // Вывод: 1
println(numbers.indexOf(4)) // Вывод: -1
```

*   **lastIndexOf(element)**: Возвращает индекс последнего вхождения элемента в списке. Если элемент не найден, возвращает -1.

```kotlin
val numbers = listOf(1, 2, 3, 2, 1)
println(numbers.lastIndexOf(2)) // Вывод: 3
```

#### Получение подсписка

Для получения подсписка используйте функцию `subList(startIndex, endIndex)`:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val sublist = numbers.subList(1, 4) //  [2, 3, 4]
println(sublist)
```

### Преобразование списков

#### Преобразование типов элементов

Функция `map` позволяет преобразовать каждый элемент списка в другой тип:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val squaredNumbers = numbers.map { it * it } // [1, 4, 9, 16, 25]
println(squaredNumbers)
```

#### Фильтрация элементов

Функция `filter` позволяет получить новый список, содержащий только те элементы, которые удовлетворяют определенному условию:

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)
val evenNumbers = numbers.filter { it % 2 == 0 } // [2, 4]
println(evenNumbers)
```

### Слияние списков

#### Соединение списков

Для соединения двух списков используйте оператор `+`:

```kotlin
val firstList = listOf(1, 2, 3)
val secondList = listOf(4, 5, 6)
val combinedList = firstList + secondList // [1, 2, 3, 4, 5, 6]
println(combinedList)
```

#### Слияние списков с помощью функции

Функция `zip` позволяет объединить элементы двух списков в пары:

```kotlin
val names = listOf("Alice", "Bob", "Charlie")
val ages = listOf(25, 30, 28)
val nameAgePairs = names.zip(ages) // [(Alice, 25), (Bob, 30), (Charlie, 28)]
println(nameAgePairs)
```

Это лишь базовые возможности работы со списками в Kotlin. Более подробная информация будет рассмотрена в следующих разделах. 
