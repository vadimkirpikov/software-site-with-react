## Основы тестирования в FastAPI

Тестирование - неотъемлемая часть разработки любого приложения, и FastAPI предоставляет удобные инструменты для его проведения. В этой статье мы рассмотрим базовые принципы тестирования FastAPI приложений, используя pytest - популярный фреймворк для написания тестов.

### Настройка среды

Для начала, убедитесь, что у вас установлены необходимые пакеты. Вы можете установить их с помощью pip:

```bash
pip install fastapi uvicorn pytest requests
```

### Создание простого приложения FastAPI

Создайте файл `main.py` со следующим содержимым:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}
```

### Создание тестового файла

Создайте файл `test_main.py` в той же директории, что и `main.py`. В этом файле мы будем писать наши тесты.

### Написание первого теста

Добавьте следующий код в `test_main.py`:

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
```

В этом коде мы:

1. Импортируем `TestClient` из `fastapi.testclient` и наше приложение `app` из `main.py`.
2. Создаем экземпляр `TestClient` с нашим приложением `app`.
3. Определяем функцию `test_read_root()`, которая будет нашим тестом.
4. Внутри теста мы:
    - Отправляем GET-запрос на адрес "/" с помощью `client.get("/")`.
    - Проверяем, что код ответа равен 200 с помощью `assert response.status_code == 200`.
    - Проверяем, что ответ в формате JSON соответствует ожидаемому значению с помощью `assert response.json() == {"message": "Hello World"}`.

### Запуск тестов

Теперь вы можете запустить тесты с помощью команды:

```bash
pytest
```

Pytest автоматически найдет файл `test_main.py` и выполнит функцию `test_read_root()`. Вы должны увидеть сообщение о том, что тест пройден успешно.

### Тестирование POST-запросов

Давайте добавим POST-запрос в наше приложение и напишем тест для него.

Измените файл `main.py`:

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

items = {}

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/items/")
def create_item(item: dict):
    if "id" not in item:
        raise HTTPException(status_code=400, detail="Item must have an ID")
    if item["id"] in items:
        raise HTTPException(status_code=400, detail="Item with this ID already exists")
    items[item["id"]] = item
    return {"message": "Item added successfully", "item": item}
```

Теперь добавьте следующий тест в `test_main.py`:

```python
def test_create_item():
    response = client.post("/items/", json={"id": 1, "name": "Test Item"})
    assert response.status_code == 200
    assert response.json() == {"message": "Item added successfully", "item": {"id": 1, "name": "Test Item"}}

def test_create_duplicate_item():
    response = client.post("/items/", json={"id": 1, "name": "Duplicate Item"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Item with this ID already exists"

def test_create_item_missing_id():
    response = client.post("/items/", json={"name": "Missing ID Item"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Item must have an ID"
```

В этих тестах мы:

- `test_create_item()`: Проверяем успешное создание нового элемента.
- `test_create_duplicate_item()`: Проверяем обработку ошибки при попытке создать элемент с существующим ID.
- `test_create_item_missing_id()`: Проверяем обработку ошибки при попытке создать элемент без ID.

Запустите `pytest` еще раз, чтобы убедиться, что все тесты проходят успешно.

### Использование фикстур

Фикстуры - это функции, которые выполняются перед каждым тестом. Они позволяют настроить тестовую среду, например, создать тестовую базу данных или очистить данные после каждого теста.

В FastAPI вы можете использовать фикстуры `pytest`, чтобы выполнять действия до и после каждого теста.

```python
from fastapi.testclient import TestClient
from main import app

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def clean_items():
    yield
    global items
    items = {}

def test_create_item(client, clean_items):
    response = client.post("/items/", json={"id": 1, "name": "Test Item"})
    assert response.status_code == 200

def test_get_item(client, clean_items):
    client.post("/items/", json={"id": 1, "name": "Test Item"})
    response = client.get("/items/1")
    assert response.status_code == 200
    assert response.json() == {"id": 1, "name": "Test Item"}
```

В этом примере мы создали две фикстуры:

- `client`: Создает экземпляр `TestClient` для использования в тестах.
- `clean_items`: Очищает словарь `items` после каждого теста.

Обратите внимание, что фикстуры передаются в функции тестов как аргументы. 

### Заключение

В этой статье мы рассмотрели основы тестирования приложений FastAPI с помощью pytest. Вы узнали, как писать простые тесты для GET- и POST-запросов, а также как использовать фикстуры для настройки тестовой среды.

Тестирование является важной частью разработки, и понимание основ поможет вам создавать надежные и качественные приложения. 
