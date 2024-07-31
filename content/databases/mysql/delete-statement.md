## Удаление данных (DELETE) в MySQL

В MySQL оператор `DELETE` используется для удаления строк из таблицы. 

### Базовый синтаксис

```sql
DELETE FROM имя_таблицы WHERE условие;
```

* `DELETE FROM`: указывает, что вы хотите удалить данные из таблицы.
* `имя_таблицы`: имя таблицы, из которой необходимо удалить данные.
* `WHERE условие`: необязательный параметр, определяющий, какие строки следует удалить. Если условие не указано, будут удалены все строки из таблицы.

### Примеры

**1. Удаление всех строк из таблицы:**

Допустим, у вас есть таблица `users` со следующими данными:

| id | name  | email             |
| -- | ----- | ----------------- |
| 1  | Иван   | ivan@example.com   |
| 2  | Анна  | anna@example.com   |
| 3  | Петр  | petr@example.com   |

Чтобы удалить все строки из таблицы `users`, выполните следующий запрос:

```sql
DELETE FROM users;
```

**Важно:** Будьте осторожны при использовании `DELETE` без условия `WHERE`, так как это приведет к удалению всех данных из таблицы.

**2. Удаление строк по условию:**

Чтобы удалить только определенные строки, используйте предложение `WHERE` с условием. Например, чтобы удалить пользователя с `id = 2`:

```sql
DELETE FROM users WHERE id = 2;
```

После выполнения этого запроса таблица `users` будет содержать следующие данные:

| id | name  | email             |
| -- | ----- | ----------------- |
| 1  | Иван   | ivan@example.com   |
| 3  | Петр  | petr@example.com   |

**3. Удаление строк с использованием нескольких условий:**

Вы можете использовать операторы сравнения (`=`, `!=`, `>`, `<`, `>=`, `<=`), логические операторы (`AND`, `OR`, `NOT`) и другие для создания более сложных условий. 

Например, чтобы удалить пользователей, чье имя начинается на "А" и email содержит "example.com":

```sql
DELETE FROM users WHERE name LIKE 'А%' AND email LIKE '%example.com%';
```

### Ограничение количества удаляемых строк

Вы можете ограничить количество удаляемых строк с помощью предложения `LIMIT`. Это полезно для постепенного удаления большого количества данных, чтобы не блокировать таблицу на длительное время. 

Например, чтобы удалить только первые 100 строк, удовлетворяющих условию:

```sql
DELETE FROM users WHERE name LIKE 'А%' LIMIT 100;
```

### Важные замечания

* `DELETE` без предложения `WHERE` удалит все строки из таблицы.
* Удаление строк с помощью `DELETE` является **необратимой** операцией.
* Перед выполнением запроса `DELETE` рекомендуется создать резервную копию данных.
* Для удаления данных из нескольких таблиц одновременно используйте оператор `JOIN`.
* Для временного скрытия данных вместо удаления используйте оператор `SELECT` с условием `WHERE`.

## Заключение

Оператор `DELETE` - важный инструмент для управления данными в MySQL. Используйте его с осторожностью, всегда проверяя условие `WHERE` перед выполнением запроса. 

В следующих разделах руководства мы рассмотрим более сложные операции с данными, такие как объединение таблиц, агрегатные функции и многое другое.