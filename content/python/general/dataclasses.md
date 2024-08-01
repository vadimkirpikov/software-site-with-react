## Модуль dataclasses. Data-классы

Модуль `dataclasses` в Python предоставляет декоратор и функции для создания data-классов. Data-классы - это классы, основное назначение которых - хранение данных. Модуль `dataclasses` автоматизирует создание шаблонного кода, такого как методы `__init__`, `__repr__`, `__eq__` и другие, что упрощает и ускоряет разработку.

### Создание data-класса

Для создания data-класса используется декоратор `@dataclass`. 

```python
from dataclasses import dataclass

@dataclass
class User:
    name: str
    age: int
    is_active: bool = True  # Значение по умолчанию
```

В этом примере мы создали data-класс `User` с тремя полями: `name`, `age` и `is_active`.  Тип данных каждого поля указывается с помощью аннотации типов. Поле `is_active` имеет значение по умолчанию `True`.

### Создание экземпляра data-класса

Создание экземпляра data-класса аналогично созданию экземпляра обычного класса.

```python
user1 = User("Иван", 30)
user2 = User("Мария", 25, False)

print(user1)  # Вывод: User(name='Иван', age=30, is_active=True)
print(user2)  # Вывод: User(name='Мария', age=25, is_active=False)
```

### Доступ к полям data-класса

Доступ к полям data-класса осуществляется как к атрибутам объекта.

```python
print(user1.name)  # Вывод: Иван
print(user2.age)   # Вывод: 25
```

### Изменение полей data-класса

Поля data-класса можно изменять после создания экземпляра.

```python
user1.age = 31
print(user1)  # Вывод: User(name='Иван', age=31, is_active=True)
```

### Методы data-классов

Декоратор `@dataclass` автоматически генерирует ряд методов для data-классов, включая:

* `__init__()`: Конструктор класса, инициализирующий поля объекта.
* `__repr__()`: Возвращает строковое представление объекта.
* `__eq__()`: Сравнивает два объекта на равенство.
* `__lt__()`, `__le__()`, `__gt__()`, `__ge__()`: Реализуют операции сравнения.

### Настройка поведения data-классов

Декоратор `@dataclass` принимает ряд аргументов для настройки поведения data-классов:

| Аргумент | Описание |
|---|---|
| `init` | Генерировать метод `__init__` (по умолчанию `True`). |
| `repr` | Генерировать метод `__repr__` (по умолчанию `True`). |
| `eq` | Генерировать методы сравнения на равенство (по умолчанию `True`). |
| `order` | Генерировать методы сравнения порядка (по умолчанию `False`). |
| `frozen` | Создать неизменяемый data-класс (по умолчанию `False`). |

### Неизменяемые data-классы

Для создания неизменяемого data-класса используется аргумент `frozen=True` декоратора `@dataclass`. В этом случае попытка изменить поле объекта вызовет ошибку.

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class ImmutableUser:
    name: str
    age: int

user = ImmutableUser("Петр", 40)

user.age = 41  # Вызовет ошибку FrozenInstanceError
```

### Наследование data-классов

Data-классы можно наследовать как обычные классы. При этом дочерние классы наследуют все поля и методы родительских классов.

```python
from dataclasses import dataclass

@dataclass
class Vehicle:
    brand: str
    model: str

@dataclass
class Car(Vehicle):
    doors: int

car = Car("Toyota", "Corolla", 4)
print(car)  # Вывод: Car(brand='Toyota', model='Corolla', doors=4)
```

### Использование функций модуля dataclasses

Модуль `dataclasses` предоставляет ряд функций для работы с data-классами:

* `fields(cls)`: Возвращает кортеж полей data-класса.
* `asdict(instance)`: Преобразует data-класс в словарь.
* `astuple(instance)`: Преобразует data-класс в кортеж.
* `replace(instance, **changes)`: Создает новый экземпляр data-класса с измененными полями.

### Пример использования

```python
from dataclasses import dataclass, asdict

@dataclass
class Point:
    x: int
    y: int

point = Point(10, 20)

# Преобразование в словарь
point_dict = asdict(point)
print(point_dict)  # Вывод: {'x': 10, 'y': 20}
```

### Заключение

Модуль `dataclasses` значительно упрощает создание классов, предназначенных для хранения данных. Он автоматизирует создание шаблонного кода, позволяя разработчикам сосредоточиться на логике приложения.
