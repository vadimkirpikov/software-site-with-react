## Соединение таблиц по нескольким столбцам в SQLite

В SQLite вы можете объединять данные из нескольких таблиц, используя оператор `JOIN`. Этот оператор позволяет сопоставлять строки из разных таблиц на основе общих значений в указанных столбцах. 

В предыдущих разделах мы рассмотрели примеры соединения таблиц по одному столбцу. Однако, бывают случаи, когда необходимо выполнить соединение по двум и более столбцам.  

### Пример соединения по нескольким столбцам

Представим, у нас есть две таблицы: `employees` (сотрудники) и `departments` (отделы).

**Таблица `employees`**:

| id  | name      | department_id | position_id |
| --- | --------- | ------------- | ----------- |
| 1   | Иван       | 1             | 1           |
| 2   | Мария      | 1             | 2           |
| 3   | Петр       | 2             | 1           |

**Таблица `departments`**:

| id  | name         | location    |
| --- | ------------ | ----------- |
| 1   | Разработка   | Офис 1      |
| 2   | Маркетинг    | Офис 2      |

Допустим, нам нужно получить список всех сотрудников с информацией об их отделе, но при этом мы хотим сопоставить сотрудников и отделы не только по `department_id`, но и по `position_id`. 

Для этого нам потребуется третья таблица `positions`:

**Таблица `positions`**:

| id  | name       |
| --- | ---------- |
| 1   | Разработчик |
| 2   | Менеджер   |

Теперь мы можем выполнить соединение по двум столбцам:

```sql
SELECT 
    e.name AS employee_name, 
    d.name AS department_name,
    p.name AS position_name
FROM 
    employees e
JOIN 
    departments d ON e.department_id = d.id
JOIN
    positions p ON e.position_id = p.id;
```

В этом запросе мы:

1. Выбираем имя сотрудника (`e.name`) как `employee_name`, имя отдела (`d.name`) как `department_name` и название должности (`p.name`) как `position_name`.
2. Используем `JOIN` для соединения таблицы `employees` (с алиасом `e`) с таблицей `departments` (с алиасом `d`) по столбцу `department_id`.
3. Используем еще один `JOIN` для соединения результата предыдущего соединения с таблицей `positions` (с алиасом `p`) по столбцу `position_id`.

Результат выполнения запроса будет следующим:

| employee_name | department_name | position_name |
| ------------- | --------------- | ------------- |
| Иван          | Разработка      | Разработчик    |
| Мария         | Разработка      | Менеджер      |
| Петр          | Маркетинг       | Разработчик    |

### Важные моменты

* Вы можете использовать несколько операторов `JOIN` для соединения более чем двух таблиц.
* Убедитесь, что типы данных столбцов, используемых для соединения, совпадают.
* При использовании нескольких операторов `JOIN` следите за порядком их выполнения, так как это может повлиять на результат. 

Соединение таблиц по нескольким столбцам – это мощный инструмент, который позволяет получать комплексные данные из ваших таблиц SQLite. Используйте его для создания более информативных и полезных запросов. 