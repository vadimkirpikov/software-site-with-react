## Подзапросы в SQLite

Подзапрос – это запрос SQL, вложенный в другой запрос. Подзапросы могут использоваться в различных частях основного запроса, включая предложения `SELECT`, `FROM`, `WHERE`, `HAVING` и другие. Они позволяют получать данные, которые зависят от результатов другого запроса, делая SQL более гибким и мощным.

В SQLite подзапросы поддерживаются с версии 3. 

### Типы подзапросов

Существует два основных типа подзапросов:

* **Скалярные подзапросы:** Возвращают только одно значение (одно поле одной строки).
* **Строковые подзапросы:** Возвращают набор значений (одну или несколько строк с одним или несколькими полями).

### Использование подзапросов в предложении WHERE

Чаще всего подзапросы используются в предложении `WHERE` для фильтрации данных на основе результатов другого запроса.

**Пример:** Вывести имена всех клиентов, которые сделали заказы на сумму больше средней стоимости заказа.

```sql
SELECT customer_name
FROM customers
WHERE customer_id IN (
  SELECT DISTINCT customer_id
  FROM orders
  WHERE order_total > (
    SELECT AVG(order_total)
    FROM orders
  )
);
```

В этом примере:

1. Внутренний подзапрос `SELECT AVG(order_total) FROM orders` вычисляет среднюю стоимость всех заказов.
2. Следующий подзапрос `SELECT DISTINCT customer_id FROM orders WHERE order_total > ...`  находит ID клиентов, которые сделали заказы на сумму больше средней.
3. Внешний запрос `SELECT customer_name FROM customers WHERE customer_id IN ...`  выводит имена клиентов, ID которых присутствуют в результате предыдущего подзапроса.

### Использование подзапросов в предложении SELECT

Подзапросы можно использовать в предложении `SELECT` для вывода данных, вычисленных на основе других запросов.

**Пример:** Вывести имена всех клиентов и количество заказов, сделанных каждым клиентом.

```sql
SELECT 
  customer_name,
  (
    SELECT COUNT(*) 
    FROM orders 
    WHERE customers.customer_id = orders.customer_id
  ) AS order_count
FROM customers;
```

В этом примере:

1. Подзапрос `SELECT COUNT(*) FROM orders WHERE customers.customer_id = orders.customer_id`  считает количество заказов для каждого клиента, связывая таблицы `customers` и `orders` по полю `customer_id`.
2. Внешний запрос выводит имя клиента и результат подзапроса (количество заказов) под именем `order_count`.

### Использование подзапросов в предложении FROM

В предложении `FROM` подзапросы используются для создания временных таблиц на основе результатов другого запроса.

**Пример:** Вывести среднюю стоимость заказов для каждого клиента, у которого средняя стоимость заказа выше средней стоимости всех заказов.

```sql
SELECT 
  customer_id, 
  AVG(order_total) AS avg_order_total
FROM (
  SELECT 
    customer_id, 
    order_total 
  FROM orders
) AS customer_orders
GROUP BY customer_id
HAVING avg_order_total > (SELECT AVG(order_total) FROM orders);
```

В этом примере:

1. Подзапрос `SELECT customer_id, order_total FROM orders` создает временную таблицу `customer_orders` с данными о клиентах и суммах их заказов.
2. Внешний запрос использует `customer_orders` для группировки данных по `customer_id` и вычисления средней стоимости заказов для каждого клиента.
3. Предложение `HAVING` фильтрует результаты, оставляя только те группы, где средняя стоимость заказа выше средней стоимости всех заказов.

### Операторы сравнения с подзапросами

Вместе с подзапросами можно использовать следующие операторы сравнения:

* `=`: равно
* `>`: больше
* `<`: меньше
* `>=`: больше или равно
* `<=`: меньше или равно
* `!=`: не равно
* `IN`: входит в набор значений
* `NOT IN`: не входит в набор значений
* `EXISTS`: существует хотя бы одна строка, удовлетворяющая условию
* `NOT EXISTS`: не существует ни одной строки, удовлетворяющей условию

### Заключение

Подзапросы – мощный инструмент SQL, позволяющий создавать сложные запросы и получать данные, которые сложно получить другими способами. В этой статье мы рассмотрели основные типы подзапросов, примеры их использования в различных частях запроса и операторы сравнения, которые можно использовать с подзапросами. 