## Middleware в Echo

Middleware в Echo - это функции, которые выполняются до или после обработчика маршрута. Они предоставляют удобный механизм для расширения функциональности вашего веб-приложения, не требуя дублирования кода в каждом обработчике. Middleware может использоваться для различных задач, таких как:

- Аутентификация и авторизация
- Логирование запросов и ответов
- Обработка ошибок
- Кэширование
- CORS
- Сжатие ответов
- ...и многое другое

### Типы Middleware

Echo поддерживает два типа middleware:

1. **Глобальный Middleware:** Применяется ко всем запросам, поступающим в приложение.
2. **Middleware уровня маршрута:** Применяется только к определенным маршрутам или группам маршрутов.

### Создание Middleware

Для создания middleware в Echo необходимо определить функцию с определенной сигнатурой. Эта функция принимает объект `echo.Context` и функцию `echo.HandlerFunc` в качестве аргументов и возвращает функцию `echo.HandlerFunc`.

```go
func myMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        // Логика Middleware до выполнения обработчика
        
        err := next(c) // Вызов следующего обработчика в цепочке

        // Логика Middleware после выполнения обработчика

        return err 
    }
}
```

### Пример: Логирование запросов

Рассмотрим пример создания middleware для логирования информации о каждом запросе:

```go
package main

import (
	"fmt"
	"time"

	"github.com/labstack/echo/v4"
)

func loggingMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		start := time.Now()
		fmt.Printf("Начато %s %s\n", c.Request().Method, c.Request().URL)

		err := next(c)

		latency := time.Since(start)
		fmt.Printf("Завершено %s %s за %s\n", c.Request().Method, c.Request().URL, latency)

		return err
	}
}

func main() {
	e := echo.New()

	e.Use(loggingMiddleware) // Регистрация middleware глобально

	e.GET("/", func(c echo.Context) error {
		return c.String(200, "Hello, World!")
	})

	e.Logger.Fatal(e.Start(":8080"))
}
```

В этом примере `loggingMiddleware` записывает в консоль HTTP-метод, URL и время обработки каждого запроса.

### Регистрация Middleware

#### Глобальный Middleware

Для регистрации глобального middleware используется метод `e.Use()`:

```go
e := echo.New()
e.Use(loggingMiddleware) 
```

#### Middleware уровня маршрута

Middleware может быть применен к конкретному маршруту или группе маршрутов:

```go
e.GET("/users", getUsers, authMiddleware) // Применение middleware только к маршруту /users

g := e.Group("/admin", authMiddleware) // Применение middleware ко всем маршрутам группы /admin
g.GET("/dashboard", getDashboard)
g.POST("/users", createUser)
```

### Встроенный Middleware

Echo предоставляет набор встроенного middleware для решения распространенных задач:

| Middleware | Описание |
|---|---|
| `Logger()` | Логирование запросов и ответов |
| `Recover()` | Обработка паник |
| `BodyLimit()` | Ограничение размера тела запроса |
| `Gzip()` | Сжатие ответов с помощью gzip |
| `CORS()` | Настройка заголовков CORS |
| `BasicAuth()` | Базовая аутентификация |
| ... | ... |

#### Пример: Использование `BodyLimit` middleware

```go
e := echo.New()

e.Use(echo.BodyLimit("10M")) // Ограничение размера тела запроса до 10 мегабайт

// ... обработчики маршрутов
```

### Заключение

Middleware - это мощный инструмент для создания модульных и расширяемых веб-приложений в Echo. Они позволяют выполнять общую логику в одном месте, что упрощает поддержку и развитие вашего кода. Изучите доступные встроенные middleware и создавайте свои собственные для решения специфических задач вашего приложения.
