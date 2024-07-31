## Основы использования шаблонизатора Blade в Laravel

Blade - это простой, но мощный шаблонизатор, встроенный в Laravel. Он позволяет вам использовать простой PHP-код в ваших представлениях, а также предоставляет удобные сокращения для общих задач.

### Преимущества Blade:

* **Наследование шаблонов:** Позволяет создавать базовые шаблоны с общими элементами дизайна и наследовать их в дочерних шаблонах.
* **Директивы:** Упрощают выполнение общих задач, таких как циклы, условные операторы и включение подшаблонов.
* **Кэширование скомпилированных шаблонов:** Blade компилирует ваши шаблоны в чистый PHP-код и кэширует их для повышения производительности.

### Создание Blade шаблона:

1. Создайте новый файл шаблона в директории `resources/views`, например, `welcome.blade.php`.

2. Добавьте в файл желаемый HTML-код.

### Отображение данных:

Для отображения данных в шаблоне Blade используйте двойные фигурные скобки `{{ }}`. 

```html
<h1>{{ $title }}</h1>
<p>{{ $content }}</p>
```

В этом примере `$title` и `$content` - переменные, которые будут переданы в шаблон из контроллера.

**Пример:**

**Контроллер:**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        $title = 'Добро пожаловать!';
        $content = 'Это ваш первый шаг в мир Blade.';

        return view('welcome', [
            'title' => $title,
            'content' => $content,
        ]);
    }
}
```

**Шаблон `welcome.blade.php`:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{ $title }}</title>
</head>
<body>
    <h1>{{ $title }}</h1>
    <p>{{ $content }}</p>
</body>
</html>
```

### Директивы Blade:

Директивы Blade предоставляют сокращения для общих задач в ваших шаблонах. 

#### @if, @elseif, @else, @endif

Директивы `@if`, `@elseif`, `@else` и `@endif` используются для создания условных блоков кода.

**Пример:**

```html
@if ($age >= 18)
    Вы совершеннолетний.
@elseif ($age >= 16)
    Вам почти 18.
@else
    Вы несовершеннолетний.
@endif
```

#### @for, @foreach, @forelse, @empty, @endfor, @endforeach

Директивы цикла используются для итерации по массивам или коллекциям.

**Пример:**

```html
<h2>Список продуктов:</h2>
<ul>
@foreach ($products as $product)
    <li>{{ $product->name }} - ${{ $product->price }}</li>
@endforeach
</ul>
```

#### @include

Директива `@include` используется для включения других шаблонов Blade в текущий шаблон.

**Пример:**

```html
<header>
    @include('partials.header')
</header>
```

#### @yield, @section, @endsection, @parent

Директивы `@yield`, `@section`, `@endsection` и `@parent` используются для наследования шаблонов.

**Базовый шаблон `layouts/app.blade.php`:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
</head>
<body>
    @yield('content')
</body>
</html>
```

**Дочерний шаблон `about.blade.php`:**

```html
@extends('layouts.app')

@section('title', 'О нас')

@section('content')
    <h1>О нас</h1>
    <p>Это страница "О нас".</p>
@endsection
```

### Вывод данных с экранированием:

Для предотвращения XSS-уязвимостей Blade предоставляет механизм экранирования данных. 

Используйте двойные фигурные скобки `{{ }}` для автоматического экранирования данных.

**Пример:**

```html
<p>{{ $comment }}</p> 
```

Если вам нужно вывести данные без экранирования, используйте директиву `{!! !!}`. 

**Пример:**

```html
{!! $formattedText !!}
```

### Создание собственных директив:

Вы можете создавать свои собственные директивы Blade для выполнения часто используемых задач.

**Пример:**

```php
<?php

// В файле App/Providers/AppServiceProvider.php

public function boot()
{
    Blade::directive('formatPrice', function ($expression) {
        return "<?php echo number_format($expression, 2); ?>";
    });
}
```

**Использование директивы:**

```html
<p>Цена: @formatPrice($price)</p>
```

Это лишь базовые основы использования шаблонизатора Blade. Более подробную информацию о всех возможностях Blade вы можете найти в официальной документации Laravel. 
