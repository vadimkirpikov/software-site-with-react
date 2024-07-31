## Работа со строками в PHP

PHP предлагает обширный набор функций для работы со строками. Эти функции позволяют выполнять различные операции, такие как:

* **Получение информации о строке:** определение длины строки, поиск подстроки, проверка на наличие символов и т.д.
* **Модификация строк:** изменение регистра, замена подстрок, удаление символов, обрезка пробелов и т.д.
* **Разбиение и объединение строк:** разделение строки на подстроки, объединение строк в одну.

### Получение информации о строке

**1. strlen()**

Функция `strlen()` возвращает длину строки, то есть количество символов в ней.

```php
<?php

$string = "Привет, мир!";
$length = strlen($string);

echo "Длина строки: " . $length; // Вывод: Длина строки: 12

?>
```

**2. strpos() и strrpos()**

Функция `strpos()` используется для поиска первого вхождения подстроки в строке. Она возвращает позицию первого символа найденной подстроки или `false`, если подстрока не найдена. Функция `strrpos()` работает аналогично, но возвращает позицию последнего вхождения подстроки.

```php
<?php

$string = "Это строка с примером.";
$position = strpos($string, "при");

echo "Позиция подстроки: " . $position; // Вывод: Позиция подстроки: 15

$lastPosition = strrpos($string, "р");

echo "Последняя позиция подстроки: " . $lastPosition; // Вывод: Последняя позиция подстроки: 17

?>
```

**3. substr_count()**

Функция `substr_count()` подсчитывает количество вхождений подстроки в строку.

```php
<?php

$string = "Это строка с примером, в которой есть пример.";
$count = substr_count($string, "пример");

echo "Количество вхождений подстроки: " . $count; // Вывод: Количество вхождений подстроки: 2

?>
```

### Модификация строк

**1. strtolower() и strtoupper()**

Функции `strtolower()` и `strtoupper()` преобразуют строку в нижний и верхний регистр соответственно.

```php
<?php

$string = "ПрИвЕт!";

$lowercase = strtolower($string);
echo "Нижний регистр: " . $lowercase; // Вывод: Нижний регистр: привет!

$uppercase = strtoupper($string);
echo "Верхний регистр: " . $uppercase; // Вывод: Верхний регистр: ПРИВЕТ!

?>
```

**2. str_replace() и str_ireplace()**

Функция `str_replace()` заменяет все вхождения подстроки в строке на другую подстроку. Функция `str_ireplace()` работает аналогично, но не учитывает регистр символов.

```php
<?php

$string = "Это строка с примером.";

$newString = str_replace("пример", "текстом", $string);
echo "Новая строка: " . $newString; // Вывод: Новая строка: Это строка с текстом.

?>
```

**3. substr()**

Функция `substr()` возвращает часть строки, начиная с заданной позиции и определенной длины.

```php
<?php

$string = "Это строка с примером.";

$substring = substr($string, 5, 6); // Извлечение подстроки "строка"
echo "Подстрока: " . $substring; // Вывод: Подстрока: строка

?>
```

**4. trim(), ltrim() и rtrim()**

Функция `trim()` удаляет пробельные символы (пробелы, табуляции, переводы строк) в начале и конце строки. Функция `ltrim()` удаляет пробелы только в начале строки, а `rtrim()` - только в конце.

```php
<?php

$string = "  Это строка с пробелами.  ";

$trimmedString = trim($string);
echo "Обрезанная строка: " . $trimmedString; // Вывод: Обрезанная строка: Это строка с пробелами.

?>
```

### Разбиение и объединение строк

**1. explode()**

Функция `explode()` разбивает строку на массив подстрок, используя заданный разделитель.

```php
<?php

$string = "яблоко,банан,груша";

$fruits = explode(",", $string);

print_r($fruits); // Вывод: Array ( [0] => яблоко [1] => банан [2] => груша )

?>
```

**2. implode()**

Функция `implode()` объединяет элементы массива в строку, используя заданный разделитель.

```php
<?php

$fruits = array("яблоко", "банан", "груша");

$string = implode(", ", $fruits);

echo "Фрукты: " . $string; // Вывод: Фрукты: яблоко, банан, груша

?>
```

## Регулярные выражения

PHP поддерживает использование регулярных выражений для более сложных операций со строками. Регулярные выражения предоставляют мощный инструмент для поиска и замены текста по шаблонам.

### Функции для работы с регулярными выражениями

* **preg_match()**: Проверяет, соответствует ли строка заданному шаблону.
* **preg_replace()**: Заменяет все вхождения шаблона в строке на другую строку.
* **preg_split()**: Разбивает строку на массив подстрок, используя шаблон в качестве разделителя.

**Пример использования preg_replace():**

```php
<?php

$string = "Это строка с номером телефона 123-456-7890.";

$newString = preg_replace('/\d{3}-\d{3}-\d{4}/', '***-***-****', $string);

echo $newString; // Вывод: Это строка с номером телефона ***-***-****.

?>
```

В этом примере регулярное выражение `/\d{3}-\d{3}-\d{4}/` используется для поиска номера телефона в формате XXX-XXX-XXXX и замены его на ***-***-****.


Это лишь краткое введение в функции для работы со строками в PHP. Подробную информацию о каждой функции, а также о регулярных выражениях вы можете найти в официальной документации PHP.