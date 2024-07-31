## Создание модуля в Java

Модули, представленные в Java 9, привнесли в язык долгожданную модульность. Модули позволяют разбить приложение на независимо развертываемые компоненты с четко определенными зависимостями. В этом разделе мы рассмотрим создание простых модулей, их компиляцию и запуск.

### Структура модуля

Каждый модуль Java имеет следующие компоненты:

1. **Корневой каталог модуля**: Директория, содержащая все файлы модуля.
2. **Файл module-info.java**: Описывает модуль, его зависимости и экспортируемые пакеты.
3. **Пакеты Java**: Содержат классы, интерфейсы и другие ресурсы модуля.

### Создание простого модуля

Рассмотрим создание модуля `com.example.greetings` с классом `Greeting`:

1. **Создание структуры директорий:**

```
greetings-module/
├── com.example.greetings
│   └── Greeting.java
└── module-info.java
```

2. **Реализация класса Greeting:**

```java
// com.example.greetings/Greeting.java
package com.example.greetings;

public class Greeting {
    public static String greet() {
        return "Hello from greetings module!";
    }
}
```

3. **Описание модуля (module-info.java):**

```java
// greetings-module/module-info.java
module com.example.greetings {
    // Экспортируем пакет com.example.greetings для использования другими модулями
    exports com.example.greetings;
}
```

В данном примере мы определяем модуль `com.example.greetings` и указываем, что пакет `com.example.greetings` доступен другим модулям.

### Компиляция модуля

Для компиляции модуля используем команду `javac` с указанием пути к корневому каталогу модуля и опцией `--module-source-path`:

```bash
javac --module-source-path ./greetings-module -d mods/com.example.greetings ./greetings-module/com.example.greetings/Greeting.java ./greetings-module/module-info.java
```

Опция `--module-source-path` указывает компилятору, где искать исходные файлы модулей.  Опция `-d` задает директорию для скомпилированных файлов модуля (`mods` в данном случае).

### Создание модуля-потребителя

Теперь создадим модуль `com.example.app`, использующий  `com.example.greetings`:

1. **Структура директорий:**

```
app-module/
├── com.example.app
│   └── Main.java
└── module-info.java
```

2. **Класс Main:**

```java
// app-module/com.example.app/Main.java
package com.example.app;

import com.example.greetings.Greeting;

public class Main {
    public static void main(String[] args) {
        System.out.println(Greeting.greet());
    }
}
```

3. **Описание модуля:**

```java
// app-module/module-info.java
module com.example.app {
    // Указываем зависимость от модуля com.example.greetings
    requires com.example.greetings;
}
```

Ключевое слово `requires` в `module-info.java` указывает на зависимость от модуля `com.example.greetings`.

### Компиляция и запуск

1. **Компиляция модуля `com.example.app`:**

```bash
javac --module-source-path ./app-module:./greetings-module -d mods/com.example.app ./app-module/com.example.app/Main.java ./app-module/module-info.java
```

В этом случае мы указываем два пути для `--module-source-path`, чтобы компилятор мог найти оба модуля.

2. **Запуск приложения:**

```bash
java --module-path mods -m com.example.app/com.example.app.Main
```

Опция `--module-path` указывает путь к директории с модулями (`mods`).  Опция `-m` указывает модуль и главный класс для запуска.

В результате выполнения команды в консоли будет выведено: "Hello from greetings module!".

### Заключение

В этом разделе мы рассмотрели основы создания, компиляции и запуска модулей в Java. Модульность - мощный инструмент для организации кода и управления зависимостями. Более глубокое изучение модульной системы Java позволит создавать более сложные и масштабируемые приложения. 
