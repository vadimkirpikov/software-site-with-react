## Интеграционное тестирование с TestApplicationEngine

Интеграционное тестирование – важный этап разработки приложения, позволяющий убедиться в корректной работе всех его компонентов в связке. Ktor предоставляет удобный инструмент для проведения таких тестов – `TestApplicationEngine`. 

`TestApplicationEngine` позволяет запускать экземпляр приложения Ktor в тестовой среде без фактического развергивания на сервере. Это даёт возможность отправлять HTTP-запросы к приложению и анализировать его ответы, имитируя взаимодействие с реальным клиентом.

### Начало работы

Для начала работы с `TestApplicationEngine` необходимо подключить соответствующий артефакт в ваш проект:

```kotlin
testImplementation("io.ktor:ktor-server-test-host:$ktor_version")
```

Где `$ktor_version` – версия Ktor, используемая в вашем проекте.

### Создание тестового движка

Для создания экземпляра `TestApplicationEngine` используется функция `createTestEnvironment`:

```kotlin
import io.ktor.server.testing.*

@Test
fun testApplication() {
    val engine = createTestEnvironment {
        // Конфигурация тестового окружения
    }

    // Тестовые запросы и проверки
}
```

Внутри блока `createTestEnvironment` можно настроить тестовое окружение, например, указать модуль приложения, определить тестовые маршруты или внедрить зависимости.

### Отправка запросов и проверка ответов

`TestApplicationEngine` предоставляет методы для отправки HTTP-запросов к вашему приложению и получения ответов:

| Метод               | Описание                                                                         |
|--------------------|-----------------------------------------------------------------------------------|
| `handleRequest`     | Отправляет запрос с указанным методом и путем.                                     |
| `get`              | Отправляет GET-запрос.                                                               |
| `post`             | Отправляет POST-запрос.                                                              |
| `put`              | Отправляет PUT-запрос.                                                               |
| `delete`           | Отправляет DELETE-запрос.                                                            |
| `patch`            | Отправляет PATCH-запрос.                                                             |
| `handleWebSocket` | Открывает WebSocket-соединение.                                                     |

Каждый из этих методов возвращает объект `TestApplicationCall`, предоставляющий доступ к информации о запросе и ответе:

* `request`:  информация о запросе
* `response`: информация об ответе

Пример:

```kotlin
@Test
fun testGetRoot() = withTestApplication(Application::module) {
    val response = handleRequest(HttpMethod.Get, "/")

    assertTrue(response.requestHandled) // Проверяем, что запрос обработан
    assertEquals(HttpStatusCode.OK, response.response.status()) // Статус ответа
    assertEquals("Hello, World!", response.response.content) // Тело ответа
}
```

### Пример интеграционного теста

Рассмотрим пример интеграционного теста для простого приложения Ktor:

```kotlin
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

fun Application.module() {
    routing {
        get("/") {
            call.respondText("Hello, World!")
        }

        get("/greet/{name}") {
            val name = call.parameters["name"] ?: "Guest"
            call.respondText("Hello, $name!")
        }
    }
}

class ApplicationTest {
    @Test
    fun testGetRoot() = withTestApplication(Application::module) {
        val response = handleRequest(HttpMethod.Get, "/").response

        assertEquals(HttpStatusCode.OK, response.status())
        assertEquals("Hello, World!", response.content)
    }

    @Test
    fun testGreeting() = withTestApplication(Application::module) {
        val response = handleRequest(HttpMethod.Get, "/greet/John").response

        assertEquals(HttpStatusCode.OK, response.status())
        assertEquals("Hello, John!", response.content)
    }
}
```

В данном примере мы тестируем два маршрута: `/` и `/greet/{name}`. В каждом тесте мы отправляем запрос к соответствующему маршруту и проверяем код состояния ответа и его тело.

### Тестирование аутентификации и авторизации

`TestApplicationEngine` позволяет тестировать механизмы аутентификации и авторизации в вашем приложении. Для этого необходимо настроить тестовое окружение с использованием соответствующих плагинов и конфигураций.

Пример:

```kotlin
@Test
fun testAuthentication() = withTestApplication(Application::module) {
    // Устанавливаем заголовок авторизации
    val response1 = handleRequest(HttpMethod.Get, "/") {
        addHeader(HttpHeaders.Authorization, "Bearer invalid-token")
    }.response

    // Доступ запрещен
    assertEquals(HttpStatusCode.Unauthorized, response1.status())

    // Устанавливаем корректный заголовок авторизации
    val response2 = handleRequest(HttpMethod.Get, "/") {
        addHeader(HttpHeaders.Authorization, "Bearer valid-token")
    }.response

    // Доступ разрешен
    assertEquals(HttpStatusCode.OK, response2.status())
}
```

### Заключение

`TestApplicationEngine` -  мощный инструмент для проведения интеграционного тестирования приложений Ktor. Он позволяет запускать и тестировать ваше приложение в контролируемой среде, имитируя реальные HTTP-запросы и анализируя ответы. Использование `TestApplicationEngine` позволяет повысить качество кода и снизить количество ошибок в вашем приложении.