## Контроллеры в ASP.NET Core

Контроллеры - это основа обработки запросов в ASP.NET Core. Они отвечают за взаимодействие с моделью, получение данных и возврат ответов клиенту. В этом разделе мы рассмотрим создание контроллеров, типы возвращаемых данных и основные атрибуты маршрутизации.

### Создание контроллера

Для создания контроллера:

1. Создайте новый класс в проекте ASP.NET Core.
2. Унаследуйте класс от `Microsoft.AspNetCore.Mvc.Controller`.
3. Добавьте атрибут `[ApiController]` к классу.

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyWebApp.Controllers
{
    [ApiController]
    public class ProductsController : Controller
    {
        // Код контроллера
    }
}
```

### Методы действия

Каждый публичный метод в контроллере, помеченный атрибутом `[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]` или `[HttpPatch]`, становится **методом действия**. Эти атрибуты указывают HTTP-метод, на который будет реагировать метод действия.

```csharp
[HttpGet]
public IActionResult GetAllProducts()
{
    // Код для получения списка продуктов
}
```

### Маршрутизация

По умолчанию ASP.NET Core использует **конвенциональную маршрутизацию** для определения пути к методу действия. Путь формируется из имени контроллера (без суффикса "Controller") и имени метода действия. 

Например, метод `GetAllProducts` в контроллере `ProductsController` будет доступен по пути `/products`.

#### Атрибуты маршрутизации

Для более гибкой настройки маршрутизации можно использовать атрибуты:

- `[Route("custom_route")]`: задает произвольный маршрут к методу действия.
- `[HttpGet("products/{id}")]`: указывает, что метод будет обрабатывать GET-запросы по пути `/products/{id}`, где `id` - переменная пути.

```csharp
[HttpGet("products/{id}")]
public IActionResult GetProductById(int id)
{
    // Код для получения продукта по идентификатору
}
```

### Возврат данных

Методы действия могут возвращать различные типы данных, например:

- `IActionResult`: базовый интерфейс для возврата HTTP-ответов.
- `string`: возвращает текстовое содержимое.
- Объекты: ASP.NET Core автоматически сериализует объекты в JSON или XML в зависимости от заголовка `Accept` в запросе.

#### Коды состояния HTTP

Для указания статуса ответа можно использовать перечисление `Microsoft.AspNetCore.Http.StatusCodes`:

```csharp
[HttpGet]
public IActionResult GetProductById(int id)
{
    var product = // Код для получения продукта из базы данных

    if (product == null)
    {
        return NotFound(); // Возвращает код состояния 404 Not Found
    }

    return Ok(product); // Возвращает код состояния 200 OK и объект product
}
```

### Внедрение зависимостей

Контроллеры могут использовать **внедрение зависимостей** для доступа к сервисам и другим зависимостям. Для этого необходимо:

1. Зарегистрировать зависимость в методе `builder.Services.Add...()` в файле `Program.cs`.
2. Добавить зависимость в конструктор контроллера.

```csharp
// Program.cs
builder.Services.AddTransient<IProductService, ProductService>();

// ProductsController.cs
public class ProductsController : Controller
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    // Методы действия
}
```

### Пример контроллера

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            _productService.CreateProduct(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _productService.UpdateProduct(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _productService.DeleteProduct(id);
            return NoContent();
        }
    }
}
```

В этом примере:

- `[ApiController]` указывает, что класс является API-контроллером.
- `[Route("api/[controller]")]` задает префикс маршрута `api/products` для всех методов действия в контроллере.
- `IProductService` - это интерфейс сервиса, который инжектируется в конструктор контроллера.
- Методы действия используют различные атрибуты HTTP-методов для обработки соответствующих запросов.
- Методы действия возвращают соответствующие коды состояния HTTP и данные в зависимости от результата операции.

Это базовая информация о создании контроллеров в ASP.NET Core. В дальнейшем мы рассмотрим более сложные сценарии использования контроллеров, такие как валидация модели, обработка ошибок и авторизация. 
