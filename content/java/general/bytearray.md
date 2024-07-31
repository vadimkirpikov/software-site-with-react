## Работа с байтовыми массивами: классы ByteArrayInputStream и ByteArrayOutputStream

В Java часто возникает необходимость обрабатывать данные в виде байтовых массивов (`byte[]`). Для удобной работы с такими данными в стандартной библиотеке Java представлены классы `ByteArrayInputStream` и `ByteArrayOutputStream`, являющиеся частью пакета `java.io`.

### ByteArrayInputStream: чтение из байтового массива

`ByteArrayInputStream` позволяет читать данные из байтового массива как из входного потока (`InputStream`).

**Создание объекта ByteArrayInputStream:**

```java
byte[] data = {10, 20, 30, 40, 50}; 
ByteArrayInputStream inputStream = new ByteArrayInputStream(data); 
```

В этом примере мы создаём байтовый массив `data` и передаём его в конструктор `ByteArrayInputStream`. Теперь `inputStream` позволяет читать данные из массива `data`.

**Чтение данных из ByteArrayInputStream:**

```java
int value;
while ((value = inputStream.read()) != -1) {
  System.out.print(value + " "); // Вывод: 10 20 30 40 50 
}
```

В этом фрагменте мы используем метод `read()`, чтобы прочитать байт из `inputStream`.  Цикл продолжается до тех пор, пока не будет достигнут конец потока (в этом случае `read()` возвращает -1).

**Дополнительные методы ByteArrayInputStream:**

* `available()`: возвращает количество байтов, доступных для чтения.
* `mark(int readAheadLimit)`: помечает текущую позицию в потоке.
* `reset()`: возвращает позицию чтения к последней отмеченной точке.
* `skip(long n)`: пропускает заданное количество байтов.

### ByteArrayOutputStream: запись в байтовый массив

`ByteArrayOutputStream` позволяет записывать данные в динамически расширяющийся байтовый массив. 

**Создание объекта ByteArrayOutputStream:**

```java
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
```

**Запись данных в ByteArrayOutputStream:**

```java
String message = "Hello, world!";
outputStream.write(message.getBytes());
```

В этом примере мы записываем строку `message` в `outputStream` как байтовый массив с помощью метода `getBytes()`.

**Получение байтового массива:**

```java
byte[] result = outputStream.toByteArray();
```

Метод `toByteArray()` возвращает содержимое `outputStream` в виде нового байтового массива.

**Дополнительные методы ByteArrayOutputStream:**

* `size()`: возвращает текущий размер внутреннего буфера.
* `reset()`: очищает буфер и сбрасывает счётчик позиции.
* `toString()`: возвращает содержимое буфера в виде строки.
* `writeTo(OutputStream out)`: записывает содержимое буфера в указанный OutputStream.

### Пример использования: копирование данных

В следующем примере мы используем `ByteArrayInputStream` и `ByteArrayOutputStream` для копирования данных из одного байтового массива в другой:

```java
public static void main(String[] args) {
  byte[] source = {1, 2, 3, 4, 5};
  
  try (ByteArrayInputStream inputStream = new ByteArrayInputStream(source);
       ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

    int value;
    while ((value = inputStream.read()) != -1) {
      outputStream.write(value);
    }

    byte[] destination = outputStream.toByteArray();

    System.out.println("Исходный массив: " + Arrays.toString(source));
    System.out.println("Скопированный массив: " + Arrays.toString(destination));
  } catch (IOException e) {
    System.err.println("Ошибка при копировании данных: " + e.getMessage());
  }
}
```

В этом примере мы:

1. Создаем `ByteArrayInputStream` для чтения из `source` и `ByteArrayOutputStream` для записи.
2. Читаем байты из `inputStream` и записываем их в `outputStream`.
3. Получаем скопированный массив с помощью `outputStream.toByteArray()`.
4. Выводим оба массива на консоль.

### Заключение

Классы `ByteArrayInputStream` и `ByteArrayOutputStream` предоставляют удобный способ работы с байтовыми массивами в Java. Они позволяют читать данные из массивов как из входных потоков и записывать данные в массивы как в выходные потоки, что делает их полезными инструментами для различных задач обработки данных.
