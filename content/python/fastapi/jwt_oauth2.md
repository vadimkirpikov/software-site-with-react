## JWT аутентификация и OAuth2 в FastAPI

Безопасность приложения - один из важнейших аспектов разработки. В данном разделе рассмотрим реализацию аутентификации пользователей с помощью JWT (JSON Web Token) и авторизации через OAuth2 провайдеров в FastAPI приложении.

### JWT аутентификация

JWT - это открытый стандарт (RFC 7519), определяющий компактный и самодостаточный способ безопасной передачи информации между сторонами в виде JSON-объекта. JWT-токен состоит из трех частей, разделенных точкой:

* Заголовок (Header): Содержит информацию о типе токена и алгоритме хэширования.
* Полезная нагрузка (Payload): Содержит информацию о пользователе, например, ID, имя, права доступа.
* Подпись (Signature): Обеспечивает целостность токена и подтверждает его подлинность.

#### Установка необходимых пакетов

```bash
pip install python-jose[cryptography] passlib
```

#### Создание JWT токена

```python
from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

# Настройки JWT
SECRET_KEY = "your_secret_key" # Секретный ключ для подписи токенов
ALGORITHM = "HS256" # Алгоритм хэширования
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # Время жизни токена доступа

# Создание объекта для хэширования паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Функция для хэширования пароля
def hash_password(password: str):
    return pwd_context.hash(password)

# Функция для проверки пароля
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Функция для создания JWT токена
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
```

#### Защита endpoint с помощью OAuth2 схемы

```python
# Создание схемы OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") 

# Пример endpoint, защищенного JWT аутентификацией
@app.post("/items/")
async def create_item(token: str = Depends(oauth2_scheme)):
    # Декодирование JWT токена
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # ... логика endpoint
```

### OAuth2 авторизация

OAuth2 - это открытый стандарт для делегирования авторизации. Позволяет приложениям получать ограниченный доступ к ресурсам пользователя на другом сервисе (например Google, Facebook), не передавая им свои учетные данные.

#### Реализация OAuth2 с помощью FastAPI

FastAPI не имеет встроенной поддержки OAuth2, но существуют библиотеки, упрощающие его реализацию. Рассмотрим пример с использованием библиотеки `authlib`.

#### Установка необходимых пакетов

```bash
pip install authlib
```

#### Настройка OAuth2 провайдера

```python
from authlib.integrations.starlette_client import OAuth

# Создание объекта OAuth
oauth = OAuth()

# Настройка провайдера OAuth2 (Google в данном случае)
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

# Endpoint для перенаправления на страницу авторизации провайдера
@app.get('/login/google')
async def login_via_google(request: Request):
    redirect_uri = request.url_for('auth_google') # URL для обратного вызова
    return await oauth.google.authorize_redirect(request, redirect_uri)

# Endpoint обратного вызова после авторизации на стороне провайдера
@app.get('/auth/google')
async def auth_google(request: Request):
    token = await oauth.google.authorize_access_token(request) # Получение токена доступа
    user = await oauth.google.parse_id_token(request, token) # Получение информации о пользователе
    
    # ... Сохранение информации о пользователе и перенаправление на нужную страницу
```

#### Пример использования OAuth2 в endpoint

```python
@app.get("/me")
async def get_user_info(request: Request):
    user = await oauth.google.authorize_access_token(request) # Проверка токена доступа
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user
```

## Заключение

В этом разделе мы рассмотрели основы JWT аутентификации и OAuth2 авторизации в FastAPI приложении.  Это базовые примеры, которые можно расширить и адаптировать под нужды вашего приложения. 

**Важно**: 

* Храните секретные ключи и другую конфиденциальную информацию в безопасном месте, не помещайте их в код!
* Используйте HTTPS для защиты данных, передаваемых между клиентом и сервером.
* Регулярно обновляйте зависимости и следите за уязвимостями безопасности.
