##  WebSocket в Ktor: Создание интерактивных приложений

В современном мире веб-приложения всё чаще требуют функционала реального времени. Будь то чат, онлайн-игра или интерактивная доска, возможность мгновенной передачи данных между клиентом и сервером становится неотъемлемой частью пользовательского опыта. В этом вам помогут WebSocket -  протокол связи, обеспечивающий полнодуплексный обмен сообщениями по одному TCP-соединению.

Ktor, фреймворк для создания асинхронных веб-приложений на Kotlin, предоставляет простые и эффективные инструменты для работы с WebSocket.

### Подключение библиотеки

Прежде чем начать работу, убедитесь, что в ваш проект подключена библиотека `ktor-server-websockets`:

```kotlin
dependencies {
    implementation("io.ktor:ktor-server-websockets:$ktor_version")
}
```

Замените `$ktor_version` на используемую вами версию Ktor.

### Создание WebSocket-маршрута

Для обработки WebSocket-соединений необходимо создать специальный маршрут в вашем приложении.  Внутри маршрута вызываем функцию `webSocket`, которая принимает лямбду с параметром типа `DefaultWebSocketServerSession`. Этот объект представляет собой сессию WebSocket и позволяет отправлять и получать сообщения.

```kotlin
routing {
    webSocket("/ws") { // Создаем маршрут для WebSocket на пути "/ws"
        // Здесь будет логика обработки сообщений
    }
}
```

### Обмен сообщениями

Внутри лямбды `webSocket`  мы можем получать сообщения от клиента с помощью функции `incoming`, а отправлять сообщения клиенту с помощью функции `outgoing`.

```kotlin
routing {
    webSocket("/ws") { 
        for (frame in incoming) { // Цикл для обработки входящих сообщений
            when (frame) {
                is Frame.Text -> { // Проверяем, является ли сообщение текстовым
                    val text = frame.readText()
                    println("Получено сообщение от клиента: $text")
                    outgoing.send(Frame.Text("Сервер получил ваше сообщение: $text")) // Отправляем ответ клиенту
                }
                else -> {
                    println("Получен не текстовый фрейм")
                }
            }
        }
    }
}
```

В этом примере мы создаем бесконечный цикл, который прослушивает входящие сообщения от клиента. Для каждого полученного сообщения мы проверяем его тип. Если сообщение текстовое (`Frame.Text`), мы читаем его содержимое с помощью `frame.readText()` и отправляем ответ клиенту, используя `outgoing.send(Frame.Text())`.

### Пример простого чата

Давайте напишем простое приложение чата, используя WebSocket в Ktor.

**Серверная часть:**

```kotlin
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.runBlocking

fun main(): Unit = runBlocking {
    io.ktor.server.netty.EngineMain.main(emptyArray<String>())
}

fun Application.module() {
    install(WebSockets)
    routing {
        webSocket("/chat") {
            // Отправляем приветственное сообщение клиенту
            outgoing.send(Frame.Text("Добро пожаловать в чат!")) 

            // Обрабатываем входящие сообщения
            for (frame in incoming) {
                if (frame is Frame.Text) {
                    val message = frame.readText()
                    // Отправляем полученное сообщение всем подключенным клиентам
                    outgoing.send(Frame.Text("Клиент: $message"))
                }
            }
        }
    }
}
```

**Клиентская часть (JavaScript):**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Простой чат</title>
</head>
<body>
    <h1>Чат</h1>
    <input type="text" id="messageInput">
    <button onclick="sendMessage()">Отправить</button>
    <div id="chat"></div>

    <script>
        const websocket = new WebSocket("ws://localhost:8080/chat");

        websocket.onmessage = (event) => {
            const chat = document.getElementById("chat");
            const messageElement = document.createElement("p");
            messageElement.textContent = event.data;
            chat.appendChild(messageElement);
        };

        function sendMessage() {
            const messageInput = document.getElementById("messageInput");
            const message = messageInput.value;
            websocket.send(message);
            messageInput.value = "";
        }
    </script>
</body>
</html>
```

В этом примере мы создали простой чат, где сервер, получив сообщение от одного клиента, отправляет его копию всем подключенным клиентам. Это демонстрирует потенциал WebSocket для создания интерактивных приложений.

Ktor, благодаря своей простоте и гибкости, предоставляет удобный инструмент для интеграции WebSocket в ваши проекты. 
