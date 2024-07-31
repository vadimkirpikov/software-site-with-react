## Работа с сложными запросами в Hibernate 6

Hibernate, будучи мощным инструментом объектно-реляционного сопоставления (ORM), предоставляет разработчикам гибкость не только в простых CRUD-операциях, но и в построении сложных запросов к базе данных. В данном разделе мы рассмотрим несколько подходов к работе с такими запросами, используя возможности Hibernate 6.

### HQL (Hibernate Query Language)

HQL – это объектно-ориентированный язык запросов Hibernate, позволяющий писать запросы, используя сущности и их атрибуты вместо имен таблиц и колонок базы данных. 

#### Пример использования HQL для выборки данных:

```java
// Получаем EntityManager
EntityManager entityManager = entityManagerFactory.createEntityManager();

// Создаем запрос HQL
String hql = "SELECT e FROM Employee e WHERE e.department.name = :deptName";

// Создаем TypedQuery с указанием типа результата
TypedQuery<Employee> query = entityManager.createQuery(hql, Employee.class);

// Устанавливаем параметр запроса
query.setParameter("deptName", "IT");

// Получаем список сотрудников
List<Employee> employees = query.getResultList();

// Закрываем EntityManager
entityManager.close();
```

В данном примере мы получаем список сотрудников из отдела "IT", используя именованный параметр ":deptName" для передачи значения в запрос.

### Criteria API

Criteria API предоставляет программный способ построения типобезопасных запросов к базе данных.

#### Пример использования Criteria API для выборки данных с фильтрацией и сортировкой:

```java
// Получаем EntityManager
EntityManager entityManager = entityManagerFactory.createEntityManager();

// Создаем CriteriaBuilder и CriteriaQuery
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Employee> cq = cb.createCriteria(Employee.class);

// Определяем корневой объект запроса
Root<Employee> employee = cq.from(Employee.class);

// Условие фильтрации: сотрудники из отдела "IT"
cq.where(cb.equal(employee.get("department").get("name"), "IT"));

// Сортировка по имени сотрудника
cq.orderBy(cb.asc(employee.get("name")));

// Выполнение запроса и получение списка сотрудников
List<Employee> employees = entityManager.createQuery(cq).getResultList();

// Закрываем EntityManager
entityManager.close();
```

В этом примере мы создаем запрос на получение сотрудников из отдела "IT", сортируя их по имени в алфавитном порядке.

### Native SQL

Hibernate позволяет выполнять нативные SQL-запросы к базе данных, если требуется использовать специфичные функции или оптимизировать производительность.

#### Пример использования Native SQL для выборки данных:

```java
// Получаем EntityManager
EntityManager entityManager = entityManagerFactory.createEntityManager();

// SQL-запрос для получения сотрудников
String sql = "SELECT * FROM employees WHERE department_id = (SELECT id FROM departments WHERE name = 'IT')";

// Создаем NativeQuery с указанием типа результата
Query query = entityManager.createNativeQuery(sql, Employee.class);

// Получаем список сотрудников
List<Employee> employees = query.getResultList();

// Закрываем EntityManager
entityManager.close();
```

Здесь мы используем SQL-запрос для выборки сотрудников из отдела "IT", напрямую обращаясь к таблицам "employees" и "departments".

### Работа с агрегатными функциями

Hibernate поддерживает использование агрегатных функций, таких как COUNT, SUM, AVG, MIN и MAX, в запросах HQL, Criteria API и Native SQL.

#### Пример использования агрегатной функции COUNT в HQL:

```java
// Получаем EntityManager
EntityManager entityManager = entityManagerFactory.createEntityManager();

// Запрос HQL для подсчета количества сотрудников в отделе "IT"
String hql = "SELECT COUNT(e) FROM Employee e WHERE e.department.name = 'IT'";

// Создаем TypedQuery для получения числового результата
TypedQuery<Long> query = entityManager.createQuery(hql, Long.class);

// Получаем количество сотрудников
Long employeeCount = query.getSingleResult();

// Закрываем EntityManager
entityManager.close();
```

В данном примере мы используем функцию COUNT для подсчета количества сотрудников в отделе "IT" и получаем результат в виде Long.

### Заключение

Hibernate предоставляет разработчикам мощные инструменты для работы со сложными запросами к базе данных, позволяя выбирать наиболее подходящий подход в зависимости от конкретной задачи. HQL, Criteria API и Native SQL предлагают гибкость и контроль над процессом построения запросов, обеспечивая эффективность и удобство разработки приложений с использованием Hibernate.
