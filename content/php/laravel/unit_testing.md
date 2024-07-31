## Модульное тестирование в Laravel 11

Модульное тестирование – неотъемлемая часть разработки качественного программного обеспечения. Laravel предоставляет удобную среду для написания и запуска тестов, позволяя проверить работоспособность отдельных компонентов приложения в изоляции. 

### Настройка окружения для тестирования

Laravel по умолчанию настроен для проведения тестов. Файл `phpunit.xml` в корне проекта содержит конфигурацию PHPUnit, а директория `tests` – все необходимые файлы для тестирования.

Важно убедиться, что в файле `.env.testing` указаны корректные настройки окружения для тестирования, например, подключение к тестовой базе данных.

### Создание тестового класса

Создайте новый тестовый класс с помощью команды Artisan:

```bash
php artisan make:test UserTest
```

Эта команда создаст файл `tests/Feature/UserTest.php` со следующим содержимым:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Пример теста.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
```

### Типы тестов

Laravel поддерживает два типа тестов:

* **Feature тесты:** Используются для проверки функциональности приложения в целом, имитируя действия пользователя.
* **Unit тесты:** Предназначены для тестирования отдельных классов и методов в изоляции.

### Запуск тестов

Для запуска всех тестов выполните команду:

```bash
php artisan test
```

Для запуска конкретного тестового класса или метода используйте флаги `--filter`:

```bash
# Запуск всех тестов в классе UserTest
php artisan test --filter UserTest

# Запуск теста test_example в классе UserTest
php artisan test --filter UserTest::test_example
```

### Пример теста Feature

Представим, что у нас есть маршрут `/users`, который возвращает список всех пользователей в формате JSON. 

Создайте файл теста `tests/Feature/UserTest.php` со следующим содержимым:

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Тест получения списка пользователей.
     */
    public function test_get_users_list(): void
    {
        // Создаем двух пользователей в базе данных
        User::factory()->count(2)->create();

        // Выполняем GET-запрос к маршруту /users
        $response = $this->get('/users');

        // Проверяем, что ответ имеет статус 200
        $response->assertStatus(200);

        // Проверяем, что ответ содержит данные о двух пользователях
        $response->assertJsonCount(2);
    }
}
```

В данном тесте мы:

1. Используем трейт `RefreshDatabase` для очистки и миграции базы данных перед каждым тестом.
2. Создаем двух пользователей с помощью фабрики моделей.
3. Выполняем GET-запрос к маршруту `/users` с помощью метода `get()`.
4. Проверяем HTTP-статус ответа с помощью метода `assertStatus()`.
5. Проверяем количество элементов в JSON-ответе с помощью метода `assertJsonCount()`.

### Пример теста Unit

Представим, что у нас есть класс `Calculator` с методом `sum()`, который складывает два числа.

Создайте файл теста `tests/Unit/CalculatorTest.php` со следующим содержимым:

```php
<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\Calculator;

class CalculatorTest extends TestCase
{
    /**
     * Тест метода сложения.
     */
    public function test_sum_method(): void
    {
        // Создаем экземпляр класса Calculator
        $calculator = new Calculator();

        // Вызываем метод sum() с аргументами 5 и 3
        $result = $calculator->sum(5, 3);

        // Проверяем, что результат равен 8
        $this->assertEquals(8, $result);
    }
}
```

В данном тесте мы:

1. Создаем экземпляр класса `Calculator`.
2. Вызываем метод `sum()` с тестовыми данными.
3. Проверяем корректность результата с помощью метода `assertEquals()`.

### Ассерты

Laravel предоставляет множество ассертов для проверки различных условий в тестах:

| Ассерт | Описание |
|---|---|
| `assertStatus(int $code)` | Проверяет HTTP-статус ответа. |
| `assertSee(string $text)` | Проверяет наличие текста в ответе. |
| `assertJson(array $data)` | Проверяет, что ответ является валидным JSON и содержит указанные данные. |
| `assertDatabaseHas(string $table, array $data)` | Проверяет наличие записи в базе данных. |
| `assertEquals(mixed $expected, mixed $actual)` | Проверяет равенство значений. |

### Заключение

Модульное тестирование является важной частью разработки на Laravel. Framework предоставляет все необходимые инструменты для написания, запуска и анализа тестов, что позволяет создавать надежное и maintainable приложение.