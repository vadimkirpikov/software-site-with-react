## Фильтры действий в ASP.NET Core

Фильтры действий в ASP.NET Core предоставляют мощный механизм для обработки HTTP-запросов на уровне контроллеров и действий. Они позволяют инкапсулировать общую логику, такую как авторизация, кэширование, логирование и валидация, делая ваш код чище и удобнее в сопровождении. 

Вместо того, чтобы повторять одну и ту же логику в каждом действии, вы можете определить ее один раз в фильтре и применить к нескольким контроллерам или действиям.

### Типы фильтров действий

ASP.NET Core предлагает несколько типов фильтров действий:

| Тип фильтра | Описание |
|---|---|
| **Authorization** | Применяется для авторизации доступа к действию. |
| **Resource** | Выполняется перед и после создания контроллера. |
| **Action** | Выполняется перед и после выполнения действия. |
| **Exception** | Обрабатывает исключения, возникшие во время выполнения действия. |
| **Result** | Выполняется перед и после возврата результата действия. |

### Создание фильтра действий

Рассмотрим создание простого фильтра действий, который будет регистрировать время выполнения действия. 

1. Создайте новый класс, наследуя его от `ActionFilterAttribute` и реализуя интерфейс `IActionFilter`.

```csharp
using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

public class TimingLogAttribute : ActionFilterAttribute, IActionFilter
{
    private Stopwatch _stopwatch;

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        _stopwatch = Stopwatch.StartNew();
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    {
        _stopwatch.Stop();
        var controllerName = context.Controller.GetType().Name;
        var actionName = context.ActionDescriptor.DisplayName;
        var elapsedTime = _stopwatch.ElapsedMilliseconds;

        // Запись времени выполнения действия в лог
        Console.WriteLine($"[{DateTime.Now}] {controllerName}.{actionName} выполнен за {elapsedTime} мс");
    }
}
```

В этом примере мы создали атрибут `TimingLogAttribute`, который измеряет время выполнения действия с помощью `Stopwatch`. 

* Метод `OnActionExecuting` вызывается перед выполнением действия и запускает таймер.
* Метод `OnActionExecuted` вызывается после выполнения действия и останавливает таймер. Затем он выводит информацию о времени выполнения в консоль.

### Применение фильтра действий

Созданный фильтр можно применить к контроллеру или действию, добавив атрибут `[TimingLog]`.

**Пример применения к контроллеру:**

```csharp
[TimingLog] // Фильтр применяется ко всем действиям контроллера
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    // ...
}
```

**Пример применения к действию:**

```csharp
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    [TimingLog] // Фильтр применяется только к этому действию
    public IEnumerable<WeatherForecast> Get() 
    {
        // ...
    }
}
```

### Применение фильтров глобально

Фильтры действий также можно применять глобально, что позволяет избежать дублирования кода и применять логику ко всем контроллерам и действиям в приложении. 

Для этого необходимо добавить фильтр в коллекцию `Filters` в методе `builder.Services.AddControllers`  в файле `Program.cs`.

```csharp
// ...
builder.Services.AddControllers(options =>
{
    options.Filters.Add<TimingLogAttribute>(); // Глобальное применение фильтра
});
// ...
```

### Порядок выполнения фильтров

Важно понимать порядок выполнения фильтров, особенно при использовании нескольких фильтров для одного контроллера или действия. 

**Порядок выполнения:**

1. Authorization
2. Resource
3. Action (OnActionExecuting)
4. Action Result (OnResultExecuting)
5. Action Result (OnResultExecuted)
6. Action (OnActionExecuted)
7. Exception
8. Resource

Фильтры одного типа выполняются в том порядке, в котором они были добавлены.

Фильтры действий - это мощный инструмент для инкапсуляции общей логики и повышения качества кода. Изучив типы фильтров и способы их применения, вы сможете создавать более эффективные и легко сопровождаемые приложения ASP.NET Core. 
