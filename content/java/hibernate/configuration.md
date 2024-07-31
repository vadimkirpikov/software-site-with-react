## Настройка конфигурации Hibernate 6

Hibernate, как и большинство фреймворков, использует конфигурационные файлы для настройки своего поведения. В этой статье мы рассмотрим основные способы настройки Hibernate 6, включая использование файла `hibernate.cfg.xml` и программную настройку.

### Конфигурирование Hibernate с помощью файла `hibernate.cfg.xml`

Файл `hibernate.cfg.xml` – это XML-файл, который традиционно используется для конфигурирования Hibernate. Он содержит информацию о подключении к базе данных, диалекте SQL, пуле соединений и других настройках.

**Шаг 1:** Создайте файл `hibernate.cfg.xml` в папке ресурсов вашего проекта (`src/main/resources`).

**Шаг 2:** Добавьте следующий базовый контент в файл:

```xml
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
    <session-factory>
        <!-- Настройки подключения к базе данных -->
        <property name="hibernate.connection.driver_class">org.postgresql.Driver</property>
        <property name="hibernate.connection.url">jdbc:postgresql://localhost:5432/mydatabase</property>
        <property name="hibernate.connection.username">postgres</property>
        <property name="hibernate.connection.password">password</property>

        <!-- Диалект SQL -->
        <property name="hibernate.dialect">org.hibernate.dialect.PostgreSQLDialect</property>

        <!-- Настройки пула соединений -->
        <property name="hibernate.connection.pool_size">10</property>

        <!-- Дополнительные настройки -->
        <property name="hibernate.show_sql">true</property>
        <property name="hibernate.format_sql">true</property>

        <!-- Сопоставления сущностей -->
        <mapping class="com.example.model.User"/> 
    </session-factory>
</hibernate-configuration>
```

**Описание свойств:**

* **`hibernate.connection.driver_class`:** Полное имя класса драйвера JDBC для вашей базы данных.
* **`hibernate.connection.url`:** URL-адрес подключения к базе данных.
* **`hibernate.connection.username`:** Имя пользователя базы данных.
* **`hibernate.connection.password`:** Пароль пользователя базы данных.
* **`hibernate.dialect`:** Диалект SQL, используемый вашей базой данных.
* **`hibernate.connection.pool_size`:** Размер пула соединений.
* **`hibernate.show_sql`:** Выводить ли SQL-запросы в консоль.
* **`hibernate.format_sql`:** Форматировать ли SQL-запросы для лучшей читаемости.
* **`<mapping class="..."/>`:**  Указывает классы сущностей для сопоставления с таблицами базы данных.

**Пример:** В данном примере мы используем PostgreSQL, но вы можете изменить настройки для вашей базы данных. 

### Программная настройка Hibernate

Вместо использования файла `hibernate.cfg.xml` вы можете настроить Hibernate программно. 

**Шаг 1:** Создайте класс конфигурации:

```java
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class HibernateUtil {

    private static final SessionFactory sessionFactory = buildSessionFactory();

    private static SessionFactory buildSessionFactory() {
        try {
            // Создаем построитель реестра сервисов
            StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder();

            // Настраиваем свойства подключения
            builder.applySetting("hibernate.connection.driver_class", "org.postgresql.Driver");
            builder.applySetting("hibernate.connection.url", "jdbc:postgresql://localhost:5432/mydatabase");
            builder.applySetting("hibernate.connection.username", "postgres");
            builder.applySetting("hibernate.connection.password", "password");
            builder.applySetting("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");

            // Создаем реестр сервисов
            StandardServiceRegistry registry = builder.build();

            // Создаем фабрику сессий
            return new MetadataSources(registry)
                    .addAnnotatedClass(com.example.model.User.class) // Добавляем сущности
                    .buildMetadata()
                    .buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}
```

**Описание:**

* Создаем экземпляр `StandardServiceRegistryBuilder` и устанавливаем свойства подключения, диалект и т.д.
* Вызываем `builder.build()` для создания `StandardServiceRegistry`.
* Используем `MetadataSources` для указания сопоставленных сущностей.
* Вызываем `buildMetadata().buildSessionFactory()` для создания `SessionFactory`.

### Выбор метода конфигурации

Выбор метода конфигурации – это вопрос предпочтений. Файл `hibernate.cfg.xml`  - это более традиционный подход, который обеспечивает централизованное хранение настроек. Программная настройка, с другой стороны,  предлагает большую гибкость и позволяет  изменять настройки во время выполнения.

В следующих статьях мы рассмотрим  более подробно использование `SessionFactory` и других компонентов Hibernate для взаимодействия с базой данных. 
