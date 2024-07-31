## Развертывание ASP.NET Core приложения на IIS

Развертывание приложения ASP.NET Core на сервере IIS (Internet Information Services) — важный этап в публикации вашего веб-сайта или API.  IIS выступает в качестве обратного прокси-сервера и запускает ваше приложение в процессе, отдельном от самого IIS.

### Предварительные требования

Перед началом развертывания убедитесь, что у вас установлены следующие компоненты:

* **Сервер IIS:** Установите IIS на вашу Windows-машину. 
* **.NET 8.0 Hosting Bundle:** Этот пакет содержит среду выполнения .NET, необходимую для запуска вашего приложения ASP.NET Core 8.0.
* **Visual Studio 2022 или более поздняя версия:**  (опционально) Упрощает публикацию приложения.

### Публикация приложения

Первым шагом является публикация вашего приложения ASP.NET Core.  Публикация создает папку с файлами, необходимыми для запуска приложения. 

1. Откройте ваше приложение ASP.NET Core в Visual Studio.
2. Щелкните правой кнопкой мыши на проекте в обозревателе решений и выберите "Опубликовать".
3. Выберите "Папка" в качестве целевого объекта публикации.
4. Выберите расположение папки и нажмите "Опубликовать".

### Создание пула приложений в IIS

Пул приложений изолирует ваше приложение от других приложений, работающих на том же сервере IIS.

1. Откройте "Диспетчер служб IIS".
2. В разделе "Пулы приложений" нажмите правой кнопкой мыши и выберите "Создать пул приложений...".
3. Введите имя для вашего пула приложений (например, "MyAppPool").
4. В разделе ".NET CLR версии" выберите "Без управляемого кода", так как ASP.NET Core работает в собственном процессе.
5. Нажмите "OK".

### Создание сайта в IIS

Сайт в IIS связывает имя домена или IP-адрес с вашим приложением.

1. В "Диспетчере служб IIS" щелкните правой кнопкой мыши на "Сайты" и выберите "Добавить сайт...".
2. Введите имя сайта (например, "MyWebApp").
3. Выберите пул приложений, созданный на предыдущем шаге ("MyAppPool").
4. Укажите физический путь к папке публикации вашего приложения.
5. Настройте привязку сайта (IP-адрес, порт, имя хоста).
6. Нажмите "OK".

### Настройка IIS для обработки запросов

IIS использует модуль ASP.NET Core для пересылки запросов к вашему приложению. Этот модуль устанавливается вместе с .NET 8.0 Hosting Bundle.

**Важно**: Убедитесь, что путь к вашему приложению в IIS не совпадает с именем существующей папки на диске. В противном случае IIS может не обрабатывать запросы к вашему приложению.

### Проверка развертывания

Откройте веб-браузер и перейдите по адресу вашего сайта. Вы должны увидеть главную страницу вашего приложения ASP.NET Core.

### Пример кода: 

```csharp
// Programm.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Добавление сервисов
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Конфигурация конвейера запросов
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    // Настройка HTTPS-перенаправления в продакшн
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
```

### Заключение

В этом руководстве мы рассмотрели основные шаги по развертыванию приложения ASP.NET Core 8.0 на сервере IIS.  Этот процесс обеспечивает надежное и масштабируемое решение для запуска веб-приложений на платформе Windows.