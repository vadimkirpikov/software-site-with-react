## Делегирование в Kotlin

Делегирование в программировании — это паттерн проектирования, при котором объект (делегат) выполняет операции от имени другого объекта (делегирующего). Вместо того, чтобы дублировать функциональность в разных классах, делегирование позволяет переиспользовать код и создавать более гибкие и расширяемые программы. 

В Kotlin концепция делегирования встроена непосредственно в язык с помощью ключевых слов `by`:

```kotlin
interface Printer {
    fun print(message: String)
}

class ConsolePrinter : Printer {
    override fun print(message: String) {
        println("From console: $message")
    }
}

class Logger(printer: Printer) : Printer by printer

fun main() {
    val consolePrinter = ConsolePrinter()
    val logger = Logger(consolePrinter)
    logger.print("Hello, Kotlin delegation!") // Вывод: From console: Hello, Kotlin delegation!
}
```

В этом примере мы определили интерфейс `Printer` с методом `print()`.  Класс `ConsolePrinter` реализует этот интерфейс, выводя сообщение в консоль. 

Класс `Logger` также реализует интерфейс `Printer`, но делает это **делегируя** реализацию классу `ConsolePrinter` с помощью `by printer`. 

Теперь, когда вызывается метод `print()` объекта `logger`, он перенаправляется объекту `consolePrinter`.

### Свойства-делегаты

Kotlin предоставляет удобный способ делегирования свойств с помощью **свойств-делегатов**.  

Вместо того, чтобы писать стандартные геттеры и сеттеры для каждого свойства, вы можете использовать ключевое слово `by`, чтобы делегировать операции чтения и записи другому объекту.

#### Стандартные делегаты

Kotlin предоставляет несколько стандартных делегатов в пакете `kotlin.properties`:

| Делегат        | Описание                                                                     |
|----------------|------------------------------------------------------------------------------|
| `Delegates.notNull()`     | Делегирует свойство не-null типа, бросая исключение, если значение не задано. |
| `Delegates.observable()`   | Позволяет отслеживать изменения свойства и выполнять действия при изменении.    |
| `Delegates.vetoable()`    | Позволяет контролировать изменения свойства и отклонять их при необходимости. |

**Пример использования `Delegates.notNull()`:**

```kotlin
import kotlin.properties.Delegates

class User {
    var name: String by Delegates.notNull()
}

fun main() {
    val user = User()
    // Выбросит исключение, так как имя не инициализировано
    // println(user.name) 
    
    user.name = "Alice"
    println(user.name) // Вывод: Alice
}
```

#### Создание своих делегатов

Вы можете создавать собственные делегаты, реализуя интерфейсы `ReadOnlyProperty` или `ReadWriteProperty` из пакета `kotlin.properties`:

**Пример делегата для хранения значения в `Map`:**

```kotlin
import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

class MapDelegate<T>(private val map: MutableMap<String, Any?>) : ReadWriteProperty<Any?, T> {
    override fun getValue(thisRef: Any?, property: KProperty<*>): T {
        return map[property.name] as T
    }

    override fun setValue(thisRef: Any?, property: KProperty<*>, value: T) {
        map[property.name] = value
    }
}
```

Этот делегат сохраняет значение свойства в переданной ему `Map` с ключом, равным имени свойства.

**Пример использования кастомного делегата:**

```kotlin
class User(map: MutableMap<String, Any?>) {
    var name: String by MapDelegate(map)
    var age: Int by MapDelegate(map)
}

fun main() {
    val data = mutableMapOf<String, Any?>()
    val user = User(data)
    
    user.name = "Bob"
    user.age = 30

    println(data) // Вывод: {name=Bob, age=30}
}
```

В этом примере значения свойств `name` и `age` хранятся в `Map` `data` благодаря использованию кастомного делегата `MapDelegate`.

Делегирование в Kotlin - это мощный инструмент, который позволяет писать более чистый, лаконичный и расширяемый код. Стандартные делегаты предоставляют удобные решения для распространенных задач, а возможность создавать свои собственные делегаты делает этот механизм невероятно гибким.
