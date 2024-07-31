## Параметры запроса в Echo

Параметры запроса (query parameters) — это часть URL, которая следует за знаком вопроса (`?`) и предоставляет дополнительную информацию серверу. Они состоят из пар "ключ-значение", разделенных амперсандом (`&`). Например, в URL `https://example.com/search?q=golang&page=2`, `q=golang` и `page=2` - это параметры запроса, где `q` и `page` - ключи, а `golang` и `2` - значения.

В фреймворке Echo работа с параметрами запроса проста и удобна благодаря встроенным функциям.

### Получение параметров запроса

Echo предоставляет несколько методов для получения значений параметров запроса:

- `c.QueryParam(key string) string`: Возвращает значение параметра запроса по заданному ключу. Если параметр не найден, возвращается пустая строка.

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/users", func(c echo.Context) error {
		name := c.QueryParam("name")  // Получаем значение параметра "name"
		age := c.QueryParam("age") // Получаем значение параметра "age"

		return c.String(http.StatusOK, "Name: "+name+", Age: "+age)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

В этом примере, если мы обратимся по адресу `http://localhost:1323/users?name=John&age=30`, сервер вернет ответ `Name: John, Age: 30`.

- `c.QueryParams() map[string][]string`: Возвращает все параметры запроса в виде словаря, где ключ - это имя параметра, а значение - это срез строк, содержащий все значения этого параметра. 

Это полезно, когда один и тот же параметр передается несколько раз с разными значениями.

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/items", func(c echo.Context) error {
		queryParams := c.QueryParams() // Получаем все параметры запроса

		// Итерируемся по всем параметрам и их значениям
		for key, values := range queryParams {
			for _, value := range values {
				// Обрабатываем каждый параметр и значение
			}
		}

		return c.JSON(http.StatusOK, queryParams)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

- `c.Get(key string) string`: Этот метод используется для получения значений из заголовков запроса, тела запроса, параметров формы и параметров запроса. Если параметр с заданным ключом найден в параметрах запроса, он возвращает его значение.

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/data", func(c echo.Context) error {
		id := c.Get("id") // Получаем значение параметра "id"

		return c.String(http.StatusOK, "ID: "+id)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

### Проверка наличия параметров

Для проверки, был ли передан тот или иной параметр запроса, можно воспользоваться функцией `c.QueryParam(key)` в сочетании с проверкой на пустую строку:

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/products", func(c echo.Context) error {
		category := c.QueryParam("category")

		if category != "" {
			// Выполняем поиск продуктов по категории
		} else {
			// Выполняем поиск всех продуктов
		}

		return c.String(http.StatusOK, "Список продуктов")
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

В этом примере, если параметр `category` передан в запросе, то сервер выполнит поиск продуктов по заданной категории. В противном случае, будет выполнен поиск всех продуктов.


### Привязка параметров запроса к структурам

Для более удобной работы с параметрами запроса, Echo позволяет автоматически привязывать их к структурам. Для этого используется функция `c.Bind(i interface{}) error`, где `i` - это указатель на структуру, поля которой соответствуют ключам параметров запроса. 

Важно отметить: имена полей структуры должны совпадать с ключами параметров запроса. 

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type User struct {
	Name string `query:"name"`
	Age  int    `query:"age"`
}

func main() {
	e := echo.New()

	e.GET("/profile", func(c echo.Context) error {
		u := new(User)
		if err := c.Bind(u); err != nil {
			return err
		}

		return c.JSON(http.StatusOK, u)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

В этом примере, если мы обратимся по адресу `http://localhost:1323/profile?name=Alice&age=25`, сервер вернет JSON-ответ:

```json
{
	"name": "Alice",
	"age": 25
}
```

### Валидация параметров запроса

Echo позволяет легко валидировать параметры запроса с помощью тегов структур. 

В примере ниже показана валидация параметров `name` и `age`:

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type User struct {
	Name string `query:"name" validate:"required,min=3"`
	Age  int    `query:"age" validate:"required,gte=18"`
}

func main() {
	e := echo.New()

	e.GET("/profile", func(c echo.Context) error {
		u := new(User)
		if err := c.Bind(u); err != nil {
			return err
		}
		if err := c.Validate(u); err != nil {
			return err
		}

		return c.JSON(http.StatusOK, u)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

В этом примере:

-  `required`: поле обязательно для заполнения.
- `min=3`: минимальная длина строки для поля `name` равна 3 символам.
- `gte=18`: значение поля `age` должно быть больше или равно 18.

### Заключение

Параметры запроса – важная часть веб-разработки, позволяющая передавать информацию серверу. Echo предоставляет простой и удобный способ работы с ними, включая получение значений, привязку к структурам и валидацию. 
