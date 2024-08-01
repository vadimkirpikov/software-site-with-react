## Работа с CSV файлами в Python

CSV (Comma Separated Values) - это простой текстовый формат, используемый для хранения табличных данных. Каждая строка в CSV файле представляет собой строку таблицы, а значения в строке разделены запятыми (или другим разделителем). 

Python предоставляет мощный модуль `csv` для работы с CSV файлами. С его помощью можно читать, записывать и обрабатывать данные в этом формате.

### Чтение CSV файлов

Для чтения CSV файлов используется объект `reader` из модуля `csv`. 

**Пример:**

```python
import csv

# Открываем файл для чтения
with open('data.csv', 'r', encoding='utf-8') as file:
    # Создаем объект reader
    reader = csv.reader(file)

    # Читаем файл построчно
    for row in reader:
        # Выводим каждую строку
        print(row)
```

В этом примере:

* `open('data.csv', 'r', encoding='utf-8')` открывает файл `data.csv` для чтения (`'r'`) с указанием кодировки `utf-8`. 
* `csv.reader(file)` создает объект `reader` для чтения данных из файла.
* Цикл `for row in reader:` проходит по каждой строке в файле.
* `print(row)` выводит каждую строку на экран.

По умолчанию `csv.reader` считает разделителем запятую. Если ваши данные разделены другим символом, его можно указать с помощью параметра `delimiter`:

```python
reader = csv.reader(file, delimiter=';') 
```

### Запись в CSV файлы

Для записи данных в CSV файл используется объект `writer` из модуля `csv`. 

**Пример:**

```python
import csv

# Данные для записи
data = [
    ['Name', 'Age', 'City'],
    ['John', '30', 'New York'],
    ['Jane', '25', 'London'],
]

# Открываем файл для записи
with open('output.csv', 'w', encoding='utf-8', newline='') as file:
    # Создаем объект writer
    writer = csv.writer(file)

    # Записываем данные построчно
    for row in data:
        writer.writerow(row)
```

В этом примере:

* `open('output.csv', 'w', encoding='utf-8', newline='')` открывает файл `output.csv` для записи (`'w'`). Параметр `newline=''`  убирает пустые строки между записями.
* `csv.writer(file)` создает объект `writer` для записи данных в файл.
* Цикл `for row in data:` проходит по списку данных `data`.
* `writer.writerow(row)` записывает каждую строку в файл.

### Работа с заголовками

Часто CSV файлы содержат заголовок в первой строке, который описывает данные в каждой колонке. Модуль `csv` позволяет удобно работать с заголовками с помощью класса `DictReader` и `DictWriter`.

**Пример чтения с `DictReader`:**

```python
import csv

with open('data.csv', 'r', encoding='utf-8') as file:
    # Создаем объект DictReader
    reader = csv.DictReader(file)

    # Читаем файл построчно как словарь
    for row in reader:
        # Получаем доступ к данным по названию колонки
        print(f"Name: {row['Name']}, Age: {row['Age']}, City: {row['City']}")
```

В этом примере `DictReader` автоматически считывает первую строку как заголовки и предоставляет доступ к данным каждой строки как к словарю, где ключи - это названия колонок.

**Пример записи с `DictWriter`:**

```python
import csv

# Данные для записи
data = [
    {'Name': 'John', 'Age': '30', 'City': 'New York'},
    {'Name': 'Jane', 'Age': '25', 'City': 'London'},
]

# Заголовки колонок
fieldnames = ['Name', 'Age', 'City']

with open('output.csv', 'w', encoding='utf-8', newline='') as file:
    # Создаем объект DictWriter
    writer = csv.DictWriter(file, fieldnames=fieldnames)

    # Записываем заголовки
    writer.writeheader()
    
    # Записываем данные
    for row in data:
        writer.writerow(row)
```

В этом примере `DictWriter` использует указанные `fieldnames` для записи заголовков и данных из словарей.

### Дополнительные возможности

Модуль `csv` предоставляет множество дополнительных возможностей, таких как:

* Указание другого символа-разделителя.
* Указание символа-кавычки для значений, содержащих разделитель.
* Чтение и запись данных с использованием табуляции в качестве разделителя (TSV файлы).
* Гибкая настройка формата вывода.

Подробную информацию о всех возможностях модуля `csv` можно найти в официальной документации Python: [https://docs.python.org/3/library/csv.html](https://docs.python.org/3/library/csv.html)
