## Работа с JSON в MySQL

MySQL версии 8.4 предоставляет широкие возможности для работы с данными в формате JSON (JavaScript Object Notation).  JSON - это текстовый формат данных, основанный на использовании пар "ключ-значение" и упорядоченных списков. 

### Хранение JSON-данных

Хранить JSON данные в MySQL можно в столбцах типа `JSON`. 

**Пример:**

```sql
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    contact_info JSON
);
```
В этом примере таблица `customers` содержит столбец `contact_info` типа `JSON`, предназначенный для хранения контактной информации в формате JSON.

#### Вставка JSON-данных:

Для вставки JSON-данных используйте обычный синтаксис `INSERT`, передавая JSON-объект в виде строки:

```sql
INSERT INTO customers (name, contact_info) VALUES 
('Иван Иванов', '{ "email": "ivan@example.com", "phone": "123-456-7890" }');
```

#### Запрос JSON-данных:

Для получения JSON-данных из таблицы используйте оператор `SELECT`:

```sql
SELECT * FROM customers;
```

Результат:

| id | name          | contact_info                                   |
|----|---------------|------------------------------------------------|
| 1  | Иван Иванов | {"email": "ivan@example.com", "phone": "123-456-7890" } |

### Доступ к элементам JSON

MySQL предоставляет функции для доступа к определенным элементам JSON-данных:

- **`->`**: Оператор доступа к члену. Используется для доступа к значению по ключу.
- **`->>`**: Оператор извлечения значения.  Извлекает значение по ключу и возвращает его как текст.


**Пример:**

```sql
SELECT 
    name,
    contact_info->>'$.email' AS email,
    contact_info->'$.phone' AS phone
FROM customers;
```

В этом запросе:

- `contact_info->>'$.email'` извлекает значение ключа `email` из объекта `contact_info`.
- `contact_info->'$.phone'` извлекает значение ключа `phone`  из объекта `contact_info`.

### Поиск по JSON-данным

MySQL поддерживает поиск внутри JSON-данных с помощью функций `JSON_CONTAINS` и `JSON_SEARCH`.

**Пример поиска по значению:**

```sql
SELECT * 
FROM customers
WHERE JSON_CONTAINS(contact_info, '"ivan@example.com"', '$.email'); 
```

Этот запрос находит все записи, где в поле `contact_info` ключ `email` содержит значение `"ivan@example.com"`.

**Пример поиска по ключу:**

```sql
SELECT *
FROM customers
WHERE JSON_SEARCH(contact_info, 'one', '$.phone') IS NOT NULL;
```

Этот запрос находит все записи, где в поле `contact_info`  присутствует ключ `phone`.

### Модификация JSON-данных

MySQL предоставляет функции для изменения JSON-данных:

- **`JSON_SET`**: Устанавливает новые или изменяет существующие значения в JSON-документе.
- **`JSON_REMOVE`**: Удаляет значения из JSON-документа.
- **`JSON_ARRAY_APPEND`**: Добавляет значение в массив JSON-документа.

**Пример изменения значения:**

```sql
UPDATE customers
SET contact_info = JSON_SET(contact_info, '$.phone', '987-654-3210')
WHERE id = 1;
```

Этот запрос обновляет значение ключа `phone` в поле `contact_info` для записи с `id = 1`.

**Пример добавления элемента в массив:**
```sql
UPDATE customers
SET contact_info = JSON_ARRAY_APPEND(contact_info, '$.social', '"twitter": "@ivanivanov"')
WHERE id = 1;
```

Этот запрос добавляет новый элемент `twitter` в массив `social`  в поле `contact_info` для записи с `id = 1`.

###  Дополнительные функции

MySQL предлагает множество других функций для работы с JSON, таких как:

* `JSON_TYPE`:  возвращает тип значения JSON документа
* `JSON_VALID`: проверяет, является ли строка валидным JSON документом
* `JSON_KEYS`: возвращает ключи объекта JSON в виде массива
* `JSON_LENGTH`: возвращает количество элементов в объекте JSON

### Заключение

Использование JSON в MySQL  - это удобный способ хранения и обработки  сложных, структурированных данных. С помощью  функций для работы с JSON,  вы можете легко получать, изменять и искать информацию внутри JSON-документов. 
