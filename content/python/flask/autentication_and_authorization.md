## Аутентификация и авторизация пользователей

В этом разделе мы разберемся с важнейшими аспектами безопасности веб-приложений – аутентификацией и авторизацией пользователей. Аутентификация – это процесс проверки личности пользователя, то есть подтверждение того, что он является тем, за кого себя выдает. Авторизация же – это процесс определения, к каким ресурсам и действиям пользователь имеет доступ после успешной аутентификации.

Существует несколько подходов к реализации аутентификации и авторизации в Flask приложениях. Один из самых популярных и удобных – использование расширения Flask-Login. 

### Flask-Login

Flask-Login – это расширение Flask, упрощающее управление сессиями пользователей и реализацию основных функций аутентификации:

*   Вход пользователя в систему;
*   Выход пользователя из системы;
*   Защита view-функций от неавторизованного доступа;
*   Запоминание пользователя при следующем визите.

#### Установка Flask-Login

Для начала установим Flask-Login с помощью pip:

```bash
pip install Flask-Login
```

#### Создание модели пользователя

Перед тем как использовать Flask-Login, необходимо создать модель пользователя, которая будет хранить информацию о нем, как минимум, имя пользователя и хэшированный пароль:

```python
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from your_app import db # Импортируем объект db из вашего приложения

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
```

В этом примере:

*   `UserMixin` – класс-примесь от Flask-Login, предоставляющий базовые методы для работы с пользователями.
*   `generate_password_hash` и `check_password_hash` – функции из Werkzeug для хэширования и проверки паролей соответственно.
*   Метод `set_password` хэширует пароль перед сохранением в базу данных.
*   Метод `check_password` проверяет, совпадает ли переданный пароль с хэшем пароля в базе данных.

#### Инициализация Flask-Login

Далее необходимо инициализировать Flask-Login и указать, как получать пользователя по его ID:

```python
from flask_login import LoginManager

from your_app import app # Импортируем объект app из вашего приложения
from your_app.models import User # Импортируем модель User

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
```

В этом коде:

*   Создаётся объект `LoginManager` и инициализируется с помощью объекта приложения Flask.
*   Функция `load_user` декорируется `@login_manager.user_loader`. Эта функция будет вызываться Flask-Login для получения объекта пользователя по его ID.

#### Реализация входа и регистрации

Теперь можно реализовать view-функции для входа и регистрации пользователя:

```python
from flask import render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, login_required

from your_app import app, db 
from your_app.forms import LoginForm, RegistrationForm # Импортируем формы
from your_app.models import User

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            flash('Вы успешно вошли в систему', 'success')
            return redirect(url_for('index')) # Перенаправление на главную страницу
        else:
            flash('Неверное имя пользователя или пароль', 'danger')
    return render_template('login.html', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Вы успешно зарегистрированы', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Вы вышли из системы', 'info')
    return redirect(url_for('index')) 
```

В этом коде:

*   Функция `login()` обрабатывает запрос на вход пользователя. 
*   Функция `register()` обрабатывает запрос на регистрацию нового пользователя. 
*   Функция `logout()` завершает сеанс пользователя. Обратите внимание на декоратор `@login_required`. Он гарантирует, что только авторизованный пользователь сможет выйти из системы.

#### Защита view-функций

Чтобы защитить view-функции от неавторизованного доступа, достаточно использовать декоратор `@login_required`:

```python
@app.route('/profile')
@login_required
def profile():
    # ... логика обработки профиля пользователя ...
```

Теперь доступ к странице `/profile` будет возможен только для авторизованных пользователей.

### Заключение

В этом разделе мы рассмотрели базовые принципы аутентификации и авторизации пользователей в Flask приложениях с помощью расширения Flask-Login. Вы узнали, как:

*   Устанавливать и инициализировать Flask-Login;
*   Создавать модель пользователя;
*   Реализовывать функции входа, выхода и регистрации;
*   Защищать view-функции от неавторизованного доступа.

Flask-Login предоставляет базовые функции для работы с аутентификацией. Для более комплексных сценариев, таких как двухфакторная аутентификация или интеграция с OAuth, существуют другие библиотеки и сервисы. 
