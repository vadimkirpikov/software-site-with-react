## Модели в ASP.NET Core

Модели в ASP.NET Core играют ключевую роль в представлении данных вашего приложения.  Они выступают посредниками между хранилищем данных, бизнес-логикой и представлениями, отображаемыми пользователю. 

### Создание моделей

Модель в ASP.NET Core представляет собой обычный C# класс.  Создадим простую модель `Product` для интернет-магазина:

```csharp
public class Product
{
    public int Id { get; set; } // Идентификатор продукта
    public string Name { get; set; } // Название продукта
    public decimal Price { get; set; } // Цена продукта
}
```

Этот код определяет класс `Product` с тремя свойствами:

* `Id`:  Целочисленный идентификатор продукта.
* `Name`:  Строковое название продукта.
* `Price`: Десятичное значение цены продукта.

### Использование моделей в контроллерах

Модели используются в контроллерах для взаимодействия с данными. Рассмотрим пример контроллера `ProductsController`:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static List<Product> _products = new List<Product>
        {
            new Product { Id = 1, Name = "Ноутбук", Price = 70000 },
            new Product { Id = 2, Name = "Монитор", Price = 15000 }
        };

        // GET: api/products
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _products;
        }

        // GET: api/products/1
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            return _products.Find(p => p.Id == id);
        }
    }
}
```

В этом примере:

* `_products` - это статический список продуктов, используемый для демонстрации. В реальном приложении данные обычно хранятся в базе данных.
* Метод `Get()` возвращает все продукты.
* Метод `Get(int id)` возвращает продукт с указанным идентификатором.

### Валидация моделей

Валидация данных - важный аспект разработки. ASP.NET Core предоставляет атрибуты для валидации моделей. Добавьте следующий код в модель `Product`:

```csharp
using System.ComponentModel.DataAnnotations;

public class Product
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Название продукта обязательно")] // Проверка на заполненность
    public string Name { get; set; } 

    [Range(1, double.MaxValue, ErrorMessage = "Цена должна быть больше нуля")] // Проверка диапазона
    public decimal Price { get; set; } 
}
```

Атрибуты `[Required]` и `[Range]` обеспечивают базовую валидацию. 

### Использование моделей в представлениях

Модели используются в представлениях для отображения данных пользователю. Создайте представление `Index.cshtml`:

```html
@model IEnumerable<MyApp.Models.Product> 

<h2>Список товаров</h2>
<table>
    <thead>
        <tr>
            <th>Название</th>
            <th>Цена</th>
        </tr>
    </thead>
    <tbody>
        @foreach (var product in Model)
        {
            <tr>
                <td>@product.Name</td>
                <td>@product.Price</td>
            </tr>
        }
    </tbody>
</table>
```

В этом примере:

* `@model` задает тип модели для представления.
* `@foreach` перебирает коллекцию продуктов.

### Заключение

Модели являются неотъемлемой частью разработки приложений ASP.NET Core. Они упрощают работу с данными, обеспечивают валидацию и взаимодействие между различными частями приложения. 
