<h2>Интеграционное тестирование с Hibernate</h2>

Интеграционное тестирование — важный этап разработки приложения, использующего Hibernate.  Оно позволяет проверить корректность взаимодействия Hibernate с базой данных и убедиться, что ваши сущности, запросы и конфигурация работают слаженно.

<h3>Цели интеграционного тестирования с Hibernate</h3>

* Проверить корректность отображения сущностей на таблицы базы данных.
* Убедиться в правильности работы запросов HQL/JPQL.
* Протестировать транзакционную логику и управление сессиями.
* Выявить проблемы с конфигурацией Hibernate.

<h3>Инструменты для интеграционного тестирования</h3>

* **JUnit 5:** Фреймворк для написания тестов.
* **Testcontainers:** Библиотека для запуска тестовых контейнеров с базами данных.
* **AssertJ:** Библиотека для написания утверждений в тестах.

<h3>Пример интеграционного теста</h3>

Рассмотрим пример интеграционного теста для простой сущности `Product`:

```java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private Double price;

    // Конструкторы, геттеры и сеттеры
}
```

**1. Добавляем зависимости в `pom.xml`:**

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.9.2</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>1.17.5</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <version>1.17.5</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.24.2</version>
    <scope>test</scope>
</dependency>
```

**2. Создаем класс для интеграционного тестирования:**

```java
@Testcontainers
public class ProductRepositoryIntegrationTest {

    @Container
    private static PostgreSQLContainer<?> postgresContainer = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpassword");

    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;

    @BeforeEach
    void setUp() {
        Map<String, Object> properties = new HashMap<>();
        properties.put("hibernate.dialect.DatabasePlatform", "org.hibernate.dialect.PostgreSQLDialect");
        properties.put("javax.persistence.jdbc.driver", "org.postgresql.Driver");
        properties.put("javax.persistence.jdbc.url", postgresContainer.getJdbcUrl());
        properties.put("javax.persistence.jdbc.user", postgresContainer.getUsername());
        properties.put("javax.persistence.jdbc.password", postgresContainer.getPassword());
        properties.put("hibernate.hbm2ddl.auto", "create-drop"); // Создаем и удаляем схему для каждого теста

        entityManagerFactory = Persistence.createEntityManagerFactory("test-persistence-unit", properties);
        entityManager = entityManagerFactory.createEntityManager();
    }

    @AfterEach
    void tearDown() {
        entityManager.close();
        entityManagerFactory.close();
    }

    @Test
    void shouldSaveAndFindProduct() {
        // Создаем продукт
        Product product = new Product();
        product.setName("Test Product");
        product.setPrice(10.0);

        // Сохраняем продукт в базе данных
        entityManager.getTransaction().begin();
        entityManager.persist(product);
        entityManager.getTransaction().commit();

        // Получаем продукт из базы данных
        Product foundProduct = entityManager.find(Product.class, product.getId());

        // Проверяем, что продукт был сохранен и получен
        assertThat(foundProduct).isNotNull();
        assertThat(foundProduct.getName()).isEqualTo("Test Product");
        assertThat(foundProduct.getPrice()).isEqualTo(10.0);
    }
}
```

В этом примере мы использовали Testcontainers для запуска PostgreSQL в Docker-контейнере. 

**Важно:**

* Необходимо создать файл `src/test/resources/META-INF/persistence.xml` с настройками подключения к базе данных.
* Параметр `hibernate.hbm2ddl.auto` со значением `create-drop` указывает Hibernate на автоматическое создание и удаление схемы базы данных для каждого теста. 

Интеграционное тестирование с Hibernate – это важный этап разработки, который позволяет проверить взаимодействие кода с базой данных. 

В дальнейшем можно более подробно изучить различные стратегии тестирования, такие как тестирование с использованием реальной базы данных или моков.
