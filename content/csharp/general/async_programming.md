## Асинхронное программирование в C#

Асинхронное программирование позволяет выполнять ресурсоемкие операции, не блокируя основной поток приложения. Это особенно важно для приложений, взаимодействующих с сетью, файловой системой или базами данных. Вместо ожидания завершения операции, основной поток может продолжать работу, обрабатывая другие задачи, что делает приложение более отзывчивым и быстрым.

### Ключевые слова async и await

В основе асинхронного программирования в C# лежат ключевые слова `async` и `await`.

* **`async`**: Модификатор, указывающий, что метод содержит асинхронный код и может использовать `await` для ожидания завершения асинхронных операций. Методы, отмеченные как `async`, обычно возвращают `Task` или `Task<T>` (для методов с возвращаемым значением типа `T`).

* **`await`**: Ключевое слово, приостанавливающее выполнение метода до завершения асинхронной операции, представленной ожидаемым объектом `Task` или `Task<T>`. 

**Пример:**

```C#
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        string url = "https://www.example.com";

        // Получение HTML-кода страницы асинхронно
        string html = await GetWebsiteHtmlAsync(url); 

        Console.WriteLine($"HTML-код страницы {url}:\n{html}");
    }

    // Асинхронный метод для получения HTML-кода веб-страницы
    static async Task<string> GetWebsiteHtmlAsync(string url)
    {
        using HttpClient client = new HttpClient();
        // Отправка запроса и ожидание ответа
        HttpResponseMessage response = await client.GetAsync(url); 
        // Чтение содержимого ответа как строки
        return await response.Content.ReadAsStringAsync(); 
    }
}
```

В этом примере:

1. Метод `Main` объявлен с модификатором `async`.
2. Внутри `Main` вызывается асинхронный метод `GetWebsiteHtmlAsync`, который возвращает `Task<string>`.
3. Используется `await` для ожидания завершения `GetWebsiteHtmlAsync`.
4. Метод `GetWebsiteHtmlAsync` также объявлен с `async` и использует `await` для ожидания завершения асинхронных методов `GetAsync` и `ReadAsStringAsync`.

### Обработка ошибок

Исключения, возникающие в асинхронных методах, распространяются на ожидающий `Task`. Обработать такие исключения можно с помощью блока `try-catch`:

```C#
static async Task Main(string[] args)
{
    try
    {
        string html = await GetWebsiteHtmlAsync("https://несуществующий-сайт.com"); 
        Console.WriteLine(html);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Произошла ошибка: {ex.Message}");
    }
}
```

### Параллельное выполнение асинхронных операций

Для запуска нескольких асинхронных операций одновременно можно использовать `Task.WhenAll`:

```C#
static async Task Main(string[] args)
{
    string[] urls = { "https://www.example.com", "https://www.google.com" };
    
    // Запуск задач на скачивание HTML-кода для каждого URL
    Task<string>[] downloadTasks = urls.Select(GetWebsiteHtmlAsync).ToArray();

    // Ожидание завершения всех задач
    string[] htmls = await Task.WhenAll(downloadTasks); 

    // Вывод результатов
    for (int i = 0; i < urls.Length; i++)
    {
        Console.WriteLine($"HTML-код страницы {urls[i]}:\n{htmls[i]}");
    }
}
```

В этом примере:

1. Создается массив URL-адресов.
2. Метод `Select` используется для создания массива задач `downloadTasks`, каждая из которых представляет асинхронную операцию `GetWebsiteHtmlAsync` для соответствующего URL.
3. `Task.WhenAll` запускает все задачи `downloadTasks` параллельно и возвращает `Task<string[]>`, который завершится, когда завершатся все задачи.
4. `await` используется для ожидания завершения всех задач.
5. Результаты (HTML-код каждой страницы) извлекаются из массива `htmls`.

Асинхронное программирование является важной частью разработки современных приложений. Использование `async` и `await` делает код более читаемым и поддерживаемым, а также позволяет создавать отзывчивые и эффективные приложения. 
