## Движки шаблонов в Echo

Фреймворк Echo предоставляет гибкие возможности для работы с шаблонами, позволяя использовать различные движки для генерации HTML-страниц. Вы можете выбрать наиболее удобный для вас движок, основываясь на его синтаксисе, функциональности и производительности.

В Echo встроена поддержка стандартного пакета `html/template` из Go, а также есть возможность подключения сторонних движков, таких как Pug и Handlebars. 

### Использование `html/template`

Пакет `html/template` - это стандартный инструмент Go для работы с шаблонами. Он прост в использовании и отлично подходит для базовых задач.

**Шаг 1:** Создайте файл шаблона, например, `views/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{.Title}}</title>
</head>
<body>
    <h1>{{.Message}}</h1>
</body>
</html>
```

**Шаг 2:** В коде вашего приложения Go инициализируйте Echo и зарегистрируйте маршрут, который будет использовать шаблон:

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// Создаем рендерер для шаблонов
	renderer := &TemplateRenderer{
		Templates: template.Must(template.ParseGlob("views/*.html")),
	}
	e.Renderer = renderer

	e.GET("/", func(c echo.Context) error {
		// Данные для передачи в шаблон
		data := struct {
			Title   string
			Message string
		}{
			Title:   "Главная страница",
			Message: "Привет из Echo и html/template!",
		}

		// Рендерим шаблон "index.html" с данными data
		return c.Render(http.StatusOK, "index.html", data)
	})

	e.Logger.Fatal(e.Start(":1323"))
}

// Структура TemplateRenderer реализует интерфейс echo.Renderer
type TemplateRenderer struct {
	Templates *template.Template
}

// Render рендерит шаблон с заданным именем и данными.
func (t *TemplateRenderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.Templates.ExecuteTemplate(w, name, data)
}

```

В этом примере мы создаем экземпляр `echo.Echo`, регистрируем обработчик для корневого маршрута ("/") и запускаем сервер. Внутри обработчика мы определяем структуру данных `data`, содержащую заголовок и сообщение, которые будут переданы в шаблон.  Затем мы используем метод `c.Render` для рендеринга шаблона `index.html` с переданными данными. 

### Использование Pug

Pug - это высокопроизводительный движок шаблонов с лаконичным синтаксисом, который может упростить написание HTML.

**Шаг 1:** Установите пакет `github.com/foolin/goview/supports/echoview`:

```
go get github.com/foolin/goview/supports/echoview
```

**Шаг 2:** Создайте файл шаблона Pug, например, `views/index.pug`:

```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    title= title
  body
    h1= message
```

**Шаг 3:** Измените код приложения, чтобы использовать Pug:

```go
package main

import (
	"net/http"

	"github.com/foolin/goview/supports/echoview"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// Настраиваем echoview для использования Pug
	e.Renderer = echoview.New(echoview.Config{
		Root:      "views",
		Extension: ".pug",
		Partials:  []string{},
		Funcs:     make(template.FuncMap),
		DisableCache: true,
	})

	e.GET("/", func(c echo.Context) error {
		// Данные для передачи в шаблон
		data := struct {
			Title   string
			Message string
		}{
			Title:   "Главная страница",
			Message: "Привет из Echo и Pug!",
		}
		return c.Render(http.StatusOK, "index", data)
	})

	e.Logger.Fatal(e.Start(":1323"))
}
```

Здесь мы используем пакет `echoview` для интеграции Pug с Echo. Мы настроили `echoview` на использование директории `views` для поиска шаблонов с расширением `.pug`.  

### Использование Handlebars

Handlebars - это еще один популярный движок шаблонов, известный своей гибкостью и расширяемостью.

**Шаг 1:** Установите пакет `github.com/aymerick/raymond`:

```
go get github.com/aymerick/raymond
```

**Шаг 2:** Создайте файл шаблона Handlebars, например, `views/index.hbs`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{title}}</title>
</head>
<body>
    <h1>{{message}}</h1>
</body>
</html>
```

**Шаг 3:** Измените код приложения, чтобы использовать Handlebars:

```go
package main

import (
	"net/http"
	"io"
	"github.com/aymerick/raymond"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// Создаем рендерер для шаблонов Handlebars
	e.Renderer = &HandlebarsRenderer{
		Templates: raymond.MustParseGlob("views/*.hbs"),
	}

	e.GET("/", func(c echo.Context) error {
		// Данные для передачи в шаблон
		data := struct {
			Title   string
			Message string
		}{
			Title:   "Главная страница",
			Message: "Привет из Echo и Handlebars!",
		}
		return c.Render(http.StatusOK, "index.hbs", data)
	})

	e.Logger.Fatal(e.Start(":1323"))
}

// Структура HandlebarsRenderer реализует интерфейс echo.Renderer
type HandlebarsRenderer struct {
	Templates *raymond.Template
}

// Render рендерит шаблон с заданным именем и данными.
func (h *HandlebarsRenderer) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return h.Templates.Execute(w, data)
}
```

В этом примере мы используем пакет `raymond`, который является реализацией Handlebars для Go. Мы создаем экземпляр 
`raymond.Template`, загружая все файлы шаблонов `.hbs` из директории `views`. 

### Выбор движка шаблонов

Выбор движка шаблонов зависит от ваших личных предпочтений и требований проекта. 

| Движок        | Преимущества                                                                 | Недостатки                                                             |
|----------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `html/template` | Стандартный пакет Go, простой синтаксис                                   | Ограниченная функциональность                                        |
| Pug           | Лаконичный синтаксис, высокая производительность                               | Необходимо изучение нового синтаксиса                               |
| Handlebars     | Гибкость, расширяемость, большое количество готовых хелперов и плагинов | Менее производителен, чем Pug                                      |

 
Независимо от того, какой движок вы выберете, Echo предоставляет простой и удобный способ его интеграции в ваше приложение. 
