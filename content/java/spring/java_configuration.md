## Java-based конфигурация в Spring Framework 6

Spring Framework предоставляет мощные механизмы для конфигурации приложений. Наряду с XML-based конфигурацией, Spring Framework 6 поддерживает гибкую и типобезопасную Java-based конфигурацию. Этот подход основан на использовании аннотаций и Java-кода для определения бинов, их свойств и зависимостей. 

### Преимущества Java-based конфигурации:

* **Типобезопасность:** Конфигурация проверяется компилятором, что снижает вероятность ошибок.
* **Рефакторинг:** Изменения в коде конфигурации автоматически отражаются в зависимостях.
* **Гибкость:** Java-код предоставляет больше возможностей для настройки приложения, чем XML.
* **Читаемость:** Конфигурация на Java часто более лаконична и понятна.

### Основные аннотации:

| Аннотация          | Описание                                                                     |
|----------------------|------------------------------------------------------------------------------|
| `@Configuration`    | Отмечает класс как источник конфигурации Spring.                              |
| `@Bean`            | Определяет метод, который создает бин Spring.                             |
| `@ComponentScan`   | Позволяет сканировать пакеты на наличие компонентов Spring (например, `@Component`, `@Service`). |
| `@Import`           | Импортирует конфигурацию из других классов с аннотацией `@Configuration`.     |
| `@PropertySource`  | Указывает на файл свойств для загрузки значений.                         |
| `@Autowired`       | Автоматически внедряет зависимости в бин.                                 |
| `@Value`           | Внедряет значение свойства из конфигурационного файла.                   |

### Создание простой конфигурации:

Рассмотрим пример конфигурации простого приложения:

```java
package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.service.EmailService;
import com.example.service.UserService;

@Configuration
public class AppConfig {

    @Bean
    public EmailService emailService() {
        return new EmailService();
    }

    @Bean
    public UserService userService() {
        UserService userService = new UserService();
        userService.setEmailService(emailService()); // Внедрение зависимости
        return userService;
    }
}
```

В этом примере класс `AppConfig` отмечен аннотацией `@Configuration`, что делает его источником конфигурации Spring. Методы `emailService()` и `userService()` аннотированы `@Bean`, что указывает Spring на необходимость создания бинов для `EmailService` и `UserService` соответственно. В методе `userService()` мы внедряем зависимость `emailService` через вызов метода `emailService()`.

### Загрузка конфигурации и получение бинов:

Для загрузки конфигурации и получения бинов используем `AnnotationConfigApplicationContext`:

```java
package com.example;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.example.config.AppConfig;
import com.example.service.UserService;

public class Application {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        
        UserService userService = context.getBean(UserService.class);
        userService.sendMessage("Hello from Spring!");
        
        context.close();
    }
}
```

В этом коде создается `AnnotationConfigApplicationContext`, который загружает конфигурацию из класса `AppConfig`. Затем получаем бин `UserService` из контекста приложения и используем его для отправки сообщения.

### Заключение:

Java-based конфигурация - мощный инструмент для создания гибких и легко поддерживаемых приложений Spring. Использование аннотаций и Java-кода делает конфигурацию более прозрачной, типобезопасной и удобной для рефакторинга. 
