## Структуры

В C++ структуры, наряду с классами, являются одними из основных строительных блоков для создания пользовательских типов данных. Структуры позволяют объединять данные разных типов под одним именем. 

### Объявление структур

Объявление структуры определяет новый тип данных, указывая его имя и список его членов (переменных, которые хранятся внутри структуры).  

```c++
struct Товар {
  std::string название;
  int количество;
  double цена;
}; 
```

В этом примере мы объявили структуру с именем `Товар`. Эта структура содержит три члена: 

- `название`: строка для хранения названия товара
- `количество`: целое число для хранения количества товара на складе
- `цена`: число с плавающей точкой для хранения цены товара

Обратите внимание на точку с запятой `;` после закрывающей скобки. Она обязательна при объявлении структуры.

### Создание переменных структурного типа

После объявления структуры вы можете создавать переменные этого типа. 

```c++
Товар молоток;
Товар дрель; 
```

Здесь мы создали две переменные: `молоток` и `дрель`, обе типа `Товар`.

### Доступ к членам структуры

Доступ к членам структуры осуществляется с помощью оператора точки `.`.  

```c++
молоток.название = "Молоток";
молоток.количество = 10;
молоток.цена = 12.50;
```

В этом примере мы присваиваем значения членам структуры `молоток`. 

### Инициализация структур

Структуры можно инициализировать при объявлении:

```c++
Товар гвозди = { "Гвозди", 100, 0.10 };
```

### Структуры и функции

Структуры могут использоваться как аргументы и возвращаемые значения функций. 

```c++
// Функция для вывода информации о товаре
void вывести_информацию(Товар товар) {
  std::cout << "Название: " << товар.название << std::endl;
  std::cout << "Количество: " << товар.количество << std::endl;
  std::cout << "Цена: " << товар.цена << std::endl;
}

int main() {
  Товар отвертка = { "Отвертка", 5, 5.75 };
  вывести_информацию(отвертка);
  return 0;
}
```

### Массивы структур

Вы можете создавать массивы структур так же, как и массивы любых других типов данных. 

```c++
Товар товары[3]; // Массив из 3 товаров

товары[0].название = "Молоток";
товары[0].количество = 10;
товары[0].цена = 12.50;

товары[1].название = "Дрель";
товары[1].количество = 5;
товары[1].цена = 55.00;

товары[2].название = "Отвертка";
товары[2].количество = 20;
товары[2].цена = 3.75;
```

### Вложенные структуры

Структуры могут быть вложенными друг в друга:

```c++
struct Адрес {
  std::string город;
  std::string улица;
  int номер_дома;
};

struct Покупатель {
  std::string имя;
  Адрес адрес;
};

int main() {
  Покупатель покупатель;
  покупатель.имя = "Иван";
  покупатель.адрес.город = "Москва";
  покупатель.адрес.улица = "Тверская";
  покупатель.адрес.номер_дома = 10;

  return 0;
}
```

### Преимущества использования структур

* **Организация данных:** Структуры помогают организовать данные, группируя связанные переменные вместе. 
* **Удобство:** Передача одной структуры в функцию проще, чем передача нескольких отдельных переменных.
* **Читаемость:** Использование структур делает код более читаемым и понятным. 

### Различия между структурами и классами

В C++ структуры и классы очень похожи. Единственное различие по умолчанию заключается в области видимости членов:

* **Структуры:** Члены структуры по умолчанию являются общедоступными (public). 
* **Классы:** Члены класса по умолчанию являются закрытыми (private).

В большинстве случаев рекомендуется использовать классы, так как они обеспечивают большую гибкость в управлении доступом к данным.