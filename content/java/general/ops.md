## Основные операции со строками

Строки играют важную роль в программировании, и Java предлагает богатый набор инструментов для работы с ними. В этом разделе мы рассмотрим основные операции, которые позволят вам эффективно манипулировать строками в ваших Java-программах.

### Создание строк

В Java строки представляются объектами класса `String`. Существует несколько способов создания строк:

1. **Использование строковых литералов:**

   ```java
   String message = "Hello, world!"; 
   ```

   В этом случае строковый литерал заключается в двойные кавычки и компилируется непосредственно в код.

2. **Использование конструктора класса `String`:**

   ```java
   char[] chars = {'H', 'e', 'l', 'l', 'o'};
   String greeting = new String(chars);
   ```

   Здесь мы создаем строку из массива символов `chars` с помощью конструктора `String(char[])`.

### Неизменяемость строк

Важно понимать, что строки в Java **неизменяемы (immutable)**. Это означает, что после создания объекта `String` его значение изменить нельзя. Любые операции, которые кажутся изменяющими строку, на самом деле создают новый объект `String` с измененным значением. 

### Сравнение строк

Для сравнения строк на равенство используется метод `equals()`:

```java
String str1 = "Java";
String str2 = "Java";
String str3 = "Python";

boolean isEqual1 = str1.equals(str2); // true
boolean isEqual2 = str1.equals(str3); // false
```

Метод `equalsIgnoreCase()` позволяет сравнивать строки без учета регистра:

```java
String str1 = "Java";
String str2 = "java";

boolean isEqual = str1.equalsIgnoreCase(str2); // true
```

### Конкатенация строк

Объединение строк (конкатенация) выполняется с помощью оператора `+`:

```java
String firstName = "John";
String lastName = "Doe";
String fullName = firstName + " " + lastName; // "John Doe"
```

### Получение длины строки

Метод `length()` возвращает количество символов в строке:

```java
String message = "Hello, world!";
int length = message.length(); // 13
```

### Доступ к символам строки

Получить символ по его индексу можно с помощью метода `charAt()`. Индексы начинаются с 0:

```java
String message = "Hello";
char firstChar = message.charAt(0); // 'H'
char lastChar = message.charAt(message.length() - 1); // 'o'
```

### Поиск подстроки

Для поиска подстроки в строке можно использовать метод `indexOf()`:

```java
String message = "Hello, world!";
int index = message.indexOf("world"); // 7
```

Если подстрока не найдена, метод `indexOf()` вернет значение -1.

### Замена символов и подстрок

Метод `replace()` позволяет заменить все вхождения заданного символа или подстроки:

```java
String message = "Hello, world!";
String newMessage = message.replace("world", "Java"); // "Hello, Java!"
```

### Обрезка строки

Удалить пробелы в начале и конце строки можно с помощью метода `trim()`:

```java
String message = "  Hello, world!  ";
String trimmedMessage = message.trim(); // "Hello, world!"
```

### Преобразование регистра

Преобразовать строку в верхний или нижний регистр можно с помощью методов `toUpperCase()` и `toLowerCase()` соответственно:

```java
String message = "Hello, world!";
String upperCaseMessage = message.toUpperCase(); // "HELLO, WORLD!"
String lowerCaseMessage = message.toLowerCase(); // "hello, world!"
```

### Разделение строки на подстроки

Метод `split()` позволяет разделить строку на массив подстрок, используя заданный разделитель:

```java
String message = "apple,banana,orange";
String[] fruits = message.split(","); // ["apple", "banana", "orange"]
```

### Другие полезные методы

Класс `String` предоставляет множество других полезных методов для работы со строками, таких как:

- `substring()` - извлечение подстроки
- `startsWith()` и `endsWith()` - проверка начала и окончания строки
- `isEmpty()` - проверка на пустую строку
- `contains()` - проверка на содержание подстроки

### StringBuilder и StringBuffer

Для более эффективной работы со строками, особенно при частой конкатенации, рекомендуется использовать классы `StringBuilder` и `StringBuffer`. Они предоставляют mutable-аналоги строк, что позволяет изменять их содержимое без создания новых объектов.

### Заключение

В этом разделе мы рассмотрели основные операции со строками в Java. Глубокое понимание работы с этим типом данных является ключом к написанию эффективных и выразительных Java-программ. 
