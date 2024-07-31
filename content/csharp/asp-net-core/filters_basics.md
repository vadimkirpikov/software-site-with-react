## Основы фильтров в ASP.NET Core 8.0

Фильтры в ASP.NET Core предоставляют элегантный механизм для обработки HTTP-запросов и ответов на разных этапах конвейера обработки. Они позволяют выполнять общую логику до, после или при возникновении исключения во время выполнения действий контроллера или Razor Pages.

### Типы фильтров

ASP.NET Core поддерживает следующие типы фильтров:

| Тип фильтра      | Описание                                                                           |
|------------------|------------------------------------------------------------------------------------|
| Authorization     | Применяется для авторизации доступа к действиям контроллера.                       |
| Resource         | Используется для выделения и освобождения ресурсов, необходимых для действия.     |
| Action           | Выполняет логику до и после выполнения действия контроллера.                       |
| Exception        | Обрабатывает исключения, возникшие во время выполнения конвейера.                 |
| Result           | Выполняет логику до и после выполнения результата действия.                       |

### Создание фильтра

Рассмотрим создание простого фильтра Action, который будет регистрировать время начала и окончания выполнения действия контроллера.

1. **Создайте класс, реализующий интерфейс `IActionFilter`:**

```C#
using Microsoft.AspNetCore.Mvc.Filters;

public class LoggingActionFilter : IActionFilter
{
    private readonly ILogger<LoggingActionFilter> _logger;

    public LoggingActionFilter(ILogger<LoggingActionFilter> logger)
    {
        _logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Логика, выполняемая перед действием
        _logger.LogInformation($"Начало выполнения действия: {context.ActionDescriptor.DisplayName} в {DateTime.Now}");
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Логика, выполняемая после действия
        _logger.LogInformation($"Окончание выполнения действия: {context.ActionDescriptor.DisplayName} в {DateTime.Now}");
    }
}
```

В этом примере:

- Класс `LoggingActionFilter` реализует интерфейс `IActionFilter`, предоставляющий методы `OnActionExecuting` и `OnActionExecuted`.
- Метод `OnActionExecuting` вызывается перед выполнением действия контроллера, а `OnActionExecuted` - после.
- В конструктор фильтра внедряется зависимость `ILogger`, используемая для записи логов.

2. **Зарегистрируйте фильтр в `Program.cs`:**

```C#
var builder = WebApplication.CreateBuilder(args);

// ... 

builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add<LoggingActionFilter>(); // Регистрация фильтра
});

// ...
```

В данном случае фильтр регистрируется глобально, т.е. будет применяться ко всем действиям контроллера.

### Применение фильтров

Фильтры можно применять на разных уровнях:

* **Глобально**: Регистрация в `Program.cs`, как показано выше.
* **На уровне контроллера**: Применение атрибута фильтра к классу контроллера.
* **На уровне действия**: Применение атрибута фильтра к методу действия.

Пример применения фильтра на уровне действия:

```C#
[HttpGet]
[LoggingActionFilter] // Применение фильтра к действию
public IActionResult Index()
{
    // ...
}
```

### Порядок выполнения фильтров

При наличии нескольких фильтров, применяемых к одному действию, их порядок выполнения следующий:

1. Authorization
2. Resource
3. Action (OnActionExecuting)
4. Action Result (OnResultExecuting)
5. Action Result (OnResultExecuted)
6. Action (OnActionExecuted)
7. Exception
8. Result

### Заключение

Фильтры в ASP.NET Core являются мощным инструментом для реализации сквозной функциональности и улучшения структуры приложения. Они позволяют избежать дублирования кода и повысить его maintainability. Более подробная информация о фильтрах и их возможностях будет рассмотрена в следующих разделах руководства.
