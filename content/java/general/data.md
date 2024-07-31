## Потоки данных: DataOutputStream и DataInputStream

В Java ввод-вывод данных играет ключевую роль, а работа с различными типами данных — неотъемлемая часть этого процесса.  Классы `DataOutputStream` и `DataInputStream` предоставляют удобные механизмы для записи и чтения данных примитивных типов в бинарном формате.

### DataOutputStream: Запись данных в поток

`DataOutputStream` расширяет класс `OutputStream` и позволяет записывать примитивные типы данных, такие как `int`, `double`, `boolean` и другие, в выходной поток в бинарном виде. Это особенно полезно при работе с файлами или сетевыми соединениями, где необходима эффективная передача данных.

#### Конструктор

```java
DataOutputStream(OutputStream out)
```

* `out`:  выходной поток, который будет обёрнут `DataOutputStream`. 

#### Методы для записи данных

`DataOutputStream` предоставляет набор методов `write` для записи различных типов данных:

| Метод              | Описание                                                 |
|---------------------|-------------------------------------------------------------|
| `writeBoolean(boolean v)` | Записывает значение `boolean` (1 байт).               |
| `writeByte(int v)`       | Записывает значение `byte` (1 байт).                     |
| `writeShort(int v)`      | Записывает значение `short` (2 байта).                   |
| `writeInt(int v)`        | Записывает значение `int` (4 байта).                      |
| `writeLong(long v)`       | Записывает значение `long` (8 байт).                     |
| `writeFloat(float v)`     | Записывает значение `float` (4 байта).                    |
| `writeDouble(double v)`   | Записывает значение `double` (8 байт).                  |
| `writeChar(int v)`       | Записывает значение `char` (2 байта).                    |
| `writeUTF(String str)`  | Записывает строку в кодировке UTF-8 (переменная длина). |

#### Пример использования DataOutputStream

```java
import java.io.*;

public class DataOutputStreamExample {
    public static void main(String[] args) {
        try (DataOutputStream dos = new DataOutputStream(new FileOutputStream("data.bin"))) {
            // Запись различных типов данных
            dos.writeInt(12345);
            dos.writeBoolean(true);
            dos.writeDouble(3.14159);
            dos.writeUTF("Привет, мир!");
        } catch (IOException e) {
            System.err.println("Ошибка записи в файл: " + e.getMessage());
        }
    }
}
```

В этом примере создается файл `data.bin`, и в него записываются данные различных типов. Обратите внимание на использование конструкции try-with-resources для автоматического закрытия потока.

### DataInputStream: Чтение данных из потока

Класс `DataInputStream` используется для чтения примитивных типов данных, записанных с помощью `DataOutputStream`. Он расширяет класс `InputStream` и предоставляет методы для чтения данных в том же порядке и формате, в котором они были записаны.

#### Конструктор

```java
DataInputStream(InputStream in)
```

* `in`:  входной поток, который будет обёрнут `DataInputStream`. 

#### Методы для чтения данных

`DataInputStream` предоставляет набор методов `read` для чтения различных типов данных:

| Метод                | Описание                                                    |
|----------------------|--------------------------------------------------------------|
| `readBoolean()`     | Читает значение `boolean` (1 байт).                        |
| `readByte()`        | Читает значение `byte` (1 байт).                          |
| `readShort()`       | Читает значение `short` (2 байта).                        |
| `readInt()`         | Читает значение `int` (4 байта).                           |
| `readLong()`        | Читает значение `long` (8 байт).                          |
| `readFloat()`       | Читает значение `float` (4 байта).                         |
| `readDouble()`      | Читает значение `double` (8 байт).                         |
| `readChar()`        | Читает значение `char` (2 байта).                         |
| `readUTF()`         | Читает строку в кодировке UTF-8 (переменная длина).        |

#### Пример использования DataInputStream

```java
import java.io.*;

public class DataInputStreamExample {
    public static void main(String[] args) {
        try (DataInputStream dis = new DataInputStream(new FileInputStream("data.bin"))) {
            // Чтение данных в том же порядке, в котором они были записаны
            int i = dis.readInt();
            boolean b = dis.readBoolean();
            double d = dis.readDouble();
            String s = dis.readUTF();

            System.out.println("Int: " + i);
            System.out.println("Boolean: " + b);
            System.out.println("Double: " + d);
            System.out.println("String: " + s);
        } catch (IOException e) {
            System.err.println("Ошибка чтения из файла: " + e.getMessage());
        }
    }
}
```

В этом примере считываются данные из файла `data.bin` в том же порядке, в котором они были записаны. Важно помнить, что порядок чтения данных должен соответствовать порядку записи, иначе данные будут прочитаны некорректно.

### Заключение

Классы `DataOutputStream` и `DataInputStream` предоставляют удобный и эффективный способ записи и чтения примитивных типов данных в бинарном формате. Они идеально подходят для ситуаций, где важна производительность и компактное хранение информации, например, при работе с файлами или сетевыми соединениями. Понимание принципов работы с этими классами является важным шагом в освоении возможностей ввода-вывода в Java.
