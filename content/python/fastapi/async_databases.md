## Асинхронные базы данных и Tortoise ORM

FastAPI, будучи современным асинхронным веб-фреймворком, прекрасно сочетается с асинхронными базами данных. Асинхронный подход позволяет обрабатывать множество запросов одновременно, не блокируя основной поток выполнения программы. Это особенно актуально при работе с веб-приложениями, где важна высокая производительность и отзывчивость.

Одним из популярных инструментов для работы с асинхронными базами данных в Python является Tortoise ORM (Object-Relational Mapper). Tortoise ORM предлагает удобный и интуитивно понятный интерфейс для взаимодействия с базами данных, абстрагируясь от конкретных SQL-запросов.

### Подключение Tortoise ORM к FastAPI

Для начала работы с Tortoise ORM необходимо установить следующие пакеты:

```bash
pip install tortoise-orm
pip install asyncpg  # или другой асинхронный драйвер для вашей БД
```

Далее, необходимо настроить подключение к базе данных. Для этого создадим файл `database.py` со следующим содержанием:

```python
from tortoise import Tortoise, run_async
from tortoise.contrib.fastapi import register_tortoise

# Настройки подключения к базе данных
TORTOISE_ORM = {
    "connections": {
        "default": "postgres://user:password@host:port/database",
    },
    "apps": {
        "models": {
            "models": ["app.models"],  # путь к модулю с моделями
            "default_connection": "default",
        },
    },
}


def init_db(app):
    """
    Функция для инициализации подключения к базе данных
    """
    register_tortoise(
        app,
        config=TORTOISE_ORM,
        generate_schemas=True,
        add_exception_handlers=True,
    )

```

В этом коде мы:

1. Импортируем необходимые классы и функции из Tortoise ORM.
2. Определяем словарь `TORTOISE_ORM` с настройками подключения к базе данных. Здесь необходимо указать тип базы данных, имя пользователя, пароль, хост, порт и имя базы данных.
3. Создаем функцию `init_db`, которая принимает объект приложения FastAPI и регистрирует Tortoise ORM в нем.

### Создание моделей данных

Для работы с базой данных через ORM необходимо определить модели данных. Модель данных – это класс Python, который отображается на таблицу в базе данных. 

Создадим файл `models.py` и определим в нем модель `User`:

```python
from tortoise import Model, fields


class User(Model):
    """
    Модель пользователя
    """

    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=255, unique=True)
    password = fields.CharField(max_length=255)
    created_at = fields.DatetimeField(auto_now_add=True)

```

В этом примере мы:

1. Импортируем классы `Model` и `fields` из Tortoise ORM.
2. Определяем класс `User`, наследуясь от класса `Model`.
3. Определяем поля модели: `id`, `username`, `password` и `created_at`. Каждое поле соответствует столбцу в таблице базы данных.

### Выполнение операций с базой данных

Теперь, когда мы настроили подключение к базе данных и определили модели, можно выполнять операции с базой данных.

#### Создание объектов

```python
from app.models import User

user = await User.create(username="john_doe", password="secret")
```

#### Получение объектов

```python
# Получение пользователя по ID
user = await User.get(id=1)

# Получение всех пользователей
users = await User.all()

# Фильтрация пользователей
users = await User.filter(username__startswith="john")
```

#### Обновление объектов

```python
user = await User.get(id=1)
user.username = "new_username"
await user.save()
```

#### Удаление объектов

```python
user = await User.get(id=1)
await user.delete()
```

### Использование Tortoise ORM в FastAPI

Чтобы использовать Tortoise ORM в маршрутах FastAPI, необходимо инициализировать подключение к базе данных при запуске приложения:

```python
from fastapi import FastAPI

from app.database import init_db
from app.models import User

app = FastAPI()

# Инициализация подключения к базе данных
@app.on_event("startup")
async def startup():
    await init_db(app)


@app.on_event("shutdown")
async def shutdown():
    await Tortoise.close_connections()


@app.get("/users")
async def get_users():
    """
    Получение списка пользователей
    """
    users = await User.all()
    return users

```

В этом примере мы:

1. Инициализируем подключение к базе данных при запуске приложения с помощью декоратора `@app.on_event("startup")`.
2. Закрываем соединения с базой данных при завершении работы приложения с помощью декоратора `@app.on_event("shutdown")`.
3. Создаем маршрут `/users`, который возвращает список всех пользователей из базы данных.

## Заключение

Tortoise ORM – это мощный и удобный инструмент для работы с асинхронными базами данных в FastAPI. Он позволяет писать чистый и лаконичный код, абстрагируясь от низкоуровневых деталей работы с SQL. 

В данной статье мы рассмотрели только основы работы с Tortoise ORM. Более подробную информацию можно найти в официальной документации: [https://tortoise-orm.readthedocs.io/](https://tortoise-orm.readthedocs.io/) 
