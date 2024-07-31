## std::function<>: Хранение и вызов любых функций

В C++ шаблон `std::function<>` из заголовочного файла `<functional>` представляет собой универсальный обёрточный класс, позволяющий хранить, копировать и вызывать практически любые типы функций: свободные функции, функции-члены, лямбда-выражения и даже другие объекты `std::function`.

### Назначение `std::function`

`std::function` предоставляет унифицированный способ работы с функциями, абстрагируясь от их конкретной реализации. Это особенно полезно в следующих случаях:

- **Передача функций в качестве аргументов:** `std::function` позволяет передавать функции другим функциям или хранить их в контейнерах, подобно любым другим объектам.
- **Реализация обратных вызовов (callbacks):** `std::function` даёт возможность регистрировать функции для последующего вызова при наступлении определённых событий.
- **Создание обобщенных алгоритмов:** Алгоритмы, работающие с `std::function`, могут обрабатывать различные функции без необходимости знать их конкретный тип.

### Объявление `std::function`

Объявление `std::function` имеет следующий вид:

```cpp
std::function<возвращаемый_тип(типы_аргументов)> имя_переменной;
```

- `возвращаемый_тип` - тип данных, возвращаемый функцией.
- `типы_аргументов` - список типов данных аргументов функции, разделённых запятыми.
- `имя_переменной` - имя создаваемого объекта `std::function`.

**Пример:**

```cpp
// Объявление std::function для функции, принимающей int и double, и возвращающей std::string
std::function<std::string(int, double)> func; 
```

### Инициализация и присваивание

`std::function` может быть инициализирован различными типами функций:

- **Свободные функции:**

```cpp
int add(int a, int b) { return a + b; }

std::function<int(int, int)> func = add; // Присваивание адреса функции
```

- **Функции-члены:**

```cpp
class Calculator {
public:
    int multiply(int a, int b) { return a * b; }
};

Calculator calc;
std::function<int(Calculator*, int, int)> func = &Calculator::multiply;
// Вызов функции-члена через объект
func(&calc, 5, 2); 
```

- **Лямбда-выражения:**

```cpp
std::function<int(int)> func = [](int x) { return x * x; };
```

- **Другие объекты `std::function`:**

```cpp
std::function<double(double)> sinFunc = [](double x) { return std::sin(x); };
std::function<double(double)> anotherSinFunc = sinFunc; // Копирование объекта std::function
```

### Вызов функции

Вызов функции, хранящейся в `std::function`, осуществляется с помощью оператора вызова функции `()`:

```cpp
std::function<int(int, int)> addFunc = [](int a, int b) { return a + b; };

int result = addFunc(5, 3); // result = 8
```

### Проверка на пустоту

`std::function` может быть пустым, т.е. не содержать функцию. Проверка на пустоту осуществляется с помощью оператора `bool`:

```cpp
std::function<void()> func;

if (func) {
    func(); // Функция будет вызвана, если не пуста
} else {
    // Обработка пустой функции
}
```

### Пример использования

```cpp
#include <iostream>
#include <functional>
#include <vector>

// Функция для вывода элементов вектора
void printVector(const std::vector<int>& vec) {
    for (int el : vec) {
        std::cout << el << " ";
    }
    std::cout << std::endl;
}

// Функция для умножения элементов вектора на число
void multiplyVector(std::vector<int>& vec, int factor) {
    for (int& el : vec) {
        el *= factor;
    }
}

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5};

    // Создание std::function для функции printVector
    std::function<void(const std::vector<int>&)> printFunc = printVector;
    
    // Вызов функции printVector через std::function
    printFunc(numbers); // Вывод: 1 2 3 4 5

    // Создание std::function для лямбда-выражения, 
    // увеличивающего каждый элемент вектора на 1
    std::function<void(std::vector<int>&)> incrementFunc = [](std::vector<int>& vec) {
        for (int& el : vec) {
            ++el;
        }
    };

    // Вызов лямбда-выражения через std::function
    incrementFunc(numbers); 
    printFunc(numbers); // Вывод: 2 3 4 5 6

    // Вызов функции multiplyVector через std::function
    std::function<void(std::vector<int>&, int)> multiplyFunc = multiplyVector;
    multiplyFunc(numbers, 2);
    printFunc(numbers); // Вывод: 4 6 8 10 12
 
    return 0;
}
```

В данном примере `std::function` используется для хранения и вызова различных типов функций, работающих с вектором целых чисел.

`std::function` - это мощный инструмент C++, обеспечивающий гибкость и выразительность кода при работе с функциями.
