## Сидеры в Laravel 11: Заполнение базы данных тестовыми данными

Сидеры в Laravel предоставляют удобный способ заполнения ваших баз данных тестовыми данными, что особенно полезно при разработке и тестировании приложений. С их помощью вы можете быстро сгенерировать реалистичные наборы данных, необходимые для проверки функциональности вашего приложения в различных сценариях. 

### Создание сидера

Для создания нового сидера используйте команду Artisan `make:seeder`. Например, чтобы создать сидер для таблицы `users`:

```bash
php artisan make:seeder UserSeeder
```

Эта команда создаст новый файл сидера `database/seeders/UserSeeder.php`. Откройте этот файл, и вы увидите базовый класс сидера с методом `run()`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Запуск сидера.
     */
    public function run(): void
    {
        //
    }
}
```

### Заполнение таблицы данными

Метод `run()` выполняется, когда сидер запускается.  Внутри этого метода вы можете использовать любой доступный метод Laravel для заполнения таблицы данными. Наиболее распространенный подход - использование класса `DB`:

```php
use Illuminate\Support\Facades\DB;

// ...

public function run(): void
{
    DB::table('users')->insert([
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => bcrypt('password'),
    ]);
}
```

В этом примере мы добавляем одного пользователя в таблицу `users`. Метод `bcrypt()` используется для хеширования пароля перед сохранением в базу данных.

### Использование фабрик моделей

Для генерации более реалистичных и разнообразных наборов данных удобно использовать фабрики моделей. Фабрики позволяют определить шаблоны для создания экземпляров моделей с различными атрибутами. 

Предположим, у вас есть фабрика модели `User`:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * Определение атрибутов модели.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'),
        ];
    }
}
```

Теперь в сидере вы можете использовать фабрику для создания нескольких пользователей:

```php
use App\Models\User;

// ...

public function run(): void
{
    User::factory()->count(10)->create();
}
```

Этот код создаст 10 пользователей с использованием фабрики `UserFactory`.

### Запуск сидеров

Запустить сидеры можно с помощью команды Artisan `db:seed`:

```bash
php artisan db:seed
```

Эта команда по умолчанию запустит класс `DatabaseSeeder`, который находится в файле `database/seeders/DatabaseSeeder.php`. 

#### Запуск определенного сидера

Чтобы запустить конкретный сидер, используйте опцию `--class`:

```bash
php artisan db:seed --class=UserSeeder
```

#### Вызов сидеров из DatabaseSeeder

В классе `DatabaseSeeder` вы можете вызывать другие сидеры с помощью метода `call()`:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Запуск базы данных сидерами.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            // Другие сидеры
        ]);
    }
}
```

### Заключение

Сидеры - это мощный инструмент для заполнения ваших баз данных тестовыми данными в Laravel. Используя сидеры совместно с фабриками моделей, вы можете легко создавать реалистичные наборы данных, необходимые для разработки и тестирования вашего приложения.
