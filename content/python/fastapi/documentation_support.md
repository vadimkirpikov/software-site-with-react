## Документация и помощь в FastAPI

FastAPI предоставляет удобные инструменты для автоматической генерации документации API, основываясь на аннотациях типов и описаниях кода. Эта функциональность значительно упрощает процесс разработки, тестирования и поддержки API.

### Swagger/OpenAPI

FastAPI использует спецификацию OpenAPI (ранее известную как Swagger) для документирования API. OpenAPI - это стандарт описания API, который позволяет автоматически генерировать интерактивную документацию.

После запуска вашего приложения FastAPI, вы можете получить доступ к интерактивной документации Swagger UI по адресу:

```
http://127.0.0.1:8000/docs
```

Здесь вы увидите список всех ваших эндпоинтов, их методы (GET, POST, PUT, DELETE и т.д.), параметры, типы данных, примеры запросов и ответов. Вы также можете отправлять тестовые запросы прямо из интерфейса Swagger UI.

### ReDoc

Помимо Swagger UI, FastAPI также поддерживает ReDoc, еще один инструмент для визуализации документации OpenAPI. ReDoc предлагает более компактный и читаемый одностраничный вид документации.

Вы можете получить доступ к документации ReDoc по адресу:

```
http://127.0.0.1:8000/redoc
```

### Добавление описаний

FastAPI позволяет добавлять описания к вашим API, используя строки документации. Строки документации - это многострочные строки, заключенные в тройные кавычки (`"""Описание"""`), которые помещаются непосредственно перед определением функции.

```python
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    """
    Возвращает приветственное сообщение.

    Это описание будет отображаться в документации Swagger и ReDoc.
    """
    return {"message": "Hello World"}
```

### Описание параметров

Вы также можете добавлять описания к параметрам функции, используя аннотации типов и ключевое слово `description`:

```python
from fastapi import FastAPI, Path

app = FastAPI()


@app.get("/items/{item_id}")
async def read_item(
    item_id: int = Path(..., description="Идентификатор товара"),
    q: str | None = None,
):
    """
    Возвращает информацию о товаре по его идентификатору.
    """
    item = {"item_id": item_id}
    if q:
        item.update({"q": q})
    return item
```

### Описание ответов

Для описания возможных ответов API используются объекты `Response Model`. Вы можете определить несколько `Response Model` для различных кодов состояния HTTP:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    id: int
    name: str
    description: str | None = None
    price: float
    tax: float | None = None


@app.post("/items/", response_model=Item, status_code=201)
async def create_item(item: Item):
    """
    Создает новый товар.
    """
    return item


@app.get("/items/{item_id}", response_model=Item)
async def read_item(item_id: int):
    """
    Возвращает информацию о товаре по его идентификатору.

    В случае отсутствия товара с указанным идентификатором, возвращается ошибка 404.
    """
    items = {
        1: {"id": 1, "name": "Foo", "price": 10.0},
        2: {"id": 2, "name": "Bar", "description": "The Bar item", "price": 20.5},
    }
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]
```

### Теги

Теги позволяют группировать ваши эндпоинты в логические разделы в документации. Вы можете добавить тег к эндпоинту, используя аргумент `tags` декоратора:

```python
@app.get("/users/", tags=["users"])
async def get_users():
    """
    Возвращает список пользователей.
    """
    return [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]


@app.get("/items/", tags=["items"])
async def get_items():
    """
    Возвращает список товаров.
    """
    return [{"id": 1, "name": "Foo"}, {"id": 2, "name": "Bar"}]
```

В этом примере эндпоинты `/users/` и `/items/` будут сгруппированы в разделы "users" и "items" соответственно в документации Swagger UI и ReDoc.

### Заключение

Документация является важной частью разработки API. FastAPI предоставляет мощные инструменты для автоматической генерации документации, что упрощает процесс разработки и делает ваш API более доступным для других разработчиков.