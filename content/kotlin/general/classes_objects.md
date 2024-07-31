## Классы и объекты в Kotlin

Классы и объекты в Kotlin являются основными строительными блоками для создания программ. Классы служат чертежами для создания объектов, которые инкапсулируют данные (свойства) и функции для работы с этими данными (методы).

### Объявление класса

Чтобы объявить класс в Kotlin, используется ключевое слово `class`, за которым следует имя класса и тело класса, заключенное в фигурные скобки:

```kotlin
class Person {
    // Тело класса
}
```

### Свойства

Свойства представляют собой данные, связанные с классом. В Kotlin объявление свойств происходит внутри тела класса с помощью ключевых слов `var` (изменяемое свойство) или `val` (неизменяемое свойство). 

```kotlin
class Person {
    var name: String = "" // Изменяемое свойство
    val age: Int = 0 // Неизменяемое свойство
}
```

В данном примере `name` и `age` - свойства класса `Person`. 

### Конструкторы

Конструкторы - специальные функции, вызываемые при создании объекта (экземпляра класса). В Kotlin существует два типа конструкторов: первичный и вторичный.

#### Первичный конструктор

Первичный конструктор объявляется непосредственно в заголовке класса:

```kotlin
class Person constructor(name: String, age: Int) {
    // Тело класса
}
```

В данном примере `Person(name: String, age: Int)` - первичный конструктор, принимающий два аргумента: `name` и `age`.

#### Вторичный конструктор

Вторичный конструктор объявляется с помощью ключевого слова `constructor` внутри тела класса:

```kotlin
class Person {
    constructor(name: String, age: Int) {
        // Инициализация свойств
    }
}
```

Вторичные конструкторы должны делегировать вызов первичному конструктору, если он есть.

### Методы

Методы - это функции, определенные внутри класса и работающие с его данными.

```kotlin
class Person(val name: String, val age: Int) {
    fun introduce() {
        println("Меня зовут $name, мне $age лет.")
    }
}
```

В этом примере `introduce()` - метод класса `Person`, который выводит информацию о человеке.

### Создание объекта

Для создания объекта класса используется имя класса и скобки, в которых передаются аргументы конструктора:

```kotlin
val person = Person("Иван", 30)
```

В данном случае создается объект класса `Person` с именем `person`, возрастом 30 лет и именем Иван.

### Вызов свойств и методов

Для доступа к свойствам и методам объекта используется оператор точка `.`:

```kotlin
println(person.name) // Выведет "Иван"
person.introduce() // Выведет "Меня зовут Иван, мне 30 лет."
```

### Пример использования классов

```kotlin
class Rectangle(val width: Int, val height: Int) {
    fun calculateArea(): Int {
        return width * height
    }

    fun calculatePerimeter(): Int {
        return 2 * (width + height)
    }
}

fun main() {
    val rectangle = Rectangle(5, 10) // Создаем прямоугольник

    // Выводим информацию о прямоугольнике
    println("Ширина: ${rectangle.width}")
    println("Высота: ${rectangle.height}")
    println("Площадь: ${rectangle.calculateArea()}")
    println("Периметр: ${rectangle.calculatePerimeter()}")
}
```

В данном примере мы создали класс `Rectangle`, представляющий прямоугольник. Класс содержит свойства `width` и `height`, хранящие ширину и высоту прямоугольника соответственно. Также в классе определены два метода: `calculateArea()` для расчета площади и `calculatePerimeter()` для расчета периметра.

В функции `main()` создается объект `rectangle` класса `Rectangle` и выводятся его свойства и результаты вызова методов.


Это базовые сведения о классах и объектах в Kotlin. В следующих разделах руководства мы подробнее рассмотрим  наследование, интерфейсы, абстрактные классы и другие важные концепции, связанные с классами и объектами.