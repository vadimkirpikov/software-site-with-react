## Основные типы данных и схемы

В этой части руководства мы рассмотрим основные типы данных, используемых в TimeScaleDB, а также схемы, которые можно использовать для оптимизации хранения и запросов к временным данным. 

### Типы данных

TimeScaleDB поддерживает все базовые типы данных PostgreSQL, а также несколько специфических типов, оптимизированных для работы с временными рядами:

| Тип данных | Описание |
|---|---|
| **BIGINT** | Целое число с 64-битным представлением |
| **INTEGER** | Целое число с 32-битным представлением |
| **SMALLINT** | Целое число с 16-битным представлением |
| **NUMERIC** | Десятичное число с произвольной точностью |
| **DOUBLE PRECISION** | Число с плавающей точкой двойной точности |
| **REAL** | Число с плавающей точкой одинарной точности |
| **TEXT** | Строка неограниченной длины |
| **VARCHAR** | Строка с фиксированной максимальной длиной |
| **TIMESTAMP WITH TIME ZONE** | Дата и время с часовым поясом |
| **TIMESTAMP WITHOUT TIME ZONE** | Дата и время без часового пояса |
| **DATE** | Дата без времени |
| **BOOLEAN** | Логический тип данных (TRUE или FALSE) |
| **JSON** | JSON-объект |
| **JSONB** | JSON-объект с оптимизированным хранением |
| **GEOGRAPHY(POINT)** | Географическая точка |
| **GEOGRAPHY(POLYGON)** | Географический полигон |
| **HYPERLOGLOG** | Для приближенного подсчета уникальных значений |

### Схемы данных

TimeScaleDB позволяет создавать различные схемы для хранения и запроса данных временных рядов. Вот несколько популярных схем:

#### 1. Простая схема

Эта схема используется, когда данные хранятся в одной таблице, где столбец времени является единственным ключом для группировки записей. 

**Пример:**

```sql
CREATE TABLE measurements (
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    sensor_id INTEGER NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    PRIMARY KEY (time)
);
```

#### 2. Схема с использованием гипертаблиц

В этом случае данные хранятся в гипертаблице, где время является одним из ключей для группировки. 

**Пример:**

```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE measurements (
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    sensor_id INTEGER NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    PRIMARY KEY (sensor_id, time)
);

SELECT create_hypertable('measurements', 'time'); 
```

В этом примере `time` используется в качестве временного столбца для создания гипертаблицы. Гипертаблица разделяет данные по времени, что позволяет эффективно выполнять операции над данными.

#### 3. Схема с использованием нескольких таблиц

В этом случае данные хранятся в нескольких таблицах, где каждая таблица представляет собой отдельный временной ряд.

**Пример:**

```sql
CREATE TABLE sensor_1 (
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    PRIMARY KEY (time)
);

CREATE TABLE sensor_2 (
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    PRIMARY KEY (time)
);

SELECT create_hypertable('sensor_1', 'time');
SELECT create_hypertable('sensor_2', 'time');
```

#### 4. Схема с использованием "bucket" таблиц

В этом случае данные разбиваются на несколько "bucket" таблиц по определенным критериям. Это позволяет оптимизировать операции над большими объемами данных.

**Пример:**

```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE measurements (
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    sensor_id INTEGER NOT NULL,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    PRIMARY KEY (sensor_id, time)
);

SELECT create_hypertable('measurements', 'time', chunk_time_interval => INTERVAL '1 day'); 

-- Разбиение на "bucket" таблицы по времени
CREATE MATERIALIZED VIEW measurements_day AS
SELECT *
FROM measurements
WHERE time >= '2023-01-01' AND time < '2023-01-02';

-- Создание гипертаблицы для "bucket" таблицы
SELECT create_hypertable('measurements_day', 'time');
```

### Выбор схемы

Выбор оптимальной схемы для хранения данных временных рядов зависит от конкретных требований приложения, таких как:

* **Размер данных**: Для больших объемов данных рекомендуется использовать гипертаблицы или "bucket" таблицы.
* **Частота запросов**: Если требуется высокая частота запросов, можно использовать гипертаблицы или "bucket" таблицы для оптимизации времени выполнения.
* **Тип запросов**: Для запросов, которые группируют данные по определенным критериям, можно использовать схемы с несколькими таблицами.

### Заключение

В этой статье мы рассмотрели основные типы данных и схемы, используемые в TimeScaleDB. Правильный выбор схемы данных позволит оптимизировать хранение и доступ к временным данным, что повысит производительность и эффективность вашего приложения. 
