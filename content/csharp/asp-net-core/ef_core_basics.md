## Основы Entity Framework Core

Entity Framework Core (EF Core) — это легковесная, расширяемая, кроссплатформенная версия популярного инструмента доступа к данным Entity Framework от Microsoft. EF Core позволяет работать с базами данных с помощью C# объектов и LINQ-запросов, абстрагируясь от особенностей конкретной СУБД. 

В этой статье мы рассмотрим основные концепции Entity Framework Core и научимся выполнять базовые операции с базой данных в приложении ASP.NET Core 8.0. 

### Подключение EF Core к проекту

Для начала работы с EF Core необходимо подключить соответствующие NuGet-пакеты к проекту ASP.NET Core. Добавьте следующие зависимости в файл проекта (.csproj):

```xml
<ItemGroup>
  <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.*" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.*" />
</ItemGroup>
```

- **Microsoft.EntityFrameworkCore** - основной пакет Entity Framework Core.
- **Microsoft.EntityFrameworkCore.SqlServer** - провайдер для работы с Microsoft SQL Server. Вы можете выбрать другой провайдер в зависимости от используемой СУБД.

### Создание модели данных

Модель данных в EF Core представлена классами, которые называются **сущностями**. Каждая сущность отображается на таблицу в базе данных, а свойства сущности - на столбцы таблицы.

Создадим простую модель данных для блога. Добавьте в проект класс `Post`:

```csharp
public class Post
{
    public int Id { get; set; } // Первичный ключ
    public string Title { get; set; } // Заголовок поста
    public string Content { get; set; } // Содержимое поста
}
```

### Создание контекста данных

**Контекст данных** (DbContext) - это класс, который является мостом между вашей моделью данных и базой данных. Он отвечает за загрузку, отслеживание изменений и сохранение данных.

Создайте класс `BlogContext`, унаследовав его от `DbContext`:

```csharp
using Microsoft.EntityFrameworkCore;

public class BlogContext : DbContext
{
    public BlogContext(DbContextOptions<BlogContext> options)
        : base(options)
    {
    }

    public DbSet<Post> Posts { get; set; } // DbSet для работы с сущностью Post
}
```

В этом коде:

- Конструктор принимает объект `DbContextOptions<BlogContext>`, который содержит настройки подключения к базе данных.
- Свойство `Posts` типа `DbSet<Post>` представляет таблицу `Posts` в базе данных.

### Настройка подключения к базе данных

Подключение к базе данных настраивается в методе `builder.Services.AddDbContext` в файле `Program.cs`. Добавьте следующий код в `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<BlogContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ... остальной код приложения
```

Этот код:

- Вызывает метод `AddDbContext` для регистрации `BlogContext` в контейнере внедрения зависимостей.
- Использует метод `UseSqlServer` для указания провайдера базы данных (SQL Server) и строки подключения.
- Получает строку подключения из конфигурации приложения (например, из файла `appsettings.json`).

**Пример строки подключения в файле appsettings.json:**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=BlogDb;Trusted_Connection=True;"
  }
}
```

### Создание базы данных

EF Core может автоматически создать базу данных на основе вашей модели данных. Для этого используйте команду миграции:

```bash
dotnet ef migrations add InitialCreate
```

Эта команда:

- Создаст папку "Migrations" в вашем проекте.
- Сгенерирует файл миграции, содержащий SQL-код для создания базы данных и таблиц.

Примените миграцию к базе данных с помощью команды:

```bash
dotnet ef database update
```

Эта команда выполнит SQL-код из файла миграции и создаст базу данных.

### Выполнение CRUD-операций

Теперь, когда база данных создана, можно выполнять CRUD-операции (Create, Read, Update, Delete) с помощью EF Core.

#### Создание записи

```csharp
using (var db = new BlogContext(options))
{
    var newPost = new Post { Title = "Мой первый пост", Content = "Привет, мир!" };
    db.Posts.Add(newPost);
    db.SaveChanges(); // Сохранение изменений в базе данных
}
```

#### Чтение записей

```csharp
using (var db = new BlogContext(options))
{
    var posts = db.Posts.ToList(); // Получение всех постов из базы данных
    foreach (var post in posts)
    {
        Console.WriteLine($"{post.Title}: {post.Content}");
    }
}
```

#### Обновление записи

```csharp
using (var db = new BlogContext(options))
{
    var postToUpdate = db.Posts.Find(1); // Найти пост с Id = 1
    if (postToUpdate != null)
    {
        postToUpdate.Title = "Обновленный заголовок";
        db.SaveChanges();
    }
}
```

#### Удаление записи

```csharp
using (var db = new BlogContext(options))
{
    var postToDelete = db.Posts.Find(1);
    if (postToDelete != null)
    {
        db.Posts.Remove(postToDelete);
        db.SaveChanges();
    }
}
```

### Заключение

В этой статье мы рассмотрели основы работы с Entity Framework Core в приложениях ASP.NET Core 8.0. Мы научились подключать EF Core к проекту, создавать модель данных, настраивать подключение к базе данных, создавать базу данных и выполнять базовые CRUD-операции. Это лишь начало работы с EF Core, и в следующих материалах мы рассмотрим более продвинутые возможности этой мощной ORM. 
