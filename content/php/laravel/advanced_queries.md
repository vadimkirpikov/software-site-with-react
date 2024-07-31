## Продвинутые запросы и фильтрация данных

Работа с базой данных - неотъемлемая часть большинства веб-приложений. Laravel предоставляет мощный и элегантный инструментарий для взаимодействия с данными, выходящий за рамки простых запросов. В этой статье мы рассмотрим продвинутые техники выполнения запросов и фильтрации данных в Laravel 11, которые позволят вам писать более эффективный и гибкий код.

### Построение запросов с помощью Query Builder

Query Builder - это компонент Laravel, предоставляющий удобный интерфейс для построения SQL-запросов с использованием PHP кода. Он абстрагирует вас от необходимости писать чистый SQL, делая код более читаемым и переносимым между различными СУБД.

#### 1. Условия Where

Условия `where` используются для фильтрации данных по определенным критериям. 

```php
// Найти всех пользователей с email 'john@example.com'
$user = DB::table('users')->where('email', 'john@example.com')->first();

// Найти всех пользователей, зарегистрированных после 1 января 2023 года
$users = DB::table('users')->where('created_at', '>', '2023-01-01')->get();
```

#### 2. Операторы сравнения

Query Builder поддерживает все стандартные операторы сравнения SQL: `=`, `!=`, `<`, `>`, `<=`, `>=`, `like`, `not like`, `in`, `not in`.

```php
// Найти всех пользователей, имя которых не равно 'John'
$users = DB::table('users')->where('name', '!=', 'John')->get();

// Найти всех пользователей, email которых содержит 'example.com'
$users = DB::table('users')->where('email', 'like', '%example.com%')->get();
```

#### 3. Логические операторы

Для объединения нескольких условий в запросе используются логические операторы `and`, `or`, `not`.

```php
// Найти всех пользователей с именем 'John' и возрастом больше 30 лет
$users = DB::table('users')
            ->where('name', 'John')
            ->where('age', '>', 30)
            ->get();

// Найти всех пользователей с именем 'John' или 'Jane'
$users = DB::table('users')
            ->where('name', 'John')
            ->orWhere('name', 'Jane')
            ->get();
```

#### 4. Группировка условий

Для более сложных условий можно использовать методы `where` вложенно или группировать их с помощью `where` closures.

```php
// Найти всех пользователей с именем 'John' и возрастом больше 30 лет, или с email 'jane@example.com'
$users = DB::table('users')
            ->where(function ($query) {
                $query->where('name', 'John')
                      ->where('age', '>', 30);
            })
            ->orWhere('email', 'jane@example.com')
            ->get();
```

#### 5. Сортировка и лимиты

Query Builder позволяет сортировать результаты запроса и ограничивать количество возвращаемых записей.

```php
// Найти 10 самых старых пользователей, отсортированных по возрастанию даты регистрации
$users = DB::table('users')
            ->orderBy('created_at', 'asc')
            ->limit(10)
            ->get();
```

### Eloquent ORM: Продвинутые возможности

Eloquent ORM - это реализация паттерна Active Record в Laravel, позволяющая взаимодействовать с базой данных с использованием объектов PHP. 

#### 1. Отношения между моделями

Eloquent позволяет определить отношения между различными моделями, что упрощает работу с данными, связанными с несколькими таблицами.

```php
// Модель User
class User extends Model
{
    public function posts()
    {
        return $this->hasMany(Post::class); // User может иметь много постов
    }
}

// Модель Post
class Post extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class); // Post принадлежит одному User
    }
}

// Получить все посты пользователя с id = 1
$posts = User::find(1)->posts;
```

#### 2. Eager Loading

Eager loading - это техника, позволяющая загрузить связанные данные вместе с основной моделью, что позволяет избежать проблемы N+1 запросов.

```php
// Получить всех пользователей и их посты (без eager loading) - N+1 запросов
$users = User::all();
foreach ($users as $user) {
    echo $user->posts->count();
}

// Получить всех пользователей и их посты (с eager loading) - 2 запроса
$users = User::with('posts')->get();
foreach ($users as $user) {
    echo $user->posts->count();
}
```

#### 3. Локальные scopes

Локальные scopes позволяют создавать многократно используемые методы для построения запросов в Eloquent моделях.

```php
// Модель User
class User extends Model
{
    // Scope для поиска пользователей по возрасту
    public function scopeOlderThan($query, $age)
    {
        return $query->where('age', '>', $age);
    }
}

// Найти всех пользователей старше 30 лет
$users = User::olderThan(30)->get();
```

#### 4. Глобальные scopes

Глобальные scopes применяются ко всем запросам к модели и позволяют автоматически модифицировать их поведение.

```php
// Определить глобальный scope для автоматического добавления условия 'active = 1'
class ActiveScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('active', 1);
    }
}

// Применить глобальный scope к модели User
class User extends Model
{
    protected static function booted()
    {
        static::addGlobalScope(new ActiveScope);
    }
}

// Теперь все запросы к модели User будут автоматически фильтровать активных пользователей
$users = User::all(); // Вернет только активных пользователей
```

### Фильтрация данных на основе запросов

#### 1. Фильтрация с помощью Query Strings

Query strings - это параметры, передаваемые в URL после знака вопроса. Laravel предоставляет удобные методы для работы с ними.

```php
// URL: /users?name=John&age=30

// Получить значение параметра 'name'
$name = request('name');

// Построить запрос с фильтрацией по имени и возрасту
$users = DB::table('users')
            ->when(request('name'), function ($query, $name) {
                return $query->where('name', $name);
            })
            ->when(request('age'), function ($query, $age) {
                return $query->where('age', $age);
            })
            ->get();
```

#### 2. Создание собственных фильтров

Для более сложной фильтрации можно создавать собственные классы фильтров.

```php
// Класс фильтра для модели User
class UserFilter extends QueryFilter
{
    public function name($name)
    {
        return $this->builder->where('name', 'like', "%$name%");
    }

    public function age($age)
    {
        return $this->builder->where('age', $age);
    }
}

// Применить фильтр к запросу
$users = User::query()
            ->filter(new UserFilter(request()->all()))
            ->get();
```

### Заключение

В этой статье мы рассмотрели продвинутые техники построения запросов и фильтрации данных в Laravel 11. Использование Query Builder, Eloquent ORM, scopes и фильтров позволяет писать более читаемый, эффективный и гибкий код для взаимодействия с базой данных. 
