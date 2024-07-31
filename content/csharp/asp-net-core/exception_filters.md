## Фильтры исключений в ASP.NET Core

Фильтры исключений в ASP.NET Core предоставляют централизованный механизм обработки необработанных исключений, возникающих во время выполнения HTTP-запроса. Они позволяют перехватывать исключения, анализировать их и выполнять действия, такие как логирование, отправка уведомлений или отображение пользовательской страницы ошибки. 

### Типы фильтров исключений

ASP.NET Core предлагает несколько типов фильтров исключений:

1. **ExceptionFilterAttribute:** базовый класс для создания пользовательских фильтров исключений. Он предоставляет метод `OnException`, который вызывается при возникновении необработанного исключения.

2. **UseExceptionHandler:** метод расширения для `IApplicationBuilder`, используемый для регистрации обработчика исключений для указанного пути.

### Создание пользовательского фильтра исключений

Чтобы создать пользовательский фильтр исключений, нужно унаследовать класс от `ExceptionFilterAttribute` и переопределить метод `OnException`. 

**Пример:**

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class CustomExceptionFilter : ExceptionFilterAttribute
{
    private readonly ILogger<CustomExceptionFilter> _logger;

    public CustomExceptionFilter(ILogger<CustomExceptionFilter> logger)
    {
        _logger = logger;
    }

    public override void OnException(ExceptionContext context)
    {
        // Логирование исключения
        _logger.LogError(context.Exception, "Произошла непредвиденная ошибка.");

        // Возврат пользовательского ответа
        context.Result = new ContentResult
        {
            Content = "Произошла ошибка. Пожалуйста, повторите попытку позже.",
            StatusCode = 500
        };

        context.ExceptionHandled = true;
    }
}
```

В этом примере фильтр исключений `CustomExceptionFilter` регистрирует исключение с помощью `ILogger` и возвращает пользователю сообщение об ошибке с кодом состояния 500. `context.ExceptionHandled = true;` указывает, что исключение было обработано и не нужно передавать дальше.

### Регистрация фильтра исключений

Существует несколько способов регистрации фильтра исключений:

1. **Глобально:** Фильтр будет применяться ко всем запросам.

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Регистрация фильтра исключений глобально
        builder.Services.AddControllers(options =>
        {
            options.Filters.Add<CustomExceptionFilter>();
        });

        var app = builder.Build();

        // ...

        app.Run();
    }
}
```

2. **На уровне контроллера:** Фильтр будет применяться ко всем методам действия в контроллере.

```csharp
[CustomExceptionFilter]
public class MyController : Controller
{
    // ...
}
```

3. **На уровне метода действия:** Фильтр будет применяться только к указанному методу действия.

```csharp
public class MyController : Controller
{
    [CustomExceptionFilter]
    public IActionResult MyAction()
    {
        // ...
    }
}
```

### Использование UseExceptionHandler

Метод `UseExceptionHandler` позволяет зарегистрировать обработчик исключений для определенного пути. Обычно он используется для отображения пользовательской страницы ошибки в production-окружении.

**Пример:**

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        // ...

        var app = builder.Build();

        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Error");
        }

        // ...
    }
}
```

В этом примере `UseExceptionHandler` перенаправляет все запросы, завершившиеся необработанным исключением, на страницу `/Error`.

### Обработка исключений в методе действия

В некоторых случаях может потребоваться обработать исключение непосредственно в методе действия. Для этого можно использовать блок `try-catch`.

**Пример:**

```csharp
public IActionResult MyAction()
{
    try
    {
        // Код, который может вызвать исключение
    }
    catch (Exception ex)
    {
        // Обработка исключения
    }

    return Ok();
}
```

### Заключение

Фильтры исключений являются мощным инструментом для централизованной обработки необработанных исключений в ASP.NET Core. Они позволяют логировать, обрабатывать и скрывать ошибки от конечного пользователя, обеспечивая стабильность и безопасность приложения. 
