## Модуль shelve: сохранение данных Python в файлах

Работа с файлами является важной частью программирования. Python предоставляет различные способы взаимодействия с файлами, позволяя сохранять и загружать информацию.  Модуль `shelve` предлагает удобный способ хранения объектов Python в файлах, используя простой интерфейс, похожий на словари.

### Основные принципы

Модуль `shelve` позволяет сохранять объекты Python в файлах, используя механизм ключ-значение.  Это означает, что вы можете обращаться к сохраненным объектам по их ключам, как в обычном словаре.  Однако, в отличие от словарей, данные, сохраненные с помощью `shelve`, сохраняются на диске и доступны после перезапуска программы.

### Открытие и закрытие "полочных" файлов

Для начала работы с `shelve` необходимо импортировать модуль и открыть файл для хранения данных. Файл, используемый `shelve`, называется "полочным" файлом.

```python
import shelve

# Открываем "полочный" файл для записи данных
with shelve.open('mydata') as shelf:
    # ... операции с данными ...

# Файл автоматически закрывается после выхода из блока with
```

Функция `shelve.open()` создает или открывает файл с указанным именем (в данном случае "mydata") и возвращает объект, похожий на словарь.  Использование блока `with` гарантирует автоматическое закрытие файла после завершения работы с ним.

### Сохранение данных

Сохранение данных в "полочный" файл осуществляется путем присваивания значений ключам, как в обычном словаре:

```python
import shelve

with shelve.open('mydata') as shelf:
    shelf['name'] = 'Alice'  # Сохраняем строку
    shelf['age'] = 30  # Сохраняем число
    shelf['scores'] = [85, 92, 78]  # Сохраняем список
```

В этом примере мы сохранили строку 'Alice' с ключом 'name', число 30 с ключом 'age' и список [85, 92, 78] с ключом 'scores'.  `shelve` автоматически сериализует эти объекты Python и сохраняет их в файл.

### Чтение данных

Чтение данных из "полочного" файла также осуществляется с помощью ключей:

```python
import shelve

with shelve.open('mydata') as shelf:
    name = shelf['name']  # Считываем строку
    age = shelf['age']  # Считываем число
    scores = shelf['scores']  # Считываем список

print(f"Имя: {name}, возраст: {age}, оценки: {scores}")
```

В этом примере мы считываем значения, связанные с ключами 'name', 'age' и 'scores', и сохраняем их в переменные `name`, `age` и `scores` соответственно.  `shelve` автоматически десериализует данные, возвращая объекты Python, которые были сохранены ранее.

### Проверка существования ключа

Перед попыткой считать значение по ключу, полезно проверить, существует ли этот ключ в "полочном" файле.  Для этого можно использовать оператор `in`:

```python
import shelve

with shelve.open('mydata') as shelf:
    if 'city' in shelf:
        city = shelf['city']
        print(f"Город: {city}")
    else:
        print("Информация о городе отсутствует")
```

### Удаление данных

Удаление данных из "полочного" файла осуществляется с помощью оператора `del`, как и в обычном словаре:

```python
import shelve

with shelve.open('mydata') as shelf:
    del shelf['scores']  # Удаляем данные по ключу 'scores'
```

### Особенности и ограничения

*  `shelve` поддерживает сохранение только некоторых типов данных Python, таких как строки, числа, списки, словари и кортежи.  Пользовательские классы могут потребовать дополнительных действий для корректной сериализации.
*  Ключи в `shelve` должны быть строками.
*  `shelve` не поддерживает одновременную запись из нескольких программ.

### Пример использования

Представим, что нам нужно хранить информацию о пользователях, включая их имя, возраст и список любимых книг.  С помощью `shelve` мы можем легко создать базу данных пользователей:

```python
import shelve

def add_user(shelf, name, age, books):
    """Добавляет пользователя в базу данных."""
    shelf[name] = {'age': age, 'books': books}

def get_user_info(shelf, name):
    """Возвращает информацию о пользователе."""
    if name in shelf:
        user_data = shelf[name]
        return f"Имя: {name}, возраст: {user_data['age']}, книги: {user_data['books']}"
    else:
        return f"Пользователь '{name}' не найден."

# Создаем базу данных пользователей
with shelve.open('users') as user_db:
    add_user(user_db, 'Alice', 30, ['The Lord of the Rings', 'Pride and Prejudice'])
    add_user(user_db, 'Bob', 25, ['The Hitchhiker's Guide to the Galaxy'])

    # Получаем информацию о пользователях
    print(get_user_info(user_db, 'Alice'))
    print(get_user_info(user_db, 'Charlie'))
```

В этом примере мы определили две функции: `add_user` для добавления пользователей и `get_user_info` для получения информации о пользователе.  Данные хранятся в "полочном" файле "users".

Модуль `shelve` предоставляет простой и удобный способ сохранения объектов Python в файлах. Он подходит для небольших и средних объемов данных, когда не требуется сложная структура базы данных. 