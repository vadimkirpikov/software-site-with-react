## Основные SQL запросы

Данный раздел посвящен базовым SQL-запросам, используемым для работы с TimeScaleDB. Мы рассмотрим наиболее часто применяемые операции, такие как выборка данных, фильтрация, агрегация и сортировка.

### Выборка данных

Для получения данных из таблицы TimeScaleDB используется оператор `SELECT`. 

**Пример:** 

```sql
-- Выборка всех данных из таблицы "measurements"
SELECT * FROM measurements;
```

**Пример:** 

```sql
-- Выборка определенных столбцов из таблицы "measurements"
SELECT time, value FROM measurements;
```

### Фильтрация данных

Для отбора данных, удовлетворяющих определенным условиям, используются операторы сравнения (`=`, `!=`, `<`, `>`, `<=`, `>=`) и логические операторы (`AND`, `OR`, `NOT`). 

**Пример:** 

```sql
-- Выборка данных с "value" больше 10
SELECT * FROM measurements WHERE value > 10;
```

**Пример:** 

```sql
-- Выборка данных с "time" между двумя значениями
SELECT * FROM measurements WHERE time BETWEEN '2023-01-01' AND '2023-01-31';
```

**Пример:** 

```sql
-- Выборка данных, удовлетворяющих нескольким условиям
SELECT * FROM measurements WHERE time BETWEEN '2023-01-01' AND '2023-01-31' AND value > 10;
```

### Агрегация данных

Для получения сводных данных по выбранным значениям используются агрегатные функции (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`).

**Пример:** 

```sql
-- Подсчет всех записей в таблице "measurements"
SELECT COUNT(*) FROM measurements;
```

**Пример:** 

```sql
-- Вычисление среднего значения "value" в таблице "measurements"
SELECT AVG(value) FROM measurements;
```

**Пример:** 

```sql
-- Вычисление максимального значения "value" в таблице "measurements"
SELECT MAX(value) FROM measurements;
```

### Сортировка данных

Для упорядочивания результатов запроса используется оператор `ORDER BY`. 

**Пример:** 

```sql
-- Сортировка таблицы "measurements" по столбцу "time" в порядке возрастания
SELECT * FROM measurements ORDER BY time;
```

**Пример:** 

```sql
-- Сортировка таблицы "measurements" по столбцу "value" в порядке убывания
SELECT * FROM measurements ORDER BY value DESC;
```

### Ограничение результатов

Для получения определенного количества записей используется оператор `LIMIT`.

**Пример:** 

```sql
-- Выборка первых 10 записей из таблицы "measurements"
SELECT * FROM measurements LIMIT 10;
```

### Пошаговая инструкция

**1. Подключение к базе данных:**

```sql
psql -h <hostname> -p <port> -U <username> -d <database_name>
```

**2. Выполнение запросов:**

```sql
-- Введите SQL-запрос в консоли psql и нажмите Enter
```

**3. Получение результатов:**

Результаты запроса отобразятся в консоли psql.

### Примеры кода

**1. Выборка данных за последние 24 часа:**

```sql
SELECT * FROM measurements WHERE time >= NOW() - INTERVAL '24 hours';
```

**2. Вычисление средней температуры за каждый день:**

```sql
SELECT date(time) AS day, AVG(value) AS average_temperature FROM measurements GROUP BY day ORDER BY day;
```

**3. Выборка 10 записей с максимальным значением "value":**

```sql
SELECT * FROM measurements ORDER BY value DESC LIMIT 10;
```

**4. Выборка записей, которые были добавлены после 10:00 утра:**

```sql
SELECT * FROM measurements WHERE time >= NOW() - INTERVAL '10 hours';
```

**5. Выборка записей с "value" в диапазоне от 10 до 20:**

```sql
SELECT * FROM measurements WHERE value BETWEEN 10 AND 20;
```

### Заключение

В этом разделе мы рассмотрели базовые SQL-запросы для работы с TimeScaleDB. В следующих разделах будут рассмотрены более сложные операции, такие как использование временных функций, создание индексов и управление данными.
