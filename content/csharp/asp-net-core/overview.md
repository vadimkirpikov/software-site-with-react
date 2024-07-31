## Обзор ASP.NET Core

ASP.NET Core - это кроссплатформенный фреймворк с открытым исходным кодом для создания современных веб-приложений и API. С его помощью можно разрабатывать быстрые, масштабируемые и безопасные приложения, работающие на различных операционных системах, включая Windows, macOS и Linux.

В этой статье мы рассмотрим основные компоненты ASP.NET Core 8.0 и создадим простое веб-приложение, демонстрирующее базовые концепции фреймворка. 

### Ключевые возможности ASP.NET Core

* **Кроссплатформенность:** Запускайте ваши приложения на Windows, macOS и Linux.
* **Высокая производительность:** ASP.NET Core является одним из самых быстрых фреймворков для веб-приложений.
* **Внедрение зависимостей:** Упрощенное управление зависимостями и тестирование кода.
* **Открытый исходный код:** Исходный код фреймворка доступен на GitHub.
* **Модульность:** Используйте только те компоненты, которые нужны вашему приложению.
* **Интеграция с современными фронтенд-фреймворками:**  Легко интегрируйте ASP.NET Core с такими фреймворками, как Angular, React и Vue.js.

### Создание простого веб-приложения

#### Шаг 1: Установка .NET 8 SDK

Перед началом работы убедитесь, что на вашем компьютере установлен .NET 8 SDK. Скачайте и установите его с официального сайта Microsoft, если он еще не установлен.

#### Шаг 2: Создание проекта

Откройте командную строку или терминал и выполните следующую команду, чтобы создать новый проект веб-приложения ASP.NET Core:

```bash
dotnet new web -o MyWebApp
```

Эта команда создаст новую папку с именем "MyWebApp" и сгенерирует базовый проект веб-приложения.

#### Шаг 3: Запуск приложения

Перейдите в папку проекта:

```bash
cd MyWebApp
```

Запустите приложение с помощью команды:

```bash
dotnet run
```

Откройте браузер и перейдите по адресу `https://localhost:5001` (или по адресу, указанному в консоли), чтобы увидеть запущенное приложение.

#### Шаг 4: Структура проекта

Откройте папку проекта в вашем любимом редакторе кода. Вы увидите следующую структуру файлов и папок:

```
MyWebApp/
├── Program.cs
├── Properties/
│   └── launchSettings.json
└── ...
```

* **Program.cs:**  Это точка входа в ваше приложение. Здесь происходит настройка и запуск веб-сервера, регистрация сервисов и определение конвейера обработки запросов.
* **Properties/launchSettings.json:** Этот файл содержит настройки запуска приложения, такие как URL-адрес и переменные окружения.

#### Шаг 5: Обработка запросов

Откройте файл `Program.cs`.  В нем уже будет минимальная конфигурация для запуска приложения:

```csharp
// Пространства имен для работы с веб-приложениями
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args); // Создаем построитель приложения
var app = builder.Build(); // Строим приложение на основе конфигурации

// Конфигурация обработки запросов
app.MapGet("/", () => "Hello, World!"); // На запрос по адресу "/" возвращаем текст "Hello, World!"

app.Run(); // Запуск приложения
```

#### Шаг 6: Модификация приложения

Изменим код, чтобы отобразить более информативное сообщение:

```csharp
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Извлекаем информацию о окружении, в котором запущено приложение
var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"; 

app.MapGet("/", () => $"Hello, World! Environment: {environment}"); // Выводим текст с указанием текущего окружения

app.Run(); 
```

Запустите приложение (`dotnet run`) и обновите страницу браузера. Теперь вы увидите сообщение с указанием текущего окружения приложения.

### Заключение

В этой статье мы рассмотрели основные возможности ASP.NET Core 8.0, создали простое веб-приложение и узнали, как обрабатывать запросы. В следующих статьях мы глубже погрузимся в различные аспекты разработки на ASP.NET Core, такие как маршрутизация, контроллеры, представления, модели, работа с базами данных и многое другое.