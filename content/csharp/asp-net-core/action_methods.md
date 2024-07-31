## Методы действий контроллеров в ASP.NET Core

В ASP.NET Core контроллеры играют ключевую роль в обработке HTTP-запросов и формировании ответов. Методы действий, определенные внутри контроллеров, отвечают за конкретные действия, выполняемые в ответ на запросы.

### Создание контроллера

Контроллер в ASP.NET Core – это обычный C#-класс, помеченный атрибутом `[ApiController]`. Имя класса контроллера обычно заканчивается на `Controller`. Например:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // Методы действий будут здесь
    }
}
```

В этом примере:

- `[ApiController]` указывает, что класс является контроллером.
- `[Route("api/[controller]")]` определяет маршрут для всех действий этого контроллера. В данном случае базовый маршрут - `/api/products`, где "products" - это имя контроллера без суффикса "Controller".

### Создание метода действия

Метод действия - это публичный метод внутри контроллера, который обрабатывает определенный тип HTTP-запроса. Методы действий возвращают объекты `IActionResult` или типы, которые могут быть преобразованы в `IActionResult`.

Пример простого метода действия, возвращающего список продуктов:

```csharp
[HttpGet]
public IActionResult GetProducts()
{
    var products = new List<string> { "Product 1", "Product 2", "Product 3" };
    return Ok(products);
}
```

В этом примере:

- `[HttpGet]` указывает, что метод обрабатывает HTTP-запросы GET.
- `GetProducts` - имя метода действия.
- `Ok(products)` возвращает HTTP-ответ со статусом 200 (OK) и списком продуктов в теле ответа.

### Маршрутизация

Атрибут `[Route]` используется для определения маршрута к методу действия. Маршрут может содержать литералы и переменные.

```csharp
[HttpGet("{id}")]
public IActionResult GetProduct(int id)
{
    // Логика получения продукта по id
    return Ok($"Product with id: {id}");
}
```

В этом примере:

- `[HttpGet("{id}")]` определяет маршрут `/api/products/{id}`, где `id` - это переменная, передаваемая в метод действия.
- `GetProduct(int id)` принимает параметр `id` из маршрута.

### HTTP-методы

ASP.NET Core поддерживает все основные HTTP-методы:

| Атрибут | HTTP-метод | Описание |
|---|---|---|
| `[HttpGet]` | GET | Получение данных |
| `[HttpPost]` | POST | Создание новых данных |
| `[HttpPut]` | PUT | Обновление существующих данных |
| `[HttpDelete]` | DELETE | Удаление данных |
| `[HttpPatch]` | PATCH | Частичное обновление данных |

### Типы возвращаемых значений

Методы действий могут возвращать различные типы данных, которые преобразуются в `IActionResult`:

| Тип | Описание |
|---|---|
| `void` | Возвращает HTTP-ответ со статусом 200 (OK) без тела ответа. |
| `string` | Возвращает HTTP-ответ со статусом 200 (OK) и строкой в теле ответа. |
| `Object` | Возвращает HTTP-ответ со статусом 200 (OK) и сериализованным объектом в теле ответа. |
| `IActionResult` | Предоставляет доступ к различным методам для формирования ответов, например, `Ok()`, `BadRequest()`, `NotFound()`. |

### Пример:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyWebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static List<string> _products = new List<string> { "Product 1", "Product 2", "Product 3" };

        [HttpGet]
        public IActionResult GetProducts()
        {
            return Ok(_products); // Возвращает список продуктов
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            if (id >= 0 && id < _products.Count)
            {
                return Ok(_products[id]); // Возвращает продукт по индексу
            }
            return NotFound(); // Возвращает 404 Not Found, если продукт не найден
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] string product)
        {
            _products.Add(product);
            return CreatedAtAction(nameof(GetProduct), new { id = _products.Count - 1 }, product); 
            // Возвращает 201 Created и ссылку на созданный продукт
        }
    }
}
```

Это базовый обзор методов действий контроллеров в ASP.NET Core. Более подробно каждый аспект работы с контроллерами и методами действий, включая обработку ошибок, валидацию данных и использование фильтров, будет рассмотрен в следующих разделах руководства. 
