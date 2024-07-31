<h2>Настройка поведения транзакций</h2>

Spring Framework предоставляет абстрактный механизм управления транзакциями, который можно настроить с помощью XML или Java-аннотаций.

<h3>Настройка транзакций через XML</h3>

Для настройки транзакций через XML используется namespace `tx`. 

1. **Объявление менеджера транзакций:**

    В первую очередь, необходимо определить менеджер транзакций (`PlatformTransactionManager`), который будет управлять вашими транзакциями. Например, для работы с `DataSource`:

    ```xml
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>
    ```
    Замените `dataSource` на ваш бин источника данных.

2. **Настройка советника транзакций:**

    Далее нужно определить `TransactionInterceptor` с помощью элемента `<tx:advice>`, указав менеджер транзакций и правила распространения транзакций:

    ```xml
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="get*" read-only="true"/>
            <tx:method name="*"/>
        </tx:attributes>
    </tx:advice>
    ```
    В данном примере все методы, начинающиеся с `get`, будут выполняться в режиме "только чтение", а остальные методы - с возможностью записи.

3. **Применение советника к точкам соединения:**

    Используйте элемент `<aop:advisor>` для указания точек соединения, к которым будет применяться советник транзакций:

    ```xml
    <aop:config>
        <aop:advisor advice-ref="txAdvice" pointcut="execution(* com.example.service.*Service.*(..))"/>
    </aop:config>
    ```
    В этом примере `txAdvice` будет применяться ко всем методам во всех классах, оканчивающихся на `Service` в пакете `com.example.service`.

<h3>Настройка транзакций через аннотации</h3>

Java-аннотации предоставляют более простой способ настройки транзакций. 

1. **Включение поддержки транзакций:**

    Добавьте аннотацию `@EnableTransactionManagement` в ваш конфигурационный класс:

    ```java
    @Configuration
    @EnableTransactionManagement
    public class AppConfig {
        // ...
    }
    ```

2. **Объявление менеджера транзакций:**

    Создайте бин типа `PlatformTransactionManager`, как и в случае с XML:

    ```java
    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
    ```

3. **Применение аннотации `@Transactional`:**

    Используйте аннотацию `@Transactional` для методов, которые должны быть transactional:

    ```java
    @Service
    public class MyService {

        @Transactional
        public void doSomething() {
            // ...
        }

        @Transactional(readOnly = true)
        public Object findSomething() {
            // ...
        }
    }
    ```

    Аннотация `@Transactional` поддерживает различные атрибуты для управления поведением транзакций, такие как уровень изоляции, стратегия распространения транзакций и т. д.

###Таблица атрибутов `@Transactional`

| Атрибут | Описание |
|---|---|
| `propagation` | Стратегия распространения транзакций. |
| `isolation` | Уровень изоляции транзакции. |
| `readOnly` | Флаг, указывающий, что транзакция предназначена только для чтения. |
| `timeout` | Время ожидания транзакции в секундах. |
| `rollbackFor` | Класс исключения или массив классов, при которых будет выполнен откат транзакции. |
| `noRollbackFor` | Класс исключения или массив классов, при которых откат транзакции производиться не будет. |

<h3>Заключение</h3>

Spring Framework предлагает гибкие возможности настройки поведения транзакций. Выберите наиболее удобный для вас способ: XML или аннотации - и настройте транзакции в соответствии с требованиями вашего приложения. 
