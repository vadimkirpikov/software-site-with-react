## Форматирование ответов в ASP.NET Core 8.0

В процессе разработки веб-приложений на ASP.NET Core важно не только обрабатывать запросы, но и корректно форматировать ответы, отправляемые клиенту. От формата ответа зависит, как клиент сможет интерпретировать полученные данные. ASP.NET Core предоставляет разработчикам гибкие механизмы для управления форматом ответов, что позволяет удовлетворить требования самых разных клиентов.

### Content Negotiation

Content Negotiation (согласование контента) — механизм, позволяющий клиенту и серверу договориться о формате передаваемых данных. Клиент отправляет заголовок `Accept`, указывая предпочитаемые им форматы, а сервер, основываясь на этой информации и своих возможностях, выбирает наиболее подходящий формат и указывает его в заголовке `Content-Type` ответа.

ASP.NET Core поддерживает Content Negotiation "из коробки". Допустим, необходимо вернуть данные в формате JSON или XML в зависимости от запроса клиента. Создадим простой контроллер:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyWebApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ValuesController : ControllerBase
{
    private readonly List<string> _values = new() { "value1", "value2" };

    [HttpGet]
    public IActionResult GetValues()
    {
        return Ok(_values);
    }
}
```

В данном примере метод `GetValues` возвращает список строк. Благодаря использованию `[ApiController]` и `Ok()` ASP.NET Core автоматически выберет формат ответа (JSON или XML) на основе заголовка `Accept` в запросе клиента.

### Форматирование с помощью Output Formatters

Output Formatters – это компоненты, отвечающие за сериализацию объектов в определённый формат. ASP.NET Core предоставляет встроенные форматтеры для JSON, XML и других форматов.  

#### Настройка Formatters

По умолчанию ASP.NET Core использует ограниченный набор форматтеров. Для добавления поддержки дополнительных форматов, например, Protobuf, необходимо зарегистрировать соответствующий пакет NuGet и добавить форматтер в конфигурации приложения:

```csharp
// В Program.cs

builder.Services.AddControllers(options =>
{
    options.OutputFormatters.Add(new ProtobufOutputFormatter());
});
```

#### Выбор Formatter вручную

В некоторых случаях требуется явно указать формат ответа, игнорируя Content Negotiation. Для этого можно воспользоваться методами `FormatFilter` или `Produces`:

```csharp
// Возвращаем данные в формате JSON
[HttpGet("json")]
[FormatFilter]
public IActionResult GetValuesAsJson()
{
    return Ok(_values);
}

// Возвращаем данные в формате XML
[HttpGet("xml")]
[Produces("application/xml")]
public IActionResult GetValuesAsXml()
{
    return Ok(_values);
}
```

### Форматирование даты и времени

ASP.NET Core предоставляет широкие возможности для форматирования значений даты и времени. По умолчанию используется формат ISO 8601, но его можно изменить глобально или для конкретного действия контроллера.

#### Глобальная настройка

```csharp
// В Program.cs
builder.Services.AddControllers(options =>
{
    options.UseIso8601DateOnlyFormat(); // Используем формат даты ISO 8601
});
```

#### Настройка для действия

```csharp
[HttpGet("{id}")]
public IActionResult GetValue(int id, [FromQuery] DateTime date)
{
    return Ok(new { Id = id, Date = date.ToString("dd.MM.yyyy") });
}
```

### Заключение

В этой статье мы рассмотрели основные механизмы форматирования ответов в ASP.NET Core 8.0: Content Negotiation, Output Formatters и форматирование даты и времени. Умение управлять форматом ответов является важным навыком для разработки современных веб-приложений, позволяющим обеспечить взаимодействие с различными клиентами и предоставить пользователям информацию в удобном для них виде. 
