## Обработка запросов и параметров в FastAPI

FastAPI предоставляет широкие возможности для обработки входящих HTTP-запросов и извлечения из них необходимой информации. В этом разделе мы рассмотрим основные способы получения данных из запросов и их использование в вашем приложении.

### Параметры пути

Параметры пути – это переменные, которые являются частью URL-адреса и позволяют передавать данные непосредственно в пути к ресурсу. Для определения параметра пути в FastAPI используется синтаксис f-строк Python, где имя переменной заключается в фигурные скобки:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

В этом примере `item_id` – это параметр пути, который будет передан в функцию `read_item` в качестве аргумента. Тип параметра (`int`) указывает FastAPI на необходимость преобразования значения из строки в целое число.

### Параметры запроса

Параметры запроса передаются в URL-адресе после знака вопроса (`?`) и разделяются амперсандом (`&`). Они используются для передачи необязательных данных, которые не влияют на идентификацию ресурса. 

Для работы с параметрами запроса в FastAPI достаточно указать их в качестве аргументов функции обработчика:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/")
async def read_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

В этом примере `skip` и `limit` – это параметры запроса. 
Значения по умолчанию (`0` и `10` соответственно) указывают, что эти параметры являются необязательными.

### Тело запроса

Тело запроса используется для передачи данных в формате JSON, XML или других форматов. 

FastAPI использует библиотеку Pydantic для валидации и парсинга тела запроса. 

Для определения модели данных, ожидаемой в теле запроса, создайте класс, унаследованный от `BaseModel`:

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post("/items/")
async def create_item(item: Item):
    return item
```

В этом примере класс `Item` определяет модель данных для товара. 
Декоратор `@app.post()` указывает, что функция `create_item` будет обрабатывать POST-запросы на адрес `/items/`. 

FastAPI автоматически проверит соответствие данных в теле запроса модели `Item` и передаст объект `item` в функцию обработчика.

### Заголовки запроса

Заголовки запроса содержат метаинформацию о запросе, такую как тип содержимого, авторизационные токены и т.д.

Для доступа к заголовкам запроса используйте объект `request.headers`:

```python
from fastapi import FastAPI, Request

app = FastAPI()

@app.get("/items/")
async def read_items(request: Request):
    user_agent = request.headers.get("User-Agent")
    return {"User-Agent": user_agent}
```

В этом примере мы получаем значение заголовка `User-Agent` из объекта `request.headers` и возвращаем его в ответе.

### Cookies

Cookies – это небольшие фрагменты данных, которые хранятся на клиентской машине и отправляются вместе с запросом. 

Для работы с cookies в FastAPI используйте объект `request.cookies`:

```python
from fastapi import FastAPI, Request, Response

app = FastAPI()

@app.get("/items/")
async def read_items(request: Request, response: Response):
    session_id = request.cookies.get("session_id")
    if not session_id:
        session_id = "your_session_id"
        response.set_cookie(key="session_id", value=session_id)
    return {"session_id": session_id}
```

В этом примере мы сначала пытаемся получить значение cookie с именем `session_id`. 
Если оно не найдено, мы генерируем новое значение и устанавливаем cookie с помощью метода `response.set_cookie()`.

### Формы

Формы – это традиционный способ отправки данных из HTML-форм. 

FastAPI может обрабатывать данные формы с помощью библиотеки `python-multipart`. 

Для доступа к данным формы используйте объект `request.form()`:

```python
from fastapi import FastAPI, Request

app = FastAPI()

@app.post("/items/")
async def create_item(request: Request):
    form_data = await request.form()
    name = form_data.get("name")
    return {"name": name}
```

В этом примере мы получаем данные формы с помощью метода `request.form()` и извлекаем значение поля `name`.

### Валидация данных

FastAPI использует Pydantic для валидации данных, полученных из запроса. 

Pydantic позволяет определить типы данных, ограничения и другие правила валидации.

В следующем примере мы определим модель с валидацией:

```python
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

class Item(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    price: float = Field(..., gt=0)

@app.post("/items/")
async def create_item(item: Item):
    return item
```

В этом примере мы определили модель `Item` с двумя полями: `name` и `price`. 
Поле `name` должно быть строкой длиной от 3 до 50 символов. 
Поле `price` должно быть числом с плавающей точкой, большим нуля.

FastAPI автоматически проверит соответствие данных в теле запроса модели `Item` и вернет ошибку валидации, если данные не пройдут проверку.

### Обработка ошибок

FastAPI позволяет легко обрабатывать ошибки валидации и другие исключения. 

Для этого используйте декоратор `@app.exception_handler()`:

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"message": str(exc)},
    )
```

В этом примере мы определили обработчик исключений для `ValueError`. 
Если в обработчике запроса возникнет исключение `ValueError`, FastAPI вернет ответ с кодом статуса 400 и сообщением об ошибке.

В этом разделе мы рассмотрели основные способы обработки запросов и параметров в FastAPI. 
Более подробную информацию о каждой из тем вы найдете в официальной документации FastAPI.
