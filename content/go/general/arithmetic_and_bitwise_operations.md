## Арифметические и поразрядные операции в Golang

Язык программирования Golang предоставляет набор операторов для выполнения арифметических и поразрядных операций над числовыми данными. Эти операции являются основополагающими для многих программных задач, от простых математических вычислений до сложных алгоритмов.

### Арифметические операции

Арифметические операторы используются для выполнения основных математических операций, таких как сложение, вычитание, умножение и деление.

| Оператор | Описание  | Пример | Результат |
|---|---|---|---|
| `+` | Сложение | `2 + 3` | `5` |
| `-` | Вычитание | `5 - 2` | `3` |
| `*` | Умножение | `2 * 3` | `6` |
| `/` | Деление | `6 / 2` | `3` |
| `%` | Остаток от деления | `7 % 3` | `1` |

**Пример кода:**

```go
package main

import "fmt"

func main() {
    a := 10
    b := 3

    // Сложение
    sum := a + b
    fmt.Println("Сумма:", sum) // Вывод: Сумма: 13

    // Вычитание
    difference := a - b
    fmt.Println("Разность:", difference) // Вывод: Разность: 7

    // Умножение
    product := a * b
    fmt.Println("Произведение:", product) // Вывод: Произведение: 30

    // Деление
    quotient := a / b
    fmt.Println("Частное:", quotient) // Вывод: Частное: 3

    // Остаток от деления
    remainder := a % b
    fmt.Println("Остаток:", remainder) // Вывод: Остаток: 1
}
```

### Поразрядные операции

Поразрядные операторы работают с отдельными битами чисел.  Эти операции особенно полезны при работе с флагами, настройками и низкоуровневым программировании.

| Оператор | Описание  | Пример | Результат (в двоичном виде) |
|---|---|---|---|
| `&` | Поразрядное И | `5 & 3` | `0101 & 0011 = 0001` (1 в десятичном) |
| `\|` | Поразрядное ИЛИ | `5 \| 3` | `0101 \| 0011 = 0111` (7 в десятичном) |
| `^` | Поразрядное исключающее ИЛИ | `5 ^ 3` | `0101 ^ 0011 = 0110` (6 в десятичном) |
| `&^` | Поразрядное И НЕ | `5 &^ 3` | `0101 &^ 0011 = 0100` (4 в десятичном) |
| `<<` | Сдвиг влево | `5 << 2` | `0101 << 2 = 010100` (20 в десятичном) |
| `>>` | Сдвиг вправо | `5 >> 1` | `0101 >> 1 = 0010` (2 в десятичном) |

**Пример кода:**

```go
package main

import "fmt"

func main() {
    x := 10 // 1010 в двоичном виде
    y := 3  // 0011 в двоичном виде

    // Поразрядное И
    fmt.Println(x & y) // Вывод: 2 (0010 в двоичном виде)

    // Поразрядное ИЛИ
    fmt.Println(x | y) // Вывод: 11 (1011 в двоичном виде)

    // Поразрядное исключающее ИЛИ
    fmt.Println(x ^ y) // Вывод: 9 (1001 в двоичном виде)

    // Поразрядное И НЕ
    fmt.Println(x &^ y) // Вывод: 8 (1000 в двоичном виде)

    // Сдвиг влево
    fmt.Println(x << 2) // Вывод: 40 (101000 в двоичном виде)

    // Сдвиг вправо
    fmt.Println(x >> 1) // Вывод: 5 (0101 в двоичном виде)
}
```

### Приоритет операторов

В Golang, как и в математике, операторы имеют разный приоритет.  Приоритет определяет порядок выполнения операций в выражении. Например, умножение и деление имеют более высокий приоритет, чем сложение и вычитание.

Вы можете использовать скобки для изменения порядка выполнения операций. Операции в скобках всегда выполняются первыми.

### Заключение

Арифметические и поразрядные операции являются фундаментальными инструментами в программировании на Golang. Понимание их работы и приоритета позволит вам писать эффективный и читаемый код. 