## Запросы с использованием HQL

Hibernate Query Language (HQL) — это объектно-ориентированный язык запросов, используемый в Hibernate для выборки данных из базы данных. В отличие от SQL, который работает с таблицами и столбцами, HQL оперирует классами и полями Java, что делает его более интуитивно понятным для разработчиков Java. 

### Базовый синтаксис HQL

HQL запросы имеют сходство с SQL, но с рядом ключевых отличий.  Они начинаются с ключевого слова `from`, за которым следует имя класса сущности (не таблицы). Выборка данных производится по умолчанию для всех полей сущности, но можно указать конкретные поля. 

**Пример:**

```java
// Выборка всех объектов класса Employee
List<Employee> employees = session.createQuery("from Employee", Employee.class).list(); 
```

В данном примере `session` — это объект `Session`, который используется для взаимодействия с базой данных. Метод `createQuery` создает запрос HQL, а `list()` выполняет запрос и возвращает список объектов `Employee`.

### Выборка определенных полей

Для выборки определенных полей можно использовать ключевое слово `select`:

```java
// Выборка имени и фамилии всех сотрудников
List<Object[]> employeeNames = session.createQuery("select e.firstName, e.lastName from Employee e", Object[].class).list();
```

В этом случае мы получаем список массивов объектов `Object[]`, где каждый массив содержит имя и фамилию сотрудника.

### Условия выборки (where)

Для фильтрации данных используйте ключевое слово `where` с указанием условий, аналогично SQL:

```java
// Выборка сотрудников с зарплатой выше 30000
List<Employee> highEarners = session.createQuery("from Employee e where e.salary > 30000", Employee.class).list();
```

### Сортировка результатов (order by)

Сортировка результатов осуществляется с помощью `order by`:

```java
// Выборка всех сотрудников, отсортированных по фамилии в алфавитном порядке
List<Employee> sortedEmployees = session.createQuery("from Employee e order by e.lastName asc", Employee.class).list();
```

### Ограничение количества результатов (limit)

Для ограничения количества возвращаемых результатов используйте `setMaxResults`:

```java
// Выборка первых 10 сотрудников
List<Employee> firstTenEmployees = session.createQuery("from Employee", Employee.class)
                                        .setMaxResults(10)
                                        .list();
```


### Параметризованные запросы

Для предотвращения SQL-инъекций и повышения читаемости кода используйте именованные параметры:

```java
// Выборка сотрудников по имени
String name = "John";
List<Employee> employeesNamedJohn = session.createQuery("from Employee e where e.firstName = :employeeName", Employee.class)
                                          .setParameter("employeeName", name)
                                          .list();
```

В этом примере `:employeeName` - это именованный параметр, значение которого устанавливается с помощью метода `setParameter`.


### Ассоциации и JOIN-запросы

HQL позволяет обращаться к связанным сущностям напрямую, без явного указания JOIN'ов.  Например, если у нас есть сущность `Department` с отношением один-ко-многим к `Employee`, мы можем получить всех сотрудников определенного отдела следующим образом:

```java
// Выборка всех сотрудников отдела продаж
List<Employee> salesEmployees = session.createQuery("from Employee e where e.department.name = 'Sales'", Employee.class).list();
```

### Подзапросы

HQL поддерживает подзапросы, которые позволяют создавать более сложные условия выборки. Например, для выборки сотрудников с максимальной зарплатой в каждом отделе:

```java
List<Employee> topEarnersByDept = session.createQuery(
    "from Employee e1 where e1.salary = (select max(e2.salary) from Employee e2 where e2.department = e1.department)", 
    Employee.class
).list();
```

### Обновление и удаление данных

Помимо выборки данных, HQL также позволяет обновлять и удалять данные с помощью `update` и `delete`:

```java
// Увеличить зарплату всех сотрудников на 10%
int updatedEntities = session.createQuery("update Employee e set e.salary = e.salary * 1.1").executeUpdate();

// Удалить всех сотрудников из отдела "Marketing"
int deletedEntities = session.createQuery("delete from Employee e where e.department.name = 'Marketing'").executeUpdate();
```

Метод `executeUpdate()` возвращает количество строк, затронутых операцией.

### Преимущества HQL

* **Объектно-ориентированный подход:** HQL оперирует классами и полями Java, что делает его более понятным для Java-разработчиков.
* **Портативность:** HQL не привязан к конкретной базе данных, поэтому приложения, использующие HQL, легко переносятся между различными СУБД.
* **Кеширование:** Hibernate кэширует результаты HQL-запросов, что повышает производительность приложения.
* **Безопасность:**  Использование именованных параметров защищает от SQL-инъекций.

HQL – мощный инструмент для работы с данными в Hibernate.  Он позволяет писать  читаемый и лаконичный код,  обеспечивая при этом безопасность и  высокую производительность. 
