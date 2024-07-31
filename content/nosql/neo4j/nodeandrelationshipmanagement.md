## Создание и управление узлами и связями

В основе Neo4j лежит модель графа, которая позволяет хранить информацию в виде узлов (nodes) и связей (relationships). Узлы представляют собой сущности, а связи - отношения между ними. В этом разделе мы рассмотрим, как создавать и управлять узлами и связями в Neo4j.

### Создание узлов

Узлы создаются с помощью команды `CREATE`. Синтаксис создания узла следующий:

```cypher
CREATE (node:Label {properties})
```

* **`CREATE`** - ключевое слово, которое указывает на создание нового узла.
* **`node`** - имя переменной, которое будет представлять созданный узел.
* **`Label`** - метка (label), которая определяет тип узла. 
* **`{properties}`** - свойства узла, которые хранятся в виде пар ключ-значение.

**Пример:**

```cypher
CREATE (person:Person {name: "John Doe", age: 30})
```

Этот код создает узел с именем `person` и меткой `Person`. Узел имеет два свойства: `name` со значением "John Doe" и `age` со значением 30.

### Создание связей

Связи создаются с помощью команды `CREATE`. Синтаксис создания связи следующий:

```cypher
MATCH (node1:Label1), (node2:Label2)
CREATE (node1)-[relationship:Type {properties}]->(node2)
```

* **`MATCH`** - ключевое слово, которое используется для поиска существующих узлов.
* **`node1`** и **`node2`** - имена переменных, представляющие узлы, между которыми создается связь.
* **`Label1`** и **`Label2`** - метки узлов, которые необходимо найти.
* **`relationship`** - имя переменной, которое будет представлять созданную связь.
* **`Type`** - тип связи.
* **`{properties}`** - свойства связи, которые хранятся в виде пар ключ-значение.

**Пример:**

```cypher
MATCH (person:Person {name: "John Doe"}), (city:City {name: "New York"})
CREATE (person)-[:LIVES_IN]->(city)
```

Этот код создает связь `LIVES_IN` между узлами `person` (с именем "John Doe") и `city` (с именем "New York").

### Управление узлами

Для управления узлами в Neo4j используются различные команды, в том числе:

* **`MATCH`** - для поиска узлов по определенным критериям.
* **`SET`** - для обновления свойств узлов.
* **`DELETE`** - для удаления узлов.

**Пример:**

```cypher
// Поиск узла с именем "John Doe"
MATCH (person:Person {name: "John Doe"})
RETURN person;

// Обновление возраста узла "John Doe" на 35
MATCH (person:Person {name: "John Doe"})
SET person.age = 35
RETURN person;

// Удаление узла с именем "John Doe"
MATCH (person:Person {name: "John Doe"})
DELETE person;
```

### Управление связями

Для управления связями в Neo4j используются различные команды, в том числе:

* **`MATCH`** - для поиска связей по определенным критериям.
* **`SET`** - для обновления свойств связей.
* **`DELETE`** - для удаления связей.

**Пример:**

```cypher
// Поиск связи типа "LIVES_IN" от узла "John Doe"
MATCH (person:Person {name: "John Doe"})-[relationship:LIVES_IN]->(city)
RETURN relationship;

// Обновление свойства "duration" связи "LIVES_IN" на 5 лет
MATCH (person:Person {name: "John Doe"})-[relationship:LIVES_IN]->(city)
SET relationship.duration = 5
RETURN relationship;

// Удаление связи "LIVES_IN" от узла "John Doe"
MATCH (person:Person {name: "John Doe"})-[relationship:LIVES_IN]->(city)
DELETE relationship;
```

### Пример: Создание социальной сети

Создадим простую социальную сеть, где узлы будут представлять пользователей, а связи - отношения дружбы.

```cypher
// Создание пользователей
CREATE (user1:User {name: "Alice", age: 25}),
(user2:User {name: "Bob", age: 30}),
(user3:User {name: "Charlie", age: 28});

// Создание связей дружбы
MATCH (user1), (user2)
CREATE (user1)-[:FRIENDS_WITH]->(user2);

MATCH (user2), (user3)
CREATE (user2)-[:FRIENDS_WITH]->(user3);
```

Теперь можно получить информацию о друзьях каждого пользователя:

```cypher
// Получение друзей Alice
MATCH (user:User {name: "Alice"})-[:FRIENDS_WITH]->(friend)
RETURN friend;

// Получение всех друзей Bob
MATCH (user:User {name: "Bob"})-[:FRIENDS_WITH]->(friend)
RETURN friend;
```

### Заключение

В этой статье мы рассмотрели основы создания и управления узлами и связями в Neo4j. С помощью этих простых команд вы можете создавать и редактировать графовые структуры, представляющие любые данные, от социальных сетей до бизнес-процессов. Дальнейшие статьи в этом руководстве предоставят более подробную информацию о работе с Neo4j, включая более сложные запросы и операции с графами. 
