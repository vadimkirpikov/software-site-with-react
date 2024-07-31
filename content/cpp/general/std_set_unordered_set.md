## Ассоциативные контейнеры: std::set и std::unordered_set

В C++ существует несколько типов контейнеров, предназначенных для хранения и организации данных.  Среди них особое место занимают ассоциативные контейнеры `std::set` и `std::unordered_set`, которые предоставляют эффективные способы хранения и поиска **уникальных** элементов.

### std::set

`std::set` представляет собой отсортированный ассоциативный контейнер, хранящий **уникальные** элементы. Уникальность элементов означает, что в `std::set` не может быть двух одинаковых элементов.  Сортировка элементов происходит автоматически при вставке с использованием оператора сравнения `<`  (или пользовательского компаратора). 

#### Основные особенности std::set:

* **Уникальность элементов:** каждый элемент в `std::set` уникален. Попытка вставки уже существующего элемента будет проигнорирована.
* **Автоматическая сортировка:** элементы хранятся в отсортированном порядке, определяемом оператором `<` или пользовательским компаратором.
* **Логарифмическая сложность:** поиск, вставка и удаление элемента занимают логарифмическое время.

#### Пример использования std::set:

```c++
#include <iostream>
#include <set>

int main() {
  // Создание set'а целых чисел
  std::set<int> numbers = {5, 2, 8, 1, 9};

  // Вывод элементов set'а (обратите внимание на порядок)
  std::cout << "Elements of the set: ";
  for (const auto& number : numbers) {
    std::cout << number << " ";
  }
  std::cout << std::endl; // Вывод: 1 2 5 8 9

  // Проверка наличия элемента
  if (numbers.find(3) != numbers.end()) {
    std::cout << "Element 3 found in the set" << std::endl;
  } else {
    std::cout << "Element 3 not found in the set" << std::endl;
  }

  // Вставка элемента (дубликат игнорируется)
  numbers.insert(2);

  // Удаление элемента
  numbers.erase(5);

  return 0;
}
```

В этом примере мы создаем `std::set` целых чисел, добавляем туда элементы, проверяем наличие элемента, а также удаляем элемент. Обратите внимание, что элементы выводятся в отсортированном порядке, а попытка вставить дубликат игнорируется.

### std::unordered_set

`std::unordered_set` - это неупорядоченный ассоциативный контейнер, также хранящий **уникальные** элементы. В отличие от `std::set`, `std::unordered_set`  не гарантирует никакого конкретного порядка хранения элементов. Вместо этого, он использует хеш-таблицу для достижения очень быстрой средней сложности поиска, вставки и удаления элементов.

#### Основные особенности std::unordered_set:

* **Уникальность элементов:** как и `std::set`, `std::unordered_set` хранит только уникальные элементы.
* **Неупорядоченное хранение:**  элементы не хранятся в каком-либо определенном порядке.
* **Хеш-таблица:**  в основе реализации лежит хеш-таблица, обеспечивающая очень быстрый поиск, вставку и удаление элементов (в среднем за константное время).

#### Пример использования std::unordered_set:

```c++
#include <iostream>
#include <unordered_set>

int main() {
  // Создание unordered_set'а строк
  std::unordered_set<std::string> words = {"apple", "banana", "orange"};

  // Вывод элементов (порядок не определен)
  std::cout << "Elements of the unordered set: ";
  for (const auto& word : words) {
    std::cout << word << " ";
  }
  std::cout << std::endl;

  // Проверка наличия элемента
  if (words.count("grape") > 0) {
    std::cout << "Element 'grape' found in the unordered set" << std::endl;
  } else {
    std::cout << "Element 'grape' not found in the unordered set" << std::endl;
  }

  // Вставка элемента (дубликат игнорируется)
  words.insert("banana");

  // Удаление элемента
  words.erase("apple");

  return 0;
}
```

В этом примере мы создаем `std::unordered_set` строк, добавляем элементы, проверяем наличие элемента и удаляем элемент. Обратите внимание, что порядок вывода элементов не определен.

### Выбор между std::set и std::unordered_set

Выбор между `std::set` и `std::unordered_set` зависит от требований к функциональности и производительности. 

Используйте `std::set`, если:

* Необходим отсортированный порядок элементов.
* Важна предсказуемость  времени выполнения операций (логарифмическая сложность в худшем случае).

Используйте `std::unordered_set`, если:

* Порядок элементов не важен.
* Необходима максимально быстрая средняя производительность поиска, вставки и удаления элементов (константная сложность в среднем случае).


| Особенность | std::set | std::unordered_set |
|---|---|---|
| Уникальность элементов | Да | Да |
| Сортировка | Да | Нет |
| Производительность поиска/вставки/удаления | Логарифмическая | Константная (в среднем) |
| Использование | Когда важен порядок элементов | Когда важна скорость, а порядок не важен |


Понимание различий между `std::set` и `std::unordered_set`  поможет вам выбрать наиболее подходящий контейнер для эффективной организации и обработки данных в ваших программах.