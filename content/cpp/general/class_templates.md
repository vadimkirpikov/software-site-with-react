## Шаблоны классов в C++

Шаблоны классов предоставляют механизм для создания обобщенных классов, которые могут работать с различными типами данных без необходимости написания отдельного кода для каждого типа. Это мощный инструмент для повторного использования кода и создания гибких и эффективных программ.

### Объявление шаблона класса

Шаблон класса объявляется с использованием ключевого слова `template`, за которым следует список параметров шаблона, заключенный в угловые скобки `<>`. Параметры шаблона могут быть:

* **Типы**: Представляют собой плейсхолдеры для типов данных, которые будут использоваться при создании экземпляра класса.
* **Неклассовые типы**: Могут быть целочисленными значениями, указателями или ссылками.

```cpp
template <typename T>
class MyTemplateClass {
private:
    T data;

public:
    MyTemplateClass(const T& value) : data(value) {}

    T getValue() const {
        return data;
    }
};
```

В этом примере `T` - это параметр шаблона, представляющий собой тип данных. Класс `MyTemplateClass` может хранить данные любого типа, который будет передан при создании экземпляра класса.

### Создание экземпляра шаблонного класса

Для создания экземпляра шаблонного класса необходимо указать конкретные типы данных для параметров шаблона. Это делается путем помещения типов данных в угловые скобки после имени класса.

```cpp
MyTemplateClass<int> intInstance(10);       // Экземпляр с типом int
MyTemplateClass<double> doubleInstance(3.14); // Экземпляр с типом double
```

В этом примере создаются два экземпляра класса `MyTemplateClass`: `intInstance` с типом данных `int` и `doubleInstance` с типом данных `double`.

### Доступ к членам шаблонного класса

Доступ к членам шаблонного класса осуществляется так же, как и к членам обычного класса, с использованием оператора доступа к члену (`.`).

```cpp
int intValue = intInstance.getValue();    // Получение значения из intInstance
double doubleValue = doubleInstance.getValue(); // Получение значения из doubleInstance
```

### Специализация шаблона класса

Специализация шаблона класса позволяет определить особую реализацию для определенного типа данных. Это полезно, когда требуется реализовать отличающееся поведение для конкретного типа.

```cpp
// Специализация шаблона для типа bool
template <>
class MyTemplateClass<bool> {
private:
    bool data;

public:
    MyTemplateClass(bool value) : data(value) {}

    bool getValue() const {
        return data;
    }

    void flip() {
        data = !data;
    }
};
```

В этом примере определяется специализация шаблона `MyTemplateClass` для типа `bool`. Специализированный класс имеет дополнительный метод `flip()`, который изменяет значение данных на противоположное.

### Преимущества использования шаблонов классов

* **Повторное использование кода:** Шаблоны классов позволяют писать один раз код, который может работать с различными типами данных.
* **Улучшенная типизация:** Компилятор выполняет проверку типов во время компиляции, что помогает избежать ошибок во время выполнения.
* **Эффективность:** Код шаблона компилируется только один раз для каждого типа данных, что повышает эффективность по сравнению с использованием виртуальных функций.

### Пример использования шаблонного класса

```cpp
#include <iostream>

template <typename T>
class Stack {
private:
    T* data;
    int top;
    int capacity;

public:
    Stack(int size) : capacity(size), top(-1) {
        data = new T[capacity];
    }

    ~Stack() {
        delete[] data;
    }

    void push(const T& value) {
        if (top == capacity - 1) {
            std::cout << "Stack Overflow" << std::endl;
            return;
        }
        data[++top] = value;
    }

    T pop() {
        if (top == -1) {
            std::cout << "Stack Underflow" << std::endl;
            return T(); // Возвращаем значение по умолчанию для типа T
        }
        return data[top--];
    }

    bool isEmpty() const {
        return top == -1;
    }
};

int main() {
    Stack<int> intStack(5); // Стек целых чисел

    intStack.push(10);
    intStack.push(20);

    std::cout << intStack.pop() << std::endl; // Вывод: 20
    std::cout << intStack.pop() << std::endl; // Вывод: 10

    Stack<char> charStack(3); // Стек символов

    charStack.push('a');
    charStack.push('b');

    std::cout << charStack.pop() << std::endl; // Вывод: b
    std::cout << charStack.pop() << std::endl; // Вывод: a

    return 0;
}
```

В этом примере шаблон класса `Stack` реализует структуру данных "стек". Он может хранить данные любого типа, который передается в качестве параметра шаблона. В функции `main()` создаются два экземпляра стека: один для целых чисел (`intStack`) и один для символов (`charStack`).

This is an example of how to use class templates in C++. You can modify and experiment with this code to further explore this powerful feature.