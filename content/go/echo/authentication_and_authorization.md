## Аутентификация и авторизация в Echo

Безопасность веб-приложения — это первостепенная задача. В этом разделе мы рассмотрим два важных аспекта безопасности: аутентификацию и авторизацию. 

**Аутентификация** — это процесс проверки личности пользователя. Проще говоря, это ответ на вопрос "Кто вы?". 

**Авторизация** — это процесс определения, какие действия разрешены пользователю после успешной аутентификации.  Это ответ на вопрос "Что вам разрешено делать?".

### Аутентификация

Echo framework сам по себе не предоставляет встроенных механизмов аутентификации. Однако, он легко интегрируется с middleware, предоставляющими различные способы аутентификации:

* **Базовая аутентификация (Basic Auth):** простой механизм, который запрашивает имя пользователя и пароль при каждом запросе. 
* **Аутентификация по токену (Token Auth):**  более распространенный подход, использующий токены (например, JWT) для проверки подлинности пользователя после входа в систему.
* **Внешние провайдеры аутентификации (OAuth, OpenID Connect):**  позволяют пользователям входить в систему, используя существующие учетные записи, такие как Google, Facebook, Github и т.д.

#### Базовая аутентификация

Рассмотрим пример реализации базовой аутентификации с помощью middleware `echo.BasicAuth`:

```Go
package main

import (
    "net/http"

    "github.com/labstack/echo/v4"
)

func main() {
    e := echo.New()

    // Защищенный маршрут с базовой аутентификацией
    secured := e.Group("/secured", echo.BasicAuth(func(username, password string, c echo.Context) (bool, error) {
        // Проверка имени пользователя и пароля
        if username == "admin" && password == "password" {
            return true, nil
        }
        return false, nil
    }))

    secured.GET("/", func(c echo.Context) error {
        return c.String(http.StatusOK, "Доступ разрешен!")
    })

    e.Logger.Fatal(e.Start(":1323"))
}
```

В данном примере,  middleware `echo.BasicAuth`  принимает функцию обратного вызова, которая проверяет имя пользователя и пароль.  Если проверка успешна, пользователю предоставляется доступ к защищенному маршруту `/secured`. 

#### Аутентификация по токену (JWT)

JWT (JSON Web Token) — это открытый стандарт (RFC 7519), определяющий компактный и самодостаточный способ безопасной передачи информации между сторонами в виде JSON-объекта.

Для работы с JWT в Go существует множество библиотек. Рассмотрим пример с использованием библиотеки `github.com/golang-jwt/jwt`:

```Go
package main

import (
    "net/http"
    "time"

    "github.com/golang-jwt/jwt"
    "github.com/labstack/echo/v4"
)

// Секретный ключ для подписи токенов
var jwtSecret = []byte("secret")

// Структура для данных пользователя в токене
type UserClaims struct {
    UserID int `json:"user_id"`
    jwt.StandardClaims
}

// Функция для генерации JWT
func generateJWT(userID int) (string, error) {
    claims := &UserClaims{
        UserID: userID,
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(jwtSecret)
}

// Middleware для проверки JWT
func jwtMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        tokenString := c.Request().Header.Get("Authorization")

        // Парсинг токена
        token, err := jwt.ParseWithClaims(tokenString, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
            return jwtSecret, nil
        })
        if err != nil {
            return c.JSON(http.StatusUnauthorized, map[string]interface{}{"error": "Неверный токен"})
        }

        // Проверка валидности токена
        if claims, ok := token.Claims.(*UserClaims); ok && token.Valid {
            // Добавляем данные пользователя в контекст запроса
            c.Set("user", claims)
            return next(c)
        } else {
            return c.JSON(http.StatusUnauthorized, map[string]interface{}{"error": "Неверный токен"})
        }
    }
}

func main() {
    e := echo.New()

    // Маршрут для входа
    e.POST("/login", func(c echo.Context) error {
        // Логика аутентификации (проверка имени пользователя и пароля)
        // ...

        // Генерация JWT после успешной аутентификации
        token, err := generateJWT(1)
        if err != nil {
            return err
        }
        return c.JSON(http.StatusOK, map[string]interface{}{"token": token})
    })

    // Защищенный маршрут с проверкой JWT
    secured := e.Group("/secured")
    secured.Use(jwtMiddleware)
    secured.GET("/", func(c echo.Context) error {
        // Получение данных пользователя из контекста запроса
        user := c.Get("user").(*UserClaims)
        return c.String(http.StatusOK, "Привет, пользователь "+string(user.UserID))
    })

    e.Logger.Fatal(e.Start(":1323"))
}
```

В данном примере:

*   `generateJWT` генерирует JWT с данными пользователя.
*   `jwtMiddleware` проверяет JWT в заголовке `Authorization` каждого запроса к защищенному маршруту.
*   Данные пользователя извлекаются из токена и добавляются в контекст запроса для дальнейшего использования.

### Авторизация

После успешной аутентификации необходимо определить, какие действия разрешены пользователю.  Для этого можно использовать различные подходы:

* **Проверка ролей (Role-Based Access Control, RBAC):** пользователи назначаются на роли (например, администратор, модератор, пользователь), и каждой роли предоставляется определенный набор разрешений.
* **Проверка прав доступа (Access Control List, ACL):** для каждого ресурса определяется список пользователей или ролей, которые имеют доступ к нему.
* **Проверка на основе политик (Policy-Based Access Control, PBAC):**  политики определяют, какие действия разрешены пользователям в зависимости от различных факторов, таких как время суток, местоположение,  атрибуты пользователя и т.д.

#### Пример проверки ролей

```Go
// Middleware для проверки роли администратора
func adminMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        user := c.Get("user").(*UserClaims)
        if user.Role != "admin" {
            return c.JSON(http.StatusForbidden, map[string]interface{}{"error": "Доступ запрещен"})
        }
        return next(c)
    }
}

// ...

// Защищенный маршрут, доступный только администраторам
admin := e.Group("/admin")
admin.Use(jwtMiddleware, adminMiddleware)
admin.GET("/dashboard", func(c echo.Context) error {
    return c.String(http.StatusOK, "Панель администратора")
})
```

В этом примере:

*   `adminMiddleware`  проверяет, имеет ли пользователь, данные которого получены из JWT,  роль  `admin`. 
*   Если  роль  не  `admin`, доступ к маршруту  запрещается.

Это лишь базовые примеры реализации аутентификации и авторизации в Echo.  Выбор конкретных подходов и библиотек зависит от требований вашего приложения.
