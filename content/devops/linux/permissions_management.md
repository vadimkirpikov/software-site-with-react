## Права доступа и их изменение

В Linux безопасность системы стоит на первом месте, и одним из её краеугольных камней является система прав доступа к файлам и директориям.  Эта система определяет, кто и как может взаимодействовать с каждым объектом файловой системы. 

### Три категории пользователей

Права доступа в Linux определены для трёх категорий пользователей:

1. **Владелец (owner)**:  Пользователь, создавший файл или директорию.
2. **Группа (group)**: Группа пользователей, к которой принадлежит файл или директория. 
3. **Другие (others)**: Все остальные пользователи системы.

### Типы прав доступа

Для каждой категории пользователей определены три типа прав доступа:

1. **Чтение (read)**: Позволяет просматривать содержимое файла или список файлов в директории.
2. **Запись (write)**: Позволяет изменять содержимое файла или создавать/удалять файлы в директории.
3. **Исполнение (execute)**: Позволяет запускать файл на исполнение (для исполняемых файлов) или получать доступ к содержимому директории (для директорий).

### Отображение прав доступа

Права доступа к файлам и директориям можно просмотреть с помощью команды `ls -l`. 

```
$ ls -l example.txt
-rw-r--r-- 1 user group 1234 May 10 10:00 example.txt
```

В данном примере:

* `-rw-r--r--` - строка, отображающая права доступа к файлу. 
    * `-`  первый символ указывает на тип файла (`-` - обычный файл, `d` - директория, `l` - символическая ссылка). 
    * Следующие 9 символов ( `rw-r--r--`)  представляют права доступа для владельца, группы и остальных пользователей соответственно (по 3 символа на каждую категорию).
        * `r` -  право на чтение
        * `w` - право на запись
        * `x` - право на исполнение
        * `-` - отсутствие права

* `user` - имя владельца файла
* `group` - имя группы, которой принадлежит файл
* `1234` - размер файла в байтах
* `May 10 10:00` - дата и время последнего изменения файла
* `example.txt` - имя файла

### Изменение прав доступа: команда chmod

Для изменения прав доступа к файлам и директориям используется команда `chmod` (change mode). Существует два основных способа использования команды:

#### 1. Символьный метод

Символьный метод использует буквы для обозначения категорий пользователей (u - владелец, g - группа, o - другие, a - все) и символы для обозначения прав доступа (+ - добавить, - - убрать, = - установить).

**Примеры:**

* Предоставить право на запись группе для файла `example.txt`:

```bash
chmod g+w example.txt
```

* Убрать право на исполнение у всех пользователей для файла `script.sh`:

```bash
chmod a-x script.sh
```

* Установить права на чтение и запись для владельца, и только чтение для группы и остальных пользователей для файла `data.txt`:

```bash
chmod u=rw,go=r data.txt
```

#### 2. Цифровой метод

Цифровой метод использует восьмеричные числа для представления прав доступа. Каждому типу доступа соответствует число:

* `4` - чтение
* `2` - запись
* `1` - исполнение

Права доступа для владельца, группы и остальных пользователей суммируются, и полученное число используется в команде `chmod`.

**Примеры:**

* Установить права доступа 644 (чтение и запись для владельца, только чтение для группы и остальных) для файла `report.txt`:

```bash
chmod 644 report.txt
```

* Установить права доступа 755 (все права для владельца, чтение и исполнение для группы и остальных) для файла `script.sh`:

```bash
chmod 755 script.sh
```

### Рекурсивное изменение прав доступа

Для изменения прав доступа к файлам и директориям рекурсивно используется опция `-R` (recursive)  команды `chmod`.

**Пример:**

* Установить права доступа 755 для всех файлов и директорий внутри директории `project`:

```bash
chmod -R 755 project
```

### Важность правильной настройки прав доступа

Правильная настройка прав доступа к файлам и директориям является crucial для обеспечения безопасности системы.  Некорректные настройки могут привести к несанкционированному доступу к конфиденциальным данным,  повреждению файлов или даже  компрометации всей системы. 

Важно помнить, что безопасность  - это непрерывный процесс,  и  регулярный  пересмотр и корректировка прав доступа -  неотъемлемая его часть. 