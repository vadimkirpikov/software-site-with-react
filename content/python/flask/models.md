## Моделирование данных: создание таблиц и отношений

Веб-приложения редко обходятся без хранения данных. Для структурированного хранения информации используются базы данных, а Flask, в сочетании с ORM (Object-Relational Mapping),  предлагает удобный способ взаимодействия с ними. В этом разделе мы рассмотрим основы моделирования данных и научимся создавать таблицы и отношения с помощью Flask-SQLAlchemy.

### Что такое модели данных?

Модель данных – это абстрактное представление структуры данных вашего приложения. Она определяет, какие сущности (таблицы) будут храниться в базе данных, какие атрибуты (колонки) они будут иметь, и как эти сущности будут связаны между собой.

### Flask-SQLAlchemy

Flask-SQLAlchemy — это расширение Flask, которое значительно упрощает работу с базами данных. Оно основано на SQLAlchemy, мощном инструменте ORM для Python. ORM позволяет взаимодействовать с базой данных, используя объекты Python, что делает код более читаемым и удобным в поддержке.

### Установка Flask-SQLAlchemy

Перед началом работы установите Flask-SQLAlchemy:

```bash
pip install flask-sqlalchemy
```

### Настройка подключения к базе данных

Для начала, необходимо настроить подключение к базе данных. В этом примере мы будем использовать SQLite, простую базу данных, которая не требует отдельного сервера:

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db' 
# Указываем путь к базе данных
db = SQLAlchemy(app)
```

В этом коде:

*  Мы импортируем необходимые классы из Flask и Flask-SQLAlchemy.
* Создаем экземпляр Flask приложения.
* Устанавливаем конфигурацию `SQLALCHEMY_DATABASE_URI`, которая указывает Flask-SQLAlchemy, как подключиться к базе данных. В нашем случае используется SQLite, и файл базы данных будет называться `mydatabase.db`.
* Создаем экземпляр SQLAlchemy, передав ему приложение Flask.

### Создание модели

Давайте создадим простую модель для блога. Наша модель будет содержать две сущности: `User` (пользователь) и `Post` (публикация). 

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Post {self.title}>'
```

Разберем код:

*  Каждая модель наследуется от `db.Model`, указывающей Flask-SQLAlchemy, что это таблица базы данных.
*  Внутри каждой модели определяются колонки, используя `db.Column`. 
* `primary_key=True` указывает на первичный ключ таблицы.
*  `unique=True` - значение в этой колонке должно быть уникальным.
* `nullable=False` -  значение в этой колонке не может быть пустым. 
* `db.String(80)` указывает на строковый тип данных с максимальной длиной 80 символов.
*  `db.Text` используется для больших текстовых полей.
*  `db.ForeignKey` устанавливает связь между таблицами. 
*  `db.relationship` определяет отношение между моделями. В данном случае у пользователя (`User`) может быть много публикаций (`Post`), а у публикации один автор (`User`). 
* `backref='author'` создает обратное отношение, позволяя получать доступ к автору публикации через атрибут `author`.

### Создание таблиц

После определения моделей необходимо создать соответствующие таблицы в базе данных. Flask-SQLAlchemy предоставляет удобный способ сделать это:

```python
with app.app_context():
    db.create_all()
```

Этот код создаст таблицы `user` и `post` в базе данных, если они еще не существуют.

### Добавление данных

Теперь, когда у нас есть модели и таблицы, мы можем добавлять данные:

```python
with app.app_context():
    new_user = User(username='john', email='john@example.com')
    db.session.add(new_user)
    db.session.commit()

    new_post = Post(title='My first post', content='Hello, world!', user_id=new_user.id)
    db.session.add(new_post)
    db.session.commit()
```

В этом коде мы:

*  Создаем новый объект `User`  и сохраняем его в базу данных.
* Создаем новый объект `Post`, связываем его с пользователем через `user_id`, и сохраняем его.
*  `db.session.commit()` фиксирует изменения в базе данных.


Это лишь базовые основы работы с моделями данных, таблицами и отношениями в Flask. В следующих разделах мы более подробно рассмотрим различные типы данных, отношения, запросы к базе данных и другие возможности Flask-SQLAlchemy. 
