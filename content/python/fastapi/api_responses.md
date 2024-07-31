## Формирование ответов API

FastAPI предоставляет гибкие инструменты для управления форматом ответов вашего API. По умолчанию FastAPI сериализует данные в JSON, однако, вы можете легко настроить вывод в других форматах, например, XML.

### JSON

JSON является наиболее распространенным форматом данных для API, и FastAPI автоматически сериализует ответы в JSON, если не указано иное.

**Пример:**

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/items")
async def get_items():
    items = [{"name": "Item 1"}, {"name": "Item 2"}]
    return items
```

В этом примере функция `get_items` возвращает список словарей. FastAPI автоматически сериализует этот список в JSON и отправляет его клиенту с заголовком `Content-Type: application/json`.

### Настройка сериализации JSON

Вы можете настроить способ сериализации объектов в JSON с помощью параметра `response_model` в декораторах маршрутов. 

**Пример:**

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None

@app.post("/items")
async def create_item(item: Item):
    return item
```

В этом примере мы определяем Pydantic модель `Item`. Используя `item: Item` в параметрах функции, мы указываем FastAPI валидировать и преобразовывать входящие данные в объект `Item`.  Параметр `response_model=Item` указывает FastAPI использовать модель `Item` для сериализации ответа.

### XML

FastAPI не имеет встроенной поддержки сериализации XML, но вы можете использовать сторонние библиотеки, такие как `lxml` или `xmltodict`, для создания ответов XML.

**Пример с использованием lxml:**

```python
from fastapi import FastAPI
from fastapi.responses import Response
from lxml import etree

app = FastAPI()

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    item = {"id": item_id, "name": f"Item {item_id}"}
    root = etree.Element("item")
    for key, value in item.items():
        etree.SubElement(root, key).text = str(value)
    xml_data = etree.tostring(root, pretty_print=True)
    return Response(content=xml_data, media_type="application/xml")
```

В этом примере мы используем `lxml` для создания XML-документа из словаря `item`. Затем мы возвращаем объект `Response` с XML-данными и устанавливаем заголовок `Content-Type` в `application/xml`.

### Другие форматы

Вы можете использовать тот же подход, что и для XML, для создания ответов в других форматах, таких как YAML, CSV и т.д. Просто выберите соответствующую библиотеку для сериализации данных и установите правильный заголовок `Content-Type` в ответе.
