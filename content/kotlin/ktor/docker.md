## Разработка микросервисов и развертывание в Docker

В этой статье мы рассмотрим создание простого микросервиса на Ktor и его развертывание в Docker. Мы будем использовать Kotlin 1.9.0 и Ktor 2.3. 

### Создание проекта

1. **Создайте новый проект Ktor:**

   - Используйте плагин IntelliJ IDEA или создайте проект с помощью командной строки, как описано в официальной документации Ktor: [https://ktor.io/docs/getting-started.html](https://ktor.io/docs/getting-started.html)

2. **Добавьте зависимости:**

   - Для работы с Docker нам понадобится плагин `io.ktor:ktor-server-netty`:
     ```kotlin
     dependencies {
         // ... другие зависимости
         implementation("io.ktor:ktor-server-netty:<ktor-version>")
     }
     ```
   - Замените `<ktor-version>` на актуальную версию Ktor.

### Реализация микросервиса

Создайте простой микросервис, который будет отвечать на GET-запрос по пути `/hello`:

```kotlin
package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun main() {
    embeddedServer(Netty, port = 8080) {
        routing {
            get("/hello") {
                call.respondText("Hello, World!")
            }
        }
    }.start(wait = true)
}
```

### Создание Dockerfile

Создайте файл `Dockerfile` в корне вашего проекта со следующим содержимым:

```dockerfile
FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Описание Dockerfile:**

- **`FROM openjdk:17-alpine`**: Используем легковесный образ OpenJDK 17 на основе Alpine Linux.
- **`WORKDIR /app`**: Устанавливаем рабочую директорию внутри контейнера.
- **`COPY build/libs/*.jar app.jar`**: Копируем JAR-файл нашего приложения в контейнер.
- **`EXPOSE 8080`**: Открываем порт 8080 для доступа к приложению.
- **`ENTRYPOINT ["java", "-jar", "app.jar"]`**: Задаем команду запуска приложения.

### Сборка и запуск Docker-образа

1. **Соберите JAR-файл вашего приложения:**

   - Выполните команду `./gradlew build` (или аналогичную, в зависимости от вашей системы сборки).

2. **Соберите Docker-образ:**

   - Выполните команду `docker build -t my-ktor-app .` в терминале, находясь в корневой директории вашего проекта.

3. **Запустите Docker-контейнер:**

   - Выполните команду `docker run -p 8080:8080 my-ktor-app`.

Теперь ваш микросервис Ktor запущен в Docker-контейнере и доступен по адресу `http://localhost:8080/hello`.

### Проверка работы микросервиса

Откройте браузер и перейдите по адресу `http://localhost:8080/hello`. Вы должны увидеть сообщение "Hello, World!".

### Заключение

Мы рассмотрели базовый пример создания и развертывания микросервиса на Ktor в Docker. Это основа, на которой можно строить более сложные приложения, используя возможности Ktor, такие как:

- Подключение баз данных.
- Аутентификация и авторизация.
- Работа с различными форматами данных.
- Тестирование.

Docker упрощает развертывание и масштабирование микросервисов, делая Ktor отличным выбором для разработки современных веб-приложений.
