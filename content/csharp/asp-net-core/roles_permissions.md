## Роли и права доступа в ASP.NET Core 8.0

Безопасность веб-приложения – это не только защита от внешних угроз, но и контроль доступа пользователей к функционалу внутри приложения. В этой статье мы рассмотрим, как реализовать систему ролей и прав доступа в ASP.NET Core 8.0.

### Основы авторизации

В ASP.NET Core авторизация основана на политиках. Политика – это набор требований, которым должен соответствовать пользователь, чтобы получить доступ к ресурсу. Политика может быть основана на роли пользователя, его утверждениях (claims) или любой другой логике, которую вы определите.

### Настройка ролей

Для начала работы с ролями необходимо настроить их в приложении. В файле `Program.cs`, после подключения сервисов Identity, добавьте следующий код:

```csharp
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```

Этот код регистрирует сервисы Identity и указывает, что роли будут храниться в базе данных, используя `IdentityRole`.

### Создание ролей

Для создания ролей можно воспользоваться миграциями Entity Framework Core или создать их программно. Рассмотрим пример программного создания ролей при запуске приложения.

В файле `Program.cs` добавьте следующий код после настройки Identity:

```csharp
// Создание ролей при запуске приложения
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    // Роль администратора
    if (!await roleManager.RoleExistsAsync("Admin"))
    {
        await roleManager.CreateAsync(new IdentityRole("Admin"));
    }

    // Роль пользователя
    if (!await roleManager.RoleExistsAsync("User"))
    {
        await roleManager.CreateAsync(new IdentityRole("User"));
    }
}
```

Этот код проверяет, существуют ли роли "Admin" и "User", и если нет, то создает их.

### Назначение ролей пользователям

Назначить роль пользователю можно с помощью `UserManager`. Получите экземпляр `UserManager` через внедрение зависимостей и используйте метод `AddToRoleAsync`.

```csharp
var user = await userManager.FindByNameAsync("username");
await userManager.AddToRoleAsync(user, "Admin");
```

### Использование атрибута `[Authorize]`

Атрибут `[Authorize]` позволяет ограничить доступ к контроллеру или его действиям на основе ролей. 

```csharp
[Authorize(Roles = "Admin")]
public class AdminController : Controller
{
    // ...
}
```

В этом примере доступ к контроллеру `AdminController` разрешен только пользователям с ролью "Admin".

### Создание политик авторизации

Для более гибкой настройки доступа можно использовать политики авторизации. Политика определяется с помощью имени и набора требований. 

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy =>
        policy.RequireRole("Admin"));
});
```

Этот код определяет политику "RequireAdminRole", которая требует, чтобы пользователь имел роль "Admin".

### Использование политик авторизации

Для использования политики авторизации используйте атрибут `[Authorize]` с указанием имени политики.

```csharp
[Authorize(Policy = "RequireAdminRole")]
public IActionResult AdminPanel()
{
    // ...
}
```

В этом примере доступ к действию `AdminPanel` разрешен только пользователям, которые соответствуют политике "RequireAdminRole".

### Создание собственных требований авторизации

Вы можете создавать собственные требования авторизации, наследуясь от класса `IAuthorizationRequirement` и реализуя интерфейс `IAuthorizationHandler`.

```csharp
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }

    public MinimumAgeRequirement(int minimumAge)
    {
        MinimumAge = minimumAge;
    }
}

public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumAgeRequirement requirement)
    {
        var dateOfBirthClaim = context.User.FindFirst(c => c.Type == "DateOfBirth");
        if (dateOfBirthClaim != null)
        {
            var dateOfBirth = Convert.ToDateTime(dateOfBirthClaim.Value);
            var age = DateTime.Today.Year - dateOfBirth.Year;

            if (age >= requirement.MinimumAge)
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}
```

### Регистрация собственных требований

Зарегистрируйте ваши собственные требования и обработчики в файле `Program.cs`.

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("MinimumAgePolicy", policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(18)));
});

builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
```

### Использование собственных требований

Используйте созданное требование в атрибуте `[Authorize]`, указав имя политики.

```csharp
[Authorize(Policy = "MinimumAgePolicy")]
public IActionResult SecretPage()
{
    // ...
}
```

В этой статье мы рассмотрели основные принципы работы с ролями и правами доступа в ASP.NET Core 8.0. Вы научились создавать роли, назначать их пользователям, ограничивать доступ с помощью атрибута `[Authorize]` и создавать собственные требования авторизации. 
