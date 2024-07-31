## Полиморфизм и интерфейсы в C# 12

Полиморфизм, что в переводе с греческого означает "много форм", является одним из ключевых принципов объектно-ориентированного программирования (ООП). В C# он реализуется через наследование и интерфейсы. 

**Наследование** позволяет создавать новые классы на основе уже существующих, наследуя их данные и поведение. **Полиморфизм** же позволяет использовать объекты разных классов через общий интерфейс, что делает код более гибким и расширяемым.

**Интерфейсы** в C# определяют контракт, которому должны соответствовать классы, реализующие его. Они содержат объявления методов, свойств, индексаторов и событий, но не их реализацию. 

### Использование интерфейсов

Объявление интерфейса напоминает объявление класса, но вместо ключевого слова `class` используется `interface`:

```csharp
public interface IShape
{
    double GetArea();
}
```

В этом примере объявлен интерфейс `IShape` с одним методом `GetArea()`, который возвращает площадь фигуры.

Для реализации интерфейса классом используется двоеточие (`:`) после имени класса и затем имя интерфейса:

```csharp
public class Circle : IShape
{
    public double Radius { get; set; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public double GetArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public double GetArea()
    {
        return Width * Height;
    }
}
```

Классы `Circle` и `Rectangle` реализуют интерфейс `IShape`, предоставляя свою реализацию метода `GetArea()`.

### Преимущества использования интерфейсов

* **Полиморфизм:** Можно использовать объекты разных классов через общий интерфейс.
* **Слабая связанность:** Код, работающий с интерфейсами, не зависит от конкретных реализаций.
* **Расширяемость:** Легко добавлять новые классы, реализующие интерфейс, без изменения существующего кода.

### Пример использования полиморфизма и интерфейсов

```csharp
using System;

public interface IShape
{
    double GetArea();
}

public class Circle : IShape
{
    public double Radius { get; set; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public double GetArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public double GetArea()
    {
        return Width * Height;
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        // Создание списка фигур
        List<IShape> shapes = new List<IShape>();
        shapes.Add(new Circle(5));
        shapes.Add(new Rectangle(4, 6));

        // Вычисление и вывод площади каждой фигуры
        foreach (IShape shape in shapes)
        {
            Console.WriteLine($"Площадь фигуры: {shape.GetArea()}");
        }
    }
}
```

В этом примере создается список `shapes`, содержащий объекты типов `Circle` и `Rectangle`, которые реализуют интерфейс `IShape`. Благодаря полиморфизму можно вызывать метод `GetArea()` для каждого объекта в списке, не зная его конкретного типа. 

В следующих разделах руководства мы подробнее рассмотрим различные аспекты полиморфизма, наследования и интерфейсов в C#.
