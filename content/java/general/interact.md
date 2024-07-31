## Взаимодействие между модулями

Модульная система Java, представленная в Java 9, привнесла в язык строгую инкапсуляцию и четкое управление зависимостями. Она позволяет разрабатывать более надежные и масштабируемые приложения, разбивая их на независимые модули с четко определенными интерфейсами. В этом разделе мы рассмотрим, как модули взаимодействуют друг с другом, обмениваются функциональностью и данными.

### Основы модульной системы

Каждый модуль Java определяется файлом `module-info.java`, расположенным в корневой директории модуля. Этот файл содержит декларацию модуля, которая включает:

- Имя модуля.
- Зависимости от других модулей.
- Пакеты, которые модуль экспортирует для использования другими модулями.
- Сервисы, которые модуль предоставляет или использует.

### Зависимости между модулями

Для использования функциональности другого модуля ваш модуль должен объявить зависимость от него. Это делается с помощью ключевого слова `requires` в файле `module-info.java`. Например, если модуль `com.example.myapp` использует классы из модуля `java.sql`, то декларация модуля `com.example.myapp` будет выглядеть следующим образом:

```java
module com.example.myapp {
    requires java.sql;
}
```

### Экспорт и использование пакетов

По умолчанию модуль не делает свои пакеты доступными для других модулей. Чтобы разрешить другим модулям использовать свои классы и интерфейсы, модуль должен экспортировать соответствующие пакеты. Это делается с помощью ключевого слова `exports` в файле `module-info.java`. Например, если модуль `com.example.mylib` хочет предоставить доступ к пакету `com.example.mylib.utils`, то декларация модуля будет выглядеть следующим образом:

```java
module com.example.mylib {
    exports com.example.mylib.utils;
}
```

Теперь любой модуль, зависящий от `com.example.mylib`, может использовать публичные классы и интерфейсы из пакета `com.example.mylib.utils`.

### Сервисы

Сервисы - это мощный механизм взаимодействия между модулями, который позволяет реализовывать слабосвязанные компоненты. Модуль может объявлять, что он предоставляет реализацию определенного сервиса, а другие модули могут запрашивать доступ к этому сервису, не зная о конкретной реализации.

**Объявление сервиса:**

Сервис определяется интерфейсом, который описывает функциональность, предоставляемую сервисом. Модуль, предоставляющий реализацию сервиса, объявляет об этом с помощью ключевого слова `provides` в файле `module-info.java`, указывая интерфейс сервиса и имя класса, реализующего этот интерфейс. Например:

```java
module com.example.myservice.provider {
    provides com.example.myservice.api.MyService
            with com.example.myservice.impl.MyServiceImpl;
}
```

**Использование сервиса:**

Модуль, использующий сервис, объявляет об этом с помощью ключевого слова `uses` в файле `module-info.java`, указывая интерфейс сервиса. Например:

```java
module com.example.myservice.consumer {
    requires com.example.myservice.api;
    uses com.example.myservice.api.MyService;
}
```

Для доступа к реализации сервиса во время выполнения используется `ServiceLoader`. Например:

```java
ServiceLoader<MyService> loader = ServiceLoader.load(MyService.class);
MyService service = loader.findFirst().orElseThrow();
```

### Пример взаимодействия модулей

Представим, что мы разрабатываем приложение для управления задачами. Приложение состоит из следующих модулей:

- `com.example.tasks.api` - определяет интерфейсы для работы с задачами.
- `com.example.tasks.core` - содержит основную логику приложения.
- `com.example.tasks.persistence` - отвечает за сохранение и загрузку задач.
- `com.example.tasks.ui` - предоставляет пользовательский интерфейс.

Модуль `com.example.tasks.core` зависит от `com.example.tasks.api` и `com.example.tasks.persistence`, а модуль `com.example.tasks.ui` зависит от `com.example.tasks.api` и `com.example.tasks.core`. Модуль `com.example.tasks.persistence` предоставляет сервис `TaskRepository`, который используется модулем `com.example.tasks.core`.

**com.example.tasks.api/module-info.java:**

```java
module com.example.tasks.api {
    exports com.example.tasks.api;
}
```

**com.example.tasks.core/module-info.java:**

```java
module com.example.tasks.core {
    requires com.example.tasks.api;
    requires com.example.tasks.persistence;
    uses com.example.tasks.api.TaskRepository;
}
```

**com.example.tasks.persistence/module-info.java:**

```java
module com.example.tasks.persistence {
    requires com.example.tasks.api;
    provides com.example.tasks.api.TaskRepository
            with com.example.tasks.persistence.InMemoryTaskRepository;
}
```

**com.example.tasks.ui/module-info.java:**

```java
module com.example.tasks.ui {
    requires com.example.tasks.api;
    requires com.example.tasks.core;
}
```

### Заключение

Модульная система Java предоставляет мощные инструменты для создания хорошо структурированных, масштабируемых и легко поддерживаемых приложений. Понимание принципов взаимодействия между модулями, включая управление зависимостями, экспорт и использование пакетов, а также работу с сервисами, является ключом к успешному применению модульности в ваших проектах. 
