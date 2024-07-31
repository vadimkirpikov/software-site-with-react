## Аутентификация API в Laravel с использованием Passport и Sanctum

В современных веб-приложениях API играют ключевую роль, обеспечивая взаимодействие фронтенда и бэкенда. Безопасность этих взаимодействий имеет первостепенное значение, и аутентификация является важнейшим аспектом этой безопасности. В экосистеме Laravel есть два мощных инструмента для аутентификации API: Passport и Sanctum.

### Laravel Passport: OAuth2 сервер для комплексных приложений

Passport, построенный на базе  League OAuth2 Server, предоставляет полноценную реализацию OAuth2 сервера непосредственно в вашем Laravel приложении. Он идеально подходит для комплексных приложений, где требуется детальный контроль над процессом аутентификации, а также поддержка различных типов грантов OAuth2 (authorization code, password, client credentials и др.).

**Установка и настройка Passport:**

1. Установка пакета через Composer:
   ```bash
   composer require laravel/passport
   ```
2. Запуск миграций и установки Passport:
   ```bash
   php artisan migrate
   php artisan passport:install
   ```
3. Регистрация Passport Service Provider:
   ```php
   // В файле config/app.php
   'providers' => [
       // ...
       Laravel\Passport\PassportServiceProvider::class,
   ],
   ```
4. Добавление трейта `HasApiTokens` к модели пользователя:
   ```php
   // В файле app/Models/User.php
   use Laravel\Passport\HasApiTokens;
   
   class User extends Authenticatable
   {
       use HasApiTokens, HasFactory, Notifiable;
       // ...
   }
   ```

**Создание клиента и получение токена:**

Passport предоставляет удобный набор artisan-команд для управления клиентами OAuth2. Создайте нового клиента (например, для SPA):

```bash
php artisan passport:client --password --name="SPA Application"
```

В результате вы получите client ID и client secret, которые понадобятся для получения токена доступа. Сам процесс получения токена будет зависеть от выбранного типа гранта OAuth2.

**Защита маршрутов:**

Для защиты маршрутов API с помощью Passport используется middleware `auth:api`. Добавьте его в ваши маршруты:

```php
Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
```

**Пример использования:**

```php
// Отправка POST-запроса для получения токена (password grant)
$response = Http::asForm()->post('/oauth/token', [
    'grant_type' => 'password',
    'client_id' => 'your-client-id',
    'client_secret' => 'your-client-secret',
    'username' => 'user@example.com',
    'password' => 'password',
    'scope' => '',
]);

// Получение токена доступа из ответа
$accessToken = $response->json()['access_token'];

// Выполнение запроса к защищенному маршруту с токеном
$response = Http::withToken($accessToken)->get('/api/user');

// Обработка ответа
$userData = $response->json();
```

### Laravel Sanctum: Простая аутентификация для SPA и мобильных приложений

Sanctum предоставляет более простой подход к аутентификации API, идеально подходящий для одностраничных приложений (SPA) и мобильных приложений. Он использует токены API, хранящиеся в cookies, что упрощает процесс аутентификации и работы с запросами.

**Установка и настройка Sanctum:**

1. Установка пакета:
   ```bash
   composer require laravel/sanctum
   ```

2. Публикация конфигурационного файла и миграций:
   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   php artisan migrate
   ```

3. Добавление трейта `HasApiTokens` к модели пользователя:
   ```php
   // В файле app/Models/User.php
   use Laravel\Sanctum\HasApiTokens;
   
   class User extends Authenticatable
   {
       use HasApiTokens, HasFactory, Notifiable;
       // ...
   }
   ```

**Аутентификация пользователя:**

Sanctum предоставляет метод `createToken` для создания токенов API:

```php
use Illuminate\Http\Request;

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $user = $request->user();
        $token = $user->createToken('token-name')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    return response()->json(['error' => 'Unauthorized'], 401);
});
```

**Защита маршрутов:**

Защита маршрутов с помощью Sanctum осуществляется с помощью middleware `auth:sanctum`:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
```

**Пример использования:**

```javascript
// Отправка POST-запроса для аутентификации
const response = await fetch('/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password'
  })
});

// Получение токена из ответа
const data = await response.json();
const token = data.token;

// Сохранение токена (например, в localStorage)
localStorage.setItem('token', token);

// Добавление токена в заголовки запросов
const headers = {
  'Authorization': `Bearer ${token}`
};

// Выполнение запроса к защищенному маршруту
const userResponse = await fetch('/api/user', { headers });
const userData = await userResponse.json();
```

### Выбор между Passport и Sanctum

| Особенность            | Passport                                           | Sanctum                                    |
|-------------------------|---------------------------------------------------|--------------------------------------------|
| **Тип приложения**     | Комплексные приложения, API для третьих лиц     | SPA, мобильные приложения, простые API   |
| **Сложность**           | Высокая                                            | Низкая                                     |
| **OAuth2**             | Поддерживает все типы грантов                    | Не поддерживает OAuth2                      |
| **Хранение токенов**    | База данных                                        | Cookies, заголовки Bearer                  |
| **Гибкость**            | Высокая                                            | Низкая                                     |

Выбор между Passport и Sanctum зависит от конкретных требований вашего проекта. Passport обеспечивает максимальную гибкость и возможности, в то время как Sanctum предлагает простой и лаконичный подход для аутентификации API в приложениях, где не требуется полная функциональность OAuth2.
