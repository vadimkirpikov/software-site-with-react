## Основы создания RESTful API в Laravel

Laravel, как мощный PHP-фреймворк, предоставляет инструменты для быстрого и эффективного создания RESTful API. В этой статье мы рассмотрим основные этапы создания простого API для работы с ресурсом "товары".

### 1. Создание модели и миграции

Первым шагом создадим модель `Product` и соответствующую ей миграцию для таблицы `products`.

```bash
php artisan make:model Product -m
```

Откройте созданную миграцию в директории `database/migrations` и добавьте необходимые поля:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Запуск миграции
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Отмена миграции
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

```

Примените миграции:

```bash
php artisan migrate
```

### 2. Создание контроллера ресурсов

Создадим контроллер `ProductController`, который будет обрабатывать HTTP-запросы, связанные с ресурсом "товары".

```bash
php artisan make:controller ProductController --resource
```

Laravel автоматически сгенерирует методы для основных CRUD-операций. Откройте файл `app/Http/Controllers/ProductController.php`.

### 3. Реализация логики контроллера

Теперь реализуем логику для каждого метода контроллера.

```php
<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Отображение списка товаров.
     */
    public function index()
    {
        $products = Product::all();

        return response()->json($products);
    }

    /**
     * Создание нового товара.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create($request->all());

        return response()->json($product, 201);
    }

    /**
     * Отображение товара.
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Обновление товара.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
        ]);

        $product->update($request->all());

        return response()->json($product);
    }

    /**
     * Удаление товара.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->noContent();
    }
}
```

### 4. Определение маршрутов

Откройте файл `routes/api.php` и добавьте маршруты для вашего ресурса:

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::apiResource('products', ProductController::class);

```

### 5. Тестирование API

После выполнения этих шагов у вас есть простой RESTful API для работы с товарами. Вы можете протестировать его с помощью инструментов, таких как Postman или Insomnia, отправляя HTTP-запросы на соответствующие маршруты.

#### Пример запроса на создание товара:

**Метод:** POST

**URL:** /api/products

**Тело запроса:**

```json
{
  "name": "New Product",
  "description": "Description of the new product.",
  "price": 19.99
}
```

В этой статье мы рассмотрели базовые принципы создания RESTful API в Laravel. В следующих разделах руководства мы углубимся в более сложные темы, такие как аутентификация, авторизация, обработка ошибок, использование трансформаторов и многое другое.
