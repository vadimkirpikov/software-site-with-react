## Работа с архивами и сжатием в ASP.NET Core 8.0

В процессе разработки веб-приложений на ASP.NET Core часто возникает необходимость работы с архивами и сжатием данных. Это может быть полезно для уменьшения размера передаваемых файлов, объединения нескольких файлов в один архив или распаковки архивов, полученных от пользователей. 

В этой статье мы рассмотрим основные техники работы с архивами и сжатием данных в ASP.NET Core 8.0, используя библиотеку `System.IO.Compression`.

### Создание архивов

Для создания архивов в формате ZIP можно воспользоваться классом `ZipArchive`. Рассмотрим пример создания архива, содержащего текстовый файл:

```C#
using System.IO;
using System.IO.Compression;

// ...

public async Task<IActionResult> CreateZipArchive(string fileName)
{
    var memoryStream = new MemoryStream();

    using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
    {
        var entry = archive.CreateEntry(fileName);

        using (var writer = new StreamWriter(entry.Open()))
        {
            await writer.WriteLineAsync("Содержимое текстового файла.");
        }
    }

    memoryStream.Position = 0;
    return File(memoryStream, "application/zip", "archive.zip");
}
```

В данном примере мы:

1. Создаем объект `MemoryStream` для хранения архива в памяти.
2. Создаем объект `ZipArchive` в режиме создания (`ZipArchiveMode.Create`) и указываем, что мы будем записывать данные в поток (`true`).
3. Создаем запись в архиве с именем `fileName` с помощью метода `CreateEntry`.
4. Получаем поток для записи данных в созданную запись с помощью метода `Open`.
5. Записываем текст в поток с помощью объекта `StreamWriter`.
6. Сбрасываем позицию потока на начало.
7. Возвращаем файл в формате ZIP с именем "archive.zip" в ответ на HTTP-запрос.

### Распаковка архивов

Для распаковки архивов в формате ZIP используется тот же класс `ZipArchive`, но в режиме чтения (`ZipArchiveMode.Read`). Рассмотрим пример распаковки архива:

```C#
public async Task<IActionResult> ExtractZipArchive(IFormFile archiveFile)
{
    if (archiveFile == null || archiveFile.Length == 0)
    {
        return BadRequest("Файл не выбран.");
    }

    using (var archive = new ZipArchive(archiveFile.OpenReadStream(), ZipArchiveMode.Read))
    {
        foreach (var entry in archive.Entries)
        {
            // Обработка записи архива
            // Например, сохранение файла на диск:
            using (var fileStream = new FileStream(entry.Name, FileMode.Create))
            {
                await entry.Open().CopyToAsync(fileStream);
            }
        }
    }

    return Ok("Архив успешно распакован.");
}
```

В этом примере мы:

1. Проверяем, был ли файл передан в запросе.
2. Создаем объект `ZipArchive` в режиме чтения (`ZipArchiveMode.Read`) на основе переданного файла.
3. Проходим по всем записям в архиве с помощью цикла `foreach`.
4. Обрабатываем каждую запись: в данном случае сохраняем файл на диск.
5. Возвращаем сообщение об успешной распаковке архива.

### Сжатие данных

Помимо создания архивов, библиотека `System.IO.Compression` предоставляет инструменты для сжатия данных с помощью алгоритма GZip. 

Пример сжатия строки:

```C#
public static byte[] Compress(string data)
{
    var bytes = Encoding.UTF8.GetBytes(data);

    using (var memoryStream = new MemoryStream())
    {
        using (var gzipStream = new GZipStream(memoryStream, CompressionMode.Compress, true))
        {
            gzipStream.Write(bytes, 0, bytes.Length);
        }

        return memoryStream.ToArray();
    }
}
```

В данном примере:

1. Конвертируем строку в массив байтов с помощью кодировки UTF-8.
2. Создаем объект `MemoryStream` для хранения сжатых данных.
3. Создаем объект `GZipStream` в режиме сжатия (`CompressionMode.Compress`) и указываем, что мы хотим оставить поток открытым (`true`).
4. Записываем данные в поток `GZipStream`.
5. Получаем сжатые данные из `MemoryStream` в виде массива байтов.

### Распаковка сжатых данных

Для распаковки данных, сжатых алгоритмом GZip, используется класс `GZipStream` в режиме декомпрессии (`CompressionMode.Decompress`):

```C#
public static string Decompress(byte[] data)
{
    using (var memoryStream = new MemoryStream(data))
    {
        using (var gzipStream = new GZipStream(memoryStream, CompressionMode.Decompress))
        {
            using (var reader = new StreamReader(gzipStream))
            {
                return reader.ReadToEnd();
            }
        }
    }
}
```

В этом примере:

1. Создаем объект `MemoryStream` на основе переданных сжатых данных.
2. Создаем объект `GZipStream` в режиме декомпрессии (`CompressionMode.Decompress`).
3. Создаем объект `StreamReader` для чтения данных из потока `GZipStream`.
4. Читаем все данные из потока и возвращаем их в виде строки.

### Заключение

В этой статье мы рассмотрели основные техники работы с архивами и сжатием данных в ASP.NET Core 8.0 с помощью библиотеки `System.IO.Compression`. Мы научились создавать и распаковывать архивы в формате ZIP, а также сжимать и распаковывать данные с помощью алгоритма GZip. 

Использование данных техник может существенно оптимизировать ваше приложение, уменьшив размер передаваемых данных и сократив время обработки запросов. 
