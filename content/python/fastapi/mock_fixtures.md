## Использование Mock и Fixtures в тестах FastAPI

Тестирование — важная часть разработки любого приложения, и FastAPI не исключение. Для более эффективного тестирования, особенно при работе с внешними зависимостями, такими как базы данных или API,  применяются инструменты Mock и Fixtures.

**Mock** — это объекты, имитирующие поведение реальных объектов. Они позволяют изолировать тестируемый код от внешних зависимостей, заменяя их контролируемыми заглушками.

**Fixtures** — функции, выполняющиеся перед запуском тестов и предоставляющие ресурсы, необходимые для их работы. Это могут быть тестовые данные, подключения к базе данных, мок-объекты и т.д.

### Использование Mock

Рассмотрим пример использования Mock для тестирования функции, выполняющей HTTP-запрос:

```python
import requests

def get_user_data(user_id: int):
    """Получает данные пользователя по его ID."""

    response = requests.get(f"https://api.example.com/users/{user_id}")
    response.raise_for_status()
    return response.json()
```

Для тестирования `get_user_data` без фактического обращения к API, заменим `requests.get` на Mock-объект:

```python
from unittest.mock import patch

from fastapi import FastAPI
from fastapi.testclient import TestClient

from .main import app, get_user_data # Предполагается, что код get_user_data находится в файле main.py

client = TestClient(app)

@patch("main.requests.get") # Заменяем requests.get на Mock-объект
def test_get_user_data(mock_get):
    """Тестирование функции get_user_data."""

    mock_response = mock_get.return_value
    mock_response.status_code = 200
    mock_response.json.return_value = {"id": 1, "name": "John Doe"}

    user_data = get_user_data(1)
    assert user_data == {"id": 1, "name": "John Doe"}
    mock_get.assert_called_once_with("https://api.example.com/users/1")
```

В данном примере:

1. Импортируем `patch` из `unittest.mock` для замены `requests.get` на Mock-объект.
2. Декорируем тестовую функцию `test_get_user_data`, передавая в `patch` путь к заменяемому объекту (`main.requests.get`).
3. Внутри функции получаем Mock-объект `mock_get`.
4. Задаем ожидаемое поведение Mock-объекта:
   -  `mock_response = mock_get.return_value` создает объект, имитирующий ответ `requests.get`.
   -  `mock_response.status_code = 200` устанавливает код ответа 200.
   -  `mock_response.json.return_value = {"id": 1, "name": "John Doe"}` указывает, что `response.json()` вернет словарь с данными пользователя.
5. Вызываем тестируемую функцию `get_user_data` и проверяем результат.
6. С помощью `mock_get.assert_called_once_with("https://api.example.com/users/1")` убеждаемся, что функция `get_user_data` вызвала `requests.get` с правильным URL.

### Использование Fixtures

Fixtures позволяют избежать дублирования кода при подготовке данных для тестов. Например, для тестирования различных обработчиков FastAPI может потребоваться авторизованный клиент. Создадим fixture, предоставляющую такой клиент:

```python
import pytest
from fastapi.testclient import TestClient

from .main import app # Предполагается, что код приложения находится в файле main.py

@pytest.fixture
def client_with_auth():
    """Фикстура, предоставляющая авторизованный клиент FastAPI."""

    # Код получения токена авторизации
    access_token = "your_access_token"

    client = TestClient(app)
    client.headers = {
        "Authorization": f"Bearer {access_token}"
    }
    return client
```

Теперь эту fixture можно использовать в тестах:

```python
def test_get_protected_resource(client_with_auth):
    """Тестирование доступа к защищенному ресурсу."""

    response = client_with_auth.get("/protected_resource")
    assert response.status_code == 200
```

В данном примере:

1. Создаем fixture `client_with_auth` с помощью декоратора `@pytest.fixture`.
2. Внутри fixture получаем токен авторизации (в данном примере просто задаем его значение) и создаем клиент FastAPI с заголовком авторизации.
3. Передаем имя fixture (`client_with_auth`) в качестве аргумента тестовой функции `test_get_protected_resource`.
4. Внутри тестовой функции используем предоставленный fixture для доступа к защищенному ресурсу.

### Заключение

Использование Mock и Fixtures значительно упрощает тестирование приложений FastAPI, позволяя изолировать код от внешних зависимостей и избежать дублирования кода. 
