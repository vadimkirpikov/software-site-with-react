## Создание собственных пакетов в FastAPI

Разработка больших приложений на FastAPI часто приводит к необходимости структурировать код и выделять логически завершенные части в отдельные модули. В этом случае создание собственных пакетов Python становится наилучшим решением. 

Пакет — это набор модулей Python, организованных в директории. Пакет позволяет группировать код по функциональности, управлять зависимостями и повторно использовать код в разных проектах.

В данном разделе мы рассмотрим, как создать свой собственный пакет FastAPI и использовать его в приложении.

### Создание структуры пакета

Для начала создадим следующую структуру директорий:

```
my_package/
├── my_package/
│   ├── __init__.py
│   ├── routers.py
│   └── models.py
└── main.py
```

- **my_package/** - корневая директория пакета.
- **my_package/my_package/** - директория с модулями пакета.
- **\_\_init\_\_.py** - файл, указывающий, что директория является пакетом.
- **routers.py** - файл для маршрутов FastAPI.
- **models.py** - файл для моделей Pydantic.
- **main.py** - файл с основным приложением FastAPI.

### Определение роутов и моделей

В файле **my_package/my_package/routers.py** определим простой роут FastAPI:

```python
# my_package/my_package/routers.py

from fastapi import APIRouter

router = APIRouter()

@router.get("/items/")
async def read_items():
    return [{"name": "Item 1"}, {"name": "Item 2"}]
```

В файле **my_package/my_package/models.py** определим простую модель Pydantic:

```python
# my_package/my_package/models.py

from pydantic import BaseModel

class Item(BaseModel):
    name: str
```

### Инициализация пакета

В файле **my_package/my_package/__init__.py** импортируем роутер:

```python
# my_package/my_package/__init__.py

from .routers import router
```

### Использование пакета в приложении

Теперь мы можем использовать созданный пакет в основном приложении FastAPI.

В файле **main.py** импортируем приложение FastAPI и созданный роутер:

```python
# main.py

from fastapi import FastAPI
from my_package import router

app = FastAPI()

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
```

Запускаем приложение:

```bash
uvicorn main:app --reload
```

Теперь, если открыть в браузере адрес `http://127.0.0.1:8000/items/`, то мы увидим ответ от роута, определенного в нашем пакете.

### Расширенная функциональность

В рамках пакета можно определять:

- Дополнительные роутеры и подприложения FastAPI.
- Модели Pydantic для валидации данных.
- Middleware для обработки запросов и ответов.
- Exception handlers для обработки ошибок.
- Dependency injection функции для внедрения зависимостей.

### Размещение пакета на PyPI

Для удобного распространения и повторного использования созданный пакет можно разместить на PyPI (Python Package Index).

**Этапы размещения пакета на PyPI:**

1. **Создание файлов setup.py и README.md.** Файл setup.py содержит информацию о пакете, а README.md - описание пакета.

2. **Создание учетной записи на PyPI.**

3. **Загрузка пакета на PyPI.** Для этого используются инструменты setuptools и twine.

После размещения пакета на PyPI его можно будет установить в любой проект с помощью pip:

```bash
pip install my_package
```

### Заключение

Создание собственных пакетов FastAPI позволяет структурировать код, управлять зависимостями и повторно использовать код в разных проектах. 

В этой статье мы рассмотрели основные шаги по созданию, использованию и размещению собственного пакета FastAPI. Более подробную информацию о создании пакетов Python можно найти в документации: [https://packaging.python.org/en/latest/](https://packaging.python.org/en/latest/)
