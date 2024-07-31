## std::optional<T>: управление присутствием значения

В C++, работая с функциями и методами, часто возникает необходимость обозначить, что возвращаемое значение может отсутствовать. Например, функция поиска элемента в коллекции может не найти подходящий элемент. В таких случаях традиционно использовались специальные значения, такие как `-1` для числовых типов или `nullptr` для указателей. Однако такой подход имеет ряд недостатков:

* **Неявность:** использование специальных значений не всегда очевидно и может привести к ошибкам, если программист забудет проверить их наличие.
* **Ограниченность:** не все типы данных имеют подходящие специальные значения, которые можно использовать для обозначения отсутствия значения.
* **Потеря информации:** использование специального значения не позволяет передать дополнительную информацию о причине отсутствия значения.

Для решения этих проблем стандарт C++20 предлагает использовать тип `std::optional<T>`. 

### Что такое std::optional<T>?

`std::optional<T>` - это шаблонный класс, который представляет собой контейнер, который может либо хранить значение типа `T`, либо быть пустым. 

**Подключение заголовочного файла:**

```cpp
#include <optional>
```

### Создание std::optional

**1. Создание пустого объекта `std::optional`:**

```cpp
std::optional<int> emptyOptional; // Пустой optional<int>
```

**2. Создание объекта `std::optional` со значением:**

```cpp
std::optional<int> valueOptional = 42; // optional<int> со значением 42
```

**3. Использование конструктора `std::nullopt`:**

```cpp
std::optional<int> nullOptional = std::nullopt; // Пустой optional<int>
```

### Проверка наличия значения

Для проверки, содержит ли `std::optional` значение, используются операторы `operator bool()` и `operator!=`

```cpp
std::optional<int> maybeValue = 10;

if (maybeValue) { 
  // Выполнится, так как maybeValue содержит значение
  std::cout << "Значение: " << *maybeValue << std::endl;
} else {
  std::cout << "Значение отсутствует" << std::endl; 
}

if (maybeValue != std::nullopt) {
  // Выполнится, так как maybeValue содержит значение
  std::cout << "Значение: " << *maybeValue << std::endl;
} else {
  std::cout << "Значение отсутствует" << std::endl; 
}
```

### Доступ к значению

**1. Оператор разыменования `*`:**

```cpp
std::optional<double> maybePi = 3.1415;
if (maybePi) {
  double pi = *maybePi; // Доступ к значению
  std::cout << "Pi: " << pi << std::endl;
}
```

**2. Метод `value()`:**

```cpp
std::optional<std::string> maybeName = "Alice";
if (maybeName) {
  std::string name = maybeName.value(); // Доступ к значению
  std::cout << "Name: " << name << std::endl;
}
```

**Важно:** использование оператора разыменования `*` и метода `value()` без предварительной проверки наличия значения приведет к исключению `std::bad_optional_access`.

**3. Метод `value_or()`:**

Позволяет получить значение `std::optional` или значение по умолчанию, если `std::optional` пуст.

```cpp
std::optional<int> maybeAge;
int age = maybeAge.value_or(18); // age будет равно 18
```

### Пример использования

Рассмотрим пример функции, которая ищет значение в векторе и возвращает его индекс, если значение найдено, или `std::nullopt`, если значение не найдено:

```cpp
#include <iostream>
#include <optional>
#include <vector>

std::optional<size_t> find_index(const std::vector<int>& vec, int value) {
  for (size_t i = 0; i < vec.size(); ++i) {
    if (vec[i] == value) {
      return i; // Возвращаем индекс найденного элемента
    }
  }
  return std::nullopt; // Значение не найдено
}

int main() {
  std::vector<int> numbers = {1, 5, 10, 15, 20};

  std::optional<size_t> index1 = find_index(numbers, 10); 
  if (index1) {
    std::cout << "Индекс элемента 10: " << *index1 << std::endl;
  } else {
    std::cout << "Элемент 10 не найден" << std::endl;
  }

  std::optional<size_t> index2 = find_index(numbers, 30);
  if (index2) {
    std::cout << "Индекс элемента 30: " << *index2 << std::endl;
  } else {
    std::cout << "Элемент 30 не найден" << std::endl;
  }

  return 0;
}
```

В этом примере функция `find_index` возвращает `std::optional<size_t>`. Если значение найдено, `std::optional` будет содержать индекс элемента. Если значение не найдено, `std::optional` будет пустым. 

Использование `std::optional<T>` делает код более выразительным и безопасным, явно указывая на возможность отсутствия значения и предоставляя механизмы для его проверки. 
