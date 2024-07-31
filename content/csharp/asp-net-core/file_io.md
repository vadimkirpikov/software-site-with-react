## Чтение и запись файлов в ASP.NET Core 8.0

Работа с файлами - неотъемлемая часть многих веб-приложений. ASP.NET Core предоставляет удобный и эффективный способ чтения и записи файлов на сервере. В этой статье мы рассмотрим основные методы работы с файлами в ASP.NET Core 8.0.

### Чтение файлов

Для чтения содержимого файла в ASP.NET Core можно воспользоваться классом `System.IO.File`. Этот класс предоставляет набор статических методов для работы с файлами. Рассмотрим некоторые из них:

- **File.ReadAllText(string path):** Считывает все содержимое файла в строку.
- **File.ReadAllLines(string path):** Считывает все строки файла в массив строк.
- **File.ReadAllBytes(string path):** Считывает все байты файла в массив байтов.

**Пример:**

```csharp
using System.IO;

// ...

// Путь к файлу на сервере
string filePath = "wwwroot/data.txt";

// Проверка существования файла
if (File.Exists(filePath))
{
    // Чтение всего содержимого файла в строку
    string fileContent = File.ReadAllText(filePath);

    // Вывод содержимого файла в консоль
    Console.WriteLine(fileContent);
}
```

### Запись файлов

Для записи данных в файл можно воспользоваться следующими методами класса `System.IO.File`:

- **File.WriteAllText(string path, string contents):** Записывает строку в файл.
- **File.WriteAllLines(string path, string[] contents):** Записывает массив строк в файл.
- **File.WriteAllBytes(string path, byte[] bytes):** Записывает массив байтов в файл.

**Пример:**

```csharp
using System.IO;

// ...

// Путь к файлу на сервере
string filePath = "wwwroot/data.txt";

// Данные для записи в файл
string dataToWrite = "Hello, world!";

// Запись строки в файл
File.WriteAllText(filePath, dataToWrite);

Console.WriteLine("Данные успешно записаны в файл.");
```

### Работа с потоками

Для более гибкой работы с файлами, например, для чтения или записи больших файлов по частям, можно использовать потоки. В .NET для работы с потоками используются классы `System.IO.FileStream` и `System.IO.StreamReader`/`System.IO.StreamWriter`.

**Пример чтения файла с помощью потока:**

```csharp
using System.IO;

// ...

string filePath = "wwwroot/data.txt";

using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
using (StreamReader reader = new StreamReader(fileStream))
{
    string line;
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }
}
```

**Пример записи файла с помощью потока:**

```csharp
using System.IO;

// ...

string filePath = "wwwroot/data.txt";

using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
using (StreamWriter writer = new StreamWriter(fileStream))
{
    writer.WriteLine("Hello, world!");
    writer.WriteLine("This is a sample text file.");
}

Console.WriteLine("Данные успешно записаны в файл.");
```

### Безопасность

При работе с файлами важно учитывать вопросы безопасности. Никогда не доверяйте путям к файлам, полученным от пользователя. Всегда проверяйте пути к файлам на корректность и на наличие потенциально опасных символов. 

Для безопасной работы с путями к файлам используйте класс `System.IO.Path`. Например, для объединения пути к каталогу и имени файла используйте метод `Path.Combine()`:

```csharp
string directoryPath = "wwwroot/uploads";
string fileName = "myfile.txt";

// Безопасное объединение пути к каталогу и имени файла
string filePath = Path.Combine(directoryPath, fileName);
```

### Заключение

В этой статье мы рассмотрели основные методы чтения и записи файлов в ASP.NET Core 8.0. Подробную информацию о классах и методах, используемых для работы с файлами, вы можете найти в документации .NET. 
