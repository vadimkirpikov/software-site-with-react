## Основы аутентификации в ASP.NET Core 8.0

Аутентификация является неотъемлемой частью большинства веб-приложений, гарантируя, что доступ к определенным функциям или данным получают только авторизованные пользователи. В этой статье мы рассмотрим основы настройки аутентификации в ASP.NET Core 8.0.

### Что такое аутентификация?

Аутентификация - это процесс проверки подлинности пользователя. Проще говоря, это означает убедиться, что пользователь тот, за кого себя выдает. Это первый шаг в обеспечении безопасности приложения, поскольку он контролирует доступ пользователей к ресурсам.

### Типы аутентификации

Существует несколько типов аутентификации, которые можно реализовать в ASP.NET Core:

* **Формы аутентификации:** пользователи вводят свои учетные данные (имя пользователя и пароль) в форму на веб-странице.
* **Аутентификация на основе Windows:** используется для приложений в интрасети, где пользователи уже аутентифицированы в домене Windows.
* **Внешняя аутентификация:** использует сторонние провайдеры, такие как Google, Facebook, Twitter или Microsoft, для аутентификации пользователей.

### Настройка аутентификации в ASP.NET Core 8.0

В ASP.NET Core 8.0 конфигурация приложения происходит непосредственно в файле `Program.cs`. Давайте настроим аутентификацию с использованием Identity Framework, который предоставляет встроенную поддержку для форм аутентификации.

**Шаг 1:** Установите следующие пакеты NuGet:

```
Microsoft.AspNetCore.Identity.EntityFrameworkCore
Microsoft.EntityFrameworkCore.SqlServer
```

**Шаг 2:** Добавьте необходимые сервисы и middleware в файл `Program.cs`:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Подключение к базе данных
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Настройка Identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Настройка аутентификации
builder.Services.AddAuthentication();

// Настройка авторизации
builder.Services.AddAuthorization();

// ... Другие сервисы и конфигурации ...

var app = builder.Build();

// ... Конфигурация Middleware ...

// Использование аутентификации и авторизации
app.UseAuthentication();
app.UseAuthorization();

// ... Остальная конфигурация приложения ...

app.Run();
```

В этом коде:

* `AddDbContext` подключается к базе данных, используя строку подключения `DefaultConnection`.
* `AddIdentity` регистрирует сервисы Identity Framework, указывая `IdentityUser` и `IdentityRole` в качестве моделей пользователей и ролей, а также `ApplicationDbContext` в качестве контекста базы данных.
* `AddAuthentication` и `AddAuthorization` добавляют сервисы аутентификации и авторизации.
* `UseAuthentication` и `UseAuthorization` добавляют middleware для аутентификации и авторизации в конвейер обработки запросов.

**Шаг 3:** Создайте класс `ApplicationDbContext`, который будет использоваться для взаимодействия с базой данных:

```csharp
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
}
```

**Шаг 4:** Добавьте строку подключения к базе данных в файл конфигурации `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=AuthDemo;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

**Шаг 5:** Выполните миграцию базы данных, чтобы создать необходимые таблицы:

```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Применение атрибута `[Authorize]`

После настройки аутентификации вы можете использовать атрибут `[Authorize]`, чтобы ограничить доступ к контроллерам или действиям только авторизованным пользователям.

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class SecureController : Controller
{
    // ... Действия контроллера ...
}
```

В этом примере доступ к любому действию в контроллере `SecureController` будет разрешен только аутентифицированным пользователям.

### Заключение

В этой статье мы рассмотрели основы настройки аутентификации в ASP.NET Core 8.0. Мы узнали, как настроить Identity Framework для форм аутентификации и как использовать атрибут `[Authorize]` для ограничения доступа к защищенным ресурсам. 

В следующих статьях мы рассмотрим более сложные сценарии аутентификации и авторизации, а также различные типы аутентификации, доступные в ASP.NET Core.
