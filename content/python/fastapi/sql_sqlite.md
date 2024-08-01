## Взаимодействие FastAPI с базами данных: SQL и SQLite

FastAPI, как и многие другие фреймворки, не привязан к конкретной базе данных и предоставляет гибкие возможности для интеграции с различными СУБД. В этой части руководства мы рассмотрим основы работы с SQL-базами данных на примере SQLite, легковесной базы данных, не требующей отдельного сервера.

### Подключение SQLite к FastAPI

Для начала необходимо установить необходимые библиотеки:

```bash
pip install sqlalchemy databases[sqlite]
```

- `sqlalchemy` - это мощный ORM (Object Relational Mapper), который мы будем использовать для взаимодействия с базой данных.
- `databases` - асинхронная библиотека для работы с базами данных, обеспечивающая совместимость с FastAPI.

### Создание модели базы данных

Определим простую модель данных для хранения информации о пользователях:

```python
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
```

В этом примере мы создали класс `User`, представляющий таблицу "users" в базе данных. 
- `id`, `name`, `email` - это столбцы таблицы с указанными типами данных.
- `primary_key=True` указывает, что `id` - первичный ключ.
- `index=True` создает индекс для столбца, ускоряя поиск.
- `unique=True` гарантирует уникальность значений в столбце `email`.

### Настройка подключения к базе данных

Создадим файл `database.py`, где определим функции для взаимодействия с базой данных:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.pool import NullPool

from .models import Base  # Импорт модели User

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db" # строка подключения

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}, poolclass=NullPool # создание engine для синхронного взаимодействия
)

async_engine = create_async_engine(SQLALCHEMY_DATABASE_URL) # engine для асинхронного взаимодействия

async def get_async_session() -> AsyncSession: # функция для получения сессии 
    async with AsyncSession(async_engine) as session:
        yield session

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine) # создание таблиц на основе моделей
```

В этом коде мы:
- Задали строку подключения к базе данных `SQLALCHEMY_DATABASE_URL`.
- Создали engine SQLAlchemy, используемый для взаимодействия с базой данных.
- Определили функцию `get_db()`, возвращающую сессию базы данных. Сессия используется для выполнения запросов и транзакций.
- Вызвали `Base.metadata.create_all()`, чтобы создать таблицу "users" в базе данных.

### Интеграция с FastAPI

Теперь подключим базу данных к нашему приложению FastAPI:

```python
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import Annotated

from .database import SessionLocal, engine, get_async_session
from .models import User
from .schemas import UserCreate # импорт схемы для создания пользователя

app = FastAPI()

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all) # создание таблиц при запуске приложения

@app.post("/users/", response_model=User)
async def create_user(user: UserCreate, db: Annotated[Session, Depends(get_async_session)]):
    db_user = User(**user.dict())
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

```

В этом примере мы:

- Создали endpoint `/users/` для создания нового пользователя.
- Используем `Depends(get_db)` для получения сессии базы данных в обработчике маршрута.
- Создаем новый объект `User`, добавляем его в базу данных и сохраняем изменения.
- Возвращаем созданного пользователя в ответ на запрос.

### Заключение

Это лишь базовые примеры работы с SQL-базой данных в FastAPI. Вы можете использовать SQLAlchemy для выполнения более сложных запросов, создания отношений между таблицами, обработки ошибок и многого другого. 

В следующих разделах руководства мы рассмотрим более продвинутые темы, такие как миграции, асинхронные операции с базой данных и использование других СУБД.
