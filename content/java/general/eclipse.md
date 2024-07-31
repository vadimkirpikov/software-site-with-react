## Первая программа в Eclipse

В этой статье мы напишем и запустим нашу первую программу на Java в среде разработки Eclipse. 

### Предварительные требования

Перед тем как начать, убедитесь, что на вашем компьютере установлены следующие компоненты:

1. **Java Development Kit (JDK) версии 21**:  Вы можете скачать последнюю версию JDK 21 с официального сайта Oracle: [https://www.oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html).
2. **Eclipse IDE**:  Скачайте последнюю версию Eclipse IDE с официального сайта: [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/). Убедитесь, что выбрана версия, поддерживающая Java разработчиков.

### Создание проекта

1. Запустите Eclipse IDE.
2. В окне "Workspace Launcher" выберите директорию для хранения ваших проектов и нажмите "Launch".
3. В открывшемся окне "Welcome" закройте вкладку приветствия (если она открыта).
4. Создайте новый Java проект: 
    * Нажмите "File" -> "New" -> "Java Project".
    * В поле "Project name" введите "MyFirstProgram".
    * Убедитесь, что в поле "JRE" выбрана версия Java 21.
    * Нажмите "Finish".

### Создание класса

1. В "Package Explorer" разверните проект "MyFirstProgram".
2. Щелкните правой кнопкой мыши на папке "src" и выберите "New" -> "Class".
3. В поле "Name" введите "HelloWorld".
4. Установите флажок "public static void main(String[] args)".
5. Нажмите "Finish".

Eclipse создаст класс `HelloWorld` с методом `main`. Этот метод является точкой входа в программу, т.е. именно с него начинается выполнение программы.

### Написание кода

Теперь в редакторе Eclipse откроется файл `HelloWorld.java`. Внутри метода `main` добавьте следующий код:

```java
package com.example;

public class HelloWorld {
    public static void main(String[] args) {
        // Вывод сообщения "Hello, World!" в консоль
        System.out.println("Hello, World!");
    }
}
```

Этот код использует метод `System.out.println()` для вывода строки "Hello, World!" в консоль. 

### Запуск программы

1. Сохраните файл `HelloWorld.java` (Ctrl+S или Cmd+S).
2. Нажмите правой кнопкой мыши на файл `HelloWorld.java` в "Package Explorer".
3. Выберите "Run As" -> "Java Application".

В нижней части окна Eclipse появится вкладка "Console", где вы увидите вывод программы:

```
Hello, World!
```

Поздравляем! Вы успешно создали и запустили свою первую программу на Java в Eclipse! 

### Разбор кода

Давайте разберем код нашей программы подробнее:

* **`package com.example;`**: эта строка указывает пакет, к которому принадлежит класс `HelloWorld`. Пакеты используются для организации кода в Java.
* **`public class HelloWorld { ... }`**: это объявление класса `HelloWorld`. Ключевое слово `public` означает, что класс доступен из любого места программы. 
* **`public static void main(String[] args) { ... }`**: это объявление метода `main`. Ключевые слова `public`, `static` и `void` имеют особое значение в Java, которое мы рассмотрим позже. `String[] args` – это массив строк, который содержит аргументы командной строки, переданные программе при запуске.
* **`// Вывод сообщения "Hello, World!" в консоль`**: это однострочный комментарий. Комментарии игнорируются компилятором и служат для объяснения кода.
* **`System.out.println("Hello, World!");`**:  эта строка кода выводит текст "Hello, World!" на консоль. 
    * `System` - это предопределенный класс в Java, предоставляющий доступ к системным ресурсам. 
    * `out` - это статический член класса `System`, представляющий собой поток вывода, связанный с консолью.
    * `println()` - это метод класса `PrintStream` (к которому принадлежит `out`), который выводит строку в консоль и переводит курсор на новую строку.

### Заключение

В этой статье мы познакомились с основами создания и запуска Java программ в Eclipse. Мы создали простую программу "Hello, World!", которая выводит текст на консоль. В следующих статьях мы более подробно рассмотрим синтаксис Java и научимся создавать более сложные программы.