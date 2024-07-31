## Работа с запросами и ответами в Echo

Фреймворк Echo предоставляет мощные инструменты для обработки HTTP-запросов и формирования ответов. В этом разделе мы рассмотрим основные методы работы с ними.

### Объект запроса `echo.Context`

Каждый HTTP-запрос в Echo представлен объектом `echo.Context`. Этот объект содержит всю необходимую информацию о запросе, такую как:

*   HTTP-метод (GET, POST, PUT, DELETE и т.д.)
*   URL-адрес
*   Заголовки
*   Тело запроса
*   и многое другое.

### Получение информации о запросе

Для получения информации о запросе используются методы объекта `echo.Context`:

| Метод                       | Описание                                                                    |
| --------------------------- | --------------------------------------------------------------------------- |
| `c.Request().Method`      | Возвращает HTTP-метод запроса (например, "GET", "POST").                   |
| `c.Request().URI()`       | Возвращает URL-адрес запроса.                                                |
| `c.Param(key string)`     | Возвращает значение параметра пути с заданным именем.                     |
| `c.QueryParam(key string)` | Возвращает значение параметра запроса из строки запроса.                  |
| `c.FormValue(key string)` | Возвращает значение параметра запроса из тела запроса (форма или JSON).   |
| `c.Get(key string)`       | Возвращает значение заголовка запроса с заданным именем.                   |
| `c.Bind(i interface{})`   | Привязывает данные из тела запроса к структуре или карте.               |

**Пример:**

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/users/:id", func(c echo.Context) error {
		// Получение ID пользователя из параметра пути
		userID := c.Param("id")

		// Получение имени пользователя из параметра запроса
		username := c.QueryParam("username")

		return c.String(http.StatusOK, "User ID: "+userID+", Username: "+username)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

### Формирование ответов

Для формирования ответов в Echo используется объект `echo.Context` и его методы:

| Метод                                      | Описание                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------- |
| `c.String(code int, format string, a ...interface{})`   | Возвращает текстовый ответ.                                                            |
| `c.JSON(code int, i interface{})`                     | Возвращает ответ в формате JSON.                                                       |
| `c.XML(code int, i interface{})`                     | Возвращает ответ в формате XML.                                                       |
| `c.HTML(code int, html string)`                      | Возвращает HTML-код в качестве ответа.                                                  |
| `c.File(file string)`                                | Возвращает файл в качестве ответа.                                                    |
| `c.Attachment(file string, name string)`            | Возвращает файл в качестве ответа с указанием имени файла для скачивания.           |
| `c.Redirect(code int, url string)`                  | Выполняет перенаправление на указанный URL-адрес с заданным кодом состояния.        |
| `c.Blob(code int, contentType string, b []byte)`     | Возвращает бинарные данные в качестве ответа с указанием типа содержимого.         |
| `c.Stream(code int, contentType string, r io.Reader)` | Возвращает поток данных в качестве ответа с указанием типа содержимого.            |

**Пример:**

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func main() {
	e := echo.New()

	e.GET("/users", func(c echo.Context) error {
		// Создание списка пользователей
		users := []User{
			{ID: 1, Name: "John Doe"},
			{ID: 2, Name: "Jane Doe"},
		}

		// Возврат ответа в формате JSON
		return c.JSON(http.StatusOK, users)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

### Установка заголовков ответа

Для установки заголовков ответа можно использовать метод `c.Response().Header().Set(key, value)`:

```go
c.Response().Header().Set("Content-Type", "application/json")
```

### Обработка ошибок

Для обработки ошибок в Echo используются коды состояния HTTP. Вы можете указать код состояния при формировании ответа с помощью методов, описанных выше.

Также вы можете использовать middleware для централизованной обработки ошибок.

### Заключение

В этом разделе мы рассмотрели основные методы работы с запросами и ответами в фреймворке Echo. Вы узнали, как получать информацию о запросе, формировать различные типы ответов, устанавливать заголовки и обрабатывать ошибки. Эти знания помогут вам создавать эффективные и производительные веб-приложения с помощью Echo. 