## Работа с WebSocket в Echo

WebSocket — это протокол связи, обеспечивающий полнодуплексный канал связи между браузером и сервером. Он позволяет создавать интерактивные веб-приложения, такие как чаты, онлайн-игры, системы уведомлений и многое другое.

Фреймворк Echo предоставляет удобный API для работы с WebSocket. В этой статье мы рассмотрим основные принципы работы с WebSocket в Echo и создадим простое приложение чата.

### Подключение WebSocket

Для подключения WebSocket в Echo используется метод `Upgrader`. Создайте новый экземпляр `Upgrader` и вызовите его метод `Upgrade`, передав ему контекст запроса `echo.Context`:

```go
package main

import (
    "net/http"

    "github.com/gorilla/websocket"
    "github.com/labstack/echo/v4"
)

var upgrader = websocket.Upgrader{}

func handleWebSocket(c echo.Context) error {
    // Обновляем соединение до WebSocket
    ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
    if err != nil {
        return err
    }
    defer ws.Close()

    // Обработка сообщений WebSocket
    for {
        // Читаем сообщение из соединения
        messageType, message, err := ws.ReadMessage()
        if err != nil {
            return err
        }

        // Выводим полученное сообщение в консоль
        println("Получено сообщение:", string(message))

        // Отправляем сообщение обратно клиенту
        err = ws.WriteMessage(messageType, message)
        if err != nil {
            return err
        }
    }
}

func main() {
    e := echo.New()

    e.GET("/ws", handleWebSocket)

    e.Logger.Fatal(e.Start(":1323"))
}
```

### Отправка и получение сообщений

Для отправки сообщений клиенту используется метод `WriteMessage` объекта `websocket.Conn`. Этот метод принимает два аргумента: тип сообщения и данные сообщения. Тип сообщения может быть одним из следующих:

| Тип сообщения | Описание |
|---|---|
| `websocket.TextMessage` | Текстовое сообщение |
| `websocket.BinaryMessage` | Бинарное сообщение |
| `websocket.CloseMessage` | Сообщение о закрытии соединения |
| `websocket.PingMessage` | Ping-сообщение |
| `websocket.PongMessage` | Pong-сообщение |

Для получения сообщений от клиента используется метод `ReadMessage` объекта `websocket.Conn`. Этот метод блокирует выполнение, пока не будет получено новое сообщение от клиента. Он возвращает три значения: тип сообщения, данные сообщения и ошибка.

### Пример: чат

Создадим простое приложение чата, использующее WebSocket. В этом приложении пользователи смогут отправлять сообщения в общий чат, и все подключенные пользователи будут получать эти сообщения.

```go
package main

import (
    "net/http"

    "github.com/gorilla/websocket"
    "github.com/labstack/echo/v4"
)

// Канал для передачи сообщений между горутинами
var (
    broadcast = make(chan []byte)
    clients   = make(map[*websocket.Conn]bool)
)

var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool { return true }, // Разрешаем все источники
}

func handleWebSocket(c echo.Context) error {
    // Обновляем соединение до WebSocket
    ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
    if err != nil {
        return err
    }
    defer ws.Close()

    // Добавляем клиента в список
    clients[ws] = true

    // Запускаем горутину для чтения сообщений от клиента
    go func() {
        defer func() {
            delete(clients, ws)
            ws.Close()
        }()

        for {
            // Читаем сообщение от клиента
            _, msg, err := ws.ReadMessage()
            if err != nil {
                break
            }

            // Отправляем сообщение всем подключенным клиентам
            broadcast <- msg
        }
    }()

    // Бесконечный цикл для отправки сообщений клиенту
    for {
        // Читаем сообщение из канала broadcast
        msg := <-broadcast

        // Отправляем сообщение клиенту
        err := ws.WriteMessage(websocket.TextMessage, msg)
        if err != nil {
            break
        }
    }

    return nil
}

func main() {
    e := echo.New()

    e.GET("/ws", handleWebSocket)

    e.Logger.Fatal(e.Start(":1323"))
}
```

В этом примере мы создаем канал `broadcast` для передачи сообщений между горутинами. При подключении нового клиента мы создаем новую горутину, которая читает сообщения от клиента и отправляет их в канал `broadcast`. 

В главной горутине мы слушаем канал `broadcast` и отправляем все полученные сообщения всем подключенным клиентам. Таким образом, все пользователи чата будут получать все отправленные сообщения.

### Заключение

WebSocket — это мощный инструмент для создания интерактивных веб-приложений. Фреймворк Echo предоставляет удобный API для работы с WebSocket, позволяющий легко создавать приложения с использованием этого протокола. В этой статье мы рассмотрели основные принципы работы с WebSocket в Echo и создали простое приложение чата.