## Конфигурация и обработка запросов в ASP.NET Core 8.0

В этом разделе мы разберем основы конфигурации приложений ASP.NET Core 8.0 и научимся обрабатывать HTTP-запросы с помощью Middleware.

### Конфигурация приложения

Конфигурация в ASP.NET Core основана на парах "ключ-значение" и может поступать из различных источников:

* `appsettings.json`: Файл с настройками приложения в формате JSON.
* Переменные окружения.
* Аргументы командной строки.

#### Чтение конфигурации

Для доступа к конфигурации используется объект `IConfiguration`, который внедряется через систему внедрения зависимостей. 

```C#
// Programm.cs

using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Получаем доступ к объекту IConfiguration
IConfiguration config = builder.Configuration;

// Получаем значение настройки "Logging:LogLevel:Default"
string logLevel = config["Logging:LogLevel:Default"];

// ...
```

#### appsettings.json

Файл `appsettings.json` содержит настройки по умолчанию. 

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

#### Переменные окружения

Переменные окружения могут переопределять значения из `appsettings.json`.  

#### Аргументы командной строки

Аргументы командной строки имеют наивысший приоритет и могут переопределить любые другие настройки. 

### Обработка запросов с помощью Middleware

Middleware - это программные компоненты, которые обрабатывают HTTP-запросы и формируют HTTP-ответы. Они выстраиваются в цепочку, и каждый компонент может обработать запрос, изменить его или передать следующему компоненту.

#### Добавление Middleware

Middleware добавляются в конвейер обработки запросов с помощью метода `Use...()` в `Program.cs`. 

```C#
// Programm.cs

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Добавляем Middleware для вывода "Hello World!"
app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Hello World!");
});

// ...
```

#### Пример Middleware: Логирование

Создадим Middleware для логирования HTTP-запросов:

```C#
// LoggingMiddleware.cs
public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Логируем информацию о запросе
        _logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");

        // Передаем управление следующему Middleware
        await _next(context);

        // Логируем информацию об ответе
        _logger.LogInformation($"Response: {context.Response.StatusCode}");
    }
}
```

Регистрируем Middleware в `Program.cs`:

```C#
// Programm.cs

// ...

app.UseMiddleware<LoggingMiddleware>();

// ...
```

#### Встроенные Middleware

ASP.NET Core предоставляет множество встроенных Middleware:

* `UseStaticFiles`: Обработка статических файлов (HTML, CSS, JavaScript).
* `UseRouting`: Маршрутизация запросов к контроллерам и методам.
* `UseAuthentication`: Аутентификация пользователей.
* `UseAuthorization`: Авторизация доступа к ресурсам.

#### Порядок Middleware

Порядок добавления Middleware важен! 

Например, если `UseStaticFiles` будет добавлен после Middleware, обрабатывающего все запросы, то статические файлы не будут доступны.

### Заключение

В этом разделе мы рассмотрели основы конфигурации приложения ASP.NET Core 8.0 и научились обрабатывать HTTP-запросы с помощью Middleware. 
