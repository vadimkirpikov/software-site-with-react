## Работа с подстроками и проверка начала/конца строк в C++

В процессе разработки на C++ часто возникает необходимость манипулирования строками, включая извлечение подстрок и проверку префиксов/суффиксов. C++20 предоставляет удобные инструменты для выполнения этих задач.

### Извлечение подстрок с помощью `std::string_view`

`std::string_view` – это легковесный, не владеющий данными объект, представляющий собой представление строки или ее части. 

#### Создание `std::string_view`

```c++
#include <string_view>

int main() {
  // Из строки в стиле C
  const char* c_str = "Hello, World!";
  std::string_view sv1{c_str};

  // Из объекта std::string
  std::string str = "C++20 is awesome!";
  std::string_view sv2{str};

  // Указание начала и длины подстроки
  std::string_view sv3{str, 7, 6}; // "awesome"
}
```

#### Доступ к символам и итерация

`std::string_view` предоставляет знакомый интерфейс для доступа к символам и итерации по строке:

```c++
#include <iostream>
#include <string_view>

int main() {
  std::string_view sv = "Example";

  std::cout << sv[0] << std::endl; // Вывод: 'E'

  for (char c : sv) {
    std::cout << c << ' ';
  }
  std::cout << std::endl; // Вывод: 'E x a m p l e'
}
```

#### Поиск подстрок

Для поиска подстрок можно использовать функции `find`, `rfind`, `find_first_of`, `find_last_of` и др.:

```c++
#include <iostream>
#include <string_view>

int main() {
  std::string_view sv = "This is a test string";

  // Поиск первого вхождения подстроки
  size_t pos = sv.find("test");
  if (pos != std::string_view::npos) {
    std::cout << "Подстрока 'test' найдена на позиции: " << pos << std::endl;
  }
}
```

### Проверка начала и конца строки

#### `starts_with` и `ends_with`

С++20 вводит функции `starts_with` и `ends_with` для проверки, начинается или заканчивается ли строка определенной подстрокой:

```c++
#include <iostream>
#include <string>

int main() {
  std::string filename = "image.jpg";

  if (filename.ends_with(".jpg")) {
    std::cout << "Это JPEG-изображение" << std::endl;
  }

  std::string url = "https://www.example.com";
  if (url.starts_with("https://")) {
    std::cout << "Это безопасное HTTPS-соединение" << std::endl;
  }
}
```

#### Альтернативные методы

До C++20 можно было использовать функции сравнения подстрок, такие как `compare` или комбинацию `find` и сравнения длин строк:

```c++
#include <iostream>
#include <string>

int main() {
  std::string text = "This is a test";

  // Проверка начала строки
  if (text.compare(0, 4, "This") == 0) {
    std::cout << "Строка начинается с 'This'" << std::endl;
  }

  // Проверка конца строки
  if (text.find("test") == text.size() - 4) {
    std::cout << "Строка заканчивается на 'test'" << std::endl;
  }
}
```

### Выбор метода

Выбор метода зависит от ситуации и версии C++. `std::string_view` – это  эффективный способ работы с подстроками, не копируя данные. 

В C++20 функции `starts_with` и `ends_with` предоставляют лаконичный и читаемый способ проверки префиксов/суффиксов. 

#### Заключение

C++ предоставляет различные инструменты для работы с подстроками и проверки начала/конца строк. Выбор наиболее подходящего метода зависит от контекста и требований к производительности. 
