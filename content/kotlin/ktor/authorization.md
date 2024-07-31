## Авторизация в Ktor с использованием ролей, прав доступа и политик

После аутентификации пользователя, когда приложение знает, кто совершает запрос, следующим шагом в обеспечении безопасности является **авторизация**. Авторизация определяет, имеет ли аутентифицированный пользователь разрешение на выполнение запрошенного действия. В этом разделе мы рассмотрим три популярных подхода к авторизации в Ktor:

- **Ролевая авторизация (Role-Based Access Control, RBAC):**  Предоставление доступа к ресурсам на основе ролей пользователей. Например, роль "Администратор" может иметь доступ ко всем функциям приложения, в то время как роль "Пользователь" - только к ограниченному набору. 

- **Авторизация на основе прав доступа (Access Control List, ACL):**  Более детальный подход, где каждому пользователю или роли назначается список конкретных разрешений (прав доступа) к ресурсам или функциям. 

- **Авторизация на основе политик (Policy-Based Access Control, PBAC):** Гибкий подход, где доступ предоставляется на основе политик, которые оценивают различные атрибуты, такие как роли пользователя, время запроса, IP-адрес и др. 

### Ролевая авторизация (RBAC)

**RBAC** - это простой и распространенный подход к авторизации. Давайте рассмотрим пример, как реализовать RBAC в Ktor:

1. **Определим роли:**

```kotlin
    enum class Role {
        USER, ADMIN
    }
```

2. **Добавим информацию о роли в Principal:**

```kotlin
    data class UserPrincipal(val userId: Int, val username: String, val role: Role) : Principal
```

3. **Создадим функцию для проверки роли:**

```kotlin
    fun PipelineContext<Unit, ApplicationCall>.hasRole(role: Role): Boolean {
        val principal = call.principal<UserPrincipal>()
        return principal?.role == role
    }
```

4. **Используем функцию `hasRole` для защиты маршрутов:**

```kotlin
    routing {
        authenticate {
            get("/admin") {
                if (hasRole(Role.ADMIN)) {
                    call.respondText("Welcome, admin!")
                } else {
                    call.respond(HttpStatusCode.Forbidden)
                }
            }
        }
    }
```

В этом примере маршрут `/admin` доступен только пользователям с ролью `ADMIN`. 

### Авторизация на основе прав доступа (ACL)

ACL предоставляет более детальный контроль доступа. 

1. **Определим права доступа:**

```kotlin
    enum class Permission {
        READ, WRITE, DELETE
    }
```

2. **Сохраним информацию о правах доступа пользователя (например, в базе данных).**

3. **Создадим функцию для проверки прав доступа:**

```kotlin
    fun PipelineContext<Unit, ApplicationCall>.hasPermission(permission: Permission, resourceId: Int): Boolean {
        val principal = call.principal<UserPrincipal>()
        // Проверка прав доступа, например, в базе данных
        // ...
    }
```

4. **Используем функцию `hasPermission` для защиты маршрутов:**

```kotlin
    routing {
        authenticate {
            put("/articles/{id}") {
                val articleId = call.parameters["id"]?.toIntOrNull() ?: return@put call.respond(HttpStatusCode.BadRequest)
                if (hasPermission(Permission.WRITE, articleId)) {
                    // Обработка запроса на изменение статьи
                } else {
                    call.respond(HttpStatusCode.Forbidden)
                }
            }
        }
    }
```

### Авторизация на основе политик (PBAC)

PBAC - наиболее гибкий подход.

1. **Определим интерфейс политики:**

```kotlin
    interface AuthorizationPolicy {
        fun authorize(context: PipelineContext<Unit, ApplicationCall>): Boolean
    }
```

2. **Реализуем конкретные политики:**

```kotlin
    class TimeBasedPolicy(val startHour: Int, val endHour: Int) : AuthorizationPolicy {
        override fun authorize(context: PipelineContext<Unit, ApplicationCall>): Boolean {
            val currentHour = LocalDateTime.now().hour
            return currentHour in startHour..endHour
        }
    }
```

3. **Используем политики в маршрутах:**

```kotlin
    val timeBasedPolicy = TimeBasedPolicy(9, 17) // Доступ с 9:00 до 17:00

    routing {
        get("/resource") {
            authorize(timeBasedPolicy) {
                // Обработка запроса
            }
        }
    }
```

В этом примере доступ к маршруту `/resource` предоставляется только в рабочее время (с 9:00 до 17:00).

Выбор подхода к авторизации зависит от конкретных требований приложения. 
