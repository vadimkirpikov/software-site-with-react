<h2>Аннотации для конфигурации бинов</h2>

Spring Framework предоставляет мощный механизм для конфигурирования приложения с помощью аннотаций. Аннотации позволяют описать классы как бины Spring и управлять их зависимостями без необходимости использования XML-конфигурации.

<h3>Основные аннотации</h3>

| Аннотация       | Описание                                                              |
|-----------------|------------------------------------------------------------------------|
| `@Component`    | Помечает класс как бин Spring, который будет автоматически обнаружен и зарегистрирован в контексте приложения. |
| `@Service`      | Специализация `@Component`, используется для обозначения сервисного слоя приложения. |
| `@Repository`   | Специализация `@Component`, используется для обозначения слоя доступа к данным. |
| `@Controller`  | Специализация `@Component`, используется для обозначения контроллеров в веб-приложениях. |
| `@Configuration`| Помечает класс как конфигурационный, содержащий методы, которые объявляют бины Spring. |
| `@Bean`        | Используется в методах класса, аннотированного `@Configuration`, для объявления бина Spring. |

<h3>Пример использования</h3>

Создадим простой пример, демонстрирующий использование аннотаций для конфигурации бинов.

1. **Создайте класс `Speaker`, представляющий компонент "динамик":**

```java
public class Speaker {

    public void makeSound() {
        System.out.println("Playing sound!");
    }
}
```

2. **Создайте класс `MusicPlayer`, представляющий компонент "музыкальный плеер", который зависит от `Speaker`:**

```java
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class MusicPlayer {

    private final Speaker speaker;

    @Autowired
    public MusicPlayer(Speaker speaker) {
        this.speaker = speaker;
    }

    public void playMusic() {
        System.out.println("Playing music...");
        speaker.makeSound();
    }
}
```

3. **Создайте класс `AppConfig` с аннотацией `@Configuration`:**

```java
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class AppConfig {
}
```

4. **Создайте класс `Main` для запуска приложения:**

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {

    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        MusicPlayer musicPlayer = context.getBean(MusicPlayer.class);
        musicPlayer.playMusic();
    }
}
```

В этом примере:

- `@Component` на классе `MusicPlayer` помечает его как бин Spring.
- `@Autowired` на конструкторе класса `MusicPlayer` указывает Spring внедрить зависимость от `Speaker`.
- `@Configuration` на классе `AppConfig` помечает его как конфигурационный.
- `@ComponentScan` на классе `AppConfig` указывает Spring сканировать текущий пакет на наличие аннотированных классов.

Запустите метод `main` в классе `Main`, и вы увидите следующий вывод в консоли:

```
Playing music...
Playing sound!
```

<h3>Дополнительные аннотации</h3>

Помимо основных аннотаций, Spring Framework предоставляет множество других, которые позволяют гибко настраивать конфигурацию бинов. Вот некоторые из них:

| Аннотация               | Описание                                                                                           |
|--------------------------|----------------------------------------------------------------------------------------------------|
| `@Qualifier`          | Используется с `@Autowired` для указания конкретного бина, если существует несколько кандидатов.     |
| `@Scope`              | Задает область видимости бина (singleton, prototype и др.).                                          |
| `@Value`              | Внедряет значения из properties-файлов или переменных окружения.                                     |
| `@PostConstruct`      | Помечает метод, который будет выполнен после создания бина и внедрения всех зависимостей.             |
| `@PreDestroy`         | Помечает метод, который будет выполнен перед уничтожением бина.                                     |
| `@Primary`            | Помечает бин как предпочтительный, если существует несколько кандидатов для внедрения.                  |
| `@Profile`            | Позволяет активировать бины только в определенных профилях приложения.                                |
| `@Lazy`                | Откладывает инициализацию бина до момента его первого использования.                                   |

Изучение этих аннотаций позволит вам использовать всю мощь конфигурации на основе аннотаций в Spring Framework и создавать гибкие и легко управляемые приложения.
