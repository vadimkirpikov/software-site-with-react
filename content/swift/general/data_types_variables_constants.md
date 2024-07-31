## Типы данных, переменные и константы в Swift 5.9

Язык программирования Swift предоставляет разработчику мощные инструменты для работы с данными. В основе этой работы лежат типы данных, переменные и константы, которые определяют, как данные будут храниться и использоваться в программе. 

### Типы данных

Тип данных определяет, какие значения может принимать переменная или константа, а также какие операции можно с ними выполнять. Swift предлагает богатый набор встроенных типов данных, которые можно разделить на несколько категорий:

1. **Целочисленные типы:**

   * `Int`: Целые числа со знаком. Используйте этот тип по умолчанию для целых чисел.
   * `UInt`: Целые числа без знака.
   * `Int8`, `Int16`, `Int32`, `Int64`: Целые числа со знаком определенной разрядности.
   * `UInt8`, `UInt16`, `UInt32`, `UInt64`: Целые числа без знака определенной разрядности.

2. **Числа с плавающей точкой:**

   * `Float`: 32-битное число с плавающей точкой.
   * `Double`: 64-битное число с плавающей точкой. Используйте этот тип по умолчанию для чисел с плавающей точкой.

3. **Логический тип:**

   * `Bool`: Может принимать два значения: `true` (истина) или `false` (ложь).

4. **Символы и строки:**

   * `Character`: Одиночный символ Unicode.
   * `String`: Последовательность символов Unicode.

5. **Коллекции:**

   * `Array`: Упорядоченная коллекция значений одного типа.
   * `Set`: Неупорядоченная коллекция уникальных значений одного типа.
   * `Dictionary`: Неупорядоченная коллекция пар "ключ-значение".

6. **Опционалы:**

   * `Optional`: Тип, который может содержать значение определенного типа или быть пустым (`nil`).

### Переменные и константы

Для хранения данных в программе используются переменные и константы. 

* **Переменная**: Именованный контейнер для хранения данных, значение которого можно изменять в процессе выполнения программы. 
* **Константа**: Именованный контейнер для хранения данных, значение которого нельзя изменить после инициализации.

### Объявление переменных и констант

Для объявления переменных используется ключевое слово `var`, а для объявления констант - `let`. 

```swift
// Объявление переменной age типа Int
var age: Int = 25

// Объявление константы name типа String
let name: String = "John"
```

В этом примере мы объявили переменную `age` типа `Int` и присвоили ей значение `25`. Также мы объявили константу `name` типа `String` и присвоили ей значение `"John"`.

### Вывод типа

Swift поддерживает вывод типа, что означает, что компилятор может определить тип переменной или константы автоматически на основе присвоенного значения.

```swift
// Компилятор определит тип переменной как Int
var number = 10

// Компилятор определит тип константы как String
let message = "Hello, world!"
```

### Изменение значений

Значение переменной можно изменить в любой момент после ее объявления:

```swift
var score = 100
score = 200 // Изменяем значение переменной score на 200
```

Попытка изменить значение константы приведет к ошибке компиляции:

```swift
let pi = 3.14159
pi = 3.14 // Ошибка: нельзя изменять значение константы
```

### Интерполяция строк

Интерполяция строк позволяет встраивать значения переменных и констант внутрь строк. 

```swift
let name = "Alice"
let greeting = "Привет, \(name)!"

print(greeting) // Вывод: Привет, Alice!
```

В этом примере мы использовали интерполяцию строк, чтобы встроить значение константы `name` внутрь строки `greeting`.

### Примеры использования

```swift
// Вычисление площади круга
let radius = 5.0
let area = 3.14159 * radius * radius
print("Площадь круга с радиусом \(radius) равна \(area)")

// Проверка пароля
let correctPassword = "password123"
let enteredPassword = "password123"

if enteredPassword == correctPassword {
  print("Доступ разрешен")
} else {
  print("Неверный пароль")
}
```

### Заключение

Понимание типов данных, переменных и констант является фундаментальным для работы с языком Swift. Используйте полученные знания для создания эффективного и безопасного кода.