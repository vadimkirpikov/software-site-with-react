## Настройка аутентификации в ASP.NET Core 8.0

Аутентификация - неотъемлемая часть большинства веб-приложений. Она позволяет идентифицировать пользователей и предоставлять им доступ к ресурсам на основе их ролей и разрешений. ASP.NET Core предлагает гибкую и расширяемую платформу для настройки аутентификации в ваших приложениях.

В этой статье мы рассмотрим основы настройки аутентификации в ASP.NET Core 8.0, используя возможности, предоставляемые файлом `Program.cs`.

### Выбор схемы аутентификации

ASP.NET Core поддерживает различные схемы аутентификации, включая:

- **Cookie-based authentication:** Использует куки для хранения информации об аутентификации пользователя. Это наиболее распространенная схема для веб-приложений.
- **Token-based authentication (JWT, Bearer):** Использует токены безопасности (JSON Web Tokens) для аутентификации и авторизации. Подходит для API и приложений с использованием микросервисной архитектуры.
- **External authentication:** Позволяет пользователям аутентифицироваться с помощью внешних провайдеров, таких как Google, Facebook, Twitter и др.

Выбор схемы аутентификации зависит от требований вашего приложения. В рамках этой статьи мы сосредоточимся на настройке аутентификации на основе cookie.

### Настройка сервисов аутентификации

Для начала настроим необходимые сервисы аутентификации в методе `builder.Services` файла `Program.cs`:

```csharp
// Program.cs
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login"; // Страница входа
        options.AccessDeniedPath = "/Account/AccessDenied"; // Страница отказа в доступе
        // Другие настройки cookie
    });
```

В этом коде мы:

1. Вызываем `AddAuthentication` для регистрации сервисов аутентификации. 
2. Указываем `CookieAuthenticationDefaults.AuthenticationScheme` в качестве схемы аутентификации по умолчанию.
3. Вызываем `AddCookie` для настройки параметров аутентификации на основе cookie, таких как пути к страницам входа и отказа в доступе.

### Настройка middleware аутентификации

После настройки сервисов необходимо добавить middleware аутентификации в конвейер обработки запросов. Добавьте следующий код в метод `app.Use...` в файле `Program.cs`:

```csharp
// Program.cs
app.UseAuthentication();
app.UseAuthorization();
```

`app.UseAuthentication()` добавляет middleware аутентификации, который отвечает за обработку запросов аутентификации, проверку подлинности пользователей и установку контекста пользователя. 
`app.UseAuthorization()` добавляет middleware авторизации, который проверяет, есть ли у аутентифицированного пользователя доступ к запрашиваемому ресурсу.

### Создание контроллера и представлений аутентификации

Теперь создайте контроллер `AccountController` и представления для обработки входа, выхода и отказа в доступе:

```csharp
// Controllers/AccountController.cs
public class AccountController : Controller
{
    [HttpGet]
    public IActionResult Login(string returnUrl = null)
    {
        // Логика отображения страницы входа
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
    {
        // Логика проверки учетных данных пользователя
        if (ModelState.IsValid)
        {
            // Создание ClaimsPrincipal для аутентифицированного пользователя
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, model.Username),
                // Другие claims...
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            // Вход пользователя
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            // Перенаправление на returnUrl или на главную страницу
            return RedirectToLocal(returnUrl);
        }

        // Ошибка входа
        return View(model);
    }

    [HttpGet]
    public async Task<IActionResult> Logout()
    {
        // Выход пользователя
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index", "Home");
    }

    [HttpGet]
    public IActionResult AccessDenied()
    {
        // Логика отображения страницы отказа в доступе
        return View();
    }

    private IActionResult RedirectToLocal(string returnUrl)
    {
        if (Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        else
        {
            return RedirectToAction("Index", "Home");
        }
    }
}
```

### Защита контроллеров и действий

Для защиты контроллеров и действий от неаутентифицированного доступа используйте атрибут `[Authorize]`:

```csharp
// Controllers/HomeController.cs
[Authorize] // Только для аутентифицированных пользователей
public class HomeController : Controller
{
    // ...
}
```

### Заключение

В этой статье мы рассмотрели основы настройки аутентификации на основе cookie в ASP.NET Core 8.0. Вы узнали, как настроить сервисы и middleware аутентификации, создать контроллер и представления для обработки входа, выхода и отказа в доступе, а также как защитить контроллеры и действия от неаутентифицированного доступа. 

ASP.NET Core предоставляет богатый набор функций и возможностей для настройки аутентификации в соответствии с требованиями вашего приложения.