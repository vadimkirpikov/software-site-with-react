## Работа с датами. LocalDate

В Java работа с датами и временем реализована с помощью классов-представлений, таких как `LocalDate`, `LocalTime`, `LocalDateTime` и др., представленных в пакете `java.time`.  Эти классы  неизменяемы (immutable) и потокобезопасны (thread-safe), что делает их удобным инструментом для работы с датами.

### LocalDate

`LocalDate` – это неизменяемый класс, представляющий дату без времени и временной зоны. Он хранит год, месяц и день в соответствии с ISO-8601 календарной системой.

#### Создание объекта LocalDate

##### 1. Получение текущей даты:

```java
import java.time.LocalDate;

public class Example {
    public static void main(String[] args) {
        // Получаем текущую дату в системной временной зоне
        LocalDate currentDate = LocalDate.now();
        System.out.println("Текущая дата: " + currentDate);
    }
}
```

##### 2. Создание даты из года, месяца и дня:

```java
import java.time.LocalDate;
import java.time.Month;

public class Example {
    public static void main(String[] args) {
        // Создаем дату 1 января 2023 года
        LocalDate date = LocalDate.of(2023, Month.JANUARY, 1);
        System.out.println("Созданная дата: " + date);

        // Создаем дату 10 марта 2023 года, используя числовое представление месяца
        LocalDate date2 = LocalDate.of(2023, 3, 10);
        System.out.println("Созданная дата: " + date2);
    }
}
```

##### 3. Парсинг строки в LocalDate:

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Example {
    public static void main(String[] args) {
        // Парсинг строки в формате "yyyy-MM-dd"
        String dateString = "2023-12-25";
        LocalDate parsedDate = LocalDate.parse(dateString);
        System.out.println("Спарсенная дата: " + parsedDate);

        // Парсинг строки в пользовательском формате
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        String dateString2 = "25.12.2023";
        LocalDate parsedDate2 = LocalDate.parse(dateString2, formatter);
        System.out.println("Спарсенная дата: " + parsedDate2);
    }
}
```

#### Работа с компонентами даты

```java
import java.time.LocalDate;

public class Example {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2023, 10, 31);

        // Получение года
        int year = date.getYear();
        System.out.println("Год: " + year);

        // Получение месяца
        int month = date.getMonthValue();
        System.out.println("Месяц: " + month);

        // Получение дня месяца
        int dayOfMonth = date.getDayOfMonth();
        System.out.println("День месяца: " + dayOfMonth);

        // Получение дня недели
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        System.out.println("День недели: " + dayOfWeek);
    }
}
```

#### Манипуляции с датой

`LocalDate` предоставляет методы для выполнения различных операций с датой:

```java
import java.time.LocalDate;

public class Example {
    public static void main(String[] args) {
        LocalDate date = LocalDate.of(2023, 10, 31);

        // Добавляем 1 день
        LocalDate nextDay = date.plusDays(1);
        System.out.println("Следующий день: " + nextDay);

        // Вычитаем 1 месяц
        LocalDate previousMonth = date.minusMonths(1);
        System.out.println("Предыдущий месяц: " + previousMonth);

        // Получаем первый день месяца
        LocalDate firstDayOfMonth = date.withDayOfMonth(1);
        System.out.println("Первый день месяца: " + firstDayOfMonth);

        // Проверка на високосность года
        boolean isLeapYear = date.isLeapYear();
        System.out.println("Високосный год: " + isLeapYear);
    }
}
```

#### Сравнение дат

`LocalDate` реализует интерфейс `Comparable`, что позволяет сравнивать даты:

```java
import java.time.LocalDate;

public class Example {
    public static void main(String[] args) {
        LocalDate date1 = LocalDate.of(2023, 10, 31);
        LocalDate date2 = LocalDate.of(2023, 12, 25);

        // Сравнение дат
        if (date1.isAfter(date2)) {
            System.out.println(date1 + " после " + date2);
        } else if (date1.isBefore(date2)) {
            System.out.println(date1 + " до " + date2);
        } else {
            System.out.println(date1 + " и " + date2 + " равны");
        }
    }
}
```

#### Форматирование и вывод LocalDate

Для форматирования и вывода `LocalDate` используется `DateTimeFormatter`:

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Example {
    public static void main(String[] args) {
        LocalDate date = LocalDate.now();

        // Форматирование даты в строку
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEEE, dd MMMM yyyy");
        String formattedDate = date.format(formatter);
        System.out.println("Отформатированная дата: " + formattedDate);
    }
}
```

`LocalDate` - это удобный инструмент для работы с датами в Java.  Он предоставляет множество методов для создания, изменения, сравнения и форматирования дат, что делает его незаменимым для широкого круга задач.
