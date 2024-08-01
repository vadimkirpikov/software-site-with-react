## Инкапсуляция, атрибуты и свойства в Python

Инкапсуляция — один из ключевых принципов объектно-ориентированного программирования (ООП). В Python инкапсуляция реализуется через сокрытие данных и методов внутри класса, контролируя доступ к ним извне. Это достигается использованием атрибутов и свойств.

### Атрибуты

Атрибуты - это переменные, связанные с объектом. В Python атрибуты бывают двух типов:

- **Атрибуты экземпляра класса:**  уникальны для каждого объекта класса.
- **Атрибуты класса:**  общие для всех объектов класса.

Рассмотрим пример:

```python
class Dog:
    kind = "млекопитающее"  # Атрибут класса

    def __init__(self, name, breed):
        self.name = name  # Атрибут экземпляра класса
        self.breed = breed  # Атрибут экземпляра класса

sparky = Dog("Sparky", "Golden Retriever")
buddy = Dog("Buddy", "Labrador")

print(sparky.name)  # Вывод: Sparky
print(buddy.breed)  # Вывод: Labrador
print(sparky.kind)  # Вывод: млекопитающее
print(Dog.kind)  # Вывод: млекопитающее
```

В этом примере `name` и `breed` — атрибуты экземпляра класса, уникальные для каждого объекта `Dog`. `kind` является атрибутом класса, общим для всех объектов `Dog`.

### Сокрытие данных

Python не имеет строгой реализации сокрытия данных, как некоторые другие языки программирования. Однако, существует соглашение об использовании префикса подчеркивания `_` для обозначения атрибутов, которые не предназначены для прямого доступа извне класса. 

Рассмотрим пример:

```python
class BankAccount:
    def __init__(self, initial_balance):
        self._balance = initial_balance  # Приватный атрибут

    def deposit(self, amount):
        self._balance += amount

    def withdraw(self, amount):
        if self._balance >= amount:
            self._balance -= amount
        else:
            print("Недостаточно средств.")

    def get_balance(self):
        return self._balance

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())  # Вывод: 1500

# Прямой доступ к "приватному" атрибуту (не рекомендуется)
print(account._balance)  # Вывод: 1500
```

В этом примере атрибут `_balance` считается "приватным".  Хотя технически можно получить к нему доступ напрямую ( `account._balance` ), это нарушает принцип инкапсуляции и может привести к ошибкам в коде.

### Свойства (`@property`)

Свойства в Python предоставляют контролируемый доступ к атрибутам класса. Они позволяют определять методы, которые вызываются при чтении, записи или удалении атрибута.

Для создания свойства используется декоратор `@property`. Рассмотрим пример:

```python
class Student:
    def __init__(self, name, grades):
        self.name = name
        self._grades = grades  # Приватный атрибут

    @property
    def average_grade(self):
        """Возвращает средний балл студента."""
        return sum(self._grades) / len(self._grades)

    @property
    def grades(self):
        return self._grades

    @grades.setter
    def grades(self, new_grades):
        if all(0 <= grade <= 100 for grade in new_grades):
            self._grades = new_grades
        else:
            raise ValueError("Баллы должны быть в диапазоне от 0 до 100.")

student = Student("Иван", [80, 90, 75])
print(student.average_grade)  # Вывод: 81.67

print(student.grades)  # Вывод: [80, 90, 75]
student.grades = [95, 85, 90]
print(student.grades)  # Вывод: [95, 85, 90]

try:
    student.grades = [100, 105]
except ValueError as e:
    print(e)  # Вывод: Баллы должны быть в диапазоне от 0 до 100.
```

В этом примере:

- `average_grade` - свойство только для чтения,  возвращающее средний балл студента.
- `grades` - свойство с методами `getter` and `setter`:
    -  `@property def grades(self):`  -  `getter` для получения значений 
    -  `@grades.setter def grades(self, new_grades):` -  `setter` для установки новых значений с валидацией.

Использование свойств делает код более чистым, безопасным и удобным в поддержке. 
