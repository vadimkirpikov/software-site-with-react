## Структура проекта ASP.NET Core 8.0

Понимание структуры проекта — это первый шаг к освоению разработки веб-приложений с помощью ASP.NET Core. Давайте рассмотрим основные элементы стандартного проекта, созданного с помощью шаблона.

### Проект по умолчанию

После создания нового проекта ASP.NET Core 8.0 (например, с помощью команды `dotnet new webapp`) вы увидите следующую структуру папок и файлов:

```
├── Program.cs
├── Properties
│   └── launchSettings.json
├── wwwroot
│   └── (содержимое статических файлов)
└── ... (другие файлы и папки проекта)

```

Разберем каждый элемент подробнее:

* **Program.cs:** Этот файл служит точкой входа в приложение. Здесь настраивается веб-хост, конфигурируется внедрение зависимостей, подключается middleware и определяются конечные точки маршрутизации.

```csharp
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

// Настройка служб приложения
builder.Services.AddControllersWithViews(); 

var app = builder.Build();

// Настройка конвейера запросов HTTP
if (!app.Environment.IsDevelopment()) 
{
    // Код для production-окружения
}

app.UseStaticFiles(); 

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

* **Properties/launchSettings.json:**  Этот файл содержит настройки запуска приложения, такие как URL-адрес приложения, переменные окружения и параметры отладки. 

```json
{
  "profiles": {
    "MyWebApp": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7297;http://localhost:5297",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

* **wwwroot:**  Эта папка предназначена для хранения статических файлов, таких как HTML, CSS, JavaScript, изображения и шрифты. Эти файлы напрямую обслуживаются веб-сервером.

* **Другие файлы и папки:** В зависимости от выбранного шаблона и установленных пакетов NuGet ваш проект может содержать дополнительные файлы и папки. Например, папка `Controllers` для контроллеров MVC, папка `Models` для моделей данных или папка `Views` для представлений.

### Создание простого контроллера

Для демонстрации работы с контроллерами создадим простой контроллер `HomeController`:

1. **Создайте папку `Controllers`** в корневом каталоге проекта, если она еще не существует.
2. **Создайте новый файл `HomeController.cs`** внутри папки `Controllers`.
3. **Добавьте следующий код в файл `HomeController.cs`**:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyWebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
```

Этот код определяет контроллер `HomeController` с единственным действием `Index`, которое возвращает представление.

### Создание простого представления

Теперь создадим простое представление для нашего действия `Index`:

1. **Создайте папку `Views`** в корневом каталоге проекта.
2. **Создайте папку `Home`** внутри папки `Views`.
3. **Создайте новый файл `Index.cshtml`** внутри папки `Views/Home`.
4. **Добавьте следующий код в файл `Index.cshtml`**:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Главная страница</title>
</head>
<body>
    <h1>Привет из ASP.NET Core!</h1>
</body>
</html>
```

### Запуск приложения

Запустите приложение с помощью команды `dotnet run`. В консоли вы увидите URL-адрес, по которому доступно ваше приложение (обычно `https://localhost:5001` или `http://localhost:5000`). Откройте этот адрес в браузере, и вы увидите созданную нами страницу с приветствием.

Это лишь базовая структура проекта ASP.NET Core 8.0. В следующих разделах мы подробнее рассмотрим каждый компонент и его роль в разработке веб-приложений.
