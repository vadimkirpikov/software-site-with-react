## Соединение таблиц по нескольким столбцам

В реляционных базах данных часто возникает необходимость объединения данных из нескольких таблиц.  Соединение таблиц по нескольким столбцам позволяет создавать более сложные и информативные выборки, связывая строки на основе совпадений значений в нескольких полях. 

В PostgreSQL существует несколько способов соединения таблиц по нескольким столбцам:

### 1. Использование нескольких условий соединения в операторе JOIN

Самый распространенный способ - указать несколько условий равенства в операторе `JOIN`, соединяя соответствующие столбцы из разных таблиц с помощью логического оператора `AND`. 

**Пример:**

Представим, у нас есть две таблицы:

* **authors**: таблица с информацией об авторах (id, имя, фамилия)
    ```sql
    CREATE TABLE authors (
        author_id INT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255)
    );
    ```
* **books**: таблица с информацией о книгах (id, название, id автора, год издания)
    ```sql
    CREATE TABLE books (
        book_id INT PRIMARY KEY,
        title VARCHAR(255),
        author_id INT,
        publication_year INT,
        FOREIGN KEY (author_id) REFERENCES authors(author_id)
    );
    ```

**Задача:** получить список книг с именем и фамилией автора, изданных в 2023 году.

**Решение:**

```sql
SELECT 
    b.title,
    a.first_name,
    a.last_name
FROM 
    books AS b
JOIN 
    authors AS a ON b.author_id = a.author_id AND b.publication_year = 2023;
```

В данном примере мы соединяем таблицы `books` и `authors` по двум условиям: 
* `b.author_id = a.author_id` - соответствие идентификатора автора в обеих таблицах, 
* `b.publication_year = 2023` -  фильтрация книг по году издания.

### 2. Использование составного ключа

В некоторых случаях, для связи таблиц может использоваться составной первичный ключ.  В этом случае, условия соединения должны включать все столбцы, входящие в составной ключ.

**Пример:**

Представим, у нас есть две таблицы:

* **students**: таблица со списком студентов (id группы, id студента, имя)
    ```sql
    CREATE TABLE students (
        group_id INT,
        student_id INT,
        student_name VARCHAR(255),
        PRIMARY KEY (group_id, student_id)
    );
    ```
* **grades**: таблица с оценками студентов (id группы, id студента, предмет, оценка)
    ```sql
    CREATE TABLE grades (
        group_id INT,
        student_id INT,
        subject VARCHAR(255),
        grade INT,
        FOREIGN KEY (group_id, student_id) REFERENCES students(group_id, student_id)
    );
    ```

**Задача:** получить список всех оценок студентов с указанием имени студента.

**Решение:**

```sql
SELECT 
    s.student_name,
    g.subject,
    g.grade
FROM 
    students AS s
JOIN 
    grades AS g ON s.group_id = g.group_id AND s.student_id = g.student_id;
```

Здесь мы соединяем таблицы `students` и `grades` по двум столбцам: `group_id` и `student_id`, так как они вместе составляют первичный ключ таблицы `students`.

### 3. Использование подзапросов

Вместо использования `JOIN`, можно использовать подзапросы для получения данных из связанных таблиц.

**Пример:**

Используя таблицы `authors` и `books` из первого примера, получим список книг с именем и фамилией автора, изданных в 2023 году, используя подзапрос:

```sql
SELECT 
    b.title,
    (SELECT a.first_name FROM authors AS a WHERE a.author_id = b.author_id) AS first_name,
    (SELECT a.last_name FROM authors AS a WHERE a.author_id = b.author_id) AS last_name
FROM 
    books AS b
WHERE 
    b.publication_year = 2023;
```

В данном примере мы используем два подзапроса within the `SELECT` clause to retrieve the author's first and last names from the `authors` table based on the `author_id` in the `books` table.

### Заключение

Соединение таблиц по нескольким столбцам является мощным инструментом для создания комплексных запросов и получения необходимых данных. Выбор конкретного метода depends on the specific task and database structure. Важно понимать различия между методами и выбирать наиболее эффективный и удобный для каждой ситуации.
