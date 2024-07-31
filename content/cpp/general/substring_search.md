## Поиск подстроки в C++

Поиск подстроки – одна из самых распространенных операций при работе с текстом. В C++ существует несколько способов выполнить поиск подстроки, каждый из которых имеет свои особенности и область применения.

### Алгоритм `std::string::find()`

Функция-член `find()` класса `std::string` является одним из самых простых способов поиска подстроки. Она принимает на вход строку или символ, который нужно найти, и возвращает позицию (индекс) первого вхождения подстроки в строке. Если подстрока не найдена, функция возвращает `std::string::npos`.

**Пример:**

```cpp
#include <iostream>
#include <string>

int main() {
  std::string text = "This is a test string.";
  std::string substring = "test";

  // Ищем подстроку "test"
  size_t position = text.find(substring);

  if (position != std::string::npos) {
    std::cout << "Подстрока найдена на позиции: " << position << std::endl;
  } else {
    std::cout << "Подстрока не найдена." << std::endl;
  }

  return 0;
}
```

**Описание кода:**

1. Объявляем строку `text` и подстроку `substring`.
2. Вызываем функцию `find()` для поиска `substring` в `text`.
3. Проверяем, равна ли позиция `std::string::npos`. Если нет, значит подстрока найдена, и выводим ее позицию. В противном случае выводим сообщение о том, что подстрока не найдена.

**Особенности `std::string::find()`:**

* **Поиск первого вхождения:**  Функция возвращает позицию только первого вхождения подстроки. 
* **Учет регистра:** Поиск чувствителен к регистру.
* **Возвращаемое значение:** Возвращает позицию (индекс) первого символа найденной подстроки или `std::string::npos`, если подстрока не найдена.

**Дополнительные возможности:**

* **Поиск с заданной позиции:** Можно указать начальную позицию для поиска, передав ее вторым аргументом функции `find()`.
* **Поиск символа:** Функция `find()` может использоваться для поиска одного символа, передав его как аргумент.

### Алгоритм `std::search()`

Алгоритм `std::search()` из заголовочного файла `<algorithm>` предоставляет более универсальный способ поиска подстроки. Он может использоваться для поиска любой последовательности элементов в диапазоне, а не только строк.

**Пример:**

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

int main() {
  std::vector<int> data = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  std::vector<int> sub = {4, 5, 6};

  // Ищем подпоследовательность {4, 5, 6}
  auto it = std::search(data.begin(), data.end(), sub.begin(), sub.end());

  if (it != data.end()) {
    std::cout << "Подпоследовательность найдена, начиная с позиции: " 
              << std::distance(data.begin(), it) << std::endl;
  } else {
    std::cout << "Подпоследовательность не найдена." << std::endl;
  }

  return 0;
}
```

**Описание кода:**

1. Объявляем вектор `data` и подпоследовательность `sub`.
2. Вызываем алгоритм `std::search()`, передавая диапазоны начала и конца вектора и подпоследовательности.
3. Проверяем, найден ли диапазон. Если `it` не равен `data.end()`, то подпоследовательность найдена. 
4. Выводим позицию первого элемента найденной подпоследовательности с помощью `std::distance()`.

**Особенности `std::search()`:**

* **Универсальность:** Работает с любыми типами данных, поддерживающими оператор сравнения `==`.
* **Возвращаемое значение:** Возвращает итератор, указывающий на начало найденной подпоследовательности, или итератор конца диапазона, если подпоследовательность не найдена.

### Выбор алгоритма

Выбор алгоритма для поиска подстроки зависит от конкретной задачи:

* Для простого поиска первого вхождения строки используйте `std::string::find()`.
* Для поиска подпоследовательности в диапазоне данных используйте `std::search()`.

В C++ существует множество других способов поиска подстрок, которые не рассмотрены в этой статье. Например, алгоритмы `std::find_first_of()`, `std::find_end()`, `std::search_n()` и регулярные выражения (regex). Выбор наиболее эффективного метода зависит от конкретной задачи и требований к производительности.