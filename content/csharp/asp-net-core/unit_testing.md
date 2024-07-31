## Модульное тестирование в ASP.NET Core 8.0

Модульное тестирование – неотъемлемая часть разработки качественного и легко поддерживаемого программного обеспечения. В контексте ASP.NET Core 8.0, где файл `Startup.cs` объединен с `Program.cs`, важно понимать, как эффективно тестировать логику приложения, изолируя ее от инфраструктурных зависимостей.

### Принципы модульного тестирования

Прежде чем перейти к конкретным примерам, рассмотрим ключевые принципы модульного тестирования:

* **Изоляция**: Каждый тест должен выполняться независимо от других, не оказывая на них влияния.
* **Сфокусированность**: Каждый тест должен проверять только один конкретный аспект функциональности.
* **Повторяемость**: Результат теста должен быть одинаковым при каждом запуске, независимо от внешних факторов.

### Инструменты для модульного тестирования

Для написания модульных тестов в ASP.NET Core 8.0 мы будем использовать следующие инструменты:

* **xUnit**: Фреймворк для написания и запуска тестов.
* **Moq**: Библиотека для создания mock-объектов (заглушек), позволяющих изолировать тестируемый код от зависимостей.

### Пример: Тестирование сервиса

Рассмотрим пример тестирования сервиса `WeatherForecastService`, который возвращает прогноз погоды.

**1. Создание проекта с тестами:**

В Visual Studio создайте новый проект xUnit Test Project (.NET Core). Назовите его, например, `WeatherApp.Tests`.

**2. Добавление зависимостей:**

Установите следующие NuGet-пакеты в проект с тестами:

* `Microsoft.AspNetCore.Mvc.Testing`: Позволяет создавать тестовый хост ASP.NET Core для интеграционных тестов.
* `Moq`: Библиотека для создания mock-объектов.

**3. Создание тестового класса:**

Создайте класс `WeatherForecastServiceTests` в проекте с тестами.

```csharp
using Moq;
using WeatherApp.Services;
using Xunit;

namespace WeatherApp.Tests
{
    public class WeatherForecastServiceTests
    {
        // ...
    }
}
```

**4. Написание тестового метода:**

Добавьте следующий тестовый метод `Get_ShouldReturnFiveForecasts`, который проверяет, что метод `Get` сервиса `WeatherForecastService` возвращает пять элементов прогноза:

```csharp
[Fact]
public void Get_ShouldReturnFiveForecasts()
{
    // Arrange (Подготовка)
    var service = new WeatherForecastService();

    // Act (Действие)
    var forecasts = service.Get();

    // Assert (Проверка)
    Assert.Equal(5, forecasts.Count());
}
```

**5. Запуск теста:**

Запустите тест, используя Test Explorer в Visual Studio. Тест должен пройти успешно, подтверждая корректную работу метода `Get`.

### Тестирование с использованием Mock-объектов

Часто сервисы зависят от других сервисов или репозиториев. Для изоляции тестируемого кода от этих зависимостей используются mock-объекты.

Рассмотрим пример, где сервис `WeatherForecastService` зависит от сервиса `ITimeService`, предоставляющего текущее время.

**1. Создание интерфейса `ITimeService`:**

```csharp
public interface ITimeService
{
    DateTime Now { get; }
}
```

**2. Реализация `ITimeService` в `WeatherForecastService`:**

```csharp
public class WeatherForecastService
{
    private readonly ITimeService _timeService;

    public WeatherForecastService(ITimeService timeService)
    {
        _timeService = timeService;
    }

    // ...
}
```

**3. Создание mock-объекта `ITimeService`:**

```csharp
[Fact]
public void Get_ShouldReturnCorrectDates()
{
    // Arrange
    var mockTimeService = new Mock<ITimeService>();
    mockTimeService.Setup(ts => ts.Now).Returns(new DateTime(2024, 01, 01));

    var service = new WeatherForecastService(mockTimeService.Object);

    // Act
    var forecasts = service.Get();

    // Assert
    Assert.Equal(new DateTime(2024, 01, 01), forecasts.First().Date);
}
```

В этом примере мы создали mock-объект `ITimeService` с помощью `Moq` и настроили его так, чтобы он возвращал фиксированную дату. 

### Заключение

Модульное тестирование является важной частью разработки ASP.NET Core приложений. Использование фреймворков, таких как xUnit и библиотек, подобных Moq, позволяет писать эффективные и надежные тесты, обеспечивая высокое качество кода и упрощая его поддержку. 
