## Переменное количество параметров. Vararg

В Kotlin вы можете создавать функции, которые принимают переменное количество аргументов. Это достигается с помощью ключевого слова `vararg`. Функция с `vararg` может принимать ноль или более значений указанного типа.

### Объявление функции с vararg

Объявление функции с `vararg` выглядит следующим образом:

```kotlin
fun имяФункции(vararg имяПараметра: Тип): ТипВозвращаемогоЗначения {
    // Тело функции
}
```

- `vararg`: ключевое слово, указывающее на параметр с переменным количеством аргументов.
- `имяПараметра`: имя параметра, которое вы будете использовать для доступа к переданным значениям.
- `Тип`: тип данных, который принимает параметр.

### Вызов функции с vararg

Вызывать функцию с `vararg` можно, передавая любое количество аргументов указанного типа:

```kotlin
fun printNumbers(vararg numbers: Int) {
    for (number in numbers) {
        println(number)
    }
}

fun main() {
    printNumbers(1, 2, 3)
    printNumbers(10, 20)
    printNumbers()
}
```

В этом примере, функция `printNumbers` принимает переменное количество аргументов типа `Int`. При вызове функции мы передаем разное количество аргументов, и функция обрабатывает их соответственно.

### Доступ к аргументам vararg

Внутри функции аргументы `vararg` доступны как массив указанного типа. Вы можете использовать все стандартные операции с массивами для работы с `vararg` параметрами.

```kotlin
fun sumNumbers(vararg numbers: Int): Int {
    var sum = 0
    for (number in numbers) {
        sum += number
    }
    return sum
}

fun main() {
    val result1 = sumNumbers(1, 2, 3, 4, 5)
    println(result1) // Вывод: 15

    val result2 = sumNumbers(10, 20, 30)
    println(result2) // Вывод: 60
}
```

В этом примере функция `sumNumbers` суммирует все переданные ей аргументы типа `Int` и возвращает результат. 

### Spread оператор

Иногда вам может понадобиться передать массив как аргумент `vararg`. В этом случае используется оператор spread (`*`). 

```kotlin
fun printElements(vararg elements: Any) {
    for (element in elements) {
        println(element)
    }
}

fun main() {
    val array = arrayOf("Hello", 123, true)
    printElements(*array) 
}
```

В этом примере мы создаем массив `array` и передаем его как аргумент функции `printElements` с помощью оператора spread (`*`).  Без оператора spread, функция воспринимала бы массив как один единственный аргумент.

### Использование vararg с другими параметрами

Функция может иметь несколько параметров, включая `vararg`. Важно помнить, что `vararg` параметр должен быть последним в списке параметров функции.

```kotlin
fun printInfo(name: String, vararg hobbies: String) {
    println("Name: $name")
    println("Hobbies:")
    for (hobby in hobbies) {
        println("- $hobby")
    }
}

fun main() {
    printInfo("John", "reading", "coding", "swimming")
}
```

В этом примере функция `printInfo` принимает имя как первый аргумент и список хобби как `vararg` параметр.

### Пример использования vararg: 

Представьте, что вам нужно написать функцию, которая объединяет несколько строк в одну, добавляя разделитель между ними.  

```kotlin
fun concatenateStrings(separator: String = ", ", vararg strings: String): String {
    return strings.joinToString(separator)
}

fun main() {
    val result1 = concatenateStrings("apple", "banana", "orange")
    println(result1) // Вывод: apple, banana, orange

    val result2 = concatenateStrings(" | ", "one", "two", "three")
    println(result2) // Вывод: one | two | three
}
```

В этом примере функция `concatenateStrings` принимает разделитель (`separator`) и переменное количество строк (`strings`). Функция использует `joinToString` для объединения строк, используя заданный разделитель.

### Заключение

Использование `vararg` делает ваш код более гибким и читаемым, позволяя функциям принимать переменное количество аргументов.  Помните о ключевых моментах: `vararg` параметр должен быть последним в списке параметров функции, а для передачи массива как `vararg` используйте оператор spread (`*`). 
