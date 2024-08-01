## Модуль datetime. Работа с датой и временем

Модуль `datetime` в Python предоставляет классы для работы с датой и временем. С его помощью можно создавать объекты, представляющие определенные моменты времени, а также выполнять над ними различные операции: сравнение, арифметику, форматирование и разбор строк с датой и временем.

### Объекты даты и времени

Модуль `datetime` определяет следующие типы объектов:

| Тип объекта     | Описание                                                           |
|----------------|-------------------------------------------------------------------|
| `date`         | Дата в формате (год, месяц, день)                               |
| `time`         | Время в формате (час, минута, секунда, микросекунда, часовой пояс) |
| `datetime`     | Дата и время                                                     |
| `timedelta`    | Разница между двумя объектами `date`, `time` или `datetime`   |
| `tzinfo`       | Абстрактный базовый класс для информации о часовом поясе     |
| `timezone`     | Класс, представляющий конкретный часовой пояс                |

### Создание объектов даты и времени

#### Создание объекта `date`

```python
import datetime

# Текущая дата
today = datetime.date.today()
print(today)  # Output: 2023-10-27

# Создание объекта date с заданными годом, месяцем и днем
date = datetime.date(2024, 12, 31)
print(date)  # Output: 2024-12-31
```

#### Создание объекта `time`

```python
import datetime

# Текущее время
now = datetime.datetime.now()
current_time = now.time()
print(current_time)  # Output: 12:34:56.789012

# Создание объекта time с заданными часом, минутой, секундой и микросекундой
time = datetime.time(12, 34, 56, 789012)
print(time)  # Output: 12:34:56.789012
```

#### Создание объекта `datetime`

```python
import datetime

# Текущая дата и время
now = datetime.datetime.now()
print(now)  # Output: 2023-10-27 12:34:56.789012

# Создание объекта datetime с заданными годом, месяцем, днем, часом, минутой, секундой и микросекундой
datetime_obj = datetime.datetime(2024, 12, 31, 12, 34, 56, 789012)
print(datetime_obj)  # Output: 2024-12-31 12:34:56.789012
```

#### Создание объекта `timedelta`

```python
import datetime

# Создание объекта timedelta
time_difference = datetime.timedelta(days=1, seconds=60, microseconds=1000)
print(time_difference)  # Output: 1 day, 0:01:00.001000
```

### Доступ к атрибутам объектов даты и времени

```python
import datetime

date = datetime.date(2024, 12, 31)
print(date.year)  # Output: 2024
print(date.month)  # Output: 12
print(date.day)  # Output: 31

time = datetime.time(12, 34, 56, 789012)
print(time.hour)  # Output: 12
print(time.minute)  # Output: 34
print(time.second)  # Output: 56
print(time.microsecond)  # Output: 789012

datetime_obj = datetime.datetime(2024, 12, 31, 12, 34, 56, 789012)
print(datetime_obj.year)  # Output: 2024
print(datetime_obj.month)  # Output: 12
print(datetime_obj.day)  # Output: 31
print(datetime_obj.hour)  # Output: 12
print(datetime_obj.minute)  # Output: 34
print(datetime_obj.second)  # Output: 56
print(datetime_obj.microsecond)  # Output: 789012
```

### Операции с датой и временем

#### Арифметические операции

```python
import datetime

date1 = datetime.date(2024, 12, 31)
date2 = datetime.date(2023, 10, 27)

# Разница между датами
difference = date1 - date2
print(difference)  # Output: 430 days, 0:00:00

# Добавление timedelta к date
new_date = date2 + datetime.timedelta(days=30)
print(new_date)  # Output: 2023-11-26
```

#### Сравнение объектов даты и времени

```python
import datetime

date1 = datetime.date(2024, 12, 31)
date2 = datetime.date(2023, 10, 27)

print(date1 > date2)  # Output: True
print(date1 == date2)  # Output: False
```

### Форматирование и разбор строк с датой и временем

#### Форматирование

```python
import datetime

now = datetime.datetime.now()

# Форматирование datetime
formatted_datetime = now.strftime("%Y-%m-%d %H:%M:%S")
print(formatted_datetime)  # Output: 2023-10-27 12:34:56

# Другие директивы форматирования
print(now.strftime("%A, %d %B %Y"))  # Output: Friday, 27 October 2023
print(now.strftime("%H:%M:%S %p"))  # Output: 12:34:56 PM
```

#### Разбор

```python
import datetime

date_string = "2024-12-31"
date = datetime.datetime.strptime(date_string, "%Y-%m-%d").date()
print(date)  # Output: 2024-12-31

datetime_string = "2024-12-31 12:34:56"
datetime_obj = datetime.datetime.strptime(datetime_string, "%Y-%m-%d %H:%M:%S")
print(datetime_obj)  # Output: 2024-12-31 12:34:56
```

### Работа с часовыми поясами

Для работы с часовыми поясами необходимо использовать объекты `tzinfo` и `timezone`. 

```python
import datetime

# Создание часового пояса
moscow_tz = datetime.timezone(datetime.timedelta(hours=3))

# Создание объекта datetime с учетом часового пояса
moscow_time = datetime.datetime.now(moscow_tz)
print(moscow_time)  # Output: 2023-10-27 15:34:56.789012+03:00

# Получение UTC-времени
utc_time = moscow_time.astimezone(datetime.timezone.utc)
print(utc_time)  # Output: 2023-10-27 12:34:56.789012+00:00
```

## Заключение

Модуль `datetime` предоставляет богатый набор инструментов для работы с датой и временем в Python. Подробное описание всех функций и возможностей модуля можно найти в официальной документации: [https://docs.python.org/3/library/datetime.html](https://docs.python.org/3/library/datetime.html)
