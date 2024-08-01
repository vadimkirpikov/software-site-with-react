## Работа с zip-архивами в Python

Python предоставляет удобные инструменты для работы с zip-архивами благодаря модулю `zipfile`. В этой статье мы рассмотрим основные операции: создание, чтение, добавление и извлечение файлов из архивов.

### Создание zip-архива

Для создания нового zip-архива используется класс `ZipFile`. При инициализации объекта этого класса необходимо указать имя файла архива и режим работы:

* `'w'`:  создание нового архива (существующий файл с таким именем будет перезаписан)
* `'a'`:  добавление файлов в существующий архив (или создание нового, если его нет)
* `'x'`:  создание нового архива, если он не существует (возбуждается исключение, если файл уже есть)
* `'r'`:  только для чтения

```python
import zipfile

# Создаем новый zip-архив "my_archive.zip"
with zipfile.ZipFile("my_archive.zip", "w") as archive:
    pass  # Пока архив пуст
```

В этом примере мы создали пустой архив `my_archive.zip`. Конструкция `with ... as ...` обеспечивает автоматическое закрытие архива после завершения работы с ним.

### Добавление файлов в архив

Для добавления файла в архив используется метод `write()`. Первый аргумент метода - путь к добавляемому файлу, второй (необязательный) - имя файла внутри архива.

```python
import zipfile

# Добавляем файл "text_file.txt" в архив
with zipfile.ZipFile("my_archive.zip", "w") as archive:
    archive.write("text_file.txt")

# Добавляем файл "image.jpg" с именем "my_image.jpg" внутри архива
with zipfile.ZipFile("my_archive.zip", "a") as archive:
    archive.write("image.jpg", arcname="my_image.jpg")
```

В первом примере файл `text_file.txt` будет добавлен в корень архива с сохранением имени. Во втором примере файл `image.jpg` будет добавлен в архив под именем `my_image.jpg`.

### Чтение содержимого архива

Для просмотра списка файлов внутри архива можно воспользоваться атрибутом `namelist()` объекта `ZipFile`:

```python
import zipfile

# Выводим список файлов в архиве
with zipfile.ZipFile("my_archive.zip", "r") as archive:
    print(archive.namelist())
```

Этот код выведет список имен файлов, содержащихся в архиве `my_archive.zip`.

### Извлечение файлов из архива

Для извлечения файла из архива используется метод `extract()`.  Первый аргумент - имя файла внутри архива, второй (необязательный) - путь, куда будет извлечен файл.

```python
import zipfile

# Извлекаем файл "text_file.txt" в текущую директорию
with zipfile.ZipFile("my_archive.zip", "r") as archive:
    archive.extract("text_file.txt")

# Извлекаем файл "my_image.jpg" в директорию "extracted_files"
with zipfile.ZipFile("my_archive.zip", "r") as archive:
    archive.extract("my_image.jpg", path="extracted_files")
```

В первом примере файл `text_file.txt` будет извлечен в текущую директорию. Во втором примере файл `my_image.jpg` будет извлечен в директорию `extracted_files`.

### Работа с паролем

`zipfile` позволяет создавать защищенные паролем архивы. Для этого нужно указать пароль при записи файлов в архив:

```python
import zipfile

# Создаем защищенный паролем архив
with zipfile.ZipFile("protected_archive.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    archive.setpassword(b"password")  # Пароль должен быть в байтовой строке
    archive.write("secret_file.txt")
```

Для распаковки защищенного паролем архива необходимо указать пароль при открытии:

```python
import zipfile

# Распаковываем защищенный паролем архив
with zipfile.ZipFile("protected_archive.zip", "r") as archive:
    archive.setpassword(b"password")
    archive.extractall()
```

###  Дополнительные возможности

Модуль `zipfile` предоставляет множество других возможностей, таких как:

* Чтение и запись метаданных файлов внутри архива
* Работа с различными уровнями сжатия
* Обработка комментариев к файлам и архивам
* Работа с многотомными архивами

Более подробная информация о работе с модулем `zipfile` представлена в официальной документации Python: [https://docs.python.org/3/library/zipfile.html](https://docs.python.org/3/library/zipfile.html). 
