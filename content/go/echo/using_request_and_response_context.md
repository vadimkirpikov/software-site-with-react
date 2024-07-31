## Использование контекста запроса и ответа в Echo

Фреймворк Echo предоставляет удобные объекты `echo.Context` для взаимодействия с HTTP-запросами и ответами. Объект контекста содержит информацию о текущем запросе, такую как заголовки, параметры, тело запроса, а также методы для формирования ответа, включая установку заголовков, отправку данных и кодов состояния.

### Доступ к информации запроса

#### Получение заголовков

Метод `Request().Header` возвращает объект `http.Header`, содержащий все заголовки HTTP-запроса. 

```Go
func handler(c echo.Context) error {
  contentType := c.Request().Header.Get("Content-Type") 
  // ...
}
```

#### Получение параметров пути

Для получения значений из параметров пути используйте метод `Param`:

```Go
// Route: /users/:id

func getUser(c echo.Context) error {
  userID := c.Param("id")
  // ...
}
```

#### Получение параметров запроса

Для доступа к параметрам строки запроса используйте методы `QueryParam` и `QueryParams`:

```Go
// Запрос: /products?category=books&limit=10

func getProducts(c echo.Context) error {
  category := c.QueryParam("category") // "books"
  limit := c.QueryParam("limit") // "10"

  allParams := c.QueryParams() // map[string][]string{"category": {"books"}, "limit": {"10"}}
  // ...
}
```

#### Чтение тела запроса

Echo предоставляет несколько способов чтения тела запроса:

* **`c.Bind(data)`**:  Разбирает тело запроса в соответствии с `Content-Type` и заполняет структуру `data`. 

```Go
type User struct {
  Name  string `json:"name"`
  Email string `json:"email"`
}

func createUser(c echo.Context) error {
  user := new(User)
  if err := c.Bind(user); err != nil {
    return err
  }
  // ...
}
```

* **`c.Request().Body`**: Возвращает `io.ReadCloser`, предоставляя доступ к телу запроса как к потоку байт.

```Go
func handler(c echo.Context) error {
  body, err := ioutil.ReadAll(c.Request().Body)
  // ...
}
```

### Формирование ответа

#### Установка кода состояния

 Используйте `c.JSON`, `c.String`, `c.XML` и другие методы, которые автоматически устанавливают соответствующий код состояния.

#### Установка заголовков ответа

 Используйте метод `c.Response().Header().Set`:

```Go
func handler(c echo.Context) error {
  c.Response().Header().Set("Cache-Control", "no-cache")
  // ...
}
```

#### Отправка данных

* **`c.String(code int, format string, a ...interface{})`**: Отправляет текстовый ответ.
* **`c.JSON(code int, data interface{})`**: Отправляет данные в формате JSON.
* **`c.XML(code int, data interface{})`**: Отправляет данные в формате XML.

```Go
type Message struct {
  Text string `json:"text"`
}

func handler(c echo.Context) error {
  msg := &Message{Text: "Hello, world!"}
  return c.JSON(http.StatusOK, msg)
}
```

### Дополнительные возможности

#### Передача данных между обработчиками

 Для передачи данных между обработчиками используйте `c.Set` и `c.Get`:

```Go
func middleware(next echo.HandlerFunc) echo.HandlerFunc {
  return func(c echo.Context) error {
    c.Set("username", "john_doe")
    return next(c)
  }
}

func handler(c echo.Context) error {
  username := c.Get("username").(string)
  // ...
}
```

#### Прерывание выполнения обработчиков

 Для досрочного завершения обработки запроса и отправки ответа используйте `return c.Error(err)` или `return c.JSON(code, data)`

```Go
func handler(c echo.Context) error {
  // ...
  if err != nil {
    return c.Error(err) 
  }
  // ...
}
```

#### Обработка ошибок

 Для централизованной обработки ошибок используйте промежуточный обработчик (middleware):

```Go
func errorHandler(next echo.HandlerFunc) echo.HandlerFunc {
  return func(c echo.Context) error {
    err := next(c)
    if err != nil {
      // Обработка ошибки
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
    }
    return nil
  }
}
```

#### Использование контекста Go

 Объект `echo.Context` предоставляет доступ к стандартному контексту `context.Context` через `c.Request().Context()`. 

 Этот контекст можно использовать для хранения значений, отслеживания времени ожидания запроса и других задач.
 
```Go
func handler(c echo.Context) error {
  ctx := c.Request().Context()
  // ...
}
```

### Заключение

Изучив основы работы с `echo.Context`, вы можете эффективно обрабатывать HTTP-запросы и формировать ответы в своих приложениях на Go с использованием фреймворка Echo. 
