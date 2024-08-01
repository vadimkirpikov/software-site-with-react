## Валидация данных и ошибки в FastAPI

Валидация данных - критически важный аспект разработки API. Она гарантирует, что ваше приложение получает данные в ожидаемом формате и предотвращает обработку некорректных данных. FastAPI использует библиотеку Pydantic для элегантной и мощной валидации данных.

### Основы валидации с помощью Pydantic

Pydantic позволяет описывать структуру данных с помощью аннотаций типов Python. При получении запроса FastAPI автоматически проверяет соответствие данных модели Pydantic и выдает информативные сообщения об ошибках в случае несоответствия.

**Пример:**

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = False

@app.post("/items/")
async def create_item(item: Item):
    return item
```

В этом примере мы определяем модель Pydantic `Item` с тремя полями:

* `name` (строка, обязательное)
* `price` (число с плавающей точкой, обязательное)
* `is_offer` (логическое значение, необязательное, по умолчанию False)

При отправке POST-запроса на `/items/` FastAPI автоматически проверит, что тело запроса соответствует модели `Item`. 

**Пример корректного запроса:**

```json
{
    "name": "Banana",
    "price": 1.25
}
```

**Пример некорректного запроса (отсутствует обязательное поле `price`):**

```json
{
    "name": "Apple" 
}
```

FastAPI вернет ошибку валидации с подробным описанием:

```json
{
    "detail": [
        {
            "loc": [
                "body",
                "price"
            ],
            "msg": "field required",
            "type": "value_error.missing"
        }
    ]
}
```

### Расширенные возможности валидации

Pydantic предлагает множество возможностей для более сложной валидации данных:

**1. Пользовательские сообщения об ошибках:**

```python
from pydantic import Field

class Item(BaseModel):
    name: str = Field(..., min_length=3, max_length=50, description="Название товара")
    price: float = Field(..., gt=0, description="Цена товара (должна быть больше 0)")
```

В этом примере мы используем `Field` для задания ограничений на поля и добавления описаний. 

**2. Валидация с помощью функций:**

```python
from pydantic import validator

class Item(BaseModel):
    name: str
    price: float
    
    @validator("price")
    def price_must_be_positive(cls, value):
        if value <= 0:
            raise ValueError("Цена должна быть положительным числом")
        return value
```

Декоратор `@validator` позволяет определить функцию валидации для конкретного поля.

**3. Пользовательские типы данных:**

```python
from pydantic import conint

class Item(BaseModel):
    quantity: conint(gt=0) # количество должно быть целым числом больше 0
```

Pydantic предоставляет ряд предопределенных типов данных, таких как `conint`, `constr`, `EmailStr` и другие, для упрощения валидации.

### Обработка ошибок

FastAPI позволяет централизованно обрабатывать ошибки с помощью `HTTPException` и декоратора `@app.exception_handler`.

**Пример:**

```python
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail}
    )

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item_id": item_id}
```

В этом примере:

* Мы определяем функцию `http_exception_handler`, которая будет вызываться при возникновении любой ошибки `HTTPException`.
* Функция формирует JSON-ответ с кодом состояния и сообщением об ошибке.
* В обработчике запроса `read_item` мы генерируем ошибку `HTTPException` с кодом 404, если элемент не найден.

### Заключение

Валидация данных и обработка ошибок - важные аспекты разработки надежных API. FastAPI предоставляет мощные инструменты для решения этих задач, основанные на библиотеке Pydantic. Использование аннотаций типов, функций валидации и централизованной обработки ошибок позволяет создавать безопасные и удобные в использовании API.
