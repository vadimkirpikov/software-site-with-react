## Аутентификация и авторизация в FastAPI

В современных веб-приложениях безопасность играет критически важную роль. Два ключевых аспекта безопасности - это аутентификация и авторизация. 

**Аутентификация** - это процесс подтверждения личности пользователя, то есть проверка, действительно ли пользователь является тем, за кого себя выдает. 

**Авторизация** - это процесс определения, имеет ли аутентифицированный пользователь права на доступ к определенным ресурсам или выполнение определенных действий. 

FastAPI не имеет встроенной системы аутентификации и авторизации, но предоставляет гибкие механизмы для их реализации с помощью сторонних библиотек. Рассмотрим основные подходы к реализации аутентификации и авторизации в FastAPI.

### Использование Bearer токенов

Bearer токены - это распространенный способ аутентификации в REST API. При таком подходе сервер выдает клиенту токен после успешной аутентификации. К последующим запросам к защищенным ресурсам клиент прикрепляет этот токен в заголовке `Authorization` с префиксом `Bearer`. Сервер проверяет токен при каждом запросе и предоставляет доступ к ресурсу только при успешной проверке.

Рассмотрим пример реализации аутентификации с помощью Bearer токенов с использованием библиотеки `python-jose` для работы с JWT (JSON Web Token):

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Annotated


app = FastAPI()

# Секретный ключ для подписи токенов
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") # Используем OAuth2PasswordBearer для получения токена из заголовка

# Модель пользователя
class User:
    username: str
    password: str


# Временная база данных пользователей
users_db = {
    "user1": User(username="user1", password="password"),
    "user2": User(username="user2", password="secret"),
}


# Функция для аутентификации пользователя
def authenticate_user(username: str, password: str):
    user = users_db.get(username)
    if user is not None and user.password == password:
        return user
    return None


# Функция для создания JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire.timestamp()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Функция для получения текущего пользователя
async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учетные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        user = users_db.get(username)
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception


# Защищенный маршрут
@app.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return {"username": current_user.username}


# Маршрут для аутентификации
@app.post("/token")
async def login_for_access_token(username: str, password: str):
    user = authenticate_user(username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверное имя пользователя или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
```

В этом примере мы определили:

* Функцию `authenticate_user` для аутентификации пользователя по имени пользователя и паролю.
* Функцию `create_access_token` для создания JWT с заданным временем жизни.
* Функцию `get_current_user`, которая извлекает токен из заголовка запроса, проверяет его и возвращает текущего пользователя.
* Защищенный маршрут `/users/me`, доступ к которому разрешен только аутентифицированным пользователям.

### Ролевая модель авторизации

После успешной аутентификации следующим шагом является авторизация. Ролевая модель авторизации (RBAC) - это распространенный подход, который назначает пользователям роли, а ролям - разрешения на доступ к ресурсам. 

В FastAPI вы можете реализовать RBAC с помощью зависимостей и пользовательских декораторов.  

```python
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated

app = FastAPI()

# ... (код для аутентификации из предыдущего примера) ...

# Роли пользователей
class Role:
    ADMIN = "admin"
    USER = "user"


# Декоратор для проверки роли пользователя
def role_required(allowed_roles: list[str]):
    def decorator(func):
        async def wrapper(current_user: Annotated[User, Depends(get_current_user)]):
            if current_user.role not in allowed_roles:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN, detail="Доступ запрещен"
                )
            return await func(current_user)

        return wrapper

    return decorator


# Модель пользователя с ролью
class User:
    username: str
    password: str
    role: str

# Защищенный маршрут, доступный только для администраторов
@app.get("/admin", dependencies=[Depends(role_required([Role.ADMIN]))])
async def admin_route(current_user: Annotated[User, Depends(get_current_user)]):
    return {"message": "Это защищенный маршрут для администраторов"}
```

В этом примере мы определили:

* Класс `Role` с перечислением доступных ролей.
* Декоратор `role_required`, который принимает список разрешенных ролей и проверяет, есть ли у текущего пользователя одна из этих ролей.
* Защищенный маршрут `/admin`, доступный только для пользователей с ролью `admin`.

Это лишь базовые примеры реализации аутентификации и авторизации в FastAPI. Существует множество других библиотек и подходов, которые можно использовать в зависимости от конкретных требований вашего приложения. 
