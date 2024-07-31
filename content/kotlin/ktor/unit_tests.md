## Модульное тестирование в Ktor

Модульное тестирование — неотъемлемая часть разработки надежного и легко поддерживаемого программного обеспечения. В контексте Ktor это означает проверку корректности работы маршрутов, обработчиков и сервисов в изоляции от других частей приложения.

### Тестирование маршрутов

Маршруты в Ktor определяют, как приложение будет реагировать на HTTP-запросы. Для их тестирования мы можем использовать фреймворк `ktor-server-test-host`. Он позволяет создавать тестовый сервер и отправлять запросы к нему, проверяя ответы.

#### Пример:

```kotlin
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.testing.*
import kotlin.test.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello, world!")
        }
    }
}

class ApplicationTest {
    @Test
    fun testRoot() = testApplication {
        application {
            configureRouting()
        }
        // Отправляем GET-запрос на "/"
        val response = client.get("/")
        // Проверяем статус код ответа
        assertEquals(HttpStatusCode.OK, response.status)
        // Проверяем тело ответа
        assertEquals("Hello, world!", response.bodyAsText())
    }
}
```

В этом примере мы:

1. Определяем простой маршрут, который отвечает на GET-запрос на `/` строкой "Hello, world!".
2. Создаем тестовый класс `ApplicationTest` с функцией `testRoot`, помеченной аннотацией `@Test`.
3. Внутри `testRoot` используем `testApplication`, чтобы создать тестовый сервер с нашим приложением.
4. Отправляем GET-запрос на `/` с помощью `client.get("/").
5. Проверяем статус код и тело ответа с помощью `assertEquals`.

### Тестирование обработчиков

Обработчики - это функции, которые обрабатывают запросы и генерируют ответы. Их можно тестировать независимо от маршрутов, внедряя зависимости и вызывая напрямую.

#### Пример:

```kotlin
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import kotlin.test.*

// Обработчик, который приветствует пользователя по имени
fun ApplicationCall.greetUser(name: String) {
    respondText("Hello, $name!")
}

class HandlerTest {
    @Test
    fun testGreetUser() = testApplication {
        // Вызываем обработчик напрямую
        val call = createCall(application) {
            parameter("name", "John")
        }
        call.greetUser("John")
        // Проверяем тело ответа
        assertEquals("Hello, John!", call.response.content)
    }
}
```

В этом примере мы:

1. Определяем обработчик `greetUser`, который принимает имя пользователя и отвечает приветствием.
2. Создаем тестовый класс `HandlerTest` с функцией `testGreetUser`.
3. Внутри `testGreetUser` создаем тестовый `ApplicationCall` с помощью `createCall` и устанавливаем параметр запроса `name`.
4. Вызываем обработчик `greetUser` с именем "John".
5. Проверяем, что тело ответа содержит "Hello, John!".

### Тестирование сервисов

Сервисы обычно содержат бизнес-логику приложения. Их тестирование важно для обеспечения корректности работы всего приложения. 

#### Пример:

```kotlin
import io.ktor.server.application.*
import kotlin.test.*

// Сервис для работы с пользователями
class UserService {
    fun getUser(id: Int): User? {
        return if (id == 1) User(1, "Alice") else null
    }
}

// Модель данных пользователя
data class User(val id: Int, val name: String)

class ServiceTest {
    // Создаем экземпляр сервиса для тестов
    private val userService = UserService()

    @Test
    fun testGetUser() {
        // Получаем пользователя с id = 1
        val user = userService.getUser(1)
        // Проверяем, что пользователь найден и его имя "Alice"
        assertNotNull(user)
        assertEquals(1, user.id)
        assertEquals("Alice", user.name)
    }

    @Test
    fun testGetUserNotFound() {
        // Проверяем, что пользователь с id = 2 не найден
        val user = userService.getUser(2)
        assertNull(user)
    }
}
```

В этом примере мы:

1. Определяем сервис `UserService` с методом `getUser`.
2. Создаем тестовый класс `ServiceTest` и экземпляр `userService`.
3. В тестах `testGetUser` и `testGetUserNotFound` вызываем метод `getUser` с разными id и проверяем результаты.

### Заключение

Модульное тестирование в Ktor позволяет проверить корректность работы отдельных частей приложения, что повышает его надежность и облегчает поддержку. Используя `ktor-server-test-host`, мы можем тестировать маршруты, отправляя запросы и проверяя ответы. Обработчики можно тестировать напрямую, а сервисы - внедряя зависимости или создавая их экземпляры в тестовом окружении.
