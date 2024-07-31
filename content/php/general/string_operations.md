## Основные операции со строками

В языке PHP строки играют важную роль, представляя собой последовательности символов. PHP предоставляет обширный набор функций для работы со строками, позволяя выполнять различные операции: от конкатенации и поиска подстрок до форматирования и изменения регистра. 

### Создание строк

Существует несколько способов определить строку в PHP:

1. **Одинарные кавычки:**

    ```php
    $name = 'Иван';
    ```

    Строки в одинарных кавычках интерпретируются буквально, за исключением экранирования символа `'` и `\`.

2. **Двойные кавычки:**

    ```php
    $greeting = "Привет, $name!";
    ```
    
    Строки в двойных кавычках поддерживают интерполяцию переменных и специальные escape-последовательности, такие как `\n` (новая строка), `\t` (табуляция) и другие.
    
3. **Heredoc-синтаксис:**

    ```php
    $text = <<<EOT
    Это многострочный текст.
    Он может содержать переменные, как и $name.
    EOT;
    ```

    Heredoc позволяет определять многострочные строки с сохранением форматирования и интерполяцией переменных. Идентификатор (здесь `EOT`) может быть любым, но должен стоять на отдельной строке и закрываться без отступов.

4. **Nowdoc-синтаксис:**

    ```php
    $text = <<<'EOT'
    Этот текст не интерпретируется,
    переменные как $name не будут заменены.
    EOT;
    ```

    Nowdoc аналогичен Heredoc, но не выполняет интерполяцию переменных, обрабатывая текст буквально.

### Конкатенация строк

Объединение строк, или конкатенация, выполняется с помощью оператора `.`:

```php
$firstName = "Иван";
$lastName = "Петров";
$fullName = $firstName . " " . $lastName; // "Иван Петров"
```

### Функции для работы со строками

PHP предоставляет богатый набор функций для работы со строками. Рассмотрим некоторые из них:

**1. strlen()**

Возвращает длину строки:

```php
$string = "Hello";
$length = strlen($string); // 5
```

**2. strpos()**

Находит первое вхождение подстроки в строке. Возвращает позицию первого символа подстроки или `false`, если подстрока не найдена:

```php
$string = "This is a test string.";
$position = strpos($string, "test"); // 10
```

**3. substr()**

Извлекает часть строки, начиная с указанной позиции и заданной длины:

```php
$string = "This is a test string.";
$substring = substr($string, 10, 4); // "test"
```

**4. strstr()**

Возвращает часть строки, начиная с первого вхождения заданной подстроки:

```php
$string = "This is a test string.";
$substring = strstr($string, "test"); // "test string."
```

**5. strtolower(), strtoupper()**

Преобразуют строку в нижний и верхний регистр соответственно:

```php
$string = "Hello World!";
$lowercase = strtolower($string); // "hello world!"
$uppercase = strtoupper($string); // "HELLO WORLD!"
```

**6. trim(), ltrim(), rtrim()**

Удаляют пробельные символы (пробелы, табуляции, переносы строк) из строки: `trim()` - с обеих сторон, `ltrim()` - слева, `rtrim()` - справа.

```php
$string = "  Hello World!  ";
$trimmed = trim($string); // "Hello World!"
```

**7. explode(), implode()**

`explode()` разбивает строку в массив по заданному разделителю, а `implode()` объединяет элементы массива в строку, используя разделитель:

```php
$string = "apple,banana,orange";
$fruits = explode(",", $string); // ["apple", "banana", "orange"]

$newString = implode(" ", $fruits); // "apple banana orange"
```

**8. str_replace()**

Заменяет все вхождения заданной подстроки в строке на другую подстроку:

```php
$string = "This is a test string.";
$newString = str_replace("test", "example", $string); // "This is an example string."
```

**9. sprintf(), printf()**

Форматируют строку, вставляя значения переменных в соответствии с шаблоном. `printf()` сразу выводит результат, а `sprintf()` возвращает отформатированную строку:

```php
$name = "Иван";
$age = 30;
$formattedString = sprintf("Меня зовут %s, мне %d лет.", $name, $age); 
// "Меня зовут Иван, мне 30 лет."
```

### Escape-последовательности

В строках, заключенных в двойные кавычки, доступны следующие escape-последовательности:

| Последовательность | Значение                 |
|-----------------|--------------------------|
| `\n`            | Перевод строки           |
| `\r`            | Возврат каретки        |
| `\t`            | Табуляция                |
| `\\`            | Обратный слэш           |
| `\$`            | Знак доллара            |
| `\"`            | Двойная кавычка          |

### Заключение

Это лишь базовые операции и функции для работы со строками в PHP. Язык предоставляет гораздо больше возможностей, таких как работа с регулярными выражениями, обработка многобайтовых строк и многое другое. Подробную информацию о всех функциях и возможностях работы со строками можно найти в официальной документации PHP.