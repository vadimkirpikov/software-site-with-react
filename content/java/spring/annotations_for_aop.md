## Использование аннотаций для AOP в Spring Framework 6

Аспектно-ориентированное программирование (AOP) позволяет отделить сквозную функциональность (cross-cutting concerns) от основной бизнес-логики. Spring Framework предоставляет мощную поддержку AOP, основанную на прокси-объектах, и одним из способов ее использования является применение аннотаций. 

### Основы AOP с аннотациями

Для начала работы с AOP на основе аннотаций необходимо:

1. **Подключить зависимости:**

   В файл `pom.xml` проекта Maven добавьте следующую зависимость:

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-aop</artifactId>
   </dependency>
   ```

2. **Включить поддержку AOP:**

   Добавьте аннотацию `@EnableAspectJAutoProxy` в класс конфигурации Spring:

   ```java
   @Configuration
   @EnableAspectJAutoProxy
   public class AppConfig {
       // ...
   }
   ```

3. **Создать аспект:**

   Аспект представляет собой класс, содержащий советы (advice) и точки соединения (pointcuts):

   ```java
   @Aspect
   @Component
   public class LoggingAspect {

       @Before("execution(* com.example.service.*.*(..))")
       public void logMethodExecution(JoinPoint joinPoint) {
           String methodName = joinPoint.getSignature().getName();
           System.out.println("Вызов метода: " + methodName);
       }
   }
   ```

   В этом примере:

   - Аннотация `@Aspect` помечает класс как аспект.
   - Аннотация `@Component` делает аспект Spring-компонентом.
   - Метод `logMethodExecution` является советом, выполняемым **перед** вызовом любого метода в пакете `com.example.service`.
   - `JoinPoint` предоставляет доступ к информации о вызываемом методе.

4. **Использовать аспект:**

   Spring автоматически применит аспект к соответствующим точкам соединения:

   ```java
   @Service
   public class MyService {

       public void doSomething() {
           // ...
       }
   }
   ```

   При вызове метода `doSomething` будет выполнен совет `logMethodExecution`.

### Типы советов

Spring поддерживает следующие типы советов:

| Аннотация | Описание                                                     |
|-----------|-----------------------------------------------------------------|
| `@Before` | Выполняется **перед** выполнением метода.                  |
| `@After`  | Выполняется **после** выполнения метода, независимо от результата. |
| `@AfterReturning` | Выполняется **после** успешного выполнения метода.          |
| `@AfterThrowing` | Выполняется **при** возникновении исключения.                 |
| `@Around`  | Оборачивает выполнение метода, предоставляя полный контроль.   |

### Точки соединения (Pointcuts)

Точки соединения определяют, к каким методам будут применены советы. Выражения pointcut используют AspectJ syntax.

| Выражение                  | Описание                                                        |
|----------------------------|------------------------------------------------------------------|
| `execution(* *(..))`      | Любой метод с любым именем и любым количеством аргументов.        |
| `execution(* com.example.service.*.*(..))` | Любой метод в любом классе пакета `com.example.service`.   |
| `@annotation(com.example.MyAnnotation)` | Методы, помеченные аннотацией `@MyAnnotation`.                |

### Передача параметров в советы

Для доступа к параметрам метода в совете можно использовать аннотацию `@args`:

```java
@Before("execution(* com.example.service.*.*(String, ..))")
public void logMethodArguments(JoinPoint joinPoint, String arg1) {
    System.out.println("Аргумент метода: " + arg1);
}
```

### Пример: логирование времени выполнения метода

```java
@Aspect
@Component
public class TimingAspect {

    @Around("execution(* com.example.service.*.*(..))")
    public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();
        long executionTime = System.currentTimeMillis() - start;
        System.out.println("Время выполнения метода: " + executionTime + " мс");
        return proceed;
    }
}
```

В этом примере совет `measureExecutionTime` использует `ProceedingJoinPoint` для запуска метода (`joinPoint.proceed()`) и измерения времени его выполнения.

### Заключение

AOP с аннотациями - это мощный инструмент Spring Framework, позволяющий создавать чистый и модульный код. Используя аннотации, можно легко определить аспекты, советы и точки соединения, чтобы отделить сквозную функциональность от основной бизнес-логики.
