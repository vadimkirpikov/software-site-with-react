## Сопоставление с образцом и классы

Сопоставление с образцом (pattern matching) в Python, представленное в версии 3.10,  - это мощный инструмент для структурного анализа данных. Он позволяет сравнивать объекты не только по их типу, но и по их структуре и содержимому. В этой статье мы рассмотрим, как использовать сопоставление с образцом для работы с классами.

### Основы сопоставления с образцом в классах

Представьте, что у нас есть класс `Point`:

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
```

Мы можем использовать сопоставление с образцом для проверки типа объекта и извлечения его атрибутов:

```python
point = Point(1, 2)

match point:
    case Point(x, y):
        print(f"Это точка с координатами ({x}, {y})")
```

В этом примере `Point(x, y)`  - это **образец**. Он проверяет, является ли `point` объектом класса `Point`. Если да, то значения атрибутов `x` и `y` присваиваются переменным `x` и `y` соответственно.

### Позиционные и именованные атрибуты

В Python можно обращаться к атрибутам объекта как по позиции, так и по имени. Сопоставление с образцом поддерживает оба варианта:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Иван", 30)

match person:
    case Person(n, a): # позиционные аргументы
        print(f"{n}, возраст {a}")
    case Person(name=name, age=age): # именованные аргументы
        print(f"{name}, возраст {age}")
```

### Сопоставление с наследованием

Сопоставление с образцом работает и с наследованием. Предположим, у нас есть базовый класс `Shape` и два подкласса: `Circle` и `Rectangle`:

```python
class Shape:
    pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
```

Мы можем использовать сопоставление с образцом, чтобы определить тип объекта и выполнить соответствующие действия:

```python
shapes = [Circle(5), Rectangle(3, 4)]

for shape in shapes:
    match shape:
        case Circle(r):
            print(f"Круг с радиусом {r}")
        case Rectangle(w, h):
            print(f"Прямоугольник с шириной {w} и высотой {h}")
        case Shape():
            print("Просто фигура")
```

В этом примере мы сначала проверяем, является ли `shape` объектом класса `Circle`. Если нет, то проверяем на `Rectangle`. И наконец, если ни один из предыдущих образцов не совпал, то выполняется ветка `case Shape()`, которая сработает для любого объекта класса `Shape`, не принадлежащего подклассам.

### Использование guards

**Guards**  - это условия, которые позволяют дополнительно ограничивать сопоставление. 

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

products = [Product("Яблоко", 1.0), Product("Груша", 2.5), Product("Арбуз", 0.8)]

for product in products:
    match product:
        case Product(name, price) if price > 1.5: # guard
            print(f"{name} - дорогой продукт")
        case Product(name, price):
            print(f"{name} - доступный продукт")
```

В этом примере guard `if price > 1.5`  проверяет цену продукта. 

### Сопоставление с атрибутами класса

Сопоставление с образцом также позволяет работать с атрибутами класса. Рассмотрим пример:

```python
class Status:
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"

class Task:
    def __init__(self, name, status):
        self.name = name
        self.status = status

task = Task("Задача 1", Status.PENDING)

match task:
    case Task(name, Status.PENDING):
        print(f"Задача '{name}' ожидает выполнения")
    case Task(name, Status.PROCESSING):
        print(f"Задача '{name}' в процессе выполнения")
    case Task(name, Status.COMPLETED):
        print(f"Задача '{name}' выполнена")
```

В этом примере мы используем сопоставление с образцом для проверки статуса задачи. Обратите внимание, что мы можем использовать атрибуты класса (`Status.PENDING`, `Status.PROCESSING`, `Status.COMPLETED`) непосредственно в образцах.

### Заключение

Сопоставление с образцом - это мощный инструмент, который значительно упрощает работу с классами. Оно делает код более читаемым, лаконичным и выразительным. 
