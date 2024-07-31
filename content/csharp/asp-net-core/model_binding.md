## Model Binding в ASP.NET Core 8.0

Model Binding - это мощный механизм в ASP.NET Core, который автоматизирует процесс получения данных из HTTP-запроса и их преобразования в объекты .NET, используемые в вашем коде.  Это избавляет вас от необходимости писать рутинный код для обработки данных форм, параметров маршрутизации и других источников информации в запросе. 

Вместо того, чтобы получать доступ к сырым данным запроса через `Request.Form` или `Request.Query`, вы можете работать с типизированными объектами модели непосредственно в ваших методах действий.

### Как работает Model Binding?

Когда ASP.NET Core получает HTTP-запрос, он:

1. **Выбирает метод действия:** Определяет, какой метод действия должен обработать данный запрос, анализируя маршрут и HTTP-метод.

2. **Запускает Model Binding:** Проверяет параметры метода действия и пытается найти соответствующие данные в запросе.

3. **Заполняет объекты модели:** Создает экземпляры объектов модели и присваивает им значения, извлеченные из запроса.

4. **Вызывает метод действия:** Передает заполненные объекты модели в метод действия в качестве аргументов.

### Источники данных для Model Binding

Model Binding может получать данные из различных частей HTTP-запроса:

* **Параметры маршрута:**  `[Route("products/{id}")]`
* **Строка запроса:**  `https://example.com/products?category=electronics`
* **Тело запроса (Form data):** Используется для отправки данных форм.
* **Заголовки:** `Content-Type`, `Authorization` и др.

### Пример использования Model Binding

Предположим, у нас есть форма для создания нового продукта:

```html
<form method="post">
    <label for="Name">Название:</label>
    <input type="text" id="Name" name="Name" />

    <label for="Price">Цена:</label>
    <input type="number" id="Price" name="Price" />

    <button type="submit">Создать</button>
</form>
```

Создадим класс `Product` для представления продукта:

```csharp
public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

Теперь напишем метод действия, который будет принимать данные формы и создавать новый объект `Product`:

```csharp
[HttpPost]
public IActionResult Create(Product product) 
{
    // product.Name и product.Price будут заполнены данными из формы
    // Сохраняем продукт в базу данных или выполняем другие действия...
    return Ok(product);
}
```

Model Binding автоматически создаст экземпляр `Product`, найдет значения для свойств `Name` и `Price` в теле запроса и передаст заполненный объект `Product` в метод действия.

### Атрибуты Model Binding

ASP.NET Core предоставляет атрибуты, которые позволяют управлять процессом Model Binding:

* **`[FromBody]`**: Указывает, что данные нужно извлекать из тела запроса. Обычно используется для данных в формате JSON.
* **`[FromForm]`**: Указывает, что данные нужно извлекать из данных формы.
* **`[FromQuery]`**: Указывает, что данные нужно извлекать из строки запроса.
* **`[FromRoute]`**: Указывает, что данные нужно извлекать из параметров маршрута.
* **`[BindProperty]`**: Указывает, что свойство модели должно быть связано с данными запроса.

### Пользовательские преобразователи типов

В некоторых случаях вам может потребоваться преобразовать данные из строки в другой тип данных, например, из строки в `DateTime` или `Guid`. Для этого можно использовать пользовательские преобразователи типов.

Пример:

```csharp
public class DateTimeConverter : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        // Получаем значение из запроса
        var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).FirstValue;

        // Преобразуем строку в DateTime
        if (DateTime.TryParse(value, out var dateTime))
        {
            bindingContext.Result = ModelBindingResult.Success(dateTime);
        }
        else
        {
            bindingContext.ModelState.AddModelError(bindingContext.ModelName, "Неверный формат даты.");
        }

        return Task.CompletedTask;
    }
}
```

### Валидация модели

Model Binding тесно интегрирован с валидацией модели. 
Если модель содержит атрибуты валидации, ASP.NET Core автоматически проверит данные после их привязки. 

#### Пример валидации модели

```csharp
public class Product
{
    [Required]
    public string Name { get; set; }
    
    [Range(1, 1000)]
    public decimal Price { get; set; }
}
```

Если данные не пройдут валидацию, свойство `ModelState.IsValid` в контроллере будет равно `false`, и вы сможете обработать ошибки валидации.

Model Binding является важной частью ASP.NET Core, которая упрощает обработку данных HTTP-запроса. 
Понимание принципов его работы поможет вам создавать более эффективные и безопасные веб-приложения. 
