## Интеграция SQLAlchemy в FastAPI приложение

FastAPI сам по себе не привязан к конкретным инструментам для работы с базами данных, предоставляя свободу выбора разработчику. 

Однако, для удобной и эффективной работы с реляционными базами данных, широко используется объектно-реляционное отображение (ORM). SQLAlchemy является одним из самых популярных ORM для Python, предоставляя гибкий и мощный инструментарий для взаимодействия с базами данных.

В данном разделе мы рассмотрим, как интегрировать SQLAlchemy в FastAPI приложение для упрощения работы с данными.

### Настройка SQLAlchemy

**Шаг 1.** Установка необходимых пакетов:

```bash
pip install sqlalchemy databases[postgresql]
```

В данном примере мы используем `databases[postgresql]`, указывая на использование PostgreSQL. Вы можете выбрать другую базу данных, заменив `postgresql` на нужный вам драйвер.

**Шаг 2.** Создание файла `database.py` для конфигурации SQLAlchemy:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql://user:password@host:port/database"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
```

*  `SQLALCHEMY_DATABASE_URL` содержит строку подключения к базе данных. Замените `user`, `password`, `host`, `port` и `database` на ваши актуальные значения.
*  `engine` - объект Engine, отвечающий за подключение к базе данных.
*  `SessionLocal` - фабрика сессий, используемая для создания сессий базы данных. 
*  `Base` - базовый класс для декларативных моделей SQLAlchemy.

### Создание модели данных

**Шаг 3.** Определение модели `User` в файле `models.py`:

```python
from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
```

*  Модель `User` наследуется от `Base`.
*  `__tablename__` указывает имя таблицы в базе данных.
*  `id`, `name`, `email` - поля таблицы, определенные с помощью `Column` и соответствующих типов данных SQLAlchemy.

### Создание зависимостей FastAPI

**Шаг 4.** Определение зависимостей FastAPI для получения сессии базы данных:

```python
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from .database import SessionLocal

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

```

*   Функция `get_db` создает новую сессию базы данных и возвращает ее.
*   `yield db` передает сессию в маршрут FastAPI.
*   Блок `finally` гарантирует закрытие сессии после завершения запроса.

### Создание маршрута для работы с базой данных

**Шаг 5.**  Добавление маршрута для создания нового пользователя:

```python
from fastapi import Depends, HTTPException, status
from . import models, schemas
from .database import get_db

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
```

*   Маршрут `POST /users/` принимает данные пользователя в теле запроса.
*   `Depends(get_db)` внедряет зависимость `get_db` и передает сессию базы данных в функцию `create_user`.
*   Создается новый объект `User` на основе полученных данных.
*   Объект добавляется в базу данных, изменения фиксируются, и данные обновляются.
*   Созданный пользователь возвращается в ответе.

Аналогичным образом можно создавать маршруты для чтения, обновления и удаления пользователей, используя SQLAlchemy для взаимодействия с базой данных.

### Заключение

Интеграция SQLAlchemy в FastAPI приложение позволяет удобно и эффективно работать с базами данных, используя мощь ORM. 
Следуя описанным шагам, вы можете легко настроить SQLAlchemy, определить модели данных, создать зависимости FastAPI и реализовать маршруты для взаимодействия с базой данных.
