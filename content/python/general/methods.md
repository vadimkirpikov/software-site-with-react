## Основные методы строк

Строки в Python - это неизменяемые последовательности символов Unicode. Работа с ними - одна из базовых задач в программировании, поэтому Python предлагает обширный набор встроенных методов для их обработки. 

### Изменение регистра

Python предоставляет методы для изменения регистра строк:

* `upper()`: преобразует все символы строки в верхний регистр.

```python
string = "hello world"
print(string.upper())  # Вывод: HELLO WORLD
```

* `lower()`: преобразует все символы строки в нижний регистр.

```python
string = "HELLO WORLD"
print(string.lower())  # Вывод: hello world
```

* `title()`: делает первую букву каждого слова заглавной, а остальные - строчными.

```python
string = "hello world"
print(string.title())  # Вывод: Hello World
```

* `capitalize()`: делает первую букву строки заглавной, а остальные - строчными.

```python
string = "hello world"
print(string.capitalize())  # Вывод: Hello world
```

* `swapcase()`: меняет регистр всех символов на противоположный (строчные на заглавные и наоборот).

```python
string = "HeLlO wOrLd"
print(string.swapcase())  # Вывод: hElLo WoRlD
```

### Поиск и замена

Python предлагает методы для поиска подстрок и их замены:

* `find(sub[, start[, end]])`: возвращает индекс первого вхождения подстроки `sub` в строке.  Поиск можно ограничить диапазоном, указав `start` и `end`.  Если подстрока не найдена, метод вернет -1.

```python
string = "hello world"
print(string.find("world"))  # Вывод: 6
print(string.find("Python"))  # Вывод: -1
```

* `rfind(sub[, start[, end]])`:  аналогичен `find()`, но поиск ведется с конца строки.

```python
string = "hello world world"
print(string.rfind("world"))  # Вывод: 12
```

* `index(sub[, start[, end]])`: работает аналогично `find()`, но генерирует исключение `ValueError`, если подстрока не найдена.

```python
string = "hello world"
print(string.index("world"))  # Вывод: 6
# print(string.index("Python"))  # Вызовет ValueError
```

* `rindex(sub[, start[, end]])`:  аналогичен `index()`, но поиск ведется с конца строки.

```python
string = "hello world world"
print(string.rindex("world"))  # Вывод: 12
```

* `replace(old, new[, count])`: заменяет все вхождения подстроки `old` на `new`. Можно указать опциональный аргумент `count`, чтобы ограничить количество замен.

```python
string = "hello world world"
print(string.replace("world", "Python"))  # Вывод: hello Python Python
print(string.replace("world", "Python", 1))  # Вывод: hello Python world
```

### Проверка содержимого

Python предоставляет методы для проверки содержимого строки:

* `startswith(prefix[, start[, end]])`:  возвращает `True`, если строка начинается с указанного префикса `prefix`, иначе `False`.

```python
string = "hello world"
print(string.startswith("hello"))  # Вывод: True
```

* `endswith(suffix[, start[, end]])`:  возвращает `True`, если строка заканчивается на указанный суффикс `suffix`, иначе `False`.

```python
string = "hello world"
print(string.endswith("world"))  # Вывод: True
```

* `isalpha()`:  возвращает `True`, если строка состоит только из букв, иначе `False`.

```python
string = "helloworld"
print(string.isalpha())  # Вывод: True
```

* `isdigit()`:  возвращает `True`, если строка состоит только из цифр, иначе `False`.

```python
string = "12345"
print(string.isdigit())  # Вывод: True
```

* `isalnum()`:  возвращает `True`, если строка состоит только из букв и цифр, иначе `False`.

```python
string = "hello123"
print(string.isalnum())  # Вывод: True
```

* `isspace()`:  возвращает `True`, если строка состоит только из пробельных символов, иначе `False`.

```python
string = "   "
print(string.isspace())  # Вывод: True
```

### Разделение и соединение

Python предлагает методы для разделения строки на подстроки и объединения строк:

* `split(sep=None, maxsplit=-1)`:  разбивает строку на список подстрок, используя `sep` как разделитель.  Если `sep` не указан, используется  пробел.  `maxsplit`  ограничивает количество разбиений.

```python
string = "hello world"
print(string.split())  # Вывод: ['hello', 'world']
```

* `rsplit(sep=None, maxsplit=-1)`:  аналогичен `split()`, но разделение происходит с конца строки.

```python
string = "apple,banana,cherry"
print(string.rsplit(",", 1))  # Вывод: ['apple,banana', 'cherry']
```

* `splitlines([keepends])`: разбивает строку на список строк, используя символы перевода строки как разделители.  Если `keepends` равен `True`, символы перевода строки будут включены в результирующий список.

```python
string = "Hello\nWorld"
print(string.splitlines())  # Вывод: ['Hello', 'World']
```

* `join(iterable)`:  объединяет элементы итерируемого объекта (например, списка) в строку, используя вызывающую строку как разделитель.

```python
words = ['hello', 'world']
print(" ".join(words))  # Вывод: hello world
```

### Выравнивание и заполнение

Python предоставляет методы для выравнивания строк:

* `center(width[, fillchar])`:  возвращает строку, выровненную по центру, с использованием `fillchar` (по умолчанию пробел) для заполнения до указанной ширины `width`.

```python
string = "hello"
print(string.center(10))  # Вывод: '  hello   '
```

* `ljust(width[, fillchar])`:  возвращает строку, выровненную по левому краю, с использованием `fillchar` (по умолчанию пробел) для заполнения до указанной ширины `width`.

```python
string = "hello"
print(string.ljust(10))  # Вывод: 'hello     '
```

* `rjust(width[, fillchar])`:  возвращает строку, выровненную по правому краю, с использованием `fillchar` (по умолчанию пробел) для заполнения до указанной ширины `width`.

```python
string = "hello"
print(string.rjust(10))  # Вывод: '     hello'
```

* `zfill(width)`:  возвращает строку, дополненную нулями слева до указанной ширины `width`.

```python
string = "42"
print(string.zfill(5))  # Вывод: '00042'
```

### Удаление символов

Python предоставляет методы для удаления символов из строки:

* `strip([chars])`:  возвращает копию строки, с которой удалены начальные и конечные символы, указанные в `chars` (по умолчанию пробельные символы).

```python
string = "  hello world  "
print(string.strip())  # Вывод: 'hello world'
```

* `lstrip([chars])`:  аналогичен `strip()`, но удаляет символы только слева.

```python
string = "  hello world  "
print(string.lstrip())  # Вывод: 'hello world  '
```

* `rstrip([chars])`:  аналогичен `strip()`, но удаляет символы только справа.

```python
string = "  hello world  "
print(string.rstrip())  # Вывод: '  hello world'
```

Это лишь базовые методы работы со строками в Python.  Существует множество других полезных методов, которые могут пригодиться в различных задачах.  Подробную информацию о всех доступных методах строк можно найти в официальной документации Python:  [https://docs.python.org/3/library/stdtypes.html#string-methods](https://docs.python.org/3/library/stdtypes.html#string-methods). 
