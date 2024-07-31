## Обзор ORM и Hibernate

### Введение в ORM

Объектно-реляционное отображение (ORM) – это техника программирования, которая упрощает работу с реляционными базами данных в объектно-ориентированных языках программирования, таких как Java. Вместо написания SQL-запросов ORM позволяет взаимодействовать с базой данных, используя объекты и методы, что делает код более читаемым, переносимым и удобным в сопровождении.

ORM решает проблему несоответствия объектной и реляционной моделей данных, также известную как "object-relational impedance mismatch". 

### Преимущества ORM

* **Повышенная производительность разработчика:** ORM берут на себя рутинные задачи, такие как создание SQL-запросов, управление соединениями и обработка результатов, позволяя разработчикам сосредоточиться на бизнес-логике.
* **Улучшенная переносимость кода:** ORM абстрагируют детали конкретной базы данных, позволяя легко переключаться между различными СУБД с минимальными изменениями кода.
* **Более чистый и читаемый код:**  Работа с объектами и методами вместо SQL-запросов делает код более лаконичным, понятным и легким в поддержке.
* **Повышенная безопасность:** ORM помогают предотвратить SQL-инъекции, автоматически экранируя специальные символы в запросах.

### Что такое Hibernate?

Hibernate — это мощный, высокопроизводительный инструмент ORM с открытым исходным кодом для платформы Java. Он предоставляет фреймворк для отображения объектно-ориентированных моделей предметной области на реляционные базы данных. Hibernate заботится о создании SQL-запросов, управлении транзакциями и состоянии объектов, позволяя разработчикам сосредоточиться на бизнес-логике приложения.

### Основные возможности Hibernate

* **Объектно-реляционное отображение:** Hibernate позволяет легко отображать Java-классы на таблицы базы данных и наоборот.
* **Управление объектами:** Hibernate управляет жизненным циклом объектов, включая их создание, сохранение, обновление, удаление и извлечение из базы данных.
* **Язык запросов Hibernate (HQL):**  HQL – это объектно-ориентированный язык запросов, который позволяет получать данные из базы данных, используя классы и свойства Java.
* **Кеширование:** Hibernate предоставляет механизмы кеширования для повышения производительности приложения, храня часто используемые данные в памяти.
* **Поддержка транзакций:** Hibernate поддерживает управление транзакциями, обеспечивая согласованность данных в базе данных.

### Начало работы с Hibernate 6

#### 1. Добавление зависимостей Maven

Добавьте следующие зависимости в файл `pom.xml` вашего проекта Maven:

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>6.1.6.Final</version>
</dependency>

<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version>8.0.30</version>
</dependency>
```

#### 2. Создание файла конфигурации Hibernate (`hibernate.cfg.xml`)

Создайте файл `hibernate.cfg.xml` в папке `src/main/resources` вашего проекта и добавьте следующую конфигурацию:

```xml
<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/your_database_name</property>
        <property name="hibernate.connection.username">your_username</property>
        <property name="hibernate.connection.password">your_password</property>

        <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>
        <property name="hibernate.show_sql">true</property>
        <property name="hibernate.hbm2ddl.auto">update</property>
    </session-factory>
</hibernate-configuration>
```

**Описание параметров:**

* `hibernate.connection.driver_class`:  Класс драйвера JDBC для вашей базы данных.
* `hibernate.connection.url`: URL-адрес подключения к базе данных.
* `hibernate.connection.username`: Имя пользователя базы данных.
* `hibernate.connection.password`: Пароль пользователя базы данных.
* `hibernate.dialect`: Диалект SQL для вашей базы данных.
* `hibernate.show_sql`:  Включает вывод SQL-запросов в консоль.
* `hibernate.hbm2ddl.auto`: Автоматическое создание/обновление схемы базы данных на основе ваших сущностей.

#### 3. Создание класса сущности

Создайте Java-класс, который будет представлять таблицу в вашей базе данных. Например, создайте класс `Employee` в пакете `com.example.model`:

```java
package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;

    // Геттеры и сеттеры
}
```

**Аннотации JPA:**

* `@Entity`:  указывает, что этот класс является сущностью JPA.
* `@Id`:  указывает поле идентификатора сущности.
* `@GeneratedValue`:  указывает, как генерируется значение идентификатора.

### Заключение

В этой статье было рассмотрено понятие ORM и его преимущества, а также представлен обзор Hibernate - мощного ORM-фреймворка для Java. Вы узнали, как настроить Hibernate и создать простую сущность. В следующих разделах руководства мы более подробно рассмотрим различные аспекты работы с Hibernate.
