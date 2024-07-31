## Типы соединений (INNER JOIN, LEFT JOIN, RIGHT JOIN) в SQLite

Соединения (JOIN) в SQLite позволяют объединять данные из нескольких таблиц в один результирующий набор. Это одна из самых мощных функций SQL, позволяющая строить сложные запросы и получать ценную информацию из ваших данных. В SQLite версии 3.43 доступны следующие типы соединений: `INNER JOIN`, `LEFT JOIN` и `RIGHT JOIN`.

### INNER JOIN

`INNER JOIN` возвращает строки, только если в обеих соединяемых таблицах есть совпадающие значения. Для каждой строки в первой таблице, для которой есть совпадение во второй таблице, возвращается объединенная строка.

**Синтаксис:**

```sql
SELECT column_list
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

**Пример:**

Предположим, у нас есть две таблицы: "customers" (клиенты) и "orders" (заказы). 

Таблица "customers":

| customer_id | customer_name |
|---|---|
| 1 | Иван |
| 2 | Мария |
| 3 | Петр |

Таблица "orders":

| order_id | customer_id | product |
|---|---|---|
| 101 | 1 | Телефон |
| 102 | 2 | Ноутбук |
| 103 | 1 | Наушники |

Чтобы получить список клиентов и их заказов, используем `INNER JOIN`:

```sql
SELECT customers.customer_name, orders.product
FROM customers
INNER JOIN orders 
ON customers.customer_id = orders.customer_id;
```

Результат:

| customer_name | product |
|---|---|
| Иван | Телефон |
| Иван | Наушники |
| Мария | Ноутбук |

В этом примере `INNER JOIN` вернул только те строки, где `customer_id` совпадал в обеих таблицах. 

### LEFT JOIN

`LEFT JOIN` возвращает все строки из "левой" таблицы (той, которая указана первой в операторе `FROM`), даже если во второй ("правой") таблице нет соответствующих строк. Для строк из левой таблицы, для которых нет совпадений в правой таблице, в результирующем наборе будут значения `NULL` для столбцов из правой таблицы.

**Синтаксис:**

```sql
SELECT column_list
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

**Пример:**

Используя те же таблицы "customers" и "orders", выполним следующий запрос с `LEFT JOIN`:

```sql
SELECT customers.customer_name, orders.product
FROM customers
LEFT JOIN orders 
ON customers.customer_id = orders.customer_id;
```

Результат:

| customer_name | product |
|---|---|
| Иван | Телефон |
| Иван | Наушники |
| Мария | Ноутбук |
| Петр | NULL |

В этом случае `LEFT JOIN` вернул все строки из таблицы "customers".  Так как у клиента "Петр" нет заказов, значение в столбце "product" для него равно `NULL`.

### RIGHT JOIN

`RIGHT JOIN` работает аналогично `LEFT JOIN`, но возвращает все строки из "правой" таблицы (второй в операторе `FROM`), даже если в левой таблице нет соответствующих строк.  Для строк из правой таблицы, для которых нет совпадений в левой таблице, в результирующем наборе будут значения `NULL` для столбцов из левой таблицы.

**Важно:** SQLite не поддерживает `RIGHT JOIN` напрямую.  Для достижения аналогичного результата можно использовать `LEFT JOIN`, поменяв местами таблицы в запросе.

**Пример:**

Чтобы получить результат, аналогичный `RIGHT JOIN` в нашем примере, используем `LEFT JOIN` с измененным порядком таблиц:

```sql
SELECT customers.customer_name, orders.product
FROM orders
LEFT JOIN customers 
ON customers.customer_id = orders.customer_id;
```

Результат:

| customer_name | product |
|---|---|
| Иван | Телефон |
| Мария | Ноутбук |
| Иван | Наушники |

В этом случае мы получили все заказы из таблицы "orders", даже если бы у нас не было информации о клиенте в таблице "customers".

### Выбор правильного типа соединения

Выбор правильного типа соединения зависит от того, какие данные вы хотите получить:

- **`INNER JOIN`:** Возвращает строки, только если есть совпадения в обеих таблицах.
- **`LEFT JOIN`:** Возвращает все строки из левой таблицы и совпадающие строки из правой таблицы.
- **`RIGHT JOIN`:** Эмулируется с помощью `LEFT JOIN` в SQLite и возвращает все строки из правой таблицы и совпадающие строки из левой таблицы.

Тщательно проанализируйте ваши данные и требования к запросу, чтобы выбрать наиболее подходящий тип соединения. 