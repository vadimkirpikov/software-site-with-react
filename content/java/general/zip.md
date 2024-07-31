## Работа с ZIP-архивами в Java

Java предоставляет удобные инструменты для работы с ZIP-архивами через пакет `java.util.zip`. С их помощью можно создавать, извлекать, обновлять и манипулировать файлами и директориями внутри ZIP-архивов.

### Создание ZIP-архива

Для создания ZIP-архива необходимо:

1. **Создать объект `FileOutputStream`**, представляющий файл архива.
2. **Создать объект `ZipOutputStream`**, принимающий на вход `FileOutputStream`.
3. **Использовать метод `putNextEntry()`** для добавления новой записи в архив.
4. **Записать данные в запись** с помощью метода `write()`.
5. **Закрыть запись** с помощью метода `closeEntry()`.
6. **Повторить шаги 3-5** для каждой добавляемой записи.
7. **Закрыть `ZipOutputStream`**.

Пример создания ZIP-архива `archive.zip` с двумя файлами: `file1.txt` и `file2.txt`:

```java
import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class CreateZipArchive {
    public static void main(String[] args) throws IOException {

        // Создаем объект FileOutputStream для файла архива
        FileOutputStream fos = new FileOutputStream("archive.zip");
        // Создаем объект ZipOutputStream
        ZipOutputStream zipOut = new ZipOutputStream(fos);

        // Добавляем файл "file1.txt" в архив
        File file1 = new File("file1.txt");
        zipOut.putNextEntry(new ZipEntry(file1.getName()));
        writeFileToZip(file1, zipOut);

        // Добавляем файл "file2.txt" в архив
        File file2 = new File("file2.txt");
        zipOut.putNextEntry(new ZipEntry(file2.getName()));
        writeFileToZip(file2, zipOut);

        // Закрываем ZipOutputStream
        zipOut.close();
        fos.close();

        System.out.println("Архив archive.zip успешно создан!");
    }

    // Метод для записи данных файла в ZIP-архив
    private static void writeFileToZip(File file, ZipOutputStream zipOut) throws IOException {
        FileInputStream fis = new FileInputStream(file);
        byte[] buffer = new byte[1024];
        int length;
        while ((length = fis.read(buffer)) >= 0) {
            zipOut.write(buffer, 0, length);
        }
        fis.close();
        zipOut.closeEntry();
    }
}
```

### Извлечение файлов из ZIP-архива

Для извлечения файлов из ZIP-архива:

1. **Создать объект `FileInputStream`**, представляющий файл архива.
2. **Создать объект `ZipInputStream`**, принимающий на вход `FileInputStream`.
3. **Использовать цикл `while`**, чтобы пройтись по всем записям в архиве.
4. **Внутри цикла:**
   - **Получить следующую запись** с помощью метода `getNextEntry()`.
   - **Если запись является директорией**, создать ее с помощью метода `mkdir()`.
   - **Если запись является файлом**:
     - **Создать объект `FileOutputStream`** для извлекаемого файла.
     - **Скопировать данные** из записи в файл с помощью цикла чтения-записи.
     - **Закрыть `FileOutputStream`.
5. **Закрыть `ZipInputStream`**.

Пример извлечения всех файлов из архива `archive.zip`:

```java
import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ExtractZipArchive {
    public static void main(String[] args) throws IOException {
        // Создаем объект FileInputStream для файла архива
        FileInputStream fis = new FileInputStream("archive.zip");
        // Создаем объект ZipInputStream
        ZipInputStream zis = new ZipInputStream(fis);

        ZipEntry zipEntry = zis.getNextEntry();
        while (zipEntry != null) {
            String fileName = zipEntry.getName();
            File newFile = new File(fileName);

            // Если запись - директория, создаем ее
            if (zipEntry.isDirectory()) {
                newFile.mkdirs();
            } else {
                // Если запись - файл, извлекаем его
                extractFile(zis, newFile);
            }

            zipEntry = zis.getNextEntry();
        }
        zis.closeEntry();
        zis.close();
        fis.close();

        System.out.println("Файлы успешно извлечены из archive.zip!");
    }

    // Метод для извлечения файла из ZIP-архива
    private static void extractFile(ZipInputStream zis, File newFile) throws IOException {
        FileOutputStream fos = new FileOutputStream(newFile);
        byte[] buffer = new byte[1024];
        int length;
        while ((length = zis.read(buffer)) > 0) {
            fos.write(buffer, 0, length);
        }
        fos.close();
    }
}
```

### Дополнительные возможности

Пакет `java.util.zip` предоставляет и другие возможности для работы с ZIP-архивами:

* **Чтение информации о записях в архиве** без извлечения файлов (имя, размер, дата изменения).
* **Добавление файлов в существующий архив**.
* **Создание защищенных паролем архивов**.

Более подробную информацию о работе с ZIP-архивами в Java можно найти в документации Oracle: [https://docs.oracle.com/javase/21/docs/api/java.base/java/util/zip/package-summary.html](https://docs.oracle.com/javase/21/docs/api/java.base/java/util/zip/package-summary.html)
