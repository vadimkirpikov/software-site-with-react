## Основные операторы SQL в MySQL

Язык SQL (Structured Query Language) – это стандартизированный язык программирования, предназначенный для работы с реляционными базами данных. Он позволяет создавать, изменять и управлять данными, хранящимися в таблицах. В данной статье мы рассмотрим основные операторы SQL, которые вы можете использовать в MySQL 8.4.

### Оператор SELECT: Извлечение данных

Оператор `SELECT` используется для извлечения данных из таблицы базы данных. 

**Синтаксис:**

```sql
SELECT <имена_столбцов>
FROM <имя_таблицы>;
```

**Пример:**

Предположим, у нас есть таблица `users` со столбцами `id`, `name`, `email`:

| id | name | email |
|---|---|---|
| 1 | Иван | ivan@example.com |
| 2 | Мария | maria@example.com |
| 3 | Петр | petr@example.com |

Для получения всех данных из таблицы `users` используем следующий запрос:

```sql
SELECT *
FROM users;
```

Звездочка (`*`) в операторе `SELECT` указывает на то, что нужно выбрать все столбцы из таблицы. Результат выполнения запроса будет следующим:

| id | name | email |
|---|---|---|
| 1 | Иван | ivan@example.com |
| 2 | Мария | maria@example.com |
| 3 | Петр | petr@example.com |

Для выбора определенных столбцов, например, `name` и `email`, нужно указать их имена через запятую:

```sql
SELECT name, email
FROM users;
```

Результат:

| name | email |
|---|---|
| Иван | ivan@example.com |
| Мария | maria@example.com |
| Петр | petr@example.com |


### Оператор WHERE: Фильтрация данных

Оператор `WHERE` используется для фильтрации данных, выбирая только те строки, которые удовлетворяют заданному условию.

**Синтаксис:**

```sql
SELECT <имена_столбцов>
FROM <имя_таблицы>
WHERE <условие>;
```

**Пример:**

Чтобы выбрать данные пользователя с `id` равным 2, используем следующий запрос:

```sql
SELECT *
FROM users
WHERE id = 2;
```

Результат:

| id | name | email |
|---|---|---|
| 2 | Мария | maria@example.com |

В операторе `WHERE` можно использовать различные операторы сравнения:

* `=`: равно
* `!=`: не равно
* `>`: больше чем
* `<`: меньше чем
* `>=`: больше или равно
* `<=`: меньше или равно

**Пример использования оператора `>`:**

Выбрать пользователей, чей `id` больше 1:

```sql
SELECT *
FROM users
WHERE id > 1;
```

Результат:

| id | name | email |
|---|---|---|
| 2 | Мария | maria@example.com |
| 3 | Петр | petr@example.com |

### Логические операторы: AND, OR, NOT

Логические операторы используются для объединения нескольких условий в операторе `WHERE`:

* **AND**: Возвращает `TRUE`, если оба условия истинны.
* **OR**: Возвращает `TRUE`, если хотя бы одно из условий истинно.
* **NOT**: Инвертирует результат условия.

**Пример использования оператора `AND`:**

Выбрать пользователей с `id` больше 1 и именем "Мария":

```sql
SELECT *
FROM users
WHERE id > 1 AND name = 'Мария';
```

Результат:

| id | name | email |
|---|---|---|
| 2 | Мария | maria@example.com |

### Оператор ORDER BY: Сортировка данных

Оператор `ORDER BY` используется для сортировки результатов запроса по одному или нескольким столбцам.

**Синтаксис:**

```sql
SELECT <имена_столбцов>
FROM <имя_таблицы>
ORDER BY <имя_столбца> [ASC|DESC];
```

По умолчанию сортировка выполняется в порядке возрастания (`ASC`). Для сортировки в порядке убывания используется ключевое слово `DESC`.

**Пример:**

Выбрать всех пользователей и отсортировать их по имени в алфавитном порядке:

```sql
SELECT *
FROM users
ORDER BY name ASC;
```

Результат:

| id | name | email |
|---|---|---|
| 1 | Иван | ivan@example.com |
| 2 | Мария | maria@example.com |
| 3 | Петр | petr@example.com |

**Пример сортировки по двум столбцам:**

Выбрать всех пользователей, отсортировать их по имени в порядке убывания, а затем по `id` в порядке возрастания:

```sql
SELECT *
FROM users
ORDER BY name DESC, id ASC;
```


### Оператор INSERT: Добавление данных

Оператор `INSERT` используется для добавления новых строк в таблицу.

**Синтаксис:**

```sql
INSERT INTO <имя_таблицы> (<список_столбцов>)
VALUES (<список_значений>);
```

**Пример:**

Добавить нового пользователя в таблицу `users`:

```sql
INSERT INTO users (name, email)
VALUES ('Анна', 'anna@example.com');
```

Этот запрос добавит новую строку в таблицу `users` со значениями "Анна" в столбце `name` и "anna@example.com" в столбце `email`. 

### Оператор UPDATE: Обновление данных

Оператор `UPDATE` используется для изменения значений в существующих строках таблицы.

**Синтаксис:**

```sql
UPDATE <имя_таблицы>
SET <имя_столбца> = <новое_значение>
WHERE <условие>;
```

**Пример:**

Изменить адрес электронной почты пользователя с `id` равным 1:

```sql
UPDATE users
SET email = 'new_ivan@example.com'
WHERE id = 1;
```

Этот запрос обновит значение столбца `email` на "new_ivan@example.com" в строке, где `id` равно 1.

### Оператор DELETE: Удаление данных

Оператор `DELETE` используется для удаления строк из таблицы.

**Синтаксис:**

```sql
DELETE FROM <имя_таблицы>
WHERE <условие>;
```

**Важно:** Будьте осторожны при использовании оператора `DELETE`, так как удаленные данные восстановить будет невозможно. Всегда проверяйте условие `WHERE` перед выполнением запроса.

**Пример:**

Удалить пользователя с `id` равным 3:

```sql
DELETE FROM users
WHERE id = 3;
```

В этой статье мы рассмотрели основные операторы SQL, которые используются для работы с данными в MySQL 8.4. Более подробную информацию о каждом операторе и их возможностях вы можете найти в официальной документации MySQL.