## Продвинутые возможности LINQ

В этой части руководства мы углубимся в более продвинутые возможности LINQ (Language Integrated Query), которые позволят вам писать более выразительный и эффективный код для работы с данными. 

### Пользовательские типы-делегаты

LINQ широко использует делегаты для определения условий выборки, преобразований и других операций. C# предлагает удобные способы определения типов-делегатов с помощью ключевого слова `delegate`, а также с помощью `Func` и `Action`.

```C#
// Определение делегата с помощью ключевого слова "delegate"
public delegate bool FilterDelegate(int number);

// Определение делегата с помощью "Func"
Func<int, bool> isEven = number => number % 2 == 0; 

// Использование делегатов в LINQ
int[] numbers = { 1, 2, 3, 4, 5 };
var evenNumbers = numbers.Where(isEven); 
```

В этом примере `isEven` является делегатом типа `Func<int, bool>`, который принимает целочисленное значение и возвращает логическое значение, указывающее, является ли число четным.

### Выражения запросов (Query Expressions)

LINQ предоставляет два синтаксиса для написания запросов: *методы расширения* и *выражения запросов*. Выражения запросов напоминают SQL-запросы и могут быть более удобны для чтения, особенно при работе со сложными запросами.

```C#
// Пример выражения запроса
var query = from product in products
            where product.Price > 100
            orderby product.Name descending
            select new { product.Name, product.Price };
```

Этот запрос выбирает все продукты, цена которых превышает 100, сортирует их по убыванию имени и возвращает анонимный тип, содержащий имя и цену каждого продукта.

### Отложенное выполнение (Deferred Execution)

LINQ-запросы выполняются не сразу, а только тогда, когда происходит фактическое обращение к результатам запроса. Это называется отложенным выполнением. Отложенное выполнение позволяет оптимизировать производительность, так как LINQ может объединять несколько операций в один проход по данным.

```C#
// Пример отложенного выполнения
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var query = numbers.Where(n => n % 2 == 0); // Запрос не выполняется здесь

numbers.Add(6); // Добавление элемента в коллекцию

foreach (var number in query) // Запрос выполняется здесь
{
    Console.WriteLine(number); // Вывод: 2, 4, 6
}
```

### Немедленное выполнение (Immediate Execution)

Иногда может потребоваться выполнить запрос немедленно и получить результат в виде конкретного типа данных. Для этого LINQ предоставляет методы, такие как `ToList`, `ToArray` и `ToDictionary`, которые форсируют немедленное выполнение запроса.

```C#
// Пример немедленного выполнения
var evenNumbers = numbers.Where(n => n % 2 == 0).ToList(); // Запрос выполняется здесь
```

### Агрегатные функции

LINQ предоставляет набор агрегатных функций, таких как `Count`, `Sum`, `Average`, `Min` и `Max`, которые позволяют выполнять вычисления над коллекциями данных.

```C#
// Пример использования агрегатных функций
int[] numbers = { 1, 2, 3, 4, 5 };

int count = numbers.Count(); // 5
int sum = numbers.Sum(); // 15
double average = numbers.Average(); // 3
int min = numbers.Min(); // 1
int max = numbers.Max(); // 5
```

### Группировка (GroupBy)

Оператор `GroupBy` позволяет группировать элементы коллекции по заданному ключу.

```C#
// Пример использования GroupBy
var products = new List<Product>
{
    new Product { Name = "Apple", Category = "Fruit", Price = 1.00m },
    new Product { Name = "Banana", Category = "Fruit", Price = 0.50m },
    new Product { Name = "Milk", Category = "Dairy", Price = 2.00m },
    new Product { Name = "Cheese", Category = "Dairy", Price = 3.00m }
};

var groupedProducts = products.GroupBy(p => p.Category);

foreach (var group in groupedProducts)
{
    Console.WriteLine(group.Key); // Название категории

    foreach (var product in group)
    {
        Console.WriteLine($"\t{product.Name} - {product.Price:C}");
    }
}
```

### Соединение (Join)

Операторы `Join` и `GroupJoin` позволяют объединять данные из разных коллекций по заданному условию.

```C#
// Пример использования Join
var customers = new List<Customer>
{
    new Customer { Id = 1, Name = "John Doe" },
    new Customer { Id = 2, Name = "Jane Doe" }
};

var orders = new List<Order>
{
    new Order { CustomerId = 1, Product = "Apple", Quantity = 2 },
    new Order { CustomerId = 1, Product = "Banana", Quantity = 1 },
    new Order { CustomerId = 2, Product = "Milk", Quantity = 3 }
};

var customerOrders = customers.Join(orders,
                                  c => c.Id,
                                  o => o.CustomerId,
                                  (c, o) => new { c.Name, o.Product, o.Quantity });

foreach (var item in customerOrders)
{
    Console.WriteLine($"{item.Name} - {item.Product} ({item.Quantity})");
}
```

### Проекция (SelectMany)

Оператор `SelectMany` используется для проецирования каждого элемента коллекции в новую коллекцию, а затем объединения всех полученных коллекций в одну.

```C#
// Пример использования SelectMany
var students = new List<Student>
{
    new Student { Name = "Alice", Courses = new List<string> { "Math", "Physics" } },
    new Student { Name = "Bob", Courses = new List<string> { "Chemistry", "Biology" } }
};

var allCourses = students.SelectMany(s => s.Courses);

foreach (var course in allCourses)
{
    Console.WriteLine(course);
}
```

Это лишь некоторые из продвинутых возможностей LINQ, доступных в C#. Осваивая эти возможности, вы сможете писать более лаконичный, выразительный и эффективный код для работы с данными. 
