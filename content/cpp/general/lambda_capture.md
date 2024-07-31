## Захват внешних значений в лямбда-выражениях

Лямбда-выражения в C++ являются мощным инструментом для написания компактного и выразительного кода. Одним из ключевых преимуществ лямбда-выражений является их способность захватывать значения переменных из окружающего контекста. 

Захват переменных осуществляется при помощи *списка захвата*, который располагается в начале лямбда-выражения. Список захвата заключается в квадратные скобки `[]` и определяет, какие переменные из окружающего контекста будут доступны внутри лямбда-выражения.

### Виды захвата

C++ поддерживает два основных вида захвата переменных:

1. **Захват по значению:** Переменная копируется в лямбда-выражение. 
2. **Захват по ссылке:** В лямбда-выражение передается ссылка на переменную.

Выбор вида захвата зависит от того, как планируется использовать переменную внутри лямбда-выражения. 

#### Захват по значению

Захват по значению создает копию переменной и помещает ее внутрь лямбда-выражения. Это означает, что изменения переменной внутри лямбда-выражения не повлияют на исходную переменную. 

**Пример:**

```cpp
#include <iostream>

int main() {
  int x = 10;

  // Захват x по значению
  auto lambda = [x]() { 
    std::cout << "x inside lambda: " << x << std::endl; 
    x = 20; // Изменение копии x внутри лямбда-выражения
    std::cout << "x inside lambda (modified): " << x << std::endl; 
  };

  lambda(); // Вызов лямбда-выражения
  std::cout << "x outside lambda: " << x << std::endl; // Значение x осталось прежним

  return 0;
}
```

**Вывод:**

```
x inside lambda: 10
x inside lambda (modified): 20
x outside lambda: 10 
```

#### Захват по ссылке

Захват по ссылке предоставляет доступ к исходной переменной. Любые изменения, сделанные внутри лямбда-выражения, отразятся на исходной переменной.

**Пример:**

```cpp
#include <iostream>

int main() {
  int x = 10;

  // Захват x по ссылке
  auto lambda = [&x]() { 
    std::cout << "x inside lambda: " << x << std::endl; 
    x = 20; // Изменение исходной переменной x 
    std::cout << "x inside lambda (modified): " << x << std::endl; 
  };

  lambda(); // Вызов лямбда-выражения
  std::cout << "x outside lambda: " << x << std::endl; // Значение x изменилось

  return 0;
}
```

**Вывод:**

```
x inside lambda: 10
x inside lambda (modified): 20
x outside lambda: 20 
```

#### Захват всех переменных

Вместо перечисления каждой переменной можно использовать следующие сокращения:

* **`[=]`**: Захват всех используемых переменных по значению.
* **`[&]`**: Захват всех используемых переменных по ссылке.

**Пример:**

```cpp
#include <iostream>

int main() {
  int x = 10;
  int y = 20;

  // Захват x по значению, y по ссылке
  auto lambda = [=, &y]() { 
    std::cout << "x inside lambda: " << x << std::endl; 
    std::cout << "y inside lambda: " << y << std::endl; 
    y = 30;
  };

  lambda();
  std::cout << "x outside lambda: " << x << std::endl; 
  std::cout << "y outside lambda: " << y << std::endl; 

  return 0;
}
```

**Вывод:**

```
x inside lambda: 10
y inside lambda: 20
x outside lambda: 10
y outside lambda: 30 
```

### Захват `this`

При использовании лямбда-выражений внутри класса-члена можно захватить указатель `this`. Это даёт доступ к членам класса внутри лямбда-выражения.

* **`[this]`**: Захватывает указатель `this` по значению.
* **`[*this]`**: Захватывает указатель `this` по ссылке.

**Пример:**

```cpp
#include <iostream>

class MyClass {
public:
  int x;

  MyClass(int val) : x(val) {}

  void printValue() {
    // Захват *this по ссылке
    auto lambda = [*this]() { 
      std::cout << "x inside lambda: " << x << std::endl; 
      x = 42; 
    };

    lambda();
    std::cout << "x inside MyClass: " << x << std::endl;
  }
};

int main() {
  MyClass obj(10);
  obj.printValue();

  return 0;
}
```

**Вывод:**

```
x inside lambda: 10
x inside MyClass: 42
```

## Заключение

Захват внешних значений является мощным инструментом, расширяющим возможности лямбда-выражений. 
Правильный выбор вида захвата -  важный аспект, влияющий на поведение кода и позволяющий эффективно использовать лямбда-выражения в различных ситуациях.