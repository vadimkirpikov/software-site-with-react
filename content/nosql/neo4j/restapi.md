## REST API Neo4j

Neo4j предоставляет REST API для взаимодействия с базой данных. Он позволяет выполнять различные операции, такие как создание, чтение, обновление и удаление (CRUD) узлов, ребер и свойств, а также выполнять запросы Cypher. 

### Основные концепции

REST API Neo4j использует стандартные HTTP методы, такие как GET, POST, PUT, DELETE и PATCH для выполнения операций. 

**Ресурсы:**

* **Узлы (Nodes):** Ресурсы, представляющие собой объекты в графе.
* **Ребра (Relationships):** Ресурсы, представляющие связи между узлами.
* **Свойства (Properties):** Ресурсы, хранящие данные, связанные с узлами и ребрами.
* **Запросы Cypher:** Ресурс для выполнения запросов Cypher.

**URL:**

API Neo4j использует URL для идентификации ресурсов. 

* **Базовый URL:** `/db/data/`
* **Узлы:** `/db/data/node/{id}`
* **Ребра:** `/db/data/relationship/{id}`
* **Запросы Cypher:** `/db/data/cypher`

**Форматы данных:**

REST API Neo4j поддерживает различные форматы данных, такие как JSON и CSV. 

### Базовые операции

**Создание узла:**

```http
POST /db/data/node
```

**Тело запроса (JSON):**

```json
{}
```

**Ответ (JSON):**

```json
{
  "self": "http://localhost:7474/db/data/node/1",
  "data": {}
}
```

**Создание ребра:**

```http
POST /db/data/node/1/relationships/friend
```

**Тело запроса (JSON):**

```json
{
  "to": "http://localhost:7474/db/data/node/2",
  "data": {}
}
```

**Ответ (JSON):**

```json
{
  "self": "http://localhost:7474/db/data/relationship/1",
  "start": "http://localhost:7474/db/data/node/1",
  "end": "http://localhost:7474/db/data/node/2",
  "type": "friend",
  "data": {}
}
```

**Чтение узла:**

```http
GET /db/data/node/1
```

**Ответ (JSON):**

```json
{
  "self": "http://localhost:7474/db/data/node/1",
  "data": {}
}
```

**Чтение ребра:**

```http
GET /db/data/relationship/1
```

**Ответ (JSON):**

```json
{
  "self": "http://localhost:7474/db/data/relationship/1",
  "start": "http://localhost:7474/db/data/node/1",
  "end": "http://localhost:7474/db/data/node/2",
  "type": "friend",
  "data": {}
}
```

**Обновление узла:**

```http
PUT /db/data/node/1
```

**Тело запроса (JSON):**

```json
{
  "name": "John Doe"
}
```

**Ответ (JSON):**

```json
{
  "self": "http://localhost:7474/db/data/node/1",
  "data": {
    "name": "John Doe"
  }
}
```

**Обновление ребра:**

```http
PUT /db/data/relationship/1
```

**Тело запроса (JSON):**

```json
{
  "since": "2023-01-01"
}
```

**Ответ (JSON):**

```json
{
  "self": "http://localhost:7474/db/data/relationship/1",
  "start": "http://localhost:7474/db/data/node/1",
  "end": "http://localhost:7474/db/data/node/2",
  "type": "friend",
  "data": {
    "since": "2023-01-01"
  }
}
```

**Удаление узла:**

```http
DELETE /db/data/node/1
```

**Удаление ребра:**

```http
DELETE /db/data/relationship/1
```

### Запросы Cypher

REST API Neo4j предоставляет ресурс `/db/data/cypher` для выполнения запросов Cypher.

**Выполнение запроса:**

```http
POST /db/data/cypher
```

**Тело запроса (JSON):**

```json
{
  "query": "MATCH (n:Person) RETURN n.name"
}
```

**Ответ (JSON):**

```json
{
  "columns": [
    "n.name"
  ],
  "data": [
    [
      "John Doe"
    ],
    [
      "Jane Doe"
    ]
  ]
}
```

### Пример: Создание графа

**Шаг 1:** Создание двух узлов.

```http
POST /db/data/node
```

```http
POST /db/data/node
```

**Шаг 2:** Создание ребра между двумя узлами.

```http
POST /db/data/node/1/relationships/friend
```

**Тело запроса (JSON):**

```json
{
  "to": "http://localhost:7474/db/data/node/2",
  "data": {
    "since": "2023-01-01"
  }
}
```

**Шаг 3:** Обновление свойств узлов.

```http
PUT /db/data/node/1
```

**Тело запроса (JSON):**

```json
{
  "name": "John Doe"
}
```

```http
PUT /db/data/node/2
```

**Тело запроса (JSON):**

```json
{
  "name": "Jane Doe"
}
```

**Шаг 4:** Выполнение запроса Cypher для получения данных.

```http
POST /db/data/cypher
```

**Тело запроса (JSON):**

```json
{
  "query": "MATCH (n:Person)-[r:friend]->(m:Person) RETURN n.name, r.since, m.name"
}
```

### Преимущества REST API

* **Простота использования:** API использует стандартные HTTP методы и форматы данных.
* **Гибкость:** API позволяет выполнять различные операции над узлами, ребрами и свойствами.
* **Независимость от языка:** API доступен для использования с любым языком программирования.
* **Стандартная документация:** API имеет четкую и исчерпывающую документацию.

### Заключение

REST API Neo4j предоставляет мощный инструмент для взаимодействия с базой данных. Он позволяет легко создавать, читать, обновлять и удалять данные, а также выполнять запросы Cypher. 
