## Работа с файлами: FileInputStream и FileOutputStream

Java предоставляет мощные инструменты для работы с файлами. В этой статье мы рассмотрим базовые классы `FileInputStream` и `FileOutputStream`, которые используются для чтения данных из файлов и записи данных в файлы соответственно.

### FileInputStream: Чтение из файла

Класс `FileInputStream` используется для чтения потока байтов из файла. Он особенно полезен для работы с бинарными файлами, такими как изображения, аудио и видео.

#### Создание объекта FileInputStream

Для начала работы с `FileInputStream` необходимо создать его объект.  Вы можете сделать это, указав путь к файлу в конструкторе:

```java
FileInputStream inputStream = new FileInputStream("path/to/file.txt");
```

Важно отметить, что если файл не существует, будет выброшено исключение `FileNotFoundException`. 

#### Чтение данных из файла

После создания объекта `FileInputStream` вы можете начать чтение данных из файла. Существует несколько методов для этого:

* **read()**: читает один байт из файла и возвращает его как int. Если достигнут конец файла, метод вернет -1.

```java
int data = inputStream.read();

while (data != -1) {
    System.out.print((char) data); // Преобразование байта в символ
    data = inputStream.read();
}
```

* **read(byte[] b)**: читает определенное количество байтов из файла в массив байтов. Метод возвращает количество прочитанных байтов.

```java
byte[] buffer = new byte[1024];
int bytesRead = inputStream.read(buffer);

while (bytesRead != -1) {
    // Обработка прочитанных данных
    bytesRead = inputStream.read(buffer);
}
```

#### Закрытие потока

После завершения работы с файлом важно закрыть поток с помощью метода `close()`. 

```java
inputStream.close();
```

Это освободит ресурсы, используемые потоком.

### FileOutputStream: Запись в файл

Класс `FileOutputStream` используется для записи потока байтов в файл. 

#### Создание объекта FileOutputStream

Вы можете создать объект `FileOutputStream`, указав путь к файлу в конструкторе:

```java
FileOutputStream outputStream = new FileOutputStream("path/to/file.txt");
```

Если файл не существует, он будет создан. Если файл существует, его содержимое будет перезаписано.

#### Запись данных в файл

Для записи данных в файл используются методы `write()`:

* **write(int b)**: записывает один байт в файл.

```java
outputStream.write(65); // Запись символа 'A' (ASCII код 65)
```

* **write(byte[] b)**: записывает массив байтов в файл.

```java
String text = "Hello, world!";
byte[] data = text.getBytes();
outputStream.write(data);
```

#### Закрытие потока

Как и в случае с `FileInputStream`, после завершения работы с файлом необходимо закрыть поток с помощью метода `close()`. 

```java
outputStream.close();
```

### Пример: Копирование файла

Этот пример демонстрирует использование `FileInputStream` и `FileOutputStream` для копирования файла:

```java
import java.io.*;

public class FileCopy {
    public static void main(String[] args) {
        try (FileInputStream inputStream = new FileInputStream("source.txt");
             FileOutputStream outputStream = new FileOutputStream("destination.txt")) {

            byte[] buffer = new byte[1024];
            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            System.out.println("Файл успешно скопирован!");

        } catch (IOException e) {
            System.err.println("Ошибка при копировании файла: " + e.getMessage());
        }
    }
}
```

В этом примере мы:

1. Создаем объекты `FileInputStream` и `FileOutputStream` для исходного и целевого файлов соответственно.
2. Читаем данные из исходного файла блоками по 1024 байта.
3. Записываем прочитанные данные в целевой файл.
4. Закрываем оба потока.

### Обработка исключений

Работа с файлами может привести к различным исключениям, таким как `FileNotFoundException` (файл не найден) или `IOException` (ошибка ввода/вывода). 

Важно обрабатывать эти исключения в вашем коде, чтобы предотвратить аварийное завершение программы. 

В приведенных выше примерах мы использовали блок `try-catch` для обработки исключений. 

### Заключение

`FileInputStream` и `FileOutputStream` - это базовые классы Java для работы с файлами. Они предоставляют простые и эффективные инструменты для чтения и записи данных. 

В следующих разделах мы рассмотрим более продвинутые классы и техники работы с файлами.
