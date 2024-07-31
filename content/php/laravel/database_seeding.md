## Наполнение базы данных сидерами

Сидеры в Laravel — это механизм для наполнения базы данных тестовыми данными. Они упрощают разработку, позволяя быстро создавать начальное состояние базы данных для тестирования и демонстрации функционала приложения. Вместо ручного добавления записей через интерфейс администратора или SQL-запросы, можно использовать PHP-классы для генерации данных.

### Создание сидера

Для создания нового сидера выполните команду Artisan:

```bash
php artisan make:seeder ProductSeeder
```

Эта команда создаст файл `database/seeders/ProductSeeder.php`, содержащий класс `ProductSeeder`. 

### Структура сидера

Файл сидера содержит класс с методом `run()`, в котором описывается логика генерации и добавления данных в базу данных. 

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Заполнение базы данных данными о товарах.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            'name' => 'Товар 1',
            'description' => 'Описание товара 1',
            'price' => 100,
        ]);

        DB::table('products')->insert([
            'name' => 'Товар 2',
            'description' => 'Описание товара 2',
            'price' => 200,
        ]);
    }
}
```

В примере выше метод `run()` добавляет две записи в таблицу `products`. 

### Использование фабрик моделей

Для генерации более реалистичных данных удобно использовать фабрики моделей. Фабрики позволяют определить шаблоны данных и генерировать массивы атрибутов модели.

Создайте фабрику модели `Product` с помощью команды:

```bash
php artisan make:factory ProductFactory --model=Product
```

Откройте файл `database/factories/ProductFactory.php` и определите атрибуты модели:

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Определение состояния модели по умолчанию.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 10, 1000),
        ];
    }
}
```

В этом примере для генерации случайных значений используется объект `$this->faker`, предоставляющий различные методы для создания реалистичных данных.

Теперь измените сидер `ProductSeeder` для использования фабрики:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Заполнение базы данных данными о товарах.
     */
    public function run(): void
    {
        Product::factory()->count(10)->create();
    }
}
```

Этот код сгенерирует 10 записей о товарах с разными случайными значениями атрибутов.

### Запуск сидеров

Для запуска всех сидеров выполните команду:

```bash
php artisan db:seed
```

Для запуска конкретного сидера укажите его имя:

```bash
php artisan db:seed --class=ProductSeeder
```

### Класс `DatabaseSeeder`

Laravel предоставляет класс `DatabaseSeeder`, который используется для запуска группы сидеров. Файл `database/seeders/DatabaseSeeder.php` уже создан в вашем проекте. 

Добавьте вызов нужных сидеров в метод `run()` класса `DatabaseSeeder`:

```php
<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Запуск базы данных.
     */
    public function run(): void
    {
        $this->call([
            ProductSeeder::class,
            // Другие сидеры...
        ]);
    }
}
```

Теперь при запуске команды `php artisan db:seed` будут выполнены все сидеры, перечисленные в методе `call()`.

### Вывод

Сидеры — полезный инструмент для наполнения базы данных тестовыми данными.  Они упрощают разработку, позволяя быстро создавать начальное состояние базы данных для тестирования и демонстрации функционала приложения. Используйте фабрики моделей для генерации реалистичных данных и класс `DatabaseSeeder` для запуска группы сидеров. 
