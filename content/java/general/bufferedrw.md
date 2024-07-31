## Буферизация символьных потоков: BufferedReader и BufferedWriter

Работа с вводом и выводом данных – неотъемлемая часть программирования. В Java для обработки символьных данных используются классы `Reader` и `Writer` и их подклассы. Однако, прямое чтение и запись посимвольно может быть неэффективным, особенно при работе с большими объемами данных. 

Для оптимизации процесса ввода-вывода используются буферизированные потоки, представленные классами `BufferedReader` и `BufferedWriter`. 

### BufferedReader

Класс `BufferedReader` обеспечивает буферизацию при чтении символьных данных из потока. Вместо того, чтобы считывать данные по одному символу, `BufferedReader` считывает сразу блок данных в буфер. Последующие операции чтения получают данные из буфера до тех пор, пока он не опустеет. 

Преимущества использования `BufferedReader`:

- **Увеличение производительности:**  Чтение данных блоками значительно быстрее, чем посимвольное чтение.
- **Удобство чтения строк:** `BufferedReader` предоставляет метод `readLine()`, который упрощает чтение данных построчно.

**Пример использования BufferedReader:**

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class BufferedReaderExample {
    public static void main(String[] args) {
        // Путь к файлу для чтения
        String filePath = "input.txt";

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            // Читаем файл построчно
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.err.println("Ошибка при чтении файла: " + e.getMessage());
        }
    }
}
```
 
**Пошаговая инструкция:**

1. **Импорт необходимых классов:**
    ```java
    import java.io.BufferedReader;
    import java.io.FileReader;
    import java.io.IOException;
    ```
2. **Создание объекта FileReader:**  
    `FileReader` используется для чтения символьных данных из файла. 
    ```java
    FileReader fileReader = new FileReader(filePath);
    ```
3. **Создание объекта BufferedReader:**
    ```java
    BufferedReader reader = new BufferedReader(fileReader);
    ``` 
4. **Чтение данных из файла:**
    Используйте метод `readLine()` для чтения файла построчно. Метод возвращает `null`, когда достигнут конец файла.
    ```java
    String line;
    while ((line = reader.readLine()) != null) {
        // Обработка строки
    }
    ```
5. **Обработка исключений:**
    Чтение из файла может вызвать исключение `IOException`. Используйте блок `try-catch` для обработки ошибок.
    ```java
    catch (IOException e) {
        System.err.println("Ошибка при чтении файла: " + e.getMessage());
    }
    ```
6. **Закрытие потока:**
    Важно закрывать поток после завершения работы с ним, чтобы освободить ресурсы. Используйте блок `try-with-resources` для автоматического закрытия потока.


### BufferedWriter

Класс `BufferedWriter` обеспечивает буферизацию при записи символьных данных в поток. Аналогично `BufferedReader`, данные записываются в буфер, а затем блоками записываются в целевой поток. 

Преимущества использования `BufferedWriter`:

- **Увеличение производительности:**  Запись данных блоками эффективнее, чем запись по одному символу.
- **Упрощение записи строк:** `BufferedWriter` предоставляет удобный метод `newLine()` для записи символа перевода строки.

**Пример использования BufferedWriter:**

```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class BufferedWriterExample {
    public static void main(String[] args) {
        // Путь к файлу для записи
        String filePath = "output.txt";

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write("Это первая строка.");
            writer.newLine(); // Перевод строки
            writer.write("Это вторая строка.");
        } catch (IOException e) {
            System.err.println("Ошибка при записи в файл: " + e.getMessage());
        }
    }
}
```

**Пошаговая инструкция:**

1. **Импорт необходимых классов:**
    ```java
    import java.io.BufferedWriter;
    import java.io.FileWriter;
    import java.io.IOException;
    ```
2. **Создание объекта FileWriter:**  
    `FileWriter` используется для записи символьных данных в файл. 
    ```java
    FileWriter fileWriter = new FileWriter(filePath);
    ```
3. **Создание объекта BufferedWriter:**
    ```java
    BufferedWriter writer = new BufferedWriter(fileWriter);
    ``` 
4. **Запись данных в файл:**
    Используйте методы `write()` и `newLine()` для записи данных в файл.
    ```java
    writer.write("Текст для записи");
    writer.newLine();
    ```
5. **Обработка исключений:**
    Запись в файл может вызвать исключение `IOException`. Используйте блок `try-catch` для обработки ошибок.
    ```java
    catch (IOException e) {
        System.err.println("Ошибка при записи в файл: " + e.getMessage());
    }
    ```
6. **Закрытие потока:**
    Важно закрывать поток после завершения работы с ним. Используйте блок `try-with-resources` для автоматического закрытия потока.


### Заключение

`BufferedReader` и `BufferedWriter`  – важные инструменты для эффективной работы с символьными потоками ввода-вывода. Использование буферизации позволяет значительно повысить производительность при чтении и записи данных. Понимание принципов работы и умение применять эти классы  –  необходимый навык для любого Java-разработчика. 
