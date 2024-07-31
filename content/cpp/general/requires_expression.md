## Выражение requires

Выражение `requires` в C++20 используется для проверки требований к типам во время компиляции. Это позволяет писать более безопасный и читаемый код, избегая ошибок, связанных с несовместимостью типов.

### Основной синтаксис

Базовый синтаксис выражения `requires` выглядит следующим образом:

```cpp
requires (параметры-шаблона) {
  требования;
};
```

* **параметры-шаблона** -  необязательный список параметров-шаблонов, используемых в требованиях.
* **требования** - набор выражений, проверяющих свойства типов, переданных в качестве параметров-шаблона. 

**Пример:**

```cpp
template <typename T>
requires std::integral<T> // Требование: T должен быть целочисленным типом
void print(T value) {
  std::cout << value << std::endl;
}
```

В этом примере `requires std::integral<T>` проверяет, является ли тип `T` целочисленным. Если да, то функция `print` будет доступна для этого типа. В противном случае, компилятор выдаст ошибку.

### Виды требований

Существует несколько видов требований, которые можно использовать в выражении `requires`:

1. **Проверка наличия типа (type traits):**

   ```cpp
   requires std::is_integral_v<T>; // T должен быть целочисленным типом
   requires std::is_floating_point_v<T>; // T должен быть типом с плавающей запятой
   requires std::is_class_v<T>; // T должен быть классом
   ```

2. **Проверка наличия членов класса:**

   ```cpp
   template <typename T>
   requires requires (T t) {
     t.size(); // T должен иметь метод size()
     t.empty(); // T должен иметь метод empty()
   }
   void process(T container) {
     // ...
   }
   ```

3. **Проверка возвращаемого типа метода:**

   ```cpp
   template <typename T>
   requires requires (T t) {
     { t.get_value() } -> std::same_as<int>; // get_value() должен возвращать int
   }
   int get_int_value(T obj) {
     return obj.get_value();
   }
   ```

4. **Проверка доступности конструктора:**

   ```cpp
   template <typename T>
   requires requires {
     T{}; // T должен иметь конструктор по умолчанию
   }
   T create_object() {
     return T{};
   }
   ```

### Использование requires с концептами

Выражение `requires` часто используется совместно с концептами для определения ограничений на типы шаблонных параметров.

**Пример:**

```cpp
template <typename T>
concept Printable = requires (T t) {
  std::cout << t; // T должен быть выводимым в std::cout
};

template <Printable T>
void print_object(T obj) {
  std::cout << obj << std::endl;
}
```

В этом примере определен концепт `Printable`, который требует, чтобы тип можно было вывести в `std::cout`. Функция `print_object` принимает любой тип, удовлетворяющий концепту `Printable`.

### Преимущества использования requires

* **Повышение читаемости кода:** Требования к типам явно указаны в коде, что делает его более понятным.
* **Улучшение безопасности типов:** Компилятор проверяет требования к типам во время компиляции, предотвращая ошибки во время выполнения.
* **Более информативные сообщения об ошибках:** Если требования к типам не выполняются, компилятор выдаст понятное сообщение об ошибке, указывающее на проблемное место.
* **Упрощение проектирования шаблонов:** `requires` позволяет определять более гибкие и выразительные шаблоны.

### Заключение

Выражение `requires` является мощным инструментом в C++20, который позволяет писать более безопасный, читаемый и выразительный код. Освоение этого инструмента поможет вам создавать более качественное и надежное программное обеспечение.