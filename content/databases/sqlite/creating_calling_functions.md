## Создание и вызов функций в SQLite

SQLite, будучи встраиваемой базой данных, предлагает широкие возможности по расширению функционала с помощью пользовательских функций. В этом разделе мы рассмотрим создание и вызов таких функций, что позволит вам решать специфические задачи непосредственно внутри СУБД.

### Создание пользовательских функций

Для определения собственной функции в SQLite используется SQL-оператор `CREATE FUNCTION`.  Общий синтаксис выглядит следующим образом:

```sql
CREATE [TEMP | TEMPORARY] FUNCTION function_name(arg1, arg2, ...)
RETURNS return_type
AS function_body
```

Разберем конструкцию подробнее:

* **`CREATE [TEMP | TEMPORARY] FUNCTION`**: Ключевое слово, указывающее на создание функции. Необязательные модификаторы `TEMP` или `TEMPORARY` определяют временную функцию, существующую только в рамках текущей сессии.
* **`function_name`**: Имя создаваемой функции.
* **`(arg1, arg2, ...)`**: Список аргументов, передаваемых в функцию (необязательно). 
* **`RETURNS return_type`**: Указывается тип данных, возвращаемых функцией.
* **`AS function_body`**: Тело функции, содержащее код, выполняемый при ее вызове.

Существует два основных способа определения тела функции:

1. **Встроенные функции (Scalar functions)**: Код функции внедряется непосредственно в определение SQL.
2. **Внешние функции (User-defined functions)**: Код функции пишется на языке программирования (например, C) и подключается к SQLite в виде динамической библиотеки.

#### Встроенные функции

Встроенные функции подходят для простых операций, не требующих внешних зависимостей. Определение `function_body` в этом случае представляет собой единое выражение:

```sql
CREATE FUNCTION calculate_discount(price REAL, discount INTEGER)
RETURNS REAL
AS (price * (1 - discount / 100.0));
```

В данном примере создается функция `calculate_discount`, принимающая цену (`price`) и скидку (`discount`) в процентах.  Тело функции вычисляет цену со скидкой и возвращает ее.

#### Внешние функции

Для более сложной логики или использования сторонних библиотек применяются внешние функции.  Рассмотрим пример создания функции `word_count`, подсчитывающей количество слов в строке, на языке C:

```c
#include <sqlite3.h>
#include <string.h>
#include <stdlib.h>

static void word_count_func(
    sqlite3_context *context, 
    int argc, 
    sqlite3_value **argv
) {
    if (argc != 1) {
        sqlite3_result_error(context, "Invalid number of arguments");
        return;
    }

    const char *text = sqlite3_value_text(argv[0]);
    if (text == NULL) {
        sqlite3_result_null(context);
        return;
    }

    int count = 1;
    for (int i = 0; text[i] != '\0'; i++) {
        if (text[i] == ' ' && text[i + 1] != '\0' && text[i + 1] != ' ') {
            count++;
        }
    }

    sqlite3_result_int(context, count);
}

int sqlite3_extension_init(
    sqlite3 *db, 
    char **pzErrMsg, 
    const sqlite3_api_routines *pApi
) {
    SQLITE_EXTENSION_INIT2(pApi);
    sqlite3_create_function(db, "word_count", 1, SQLITE_UTF8, NULL, word_count_func, NULL, NULL);
    return SQLITE_OK;
}
```

Код функции компилируется в динамическую библиотеку, которая затем подключается к SQLite с помощью команды `.load`:

```sql
.load ./word_count.so 
```

### Вызов функций

После определения функции ее можно использовать в SQL-запросах, как и встроенные функции SQLite. 

#### Примеры вызова:

1. **Встроенная функция**:

```sql
SELECT product_name, calculate_discount(price, 15) AS discounted_price 
FROM products;
```

2. **Внешняя функция**:

```sql
SELECT title, word_count(description) AS word_count 
FROM articles;
```

### Заключение

Создание и использование пользовательских функций существенно расширяет возможности SQLite, позволяя адаптировать СУБД под специфику проекта.  Встроенные функции удобны для простых операций, в то время как внешние функции предоставляют доступ к широкому спектру возможностей, доступных в языках программирования.
