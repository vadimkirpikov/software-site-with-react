## Валидация данных

Валидация данных является неотъемлемым этапом разработки любого приложения, работающего с пользовательскими данными.  Laravel предоставляет мощный и гибкий механизм валидации, позволяющий легко проверять данные из различных источников, таких как формы HTML, API-запросы и многое другое. 

### Базовая валидация

Для начала рассмотрим простой пример валидации данных формы регистрации пользователя.  

Допустим, у нас есть форма с полями "имя", "email" и "пароль". Мы хотим убедиться, что:

* Поле "имя" обязательно для заполнения и содержит только буквы.
* Поле "email" обязательно для заполнения, имеет корректный формат и является уникальным в базе данных.
* Поле "пароль" обязательно для заполнения и содержит не менее 8 символов.

**1. Создание Request класса:**

Laravel предоставляет удобный способ организации валидации с помощью классов Request. Создайте новый Request класс, выполнив команду в консоли:

```bash
php artisan make:request RegisterRequest
```

**2. Определение правил валидации:**

Откройте файл `app/Http/Requests/RegisterRequest.php` и определите правила валидации в методе `rules()`:

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Определите правила валидации для запроса.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|alpha',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ];
    }
}
```

В данном примере мы используем встроенные правила валидации Laravel:

* `required`: поле обязательно для заполнения.
* `alpha`: поле должно содержать только буквы.
* `email`: поле должно содержать корректный адрес электронной почты.
* `unique:users,email`: значение поля должно быть уникальным в столбце `email` таблицы `users`.
* `min:8`: поле должно содержать не менее 8 символов.

**3. Использование Request класса в контроллере:**

Теперь внедрите созданный `RegisterRequest` класс в метод контроллера, который обрабатывает форму регистрации:

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        // Валидация выполняется автоматически
        // перед выполнением кода метода.

        $user = User::create($request->validated());

        // ... остальной код обработки регистрации
    }
}
```

При вызове метода `register()` Laravel автоматически проверит данные запроса на соответствие правилам, определенным в `RegisterRequest`. 

**4. Отображение ошибок валидации:**

Если валидация не пройдена, Laravel автоматически перенаправит пользователя обратно на предыдущую страницу и передаст ошибки валидации. Отобразить эти ошибки можно с помощью  `$errors` объекта в шаблоне Blade:

```blade
@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
```

### Пользовательские сообщения об ошибках

Вы можете настроить собственные сообщения для каждого правила валидации. Для этого определите метод `messages()` в классе `RegisterRequest`:

```php
/**
 * Получить сообщения об ошибках валидации.
 *
 * @return array<string, string>
 */
public function messages(): array
{
    return [
        'name.required' => 'Пожалуйста, введите ваше имя.',
        'email.unique' => 'Данный email уже зарегистрирован.',
    ];
}
```

### Пользовательские правила валидации

Laravel позволяет создавать собственные правила валидации. Создайте новый класс правила с помощью команды Artisan:

```bash
php artisan make:rule AgeVerification
```

Откройте созданный файл `app/Rules/AgeVerification.php` и определите логику проверки в методе `passes()`:

```php
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class AgeVerification implements Rule
{
    /**
     * Определите, прошло ли правило валидации.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        // Проверяем, является ли возраст 
        // не менее 18 лет.
        return $value >= 18; 
    }

    /**
     * Получить сообщение об ошибке для правила.
     *
     * @return string
     */
    public function message(): string
    {
        return 'Вы должны быть старше 18 лет.';
    }
}
```

Теперь вы можете использовать созданное правило в классе Request:

```php
public function rules(): array
{
    return [
        // ... другие правила
        'age' => ['required', new AgeVerification],
    ];
}
```

### Заключение

В данной статье были рассмотрены базовые возможности валидации данных в Laravel 11. 
Laravel предоставляет мощный и гибкий механизм, позволяющий легко проверять данные, 
обеспечивая безопасность и целостность вашего приложения. 
