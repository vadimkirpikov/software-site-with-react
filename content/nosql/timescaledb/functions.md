## Встроенные функции и расширения

TimeScaleDB предоставляет богатый набор встроенных функций и расширений, которые значительно расширяют функциональность базы данных и позволяют решать широкий спектр задач с временными рядами. В этой статье мы рассмотрим наиболее полезные функции и расширения, доступные в TimeScaleDB версии 2.12.0.

### Встроенные функции

TimeScaleDB включает в себя множество встроенных функций, оптимизированных для работы с временными рядами. Рассмотрим некоторые из наиболее полезных:

**1. `time_bucket`:**

Функция `time_bucket` используется для группировки данных по заданным интервалам времени. Она принимает два аргумента:

- `interval`: интервал времени, по которому будет группироваться data (например, '1 hour', '1 day', '1 week').
- `timestamp`: столбец с временными метками.

**Пример:**

```sql
-- Группировка данных по часам
SELECT time_bucket('1 hour', time_column) AS time_bucket, AVG(value) AS average_value
FROM measurements
GROUP BY time_bucket
ORDER BY time_bucket;
```

**2. `date_trunc`:**

Функция `date_trunc` обрезает временную метку до заданного уровня (например, день, месяц, год).

**Пример:**

```sql
-- Обрезка временной метки до дня
SELECT date_trunc('day', time_column) AS day, SUM(value) AS total_value
FROM measurements
GROUP BY day
ORDER BY day;
```

**3. `first_value` и `last_value`:**

Эти функции возвращают первое и последнее значение в пределах заданного интервала.

**Пример:**

```sql
-- Получение первого и последнего значения за каждый час
SELECT time_bucket('1 hour', time_column) AS time_bucket,
       first_value(value) OVER (PARTITION BY time_bucket ORDER BY time_column) AS first_value,
       last_value(value) OVER (PARTITION BY time_bucket ORDER BY time_column) AS last_value
FROM measurements;
```

**4. `lag` и `lead`:**

Функции `lag` и `lead` используются для получения значений из предыдущей или следующей строки в пределах заданного интервала.

**Пример:**

```sql
-- Получение значения из предыдущей строки
SELECT time_column, value, lag(value, 1, 0) OVER (ORDER BY time_column) AS previous_value
FROM measurements;
```

**5. `array_agg`:**

Функция `array_agg` собирает значения в массив.

**Пример:**

```sql
-- Создание массива значений за каждый день
SELECT date_trunc('day', time_column) AS day, array_agg(value) AS values
FROM measurements
GROUP BY day
ORDER BY day;
```

### Расширения

TimeScaleDB предлагает несколько расширений, которые расширяют функциональность базы данных. Рассмотрим некоторые из них:

**1. `timescaledb-toolkit`:**

Это расширение предоставляет набор функций для работы с временными рядами. Включает в себя:

- **`hypertable_add_column`:** добавление колонки в гипертаблицу.
- **`hypertable_drop_column`:** удаление колонки из гипертаблицы.
- **`hypertable_alter_column`:** изменение типа данных колонки в гипертаблице.
- **`hypertable_set_chunk_time_interval`:** изменение интервала времени для чанков.
- **`hypertable_create_index`:** создание индекса для гипертаблицы.
- **`hypertable_drop_index`:** удаление индекса из гипертаблицы.

**Пример:**

```sql
-- Добавление новой колонки в гипертаблицу
CREATE EXTENSION IF NOT EXISTS timescaledb_toolkit;

SELECT hypertable_add_column('measurements', 'new_column', 'INTEGER');
```

**2. `timescaledb-experimental`:**

Это расширение включает экспериментальные функции, которые могут быть недоступны в стабильных версиях. Включает в себя:

- **`timescaledb_continuous_aggregate`:** создание непрерывных агрегаций.
- **`timescaledb_materialize_continuous_aggregate`:** материализация непрерывных агрегаций.

**Пример:**

```sql
-- Создание непрерывной агрегации
CREATE EXTENSION IF NOT EXISTS timescaledb_experimental;

SELECT timescaledb_continuous_aggregate(
  'average_value',
  'measurements',
  'time_column',
  '1 hour',
  'AVG(value)',
  'materialized',
  'time_bucket(''1 hour'', time_column)'
);
```

**3. `pg_cron`:**

Расширение `pg_cron` позволяет создавать запланированные задачи, которые будут выполняться в определенное время.

**Пример:**

```sql
-- Создание задачи, которая будет выполняться каждый час
CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION hourly_task() RETURNS VOID AS $$
BEGIN
  -- Ваш код для выполнения задачи
END;
$$ LANGUAGE plpgsql;

SELECT cron.schedule('hourly_task', '*/1 * * * *');
```

**4. `pg_stat_statements`:**

Расширение `pg_stat_statements` собирает статистику по выполняемым SQL-запросам.

**Пример:**

```sql
-- Включение сбора статистики
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Просмотр статистики
SELECT query, calls, total_time
FROM pg_stat_statements
ORDER BY total_time DESC;
```

### Заключение

Встроенные функции и расширения TimeScaleDB предоставляют мощные инструменты для работы с временными рядами. Они позволяют упростить сложные задачи, повысить эффективность запросов и получить более глубокое понимание данных. 

Помните, что это лишь краткий обзор доступных функций и расширений. Для получения более подробной информации, рекомендуется ознакомиться с документацией TimeScaleDB.
