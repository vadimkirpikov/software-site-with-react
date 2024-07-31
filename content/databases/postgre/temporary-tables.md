## Временные таблицы

Временные таблицы в PostgreSQL предоставляют возможность хранения данных в рамках сессии подключения к базе данных.  Они существуют только во время сеанса и автоматически удаляются при его завершении. Временные таблицы идеально подходят для хранения промежуточных результатов запросов, организации сложных вычислений или временного хранения данных для последующей обработки.

### Типы временных таблиц

PostgreSQL предлагает два типа временных таблиц:

* **Локальные временные таблицы**:  Создаются с помощью ключевого слова `TEMPORARY` или `LOCAL TEMPORARY`.  Доступны только в рамках текущей транзакции и удаляются при ее завершении.

* **Глобальные временные таблицы**: Создаются с помощью ключевого слова `GLOBAL TEMPORARY` или `GLOBAL`. Существуют до завершения сессии подключения, даже если транзакция, в которой они были созданы, была отменена.

### Создание временных таблиц

Синтаксис создания временной таблицы аналогичен созданию обычной таблицы, с добавлением ключевого слова `TEMPORARY` или `GLOBAL TEMPORARY`:

```sql
CREATE TEMPORARY TABLE имя_таблицы (
    -- Определение столбцов
);
```

**Пример:**

```sql
-- Создание локальной временной таблицы
CREATE TEMP TABLE products_temp (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2)
);

-- Создание глобальной временной таблицы
CREATE GLOBAL TEMPORARY TABLE users_temp (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255)
);
```

### Заполнение временных таблиц

Заполнение временных таблиц данными осуществляется так же, как и для обычных таблиц, с использованием операторов `INSERT`, `UPDATE` и `DELETE`.

**Пример:**

```sql
-- Вставка данных в локальную временную таблицу products_temp
INSERT INTO products_temp (name, price) VALUES
('Молоко', 50.00),
('Хлеб', 35.50),
('Яблоки', 120.00);
```

### Использование временных таблиц

Временные таблицы используются аналогично обычным таблицам. Вы можете выполнять с ними любые SQL-запросы, включая выборку данных, фильтрацию, сортировку, объединение и агрегацию.

**Пример:**

```sql
-- Выборка всех продуктов из временной таблицы products_temp, цена которых больше 40
SELECT * FROM products_temp WHERE price > 40;
```

### Удаление временных таблиц

Локальные временные таблицы удаляются автоматически при завершении транзакции, в которой они были созданы. Глобальные временные таблицы удаляются при завершении сессии подключения. 

Вы также можете удалить временную таблицу вручную с помощью оператора `DROP TABLE`, указав имя таблицы и ключевое слово `TEMPORARY`.

**Пример:**

```sql
-- Удаление локальной временной таблицы
DROP TABLE TEMPORARY products_temp;

-- Удаление глобальной временной таблицы
DROP TABLE GLOBAL TEMPORARY users_temp;
```

### Преимущества использования временных таблиц

Использование временных таблиц в PostgreSQL предоставляет ряд преимуществ:

* **Изоляция данных:** Временные таблицы изолированы в рамках сессии или транзакции, что предотвращает конфликты имен и данных с другими пользователями или сессиями.
* **Повышение производительности:** Временные таблицы хранятся в памяти или временных файлах, что обеспечивает более высокую скорость доступа к данным по сравнению с постоянными таблицами.
* **Упрощение сложных запросов:** Временные таблицы позволяют разбить сложные запросы на несколько этапов, сохраняя промежуточные результаты и делая код более читаемым.
* **Повторное использование данных:** Данные во временных таблицах могут быть использованы многократно в рамках сессии или транзакции.

### Примеры использования

**Пример 1: Хранение промежуточных результатов**

Представьте, что вам нужно выбрать всех пользователей, сделавших заказы на сумму более 1000 рублей за последний месяц, а затем вывести их имена, адреса электронной почты и общую сумму заказов. 

```sql
-- Создание временной таблицы для хранения пользователей и суммы их заказов
CREATE TEMP TABLE high_value_customers AS
SELECT
    u.id,
    u.username,
    u.email,
    SUM(o.total_amount) AS total_order_amount
FROM
    users u
JOIN
    orders o ON u.id = o.user_id
WHERE
    o.order_date >= NOW() - INTERVAL '1 month'
GROUP BY
    u.id, u.username, u.email
HAVING
    SUM(o.total_amount) > 1000;

-- Выборка данных из временной таблицы
SELECT
    username,
    email,
    total_order_amount
FROM
    high_value_customers;
```

**Пример 2: Организация сложных вычислений**

Временные таблицы могут быть полезны при выполнении сложных вычислений, например, для расчета скользящего среднего.

```sql
-- Создание временной таблицы с ежедневными продажами
CREATE TEMP TABLE daily_sales AS
SELECT
    date_trunc('day', order_date) AS sales_date,
    SUM(total_amount) AS daily_total
FROM
    orders
GROUP BY
    sales_date;

-- Вычисление 3-дневного скользящего среднего продаж
SELECT
    ds.sales_date,
    ds.daily_total,
    AVG(ds2.daily_total) OVER (ORDER BY ds.sales_date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_average
FROM
    daily_sales ds
JOIN
    daily_sales ds2 ON ds2.sales_date BETWEEN ds.sales_date - INTERVAL '2 days' AND ds.sales_date
ORDER BY
    ds.sales_date;
```

### Заключение

Временные таблицы в PostgreSQL являются мощным инструментом для работы с данными в рамках сессии или транзакции. Они позволяют изолировать данные, повысить производительность, упростить сложные запросы и многократно использовать результаты вычислений. Понимание принципов работы и возможностей временных таблиц поможет вам разрабатывать более эффективные и производительные приложения баз данных.