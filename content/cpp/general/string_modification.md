## Изменение строк в C++

Строки являются фундаментальным типом данных в программировании, и C++ предоставляет широкие возможности для их изменения. В этой статье мы рассмотрим основные способы модификации строк, используя стандарт C++20.

### Базовые операции

Стандартная библиотека C++ предоставляет ряд готовых функций для работы со строками (`std::string`). Начнем с базовых операций:

#### Добавление символов и строк

* **`push_back(char c)`**: добавляет символ `c` в конец строки.
* **`append(const string& str)`**: добавляет строку `str` в конец текущей строки.
* **`operator+=`**: аналогичен `append`, но короче в записи.

```cpp
#include <iostream>
#include <string>

int main() {
  std::string str = "Hello";
  
  str.push_back(','); // Добавляем запятую
  str += " world";   // Добавляем " world"
  
  std::cout << str << std::endl; // Вывод: Hello, world
  return 0;
}
```

#### Вставка символов и строк

* **`insert(size_t pos, const string& str)`**: вставляет строку `str` в позицию `pos` текущей строки.
* **`insert(size_t pos, char c)`**: вставляет символ `c` в позицию `pos` текущей строки.

```cpp
#include <iostream>
#include <string>

int main() {
  std::string str = "Hello world";
  
  str.insert(5, ", "); // Вставляем ", " после "Hello"
  
  std::cout << str << std::endl; // Вывод: Hello, world
  return 0;
}
```

#### Удаление символов и подстрок

* **`erase(size_t pos, size_t len)`**: удаляет `len` символов, начиная с позиции `pos`.
* **`pop_back()`**: удаляет последний символ строки.

```cpp
#include <iostream>
#include <string>

int main() {
  std::string str = "Hello, world!";
  
  str.erase(5, 2); // Удаляем ", "
  str.pop_back();   // Удаляем "!"
  
  std::cout << str << std::endl; // Вывод: Hello world
  return 0;
}
```

### Поиск и замена подстрок

Часто требуется найти определенную подстроку в строке и, возможно, заменить ее на другую. 

* **`find(const string& str, size_t pos = 0)`**: ищет первое вхождение подстроки `str` в текущей строке, начиная с позиции `pos`. Возвращает позицию найденной подстроки или `string::npos`, если подстрока не найдена.
* **`rfind(const string& str, size_t pos = npos)`**: ищет последнее вхождение подстроки `str` в текущей строке, начиная с позиции `pos` (по умолчанию - конец строки).
* **`replace(size_t pos, size_t len, const string& str)`**: заменяет `len` символов, начиная с позиции `pos`, на строку `str`.

```cpp
#include <iostream>
#include <string>

int main() {
  std::string str = "Hello, world! Hello!";
  
  size_t pos = str.find("world"); // Находим позицию "world"
  if (pos != std::string::npos) {
    str.replace(pos, 5, "C++"); // Заменяем "world" на "C++"
  }
  
  std::cout << str << std::endl; // Вывод: Hello, C++! Hello!
  return 0;
}
```

### Работа с отдельными символами

Для доступа к отдельным символам строки можно использовать оператор индексации `[]`:

```cpp
#include <iostream>
#include <string>

int main() {
  std::string str = "Hello";
  
  str[0] = 'h'; // Заменяем 'H' на 'h'
  
  std::cout << str << std::endl; // Вывод: hello
  return 0;
}
```

### Дополнительные возможности

Стандартная библиотека C++ предлагает и другие функции для работы со строками, например:

* **`substr(size_t pos, size_t len)`**: возвращает подстроку, начиная с позиции `pos` длиной `len`.
* **`size()` или `length()`**: возвращает длину строки.
* **`empty()`**: проверяет, пуста ли строка.
* **`clear()`**: очищает строку.

### Заключение

В этой статье мы рассмотрели основные методы изменения строк в C++, используя стандарт C++20. 
Стандартная библиотека предоставляет богатый набор инструментов для работы со строками, делая их обработку удобной и эффективной.
