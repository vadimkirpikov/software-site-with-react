## Tag Helpers в ASP.NET Core

Tag Helpers - это функционал ASP.NET Core, который позволяет писать HTML-код на сервере, используя C#-код. Они предоставляют более естественный способ создания разметки HTML, чем традиционные HTML-хелперы, и улучшают читаемость кода. 

Вместо того, чтобы писать C#-код внутри HTML-разметки, как это делается с помощью HTML-хелперов, Tag Helpers позволяют добавлять атрибуты к HTML-тегам. Эти атрибуты обрабатываются на сервере, и полученный HTML-код отправляется клиенту.

### Преимущества Tag Helpers

* **Читабельность:** Код становится более чистым и понятным, поскольку C#-код не смешивается с HTML-разметкой.
* **Интеллектуальная поддержка:** Visual Studio и другие IDE предоставляют IntelliSense и проверку синтаксиса для Tag Helpers.
* **Расширяемость:** Вы можете создавать свои собственные Tag Helpers для удовлетворения специфических потребностей вашего проекта.
* **Безопасность:** Tag Helpers автоматически экранируют выходные данные, предотвращая XSS-атаки.

### Использование встроенных Tag Helpers

ASP.NET Core включает в себя набор встроенных Tag Helpers для часто используемых задач. Давайте рассмотрим некоторые из них:

#### 1. Формы

##### a. `AnchorTagHelper`

`AnchorTagHelper` используется для создания ссылок на действия контроллеров.

**Пример:**

```html
<a asp-controller="Home" asp-action="Index"> Главная </a>
```

Этот код сгенерирует следующий HTML:

```html
<a href="/"> Главная </a>
```

**Параметры:**

| Параметр | Описание |
|---|---|
| `asp-controller` | Имя контроллера. |
| `asp-action` | Имя действия. |

##### b. `FormTagHelper`

`FormTagHelper` используется для создания форм, которые отправляют данные на сервер.

**Пример:**

```html
<form asp-controller="Account" asp-action="Login" method="post">
    <!-- Поля формы -->
</form>
```

**Параметры:**

| Параметр | Описание |
|---|---|
| `asp-controller` | Имя контроллера. |
| `asp-action` | Имя действия. |
| `method` | HTTP-метод формы (GET или POST). |

##### c. `InputTagHelper`

`InputTagHelper` используется для создания различных типов полей ввода, таких как текстовые поля, поля паролей и флажки.

**Пример:**

```html
<input type="text" asp-for="Email" />
```

**Параметры:**

| Параметр | Описание |
|---|---|
| `asp-for` | Свойство модели, с которым связано поле ввода. |
| `type` | Тип поля ввода. |

#### 2. Вывод данных

##### a. `LabelTagHelper`

`LabelTagHelper` используется для создания меток для полей ввода.

**Пример:**

```html
<label asp-for="Email"></label>
```

##### b. `ValidationMessageTagHelper`

`ValidationMessageTagHelper` отображает сообщения об ошибках валидации для указанного свойства модели.

**Пример:**

```html
<span asp-validation-for="Email"></span>
```

#### 3. Кэширование

##### `Cache`

Tag Helper `Cache` позволяет кэшировать фрагменты HTML-кода на стороне сервера.

**Пример:**

```html
<cache expires-after="@TimeSpan.FromMinutes(10)">
    <!-- Содержимое для кэширования -->
</cache>
```

**Параметры:**

| Параметр | Описание |
|---|---|
| `expires-after` | Время, в течение которого содержимое будет кэшироваться. |

### Создание собственных Tag Helpers

Вы можете создавать свои собственные Tag Helpers для расширения функциональности приложения. Для этого:

1. **Создайте класс, наследующий от `TagHelper`**.
2. **Примените атрибут `[HtmlTargetElement]`** к классу, указав имя HTML-тега, к которому будет применяться Tag Helper.
3. **Переопределите метод `Process`**, в котором реализуйте логику вашего Tag Helper.

**Пример:**

```csharp
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace MyProject.TagHelpers
{
    [HtmlTargetElement("alert")]
    public class AlertTagHelper : TagHelper
    {
        public string Type { get; set; } = "info";

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "div"; // Заменяем тег "alert" на "div"
            output.Attributes.Add("class", $"alert alert-{Type}"); // Добавляем классы Bootstrap
            output.Content.SetContent(context.GetChildContentAsync().Result.ToString());
        }
    }
}
```

**Использование:**

```html
<alert type="danger">Это сообщение об ошибке.</alert>
```

Этот код сгенерирует следующий HTML:

```html
<div class="alert alert-danger">Это сообщение об ошибке.</div>
```

### Заключение

Tag Helpers - это мощный инструмент, который делает разработку веб-приложений на ASP.NET Core проще и эффективнее. Изучив основы и возможности Tag Helpers, вы сможете создавать более читаемый, поддерживаемый и безопасный код.
