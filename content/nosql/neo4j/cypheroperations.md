## Основные операции Cypher: MATCH, CREATE, и RETURN

Cypher – это язык запросов, специально разработанный для работы с графовыми базами данных, такими как Neo4j. Он позволяет манипулировать данными, хранящимися в графе, используя простые и интуитивно понятные команды. В этом разделе мы рассмотрим три ключевые операции Cypher: `MATCH`, `CREATE` и `RETURN`, которые являются основой для работы с графовыми данными. 

### `MATCH` 

`MATCH` используется для поиска узлов и ребер в графе, удовлетворяющих определенным критериям. Он позволяет найти определенные сущности и установить связи между ними. 

**Синтаксис:**

```cypher
MATCH (n:Label {property: value})-[r:RelationshipType]->(m:Label)
RETURN n, r, m;
```

**Описание:**

* `(n:Label {property: value})` – ищет узел с меткой `Label`, имеющий свойство `property` со значением `value`.
* `-[r:RelationshipType]->` – ищет ребро с типом `RelationshipType`, направленное от узла `n` к узлу `m`.
* `(m:Label)` – ищет узел с меткой `Label`.
* `RETURN n, r, m;` – возвращает найденные узлы и ребро.

**Пример:**

```cypher
// Найдем всех людей, которые живут в городе "London"
MATCH (p:Person)-[:LIVES_IN]->(c:City {name: "London"})
RETURN p, c;
```

Этот запрос найдет все узлы с меткой `Person`, связанные с узлами с меткой `City` и свойством `name`, равным `London`. В результате запроса мы получим список найденных людей и городов, в которых они живут.

**Дополнительные возможности `MATCH`:**

* Можно использовать более сложные выражения для поиска узлов и ребер, например:
    * `(n:Person {name: "John"})` -  поиск узла с меткой `Person` и именем `John`.
    * `(n:Person)-[:WORKS_AT]->(c:Company {name: "Google"})` - поиск узла с меткой `Person`, работающего в компании `Google`.
    * `(n:Person)-[:LIVES_IN]->(c:City)<-[:LIVES_IN]-(o:Person)` - поиск людей, живущих в одном городе.
* Можно комбинировать `MATCH` с другими операторами Cypher, такими как `WHERE`, `WITH` и `ORDER BY`, для более точного поиска и фильтрации данных.

### `CREATE`

`CREATE` используется для добавления новых узлов и ребер в граф.

**Синтаксис:**

```cypher
CREATE (n:Label {property: value})-[r:RelationshipType]->(m:Label {property: value});
```

**Описание:**

* `(n:Label {property: value})` – создает новый узел с меткой `Label`, имеющий свойство `property` со значением `value`.
* `-[r:RelationshipType]->` – создает новое ребро с типом `RelationshipType`, направленное от узла `n` к узлу `m`.
* `(m:Label {property: value})` – создает новый узел с меткой `Label`, имеющий свойство `property` со значением `value`.

**Пример:**

```cypher
// Создадим нового человека "Alice" и свяжем его с городом "New York"
CREATE (a:Person {name: "Alice"})-[:LIVES_IN]->(c:City {name: "New York"});
```

Этот запрос создаст два новых узла: один с меткой `Person` и именем `Alice`, а другой с меткой `City` и именем `New York`, и свяжет их ребром `LIVES_IN`.

**Дополнительные возможности `CREATE`:**

* Можно создавать сразу несколько узлов и ребер в одной операции `CREATE`.
* Можно использовать переменные для создания узлов и ребер, например:
    ```cypher
    CREATE (p:Person {name: "Bob"})
    WITH p
    CREATE (c:City {name: "London"})
    CREATE (p)-[:LIVES_IN]->(c);
    ```

### `RETURN`

`RETURN` используется для возврата результатов запроса.

**Синтаксис:**

```cypher
RETURN expression;
```

**Описание:**

* `expression` – выражение, которое будет вычислено и возвращено в результате запроса.

**Пример:**

```cypher
// Найдем всех людей и вернем их имена
MATCH (p:Person)
RETURN p.name;
```

Этот запрос найдет все узлы с меткой `Person` и вернет их имена, хранящиеся в свойстве `name`.

**Дополнительные возможности `RETURN`:**

* Можно возвращать несколько выражений, разделяя их запятой, например:
    ```cypher
    RETURN n.name, r.type, m.name;
    ```
* Можно использовать агрегатные функции, такие как `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, для получения сводных данных.
* Можно применять различные операции к возвращаемым данным, например:
    * `ORDER BY` – сортировка данных
    * `LIMIT` – ограничение количества возвращаемых данных
    * `SKIP` – пропускание первых n записей

### Объединение операций

`MATCH`, `CREATE`, и `RETURN` могут использоваться вместе для выполнения сложных операций над графовыми данными.

**Пример:**

```cypher
// Найдем всех людей, работающих в компании "Google", и добавим им новое свойство "salary"
MATCH (p:Person)-[:WORKS_AT]->(c:Company {name: "Google"})
RETURN p, p.name, p.salary
WITH p, p.name, p.salary
WHERE p.salary IS NULL
SET p.salary = 100000
RETURN p, p.name, p.salary;
```

Этот запрос найдет всех людей, работающих в компании `Google`, и вернет их имена и зарплаты. Затем он проверит, есть ли у каждого человека свойство `salary`, и, если нет, задаст ему значение `100000`. В результате запроса мы получим список найденных людей, их имена и зарплаты, включая те, которым была задана зарплата.

### Заключение

`MATCH`, `CREATE`, и `RETURN` – это три основные операции Cypher, которые позволяют выполнять базовые операции над графовыми данными. Понимание этих операций является основой для эффективной работы с Neo4j. 