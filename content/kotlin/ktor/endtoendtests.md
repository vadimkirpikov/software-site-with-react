## End-to-end тестирование Ktor приложения с использованием Selenium

End-to-end (E2E) тестирование играет важную роль в обеспечении качества веб-приложений. Вместо проверки отдельных компонентов в изоляции, E2E тесты имитируют действия пользователя в браузере, проверяя корректность работы всего приложения в комплексе. 

В этом разделе мы рассмотрим использование Selenium WebDriver для написания E2E тестов для Ktor приложения. Selenium — это популярный инструмент для автоматизации действий браузера, который отлично подходит для E2E тестирования.

### Настройка окружения

Перед началом работы необходимо выполнить следующие шаги:

1. **Добавить зависимости:**

```kotlin
dependencies {
    testImplementation("org.seleniumhq.selenium:selenium-java:4.10.0")
    // Добавьте другие необходимые зависимости Selenium
}
```

2. **Загрузить WebDriver:**

Скачайте WebDriver для вашего браузера (например, ChromeDriver для Chrome) с официального сайта Selenium и добавьте его в `PATH` вашей системы.

### Создание тестового класса

Создайте новый тестовый класс Kotlin, который будет содержать ваши E2E тесты. 

```kotlin
import io.ktor.server.testing.*
import org.junit.jupiter.api.*
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver

class ApplicationEndToEndTest {

    private lateinit var driver: WebDriver
    private lateinit var application: ApplicationTestBuilder.() -> Unit

    @BeforeEach
    fun setUp() {
        // Инициализация WebDriver
        driver = ChromeDriver()
        
        // Инициализация Ktor приложения (если необходимо)
        application = {
            // Конфигурация Ktor приложения
        }
    }

    @AfterEach
    fun tearDown() {
        // Закрытие браузера
        driver.quit()
    }
}
```

В этом классе:

* `driver`: переменная для хранения экземпляра WebDriver.
* `application`: переменная для хранения конфигурации Ktor приложения.
* `setUp()`: метод, выполняемый перед каждым тестом, инициализирует WebDriver и Ktor приложение.
* `tearDown()`: метод, выполняемый после каждого теста, закрывает браузер.

### Написание E2E теста

Рассмотрим пример простого E2E теста, проверяющего отображение заголовка на главной странице:

```kotlin
@Test
fun testHomePageTitle() {
    withTestApplication(application) {
        // Открыть главную страницу
        driver.get("http://localhost:8080/")

        // Получить заголовок страницы
        val title = driver.title

        // Проверка заголовка
        assertEquals("Мое Ktor приложение", title)
    }
}
```

В этом тесте:

* `withTestApplication`: запускает Ktor приложение для тестирования.
* `driver.get()`: открывает указанный URL в браузере.
* `driver.title`: получает заголовок страницы.
* `assertEquals()`: проверяет, что фактический заголовок совпадает с ожидаемым.

### Более сложные сценарии

Selenium предоставляет богатый API для взаимодействия с веб-страницами:

* **Поиск элементов:** 
    * `findElement()`: поиск одного элемента по локатору (например, ID, имя класса, XPath).
    * `findElements()`: поиск всех элементов, соответствующих локатору.

```kotlin
// Поиск элемента по ID
val loginButton = driver.findElement(By.id("loginButton"))

// Поиск элементов по имени класса
val menuItems = driver.findElements(By.className("menuItem"))
```

* **Действия с элементами:**
    * `click()`: клик по элементу.
    * `sendKeys()`: ввод текста в поле ввода.
    * `clear()`: очистка поля ввода.

```kotlin
// Ввод логина
val loginInput = driver.findElement(By.id("login"))
loginInput.sendKeys("username")

// Клик по кнопке входа
val loginButton = driver.findElement(By.id("loginButton"))
loginButton.click()
```

* **Ожидания:**

    Selenium позволяет использовать явные ожидания для синхронизации тестов с асинхронными действиями на странице.

```kotlin
// Ожидание появления элемента на странице
val wait = WebDriverWait(driver, Duration.ofSeconds(10))
val element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("myElement")))
```

### Пример: E2E тест формы регистрации

Рассмотрим более сложный пример E2E теста, проверяющего функциональность формы регистрации:

```kotlin
@Test
fun testRegistrationForm() {
    withTestApplication(application) {
        driver.get("http://localhost:8080/register")

        // Заполнение формы
        driver.findElement(By.id("username")).sendKeys("testuser")
        driver.findElement(By.id("email")).sendKeys("testuser@example.com")
        driver.findElement(By.id("password")).sendKeys("password")
        driver.findElement(By.id("confirmPassword")).sendKeys("password")

        // Отправка формы
        driver.findElement(By.cssSelector("button[type='submit']")).click()

        // Ожидание перехода на страницу профиля
        val wait = WebDriverWait(driver, Duration.ofSeconds(5))
        wait.until(ExpectedConditions.urlToBe("http://localhost:8080/profile"))

        // Проверка успешной регистрации
        val welcomeMessage = driver.findElement(By.id("welcomeMessage")).text
        assertEquals("Добро пожаловать, testuser!", welcomeMessage)
    }
}
```

В этом тесте:

* Выполняется переход на страницу регистрации.
* Заполняются поля формы регистрации.
* Отправляется форма.
* Ожидается переход на страницу профиля после успешной регистрации.
* Выполняется проверка наличия приветственного сообщения.

### Заключение

Использование Selenium WebDriver для E2E тестирования Ktor приложений обеспечивает комплексный подход к проверке качества, гарантируя корректность работы приложения с точки зрения пользователя. Selenium предоставляет мощные инструменты для имитации действий пользователя в браузере, что делает его идеальным выбором для создания эффективных и надежных E2E тестов. 
