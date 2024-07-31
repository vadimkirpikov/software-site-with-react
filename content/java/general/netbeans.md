## Создание первой программы в NetBeans

В этой статье мы создадим простую программу на Java, используя среду разработки NetBeans. Вы узнаете, как создать проект, написать код, скомпилировать и запустить свою первую программу.

###  Установка NetBeans

Перед началом работы убедитесь, что на вашем компьютере установлена среда разработки NetBeans и настроена для работы с Java 21.  Если у вас ещё нет NetBeans, загрузите его с официального сайта ([https://netbeans.apache.org/](https://netbeans.apache.org/)) и следуйте инструкциям по установке.

### Создание проекта

1.  Запустите NetBeans.

2.  В меню выберите **File > New Project...** (Файл > Создать проект...).

3.  В открывшемся окне выберите категорию **Java with Maven** (Java с Maven) и проект типа **Java Application** (Приложение Java). Нажмите **Next** (Далее).

4.  В поле **Project Name** (Имя проекта) введите **MyFirstProgram**. Убедитесь, что в поле **Java Version** (Версия Java) выбрана версия **21**. Нажмите **Finish** (Готово).

### Создание класса и написание кода

NetBeans создаст для вас проект с базовой структурой. Теперь создадим класс и напишем код нашей первой программы.

1.  В окне **Projects** (Проекты) разверните узел вашего проекта **MyFirstProgram**.

2.  Кликните правой кнопкой мыши на папке **Source Packages** (Исходные пакеты) и выберите **New > Java Class...** (Создать > Класс Java...).

3.  В поле **Class Name** (Имя класса) введите **HelloWorld** и нажмите **Finish** (Готово).

4.  NetBeans создаст файл **HelloWorld.java** и откроет его в редакторе. Замените сгенерированный код следующим:

```java
package com.mycompany.myfirstprogram;

/**
 * Простая программа, выводящая "Hello, World!" в консоль.
 */
public class HelloWorld {

    public static void main(String[] args) {
        // Вывод сообщения "Hello, World!" в консоль
        System.out.println("Hello, World!"); 
    }
}
```

**Описание кода:**

*   `package com.mycompany.myfirstprogram;`: эта строка определяет пакет, к которому принадлежит класс `HelloWorld`. Пакеты используются для организации кода в Java.

*   `public class HelloWorld { ... }`: это объявление класса `HelloWorld`. Ключевое слово `public` означает, что к этому классу можно получить доступ из любого места программы.

*   `public static void main(String[] args) { ... }`: это метод `main()`, который является точкой входа в программу. Код внутри этого метода будет выполнен первым при запуске программы.

*   `// Вывод сообщения "Hello, World!" в консоль`: это комментарий, который игнорируется компилятором. Комментарии используются для объяснения кода.

*   `System.out.println("Hello, World!");`: эта строка кода выводит строку "Hello, World!" в консоль.

### Компиляция и запуск программы

1.  Для компиляции программы нажмите клавишу **F11** или выберите **Run > Build Project (MyFirstProgram)** (Запуск > Собрать проект (MyFirstProgram)).

2.  Для запуска программы нажмите клавишу **F6** или выберите **Run > Run Project (MyFirstProgram)** (Запуск > Запустить проект (MyFirstProgram)).

### Результат

В окне **Output** (Вывод) вы увидите результат работы программы:

```
run:
Hello, World!
BUILD SUCCESSFUL (total time: 0 seconds)
```

Поздравляем! Вы создали свою первую программу на Java в NetBeans. 