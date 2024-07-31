## Ресурсные контроллеры в Laravel

Ресурсные контроллеры в Laravel - это мощный инструмент, упрощающий разработку веб-приложений, управляемых ресурсами. Они предоставляют удобный способ организации логики маршрутизации и контроллеров для стандартных операций CRUD (создание, чтение, обновление, удаление) над ресурсами приложения.

### Создание ресурсного контроллера

Для создания ресурсного контроллера используйте команду `artisan`:

```bash
php artisan make:controller PhotoController --resource
```

Эта команда сгенерирует класс `PhotoController` в директории `app/Http/Controllers` с заготовками методов для всех операций CRUD:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    /**
     * Отобразить список всех фотографий.
     */
    public function index()
    {
        // Логика для отображения списка фотографий
    }

    /**
     * Показать форму для создания новой фотографии.
     */
    public function create()
    {
        // Логика для отображения формы создания фотографии
    }

    /**
     * Сохранить новую фотографию в хранилище.
     */
    public function store(Request $request)
    {
        // Логика для сохранения новой фотографии
    }

    /**
     * Отобразить указанную фотографию.
     */
    public function show(string $id)
    {
        // Логика для отображения фотографии с заданным ID
    }

    /**
     * Показать форму для редактирования указанной фотографии.
     */
    public function edit(string $id)
    {
        // Логика для отображения формы редактирования фотографии
    }

    /**
     * Обновить указанную фотографию в хранилище.
     */
    public function update(Request $request, string $id)
    {
        // Логика для обновления фотографии
    }

    /**
     * Удалить указанную фотографию из хранилища.
     */
    public function destroy(string $id)
    {
        // Логика для удаления фотографии
    }
}
```

### Регистрация маршрутов ресурсного контроллера

Laravel предоставляет удобный способ регистрации всех маршрутов ресурсного контроллера с помощью метода `Route::resource()`:

```php
// routes/web.php

use App\Http\Controllers\PhotoController;

Route::resource('photos', PhotoController::class);
```

Эта строка кода сгенерирует следующие маршруты:

| HTTP-метод | URI | Метод контроллера | Назначение |
|---|---|---|---|
| GET | `/photos` | `index` | Отображение списка всех фотографий |
| GET | `/photos/create` | `create` | Отображение формы создания фотографии |
| POST | `/photos` | `store` | Сохранение новой фотографии |
| GET | `/photos/{photo}` | `show` | Отображение указанной фотографии |
| GET | `/photos/{photo}/edit` | `edit` | Отображение формы редактирования фотографии |
| PUT/PATCH | `/photos/{photo}` | `update` | Обновление указанной фотографии |
| DELETE | `/photos/{photo}` | `destroy` | Удаление указанной фотографии |

### Пример использования

Рассмотрим пример создания функционала для управления фотографиями:

**1. Создание модели и миграции:**

```bash
php artisan make:model Photo -m
```

В файле миграции `database/migrations/*_create_photos_table.php` добавьте необходимые поля:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotosTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->string('image_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
}
```

Запустите миграцию:

```bash
php artisan migrate
```

**2. Создание ресурсного контроллера:**

```bash
php artisan make:controller PhotoController --resource
```

**3. Регистрация маршрутов:**

```php
// routes/web.php

use App\Http\Controllers\PhotoController;

Route::resource('photos', PhotoController::class);
```

**4. Реализация логики методов контроллера:**

```php
<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    /**
     * Отобразить список всех фотографий.
     */
    public function index()
    {
        $photos = Photo::all();
        return view('photos.index', compact('photos'));
    }

    /**
     * Показать форму для создания новой фотографии.
     */
    public function create()
    {
        return view('photos.create');
    }

    /**
     * Сохранить новую фотографию в хранилище.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'image' => 'required|image',
        ]);

        $imagePath = $request->file('image')->store('photos', 'public');

        Photo::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'image_path' => $imagePath,
        ]);

        return redirect()->route('photos.index');
    }

    /**
     * Отобразить указанную фотографию.
     */
    public function show(Photo $photo)
    {
        return view('photos.show', compact('photo'));
    }

    /**
     * Показать форму для редактирования указанной фотографии.
     */
    public function edit(Photo $photo)
    {
        return view('photos.edit', compact('photo'));
    }

    /**
     * Обновить указанную фотографию в хранилище.
     */
    public function update(Request $request, Photo $photo)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $photo->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ]);

        return redirect()->route('photos.show', $photo);
    }

    /**
     * Удалить указанную фотографию из хранилища.
     */
    public function destroy(Photo $photo)
    {
        $photo->delete();

        return redirect()->route('photos.index');
    }
}
```

**5. Создание шаблонов Blade:**

Создайте необходимые шаблоны Blade для отображения списка фотографий, формы создания, редактирования и просмотра фотографий.

**Заключение:**

Ресурсные контроллеры в Laravel предоставляют удобный способ организации кода и сокращают количество шаблонного кода, необходимого для создания CRUD-интерфейсов. Они делают ваш код более читаемым, maintainable и позволяют быстро создавать функциональные части вашего приложения.
