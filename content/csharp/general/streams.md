## Работа с потоками в C#: Stream, StreamReader, StreamWriter

Работа с данными – неотъемлемая часть практически любого приложения. В C# для взаимодействия с потоками байтов, будь то чтение из файла, запись в файл или передача данных по сети, используются классы, основанные на абстрактном классе `System.IO.Stream`. 

### Основные понятия

**Поток (Stream)** – это абстракция последовательности байтов. Он предоставляет унифицированный способ работы с различными источниками и приемниками данных, скрывая от разработчика детали реализации конкретного типа потока. 

**Классы StreamReader и StreamWriter** предоставляют удобный способ чтения и записи символьных данных в поток, автоматически преобразуя байты в символы и обратно в соответствии с заданной кодировкой.

### Работа с файлами

Рассмотрим пример чтения текстового файла с использованием классов `FileStream` и `StreamReader`:

```C#
using System.IO;

string filePath = "example.txt";

try
{
    // Создаем файловый поток для чтения
    using FileStream fileStream = new(filePath, FileMode.Open, FileAccess.Read);
    
    // Создаем StreamReader для чтения текста из потока
    using StreamReader reader = new(fileStream);

    string? line;
    // Читаем файл построчно
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }
}
catch (IOException e)
{
    Console.WriteLine($"Произошла ошибка при работе с файлом: {e.Message}");
}
```

В этом примере:
1. Мы создаем объект `FileStream`, указывая путь к файлу, режим открытия (чтение) и права доступа (чтение).
2. Используя `FileStream`, создаем `StreamReader` для чтения текста.
3. С помощью метода `ReadLine()` построчно читаем файл и выводим строки в консоль.
4. Блок `try-catch` обеспечивает обработку возможных исключений, связанных с работой с файлом.

Аналогично, для записи текста в файл используются классы `FileStream` и `StreamWriter`:

```C#
using System.IO;

string filePath = "example.txt";
string text = "Записываем текст в файл.";

try
{
    // Создаем файловый поток для записи
    using FileStream fileStream = new(filePath, FileMode.Create, FileAccess.Write);
    
    // Создаем StreamWriter для записи текста в поток
    using StreamWriter writer = new(fileStream);

    // Записываем текст в файл
    writer.WriteLine(text);
}
catch (IOException e)
{
    Console.WriteLine($"Произошла ошибка при работе с файлом: {e.Message}");
}
```

Здесь:
1. Создаем `FileStream` для записи, указывая путь к файлу, режим создания (создание нового файла или перезапись существующего) и права доступа (запись).
2. Используя `FileStream`, создаем `StreamWriter` для записи текста.
3. Вызываем метод `WriteLine()`, чтобы записать строку текста в файл.
4. Как и в предыдущем примере, используем блок `try-catch` для обработки исключений.

### Работа с памятью

Помимо файлов, потоки могут использоваться для работы с данными в памяти. Класс `MemoryStream` позволяет создать поток, который хранит данные в оперативной памяти.

Пример записи и чтения данных из `MemoryStream`:

```C#
using System.IO;

string text = "Пример работы с MemoryStream";

// Создаем MemoryStream
using MemoryStream memoryStream = new();

// Создаем StreamWriter для записи текста в поток
using (StreamWriter writer = new(memoryStream))
{
    // Записываем текст в MemoryStream
    writer.WriteLine(text);

    // Сбрасываем буферы, чтобы записать данные в поток
    writer.Flush();
}

// Устанавливаем позицию в начале потока
memoryStream.Seek(0, SeekOrigin.Begin);

// Создаем StreamReader для чтения текста из потока
using StreamReader reader = new(memoryStream);

// Читаем содержимое MemoryStream
string result = reader.ReadToEnd();

Console.WriteLine(result);
```

В этом примере:
1. Создается `MemoryStream`.
2. Используя `StreamWriter`, текст записывается в поток.
3. Вызывается `Flush()`, чтобы записать данные из буфера в поток.
4. Позиция в потоке устанавливается в начало с помощью `Seek()`.
5. С помощью `StreamReader` считывается все содержимое потока.
6. Результат выводится в консоль.

### Заключение

Классы `Stream`, `StreamReader` и `StreamWriter` – это мощный инструмент для работы с данными в C#. Они предоставляют унифицированный способ взаимодействия с различными источниками и приемниками данных, делая код более гибким и переиспользуемым.

Важно помнить, что при работе с потоками необходимо корректно обрабатывать исключения и освобождать используемые ресурсы, например, закрывая потоки с помощью блока `using` или вызывая метод `Dispose()`.