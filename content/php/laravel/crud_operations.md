## Операции CRUD в Laravel

Операции CRUD (Create, Read, Update, Delete) — это фундаментальные действия, выполняемые над данными в большинстве веб-приложений. Laravel предоставляет удобный и интуитивно понятный интерфейс для реализации этих операций, значительно упрощая работу с базой данных. 

В этом разделе мы рассмотрим основные методы работы с CRUD в Laravel и продемонстрируем их применение на примере. 

**Предполагается, что у вас уже создано приложение Laravel и настроено подключение к базе данных.**

### Создание ресурса (Create)

Для примера создадим функционал добавления новых записей в таблицу `products`. Предположим, таблица имеет следующие поля: `id`, `name`, `price`, `description`.

1. **Создание модели и миграции:**

   ```bash
   php artisan make:model Product -m
   ```

   Эта команда создаст модель `Product` и файл миграции для таблицы `products`.

2. **Описание полей таблицы в миграции:**

   Откройте файл миграции, находящийся в директории `database/migrations`, и опишите поля таблицы:

   ```php
   <?php

   use Illuminate\Database\Migrations\Migration;
   use Illuminate\Database\Schema\Blueprint;
   use Illuminate\Support\Facades\Schema;

   return new class extends Migration
   {
       public function up(): void
       {
           Schema::create('products', function (Blueprint $table) {
               $table->id();
               $table->string('name');
               $table->decimal('price', 8, 2);
               $table->text('description')->nullable();
               $table->timestamps();
           });
       }

       public function down(): void
       {
           Schema::dropIfExists('products');
       }
   };
   ```

3. **Применение миграции:**

   ```bash
   php artisan migrate
   ```

4. **Создание маршрута:**

   Откройте файл `routes/web.php` и добавьте маршрут для формы создания продукта:

   ```php
   Route::get('/products/create', function () {
       return view('products.create');
   });
   ```

5. **Создание формы:**

   Создайте файл `resources/views/products/create.blade.php` и добавьте HTML-форму:

   ```html
   <h1>Добавить новый продукт</h1>
   <form method="POST" action="{{ route('products.store') }}">
       @csrf
       <div>
           <label for="name">Название:</label>
           <input type="text" name="name" id="name">
       </div>
       <div>
           <label for="price">Цена:</label>
           <input type="number" name="price" id="price" step="0.01">
       </div>
       <div>
           <label for="description">Описание:</label>
           <textarea name="description" id="description"></textarea>
       </div>
       <button type="submit">Сохранить</button>
   </form>
   ```

6. **Создание контроллера (опционально):**

   Для более структурированного кода рекомендуется использовать контроллеры. Создайте контроллер `ProductController`:

   ```bash
   php artisan make:controller ProductController
   ```

7. **Обработка данных формы:**

   В методе `store` контроллера `ProductController` сохраните данные из формы в базу данных:

   ```php
   <?php

   namespace App\Http\Controllers;

   use App\Models\Product;
   use Illuminate\Http\Request;

   class ProductController extends Controller
   {
       public function store(Request $request)
       {
           $product = new Product();
           $product->name = $request->input('name');
           $product->price = $request->input('price');
           $product->description = $request->input('description');
           $product->save();

           return redirect('/products'); // Замените на нужный URL
       }
   }
   ```

8. **Обновление маршрута:**

   Измените маршрут в файле `routes/web.php`, чтобы он указывал на метод `store` контроллера:

   ```php
   use App\Http\Controllers\ProductController;

   Route::post('/products', [ProductController::class, 'store'])->name('products.store');
   ```

Теперь, при отправке формы, данные будут сохранены в таблицу `products`.

### Чтение данных (Read)

1. **Создание маршрута для отображения списка продуктов:**

   ```php
   Route::get('/products', [ProductController::class, 'index'])->name('products.index');
   ```

2. **Добавление метода `index` в контроллер:**

   ```php
   public function index()
   {
       $products = Product::all(); // Получаем все продукты из базы данных
       return view('products.index', ['products' => $products]);
   }
   ```

3. **Создание представления для списка продуктов:**

   Создайте файл `resources/views/products/index.blade.php` и выведите список продуктов:

   ```html
   <h1>Список продуктов</h1>
   <ul>
       @foreach ($products as $product)
           <li>{{ $product->name }} - ${{ $product->price }}</li>
       @endforeach
   </ul>
   ```

Теперь при переходе по адресу `/products` будет отображаться список всех продуктов.

### Обновление ресурса (Update)

1. **Создание маршрута для формы редактирования:**

   ```php
   Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
   ```

2. **Добавление метода `edit` в контроллер:**

   ```php
   public function edit(Product $product)
   {
       return view('products.edit', ['product' => $product]);
   }
   ```

3. **Создание формы редактирования:**

   Создайте файл `resources/views/products/edit.blade.php` и добавьте форму:

   ```html
   <h1>Редактировать продукт</h1>
   <form method="POST" action="{{ route('products.update', $product) }}">
       @csrf
       @method('PUT')
       <div>
           <label for="name">Название:</label>
           <input type="text" name="name" id="name" value="{{ $product->name }}">
       </div>
       <div>
           <label for="price">Цена:</label>
           <input type="number" name="price" id="price" step="0.01" value="{{ $product->price }}">
       </div>
       <div>
           <label for="description">Описание:</label>
           <textarea name="description" id="description">{{ $product->description }}</textarea>
       </div>
       <button type="submit">Обновить</button>
   </form>
   ```

4. **Создание маршрута для обновления продукта:**

   ```php
   Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
   ```

5. **Добавление метода `update` в контроллер:**

   ```php
   public function update(Request $request, Product $product)
   {
       $product->name = $request->input('name');
       $product->price = $request->input('price');
       $product->description = $request->input('description');
       $product->save();

       return redirect('/products'); // Замените на нужный URL
   }
   ```

Теперь вы можете редактировать информацию о продуктах через форму.

### Удаление ресурса (Delete)

1. **Добавление кнопки удаления в `index.blade.php`:**

   ```html
   <form method="POST" action="{{ route('products.destroy', $product) }}">
       @csrf
       @method('DELETE')
       <button type="submit">Удалить</button>
   </form>
   ```

2. **Создание маршрута для удаления:**

   ```php
   Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
   ```

3. **Добавление метода `destroy` в контроллер:**

   ```php
   public function destroy(Product $product)
   {
       $product->delete();

       return redirect('/products'); // Замените на нужный URL
   }
   ```

Теперь вы можете удалять продукты, нажимая кнопку "Удалить".

Это базовый пример реализации операций CRUD в Laravel. Фреймворк предоставляет множество возможностей для кастомизации и оптимизации работы с данными, которые будут рассмотрены в следующих разделах руководства.
