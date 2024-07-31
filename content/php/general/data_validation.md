## Валидация и очистка данных

В процессе разработки веб-приложений, обработка пользовательских данных является неотъемлемой частью. Будь то информация из формы регистрации, комментарий к статье или данные, полученные через API, обеспечение безопасности и целостности этих данных имеет первостепенное значение. Некорректные или вредоносные данные могут привести к непредсказуемому поведению приложения, ошибкам в базе данных и даже создать уязвимости для атак.

Именно здесь в игру вступают валидация и очистка данных. 

**Валидация** - это процесс проверки данных на соответствие заранее определенным критериям. Цель валидации - убедиться, что данные корректны и соответствуют ожидаемому формату, типу и диапазону значений.

**Очистка** - это процесс удаления или экранирования потенциально опасных символов и данных, которые могут нарушить работу приложения или базы данных. 

### Инструменты валидации в PHP

PHP предлагает ряд встроенных функций и возможностей для валидации данных:

* **Фильтрация**: PHP предоставляет набор функций для фильтрации данных, таких как `filter_var()`. Эта функция позволяет проверять данные на соответствие различным типам данных, например, email, URL, IP-адрес и т.д. 

```php
$email = "test@example.com";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo "Адрес электронной почты действителен";
} else {
  echo "Адрес электронной почты недействителен";
}
```

* **Регулярные выражения**: Регулярные выражения (regular expressions) - мощный инструмент для проверки строк на соответствие определенным шаблонам. PHP поддерживает регулярные выражения через функции `preg_match()`, `preg_replace()` и др.

```php
$password = "P@$$wOrd";

if (preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/", $password)) {
    echo "Пароль соответствует требованиям"; 
} else {
    echo "Пароль слишком слабый"; 
}
```

* **Встроенные функции валидации**: PHP предоставляет функции для проверки типов данных, например `is_int()`, `is_string()`, `is_numeric()`, `empty()`, `isset()`, которые можно использовать для базовой валидации.

```php
$age = 25;

if (is_int($age) && $age >= 18) {
    echo "Доступ разрешен"; 
} else {
    echo "Доступ запрещен"; 
}
```

### Методы очистки данных

* **Очистка HTML**: Для предотвращения XSS-атак (межсайтовый скриптинг) необходимо очищать данные от потенциально опасного HTML-кода. Функция `htmlspecialchars()` преобразует специальные HTML-символы в их HTML-сущности, делая код безопасным для отображения.

```php
$comment = "<script>alert('XSS attack!');</script>";
$safe_comment = htmlspecialchars($comment, ENT_QUOTES, 'UTF-8');

echo $safe_comment; // Выведет безопасный текст
```

* **Очистка SQL-запросов**: Для предотвращения SQL-инъекций необходимо экранировать данные, которые будут использоваться в SQL-запросах.  Используйте подготовленные выражения (prepared statements) или функции экранирования, такие как `mysqli_real_escape_string()` для MySQL, чтобы защитить базу данных от вредоносных данных.

```php
// Пример с PDO
$pdo = new PDO("mysql:host=localhost;dbname=mydatabase", "username", "password");
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->bindParam(':username', $username, PDO::PARAM_STR);
$stmt->execute();

// Пример с mysqli
$mysqli = new mysqli("localhost", "username", "password", "mydatabase");
$username = $mysqli->real_escape_string($username);
$query = "SELECT * FROM users WHERE username = '$username'";
$result = $mysqli->query($query);
```

### Пошаговое руководство по валидации формы

Рассмотрим пример валидации формы регистрации:

1. **Определите правила валидации**: Перед написанием кода необходимо четко определить правила, которым должны соответствовать данные. 

| Поле | Правила |
|---|---|
| Имя пользователя | Обязательное поле, от 3 до 20 символов, только латинские буквы и цифры |
| Email | Обязательное поле, валидный email адрес |
| Пароль | Обязательное поле, не менее 8 символов, должен содержать буквы в верхнем и нижнем регистре, цифры и специальные символы |
| Повтор пароля | Обязательное поле, должно совпадать с паролем |

2. **Создайте форму HTML**: Форма будет собирать данные от пользователя.

```html
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
    <label for="username">Имя пользователя:</label>
    <input type="text" name="username" id="username" required>

    <label for="email">Email:</label>
    <input type="email" name="email" id="email" required>

    <label for="password">Пароль:</label>
    <input type="password" name="password" id="password" required>

    <label for="confirm_password">Повтор пароля:</label>
    <input type="password" name="confirm_password" id="confirm_password" required>

    <input type="submit" value="Зарегистрироваться">
</form>
```

3. **Напишите PHP код для обработки формы**: Этот код будет проверять отправленные данные на соответствие определенным правилам.

```php
<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    // Валидация имени пользователя
    if (empty($username) || !preg_match("/^[a-zA-Z0-9]{3,20}$/", $username)) {
        $username_err = "Некорректное имя пользователя"; 
    }

    // Валидация email
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $email_err = "Некорректный email адрес";
    }

    // Валидация пароля
    if (empty($password) || !preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/", $password)) {
        $password_err = "Пароль слишком слабый";
    }

    // Проверка совпадения паролей
    if ($password !== $confirm_password) {
        $confirm_password_err = "Пароли не совпадают";
    }

    // Если ошибок нет, продолжаем обработку данных
    if (empty($username_err) && empty($email_err) && empty($password_err) && empty($confirm_password_err)) {
        // Здесь можно очистить данные и сохранить их в базе данных

        // Пример очистки данных
        $username = htmlspecialchars(strip($username));
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);

        // Далее следует код для работы с базой данных...
    }
}
?>
```

4. **Вывод сообщений об ошибках**:  Отобразите сообщения об ошибках, если таковые имеются, чтобы пользователь мог исправить неверно введенные данные.

```php
<?php if (!empty($username_err)): ?>
    <span class="error"><?php echo $username_err; ?></span>
<?php endif; ?>

<?php if (!empty($email_err)): ?>
    <span class="error"><?php echo $email_err; ?></span>
<?php endif; ?>

<?php if (!empty($password_err)): ?>
    <span class="error"><?php echo $password_err; ?></span>
<?php endif; ?>

<?php if (!empty($confirm_password_err)): ?>
    <span class="error"><?php echo $confirm_password_err; ?></span>
<?php endif; ?>
```

### Заключение

Валидация и очистка данных - это ключевые аспекты обеспечения безопасности и надежности веб-приложений. Использование встроенных функций PHP, регулярных выражений и продуманного подхода к обработке данных поможет защитить приложение от уязвимостей и гарантировать целостность данных. 
