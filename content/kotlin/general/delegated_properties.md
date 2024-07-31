## Делегированные свойства

Делегированные свойства в Kotlin предоставляют мощный механизм для передачи ответственности за получение или установку значения свойства внешнему объекту, называемому делегатом. Этот подход способствует чистоте кода, избегая дублирования и улучшая его читаемость.

### Основная идея

Вместо того, чтобы напрямую хранить значение в свойстве, мы можем делегировать его обработку другому объекту. Этот объект, делегат, будет отвечать за фактическое хранение и предоставление значения по запросу.

```kotlin
class User(val map: Map<String, Any?>) {
    val name: String by map
    val age: Int by map
}
```

В этом примере, вместо того чтобы хранить `name` и `age` как обычные свойства класса `User`, мы делегируем их чтение объекту `map`. Теперь при обращении к `user.name` или `user.age`, Kotlin автоматически получит соответствующие значения из `map`.

### Стандартные делегаты

Kotlin предлагает набор стандартных делегатов, которые покрывают наиболее распространенные случаи использования:

#### 1. `Lazy`: Отложенная инициализация

Делегат `Lazy` позволяет отложить инициализацию свойства до момента его первого использования. Это особенно полезно для ресурсоемких операций, которые не всегда нужны.

```kotlin
class Database {
    // Инициализация происходит только при первом обращении к connections
    val connections by lazy { 
        println("Connecting to database...")
        listOf(Connection(), Connection())
    }
}
```

#### 2. `NotNull`: Проверка на null

Делегат `NotNull` гарантирует, что свойство будет инициализировано не нулевым значением до его первого чтения. В противном случае будет выброшено исключение.

```kotlin
class Person {
    var name: String by Delegates.notNull<String>()
}

fun main() {
    val person = Person()
    // Выбросит исключение, так как name не инициализирован
    println(person.name) 
}
```

#### 3. `Observable`: Отслеживание изменений

Делегат `Observable` позволяет отслеживать изменения значения свойства и выполнять действия при его изменении.

```kotlin
class Item(name: String, price: Int) {
    var name: String by Delegates.observable(name) { _, oldValue, newValue ->
        println("Name changed from $oldValue to $newValue")
    }
    var price: Int by Delegates.observable(price) { _, oldValue, newValue ->
        println("Price changed from $oldValue to $newValue")
    }
}

fun main() {
    val item = Item("Phone", 1000)
    item.price = 1200 // Вывод: "Price changed from 1000 to 1200"
}
```

### Создание собственных делегатов

Помимо стандартных делегатов, Kotlin позволяет создавать собственные, реализуя интерфейсы `ReadOnlyProperty` или `ReadWriteProperty`.

#### 1. Делегат только для чтения (`ReadOnlyProperty`)

Интерфейс `ReadOnlyProperty` используется для создания делегатов, которые предоставляют доступ к значению свойства только для чтения.

```kotlin
class MyDelegate {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return "Value from MyDelegate"
    }
}

class MyClass {
    val myProperty: String by MyDelegate()
}

fun main() {
    val myClass = MyClass()
    println(myClass.myProperty) // Вывод: "Value from MyDelegate"
}
```

#### 2. Делегат для чтения и записи (`ReadWriteProperty`)

Интерфейс `ReadWriteProperty` используется для создания делегатов, которые предоставляют доступ к значению свойства как для чтения, так и для записи.

```kotlin
class MyDelegate {
    private var value: String = ""

    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return value
    }

    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        this.value = value
    }
}

class MyClass {
    var myProperty: String by MyDelegate()
}

fun main() {
    val myClass = MyClass()
    myClass.myProperty = "New value"
    println(myClass.myProperty) // Вывод: "New value"
}
```

### Заключение

Делегированные свойства в Kotlin предоставляют гибкий и лаконичный способ управления свойствами класса, расширяя возможности языка и делая код чище и выразительнее. 
