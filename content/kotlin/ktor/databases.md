## Подключение к базам данных в Ktor с помощью Exposed

Работа с базами данных - неотъемлемая часть большинства веб-приложений. В этой статье мы рассмотрим, как подключиться к базе данных и взаимодействовать с ней в Ktor, используя легковесную библиотеку Exposed, выступающую в роли ORM (Object-Relational Mapping).

### Выбор базы данных и добавление зависимостей

Ktor и Exposed поддерживают широкий спектр реляционных баз данных, включая PostgreSQL, MySQL, MariaDB, SQLite и H2. Выбор конкретной базы данных зависит от требований вашего проекта. 

Для начала добавим необходимые зависимости в файл `build.gradle.kts`:

```kotlin
dependencies {
    // ... другие зависимости

    // Ktor Exposed и драйвер для вашей базы данных
    implementation("io.ktor:ktor-exposed:$ktor_version")
    implementation("org.postgresql:postgresql:42.6.0") // Замените на драйвер для вашей БД
    
    // Exposed Core и DAO
    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-dao:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
}
```

Замените `$ktor_version` и `$exposed_version` на актуальные версии Ktor и Exposed. Не забудьте выбрать и добавить зависимость для драйвера вашей базы данных.

### Настройка подключения к базе данных

Прежде чем начать работать с базой данных, необходимо настроить подключение. Это можно сделать с помощью объекта `Database`. 

Создайте файл `DatabaseFactory.kt` и добавьте следующий код:

```kotlin
package com.example.application

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.transaction

object DatabaseFactory {

    fun init() {
        Database.connect(
            url = "jdbc:postgresql://localhost:5432/your_database_name", // Подставьте ваши данные
            driver = "org.postgresql.Driver",
            user = "your_username",
            password = "your_password"
        )
    }

    fun <T> dbQuery(block: () -> T): T =
        transaction { block() }
}
```

В этом коде:

- `Database.connect()` устанавливает соединение с базой данных. 
- `dbQuery()` - функция-обертка, упрощающая выполнение запросов к базе данных. 
- Замените параметры подключения (`url`, `driver`, `user`, `password`) на ваши.

### Определение сущностей и таблиц

Exposed использует концепцию таблиц и сущностей, подобно другим ORM. Каждая таблица в базе данных представляется классом, наследующимся от `IdTable`. 

Создайте файл `Articles.kt` и определите таблицу `Article`:

```kotlin
package com.example.application

import org.jetbrains.exposed.sql.Column
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime

object Articles : Table() {
    val id = integer("id").autoIncrement() // Колонка ID, автоинкремент
    val title = varchar("title", 128) // Колонка заголовка, VARCHAR(128)
    val content = text("content") // Колонка контента, TEXT
    val createdAt = datetime("created_at") // Колонка даты создания, DATETIME
}
```

### Создание таблиц в базе данных

Перед использованием таблиц их необходимо создать в базе данных. Exposed предоставляет удобный DSL для выполнения SQL-запросов. 

Добавьте следующий код в функцию `Application.module()` вашего приложения Ktor:

```kotlin
import com.example.application.DatabaseFactory.dbQuery
// ... другие импорты

fun Application.module() {
    // ... другая конфигурация приложения
    
    DatabaseFactory.init() // Инициализация подключения к БД

    dbQuery {
        SchemaUtils.create(Articles) // Создание таблицы Articles
    }

    // ... остальной код приложения
}
```

### Работа с данными: CRUD операции

После определения таблицы можно выполнять CRUD-операции (создание, чтение, обновление, удаление) с данными.

#### Создание записи:

```kotlin
import org.jetbrains.exposed.sql.insert
import java.time.LocalDateTime
// ... другие импорты

fun createArticle(title: String, content: String): Int {
    return dbQuery {
        Articles.insert {
            it[this.title] = title
            it[this.content] = content
            it[this.createdAt] = LocalDateTime.now()
        } get Articles.id
    }
}
```

#### Чтение записи:

```kotlin
fun getArticle(id: Int): Article? {
    return dbQuery {
        Articles.select { Articles.id eq id }
            .map { row -> 
                Article(
                    id = row[Articles.id],
                    title = row[Articles.title],
                    content = row[Articles.content],
                    createdAt = row[Articles.createdAt]
                ) 
            }
            .singleOrNull()
    }
}
```

#### Обновление записи:

```kotlin
fun updateArticle(id: Int, title: String, content: String) {
    dbQuery {
        Articles.update({ Articles.id eq id }) {
            it[this.title] = title
            it[this.content] = content
        }
    }
}
```

#### Удаление записи:

```kotlin
fun deleteArticle(id: Int) {
    dbQuery {
        Articles.deleteWhere { Articles.id eq id }
    }
}
```

## Заключение

В этой статье мы рассмотрели основные принципы работы с базами данных в Ktor с использованием Exposed. Вы научились подключаться к базе данных, определять таблицы, выполнять CRUD-операции и использовать DSL Exposed для написания SQL-запросов. 

Exposed предоставляет множество возможностей для работы с базами данных, и это лишь базовый пример. Более подробную информацию вы можете найти в официальной документации Exposed: [https://github.com/JetBrains/Exposed](https://github.com/JetBrains/Exposed). 
