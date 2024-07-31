## Валидация данных в Ktor

Валидация данных - неотъемлемая часть разработки веб-приложений. Она помогает гарантировать, что данные, получаемые от клиентов, соответствуют ожидаемому формату и ограничениям, что предотвращает возникновение ошибок и уязвимостей в вашем приложении. 

Ktor предоставляет гибкие механизмы для валидации данных, основанные на использовании валидаторов. В этой статье мы рассмотрим, как использовать встроенные валидаторы Ktor, а также как создавать и использовать собственные валидаторы для реализации сложной бизнес-логики валидации.

### Встроенные валидаторы

Ktor предоставляет набор встроенных валидаторов для проверки распространенных ограничений данных:

| Валидатор           | Описание                                                        |
|--------------------|-----------------------------------------------------------------|
| `min(n)`            | Проверяет, что значение больше или равно `n`.                  |
| `max(n)`            | Проверяет, что значение меньше или равно `n`.                  |
| `minLength(n)`     | Проверяет, что длина строки не менее `n` символов.            |
| `maxLength(n)`     | Проверяет, что длина строки не более `n` символов.            |
| `regex(pattern)`    | Проверяет, что строка соответствует регулярному выражению `pattern`. |
| `email()`          | Проверяет, что строка является корректным адресом электронной почты. |

### Использование встроенных валидаторов

Для использования встроенных валидаторов, необходимо:

1. **Импортировать** необходимые классы валидаторов:

```kotlin
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.plugins.validation.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
```

2. **Установить** плагин `Validation`:

```kotlin
fun Application.main() {
    install(ContentNegotiation) {
        json()
    }
    install(Validation)
}
```

3. **Применить** валидаторы к параметрам маршрута:

```kotlin
routing {
    post("/users") {
        val user = call.receive<User>()
        // ... сохранение пользователя в базе данных ...
        call.respond(HttpStatusCode.Created)
    }
}
data class User(
    val name: String,
    val email: String,
    val age: Int
)
```

В данном примере мы не используем никаких валидаторов. Давайте добавим валидацию к полям `name`, `email` и `age`:

```kotlin
routing {
    post("/users") {
        val user = call.receive<User>()
            .validate {
                validate(User::name).minLength(3)
                validate(User::email).email()
                validate(User::age).min(18)
            }
        // ... сохранение пользователя в базе данных ...
        call.respond(HttpStatusCode.Created)
    }
}
data class User(
    val name: String,
    val email: String,
    val age: Int
)
```

В этом примере мы используем функцию `validate`, чтобы применить валидаторы к полям объекта `User`. 

### Обработка ошибок валидации

Если валидация не пройдена, Ktor сгенерирует исключение `ValidationException`. Вы можете перехватить это исключение и обработать его, предоставив пользователю информативное сообщение об ошибке.

```kotlin
routing {
    post("/users") {
        try {
            val user = call.receive<User>()
                .validate {
                    validate(User::name).minLength(3)
                    validate(User::email).email()
                    validate(User::age).min(18)
                }
            // ... сохранение пользователя в базе данных ...
            call.respond(HttpStatusCode.Created)
        } catch (e: ValidationException) {
            call.respond(HttpStatusCode.BadRequest, e.message)
        }
    }
}
```

### Создание пользовательских валидаторов

Встроенные валидаторы Ktor покрывают базовые сценарии. Для реализации сложной логики валидации вы можете создавать собственные валидаторы.

Для создания пользовательского валидатора, необходимо создать функцию расширения для `ValidationContext`, которая принимает значение для проверки и возвращает `Unit`. Внутри функции вы можете выполнить необходимые проверки и вызвать функцию `validationError`, если проверка не пройдена.

```kotlin
fun ValidationContext.strongPassword(value: String, minLength: Int = 8) {
    if (value.length < minLength) {
        validationError("Password must be at least $minLength characters long")
    }
    if (!value.any { it.isUpperCase() }) {
        validationError("Password must contain at least one uppercase letter")
    }
    if (!value.any { it.isDigit() }) {
        validationError("Password must contain at least one digit")
    }
}

data class User(
    val name: String,
    val email: String,
    val age: Int,
    val password: String
)
```

Этот валидатор проверяет, что пароль имеет минимальную длину, содержит хотя бы одну заглавную букву и хотя бы одну цифру. 

**Использование пользовательского валидатора:**

```kotlin
routing {
    post("/users") {
        try {
            val user = call.receive<User>()
                .validate {
                    validate(User::name).minLength(3)
                    validate(User::email).email()
                    validate(User::age).min(18)
                    validate(User::password).strongPassword(minLength = 10)
                }
            // ... сохранение пользователя в базе данных ...
            call.respond(HttpStatusCode.Created)
        } catch (e: ValidationException) {
            call.respond(HttpStatusCode.BadRequest, e.message)
        }
    }
}
```

### Заключение

Валидация данных является важной частью разработки безопасных и надежных приложений. Ktor предоставляет мощные и гибкие механизмы для валидации данных, которые позволяют легко проверять данные на соответствие вашим требованиям. Используйте встроенные валидаторы для распространенных сценариев и создавайте собственные валидаторы для реализации сложной бизнес-логики валидации. 
