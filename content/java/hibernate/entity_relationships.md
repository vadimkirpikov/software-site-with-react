## Связи между сущностями: One-to-One, One-to-Many, Many-to-One, Many-to-Many

В объектно-ориентированном программировании объекты взаимодействуют друг с другом, образуя связи. Hibernate, как ORM-фреймворк, предоставляет инструменты для отображения этих связей на структуру базы данных. В этой статье мы рассмотрим основные типы связей между сущностями: One-to-One, One-to-Many, Many-to-One и Many-to-Many.

### One-to-One

Связь One-to-One означает, что один экземпляр сущности связан только с одним экземпляром другой сущности, и наоборот. 

**Пример:** Представим, у нас есть сущность `Employee` (сотрудник) и сущность `ParkingSpot` (парковочное место). У каждого сотрудника может быть только одно парковочное место, и каждое парковочное место может быть закреплено только за одним сотрудником.

**Реализация:**

1. **Создание сущностей:**

```java
// Employee.java
package com.example.hibernate.entities;

import jakarta.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    private ParkingSpot parkingSpot;

    // геттеры и сеттеры
}

// ParkingSpot.java
package com.example.hibernate.entities;

import jakarta.persistence.*;

@Entity
public class ParkingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int spotNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee;

    // геттеры и сеттеры
}
```

**Описание аннотаций:**

* `@OneToOne`: Определяет связь One-to-One.
* `mappedBy = "employee"`: Указывает, что сущность `Employee` является владельцем связи. Сторона "owning side" отвечает за обновление столбца внешнего ключа в базе данных. В нашем случае, таблица `ParkingSpot` будет содержать столбец `employee_id`, который ссылается на сущность `Employee`.
* `cascade = CascadeType.ALL`:  Указывает, что все операции каскадирования (persist, merge, remove etc.) должны применяться к связанной сущности.
* `orphanRemoval = true`:  При удалении сущности `Employee`  связанная сущность `ParkingSpot` также будет удалена.
* `fetch = FetchType.LAZY`:  Указывает, что связанная сущность `Employee` будет загружаться из базы данных только при обращении к ней.
* `@JoinColumn(name = "employee_id")`:  Определяет имя столбца внешнего ключа в таблице `ParkingSpot`.

2. **Работа с сущностями:**

```java
// сохранение нового сотрудника с парковочным местом
Employee employee = new Employee();
employee.setName("Иван Иванов");

ParkingSpot parkingSpot = new ParkingSpot();
parkingSpot.setSpotNumber(123);
parkingSpot.setEmployee(employee);
employee.setParkingSpot(parkingSpot);

entityManager.persist(employee); 

// получение сотрудника и его парковочного места
Employee retrievedEmployee = entityManager.find(Employee.class, 1L);
ParkingSpot retrievedParkingSpot = retrievedEmployee.getParkingSpot();
```

### One-to-Many

Связь One-to-Many означает, что один экземпляр сущности может быть связан с множеством экземпляров другой сущности, но каждый экземпляр второй сущности может быть связан только с одним экземпляром первой. 

**Пример:** Один отдел (`Department`) может иметь множество сотрудников (`Employee`), но каждый сотрудник работает только в одном отделе.

**Реализация:**

1. **Создание сущностей:**

```java
// Department.java
package com.example.hibernate.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Employee> employees = new ArrayList<>();

    // геттеры и сеттеры
}

// Employee.java
package com.example.hibernate.entities;

import jakarta.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    // геттеры и сеттеры
}
```

**Описание аннотаций:**

* `@OneToMany`: Определяет связь One-to-Many.
* `mappedBy = "department"`: Указывает, что сущность `Department` является владельцем связи. Сторона "owning side" отвечает за обновление столбца внешнего ключа в базе данных. В данном случае, таблица `Employee` будет содержать столбец `department_id`.
* `@ManyToOne`: Определяет связь Many-to-One. 
* `@JoinColumn(name = "department_id")`: Определяет имя столбца внешнего ключа в таблице `Employee`.

2. **Работа с сущностями:**

```java
// создание нового отдела и добавление сотрудников
Department department = new Department();
department.setName("IT");

Employee employee1 = new Employee();
employee1.setName("Иван Иванов");
employee1.setDepartment(department);

Employee employee2 = new Employee();
employee2.setName("Петр Петров");
employee2.setDepartment(department);

department.getEmployees().add(employee1);
department.getEmployees().add(employee2);

entityManager.persist(department);

// получение отдела и его сотрудников
Department retrievedDepartment = entityManager.find(Department.class, 1L);
List<Employee> employees = retrievedDepartment.getEmployees();
```

### Many-to-One

Связь Many-to-One является обратной стороной связи One-to-Many. В примере выше, связь `Employee` с `Department` является Many-to-One.

### Many-to-Many

Связь Many-to-Many означает, что один экземпляр сущности может быть связан с множеством экземпляров другой сущности, и наоборот. 

**Пример:**  Один студент (`Student`) может посещать множество курсов (`Course`), и на одном курсе может учиться множество студентов.

**Реализация:**

1. **Создание сущностей:**

```java
// Student.java
package com.example.hibernate.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
            name = "student_course",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private List<Course> courses = new ArrayList<>();

    // геттеры и сеттеры
}

// Course.java
package com.example.hibernate.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "courses")
    private List<Student> students = new ArrayList<>();

    // геттеры и сеттеры
}
```

**Описание аннотаций:**

* `@ManyToMany`: Определяет связь Many-to-Many.
* `@JoinTable`: Используется для настройки таблицы связи (join table), которая будет содержать foreign keys для обеих сущностей.
* `name = "student_course"`:  Имя таблицы связи.
* `joinColumns = @JoinColumn(name = "student_id")`:  Столбец в таблице связи, который ссылается на сущность `Student`.
* `inverseJoinColumns = @JoinColumn(name = "course_id")`: Столбец в таблице связи, который ссылается на сущность `Course`.
* `mappedBy = "courses"`:  Указывает, что сущность `Student` является владельцем связи. 

2. **Работа с сущностями:**

```java
// создание нового курса и добавление студентов
Course course1 = new Course();
course1.setName("Java");

Course course2 = new Course();
course2.setName("Hibernate");

Student student1 = new Student();
student1.setName("Иван Иванов");

Student student2 = new Student();
student2.setName("Петр Петров");

student1.getCourses().add(course1);
student1.getCourses().add(course2);
student2.getCourses().add(course1);

course1.getStudents().add(student1);
course1.getStudents().add(student2);
course2.getStudents().add(student1);

entityManager.persist(student1);
entityManager.persist(student2);

// получение студента и его курсов
Student retrievedStudent = entityManager.find(Student.class, 1L);
List<Course> courses = retrievedStudent.getCourses();
```

## Заключение

В этой статье были рассмотрены основные типы связей между сущностями в Hibernate: One-to-One, One-to-Many, Many-to-One и Many-to-Many. Важно понимать различия между этими типами связей и правильно настраивать их в своих приложениях. 
