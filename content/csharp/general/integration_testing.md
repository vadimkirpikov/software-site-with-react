## Тестирование интеграций

Тестирование интеграций — это важный этап разработки программного обеспечения, который позволяет убедиться, что различные компоненты вашего приложения работают вместе, как ожидается. В отличие от модульных тестов, которые проверяют отдельные части кода в изоляции, интеграционные тесты фокусируются на взаимодействии этих частей.

### Цели интеграционного тестирования

- **Проверить правильность взаимодействия между компонентами приложения.**
- **Обнаружить ошибки, возникающие на стыке разных модулей.**
- **Убедиться, что данные корректно передаются и обрабатываются между компонентами.**
- **Подтвердить, что внешние зависимости (базы данных, API, сервисы) интегрированы корректно.**

### Типы интеграционных тестов

Существуют разные подходы к тестированию интеграций, например:

- **Тестирование "большого взрыва":** Все компоненты интегрируются и тестируются одновременно.
- **Инкрементальное тестирование:** Компоненты интегрируются и тестируются постепенно, шаг за шагом.
- **Тестирование сверху вниз:** Тестирование начинается с верхнего уровня приложения и спускается вниз по иерархии.
- **Тестирование снизу вверх:** Тестирование начинается с базовых компонентов и поднимается вверх по иерархии.

### Пример

Представим, у нас есть простое приложение ASP.NET Core, которое получает данные о погоде из внешнего API и отображает их пользователю. 

**Структура проекта:**

```
WeatherApp/
- WeatherApp.csproj
- Controllers/
  - WeatherController.cs
- Services/
  - IWeatherService.cs
  - WeatherService.cs
- Models/
  - WeatherData.cs
```

**Код:**

```C#
// WeatherData.cs
namespace WeatherApp.Models;

public class WeatherData
{
    public string City { get; set; }
    public double Temperature { get; set; }
}

// IWeatherService.cs
using WeatherApp.Models;

namespace WeatherApp.Services;

public interface IWeatherService
{
    Task<WeatherData> GetWeatherAsync(string city);
}

// WeatherService.cs
using System.Net.Http.Json;
using WeatherApp.Models;

namespace WeatherApp.Services;

public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<WeatherData> GetWeatherAsync(string city)
    {
        // Обратите внимание: в реальном приложении используйте безопасный API и ключ доступа.
        var response = await _httpClient.GetAsync($"https://example.com/api/weather?city={city}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<WeatherData>();
    }
}

// WeatherController.cs
using Microsoft.AspNetCore.Mvc;
using WeatherApp.Services;

namespace WeatherApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;

    public WeatherController(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    [HttpGet("{city}")]
    public async Task<IActionResult> Get(string city)
    {
        var weatherData = await _weatherService.GetWeatherAsync(city);
        return Ok(weatherData);
    }
}
```

### Интеграционный тест

Напишем интеграционный тест, который проверит, что `WeatherController` корректно взаимодействует с `WeatherService` и API:

```C#
// WeatherControllerTests.cs
using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using WeatherApp.Models;
using Xunit;

namespace WeatherApp.Tests;

public class WeatherControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    public WeatherControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Get_ReturnsWeatherData_ForValidCity()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/weather/Moscow");
        var weatherData = await response.Content.ReadFromJsonAsync<WeatherData>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(weatherData);
        Assert.Equal("Moscow", weatherData.City);
        // Добавьте проверки других полей weatherData
    }
}
```

**Объяснение:**

1. Мы используем `WebApplicationFactory<Program>` для запуска приложения в тестовой среде.
2. В методе `Get_ReturnsWeatherData_ForValidCity` мы:
    - Создаем HTTP-клиент с помощью `_factory.CreateClient()`.
    - Выполняем GET-запрос к `/api/weather/Moscow`.
    - Десериализуем ответ в объект `WeatherData`.
    - Проверяем, что:
        - Код ответа - 200 (OK).
        - `weatherData` не равен null.
        - `weatherData.City` равен "Moscow".
        - Проверьте другие поля `weatherData` на корректность.

### Заключение

Интеграционное тестирование - это важный этап разработки ПО, который помогает гарантировать, что ваши компоненты работают вместе слаженно. Используйте различные типы интеграционных тестов и подходящие инструменты, чтобы эффективно выявлять и исправлять ошибки на ранних этапах разработки.
