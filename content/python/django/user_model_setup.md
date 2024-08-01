## Настройка и использование User модели

Django предоставляет готовую к использованию модель `User` для аутентификации пользователей. Однако, в большинстве случаев требуется кастомизация модели под нужды проекта. 

### Наследование от AbstractUser

Существует два основных подхода к настройке модели пользователя: наследование от `AbstractUser` и наследование от `AbstractBaseUser`. Рассмотрим первый вариант, который проще в реализации и подходит для большинства случаев.

1. **Создание собственной модели пользователя:**

   ```python
   from django.db import models
   from django.contrib.auth.models import AbstractUser

   class CustomUser(AbstractUser):
       phone_number = models.CharField("Номер телефона", max_length=15, blank=True)
       bio = models.TextField("Биография", blank=True)
   ```

   В этом примере мы создаем модель `CustomUser`, наследуясь от `AbstractUser`. Добавляем поля `phone_number` и `bio` для хранения дополнительной информации о пользователе. 

   > **Важно:** 
   > * Аргумент `blank=True` делает поля необязательными для заполнения.
   > * Необходимо указать verbose name для каждого поля, например: `"Номер телефона"`.

2. **Регистрация модели в settings.py:**

   ```python
   AUTH_USER_MODEL = 'myapp.CustomUser'
   ```

   Замените `myapp` на имя вашего приложения. Теперь Django будет использовать `CustomUser` вместо стандартной модели `User`.

### Создание суперпользователя

После настройки модели пользователя необходимо создать суперпользователя:

```bash
python manage.py createsuperuser
```

При создании суперпользователя будут запрошены имя пользователя, адрес электронной почты и пароль. Обратите внимание, что теперь будут запрашиваться данные, соответствующие вашей кастомной модели пользователя.

### Использование CustomUser в моделях

Теперь вы можете использовать `CustomUser` в других моделях вашего приложения, ссылаясь на неё через `settings.AUTH_USER_MODEL`:

```python
from django.db import models
from django.conf import settings

class Post(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    content = models.TextField("Текст")
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
```

В этом примере мы создаем модель `Post`, которая связана с пользователем через поле `author`.

### Доступ к данным пользователя

Для доступа к данным пользователя в шаблонах можно использовать объект `user`:

```html
{% if user.is_authenticated %}
  <p>Добро пожаловать, {{ user.username }}!</p>
  {% if user.phone_number %}
    <p>Ваш номер телефона: {{ user.phone_number }}</p>
  {% endif %}
{% endif %}
```

В Python-коде доступ к данным пользователя осуществляется через объект `request.user`:

```python
from django.shortcuts import render

def user_profile(request):
    if request.user.is_authenticated:
        user = request.user
        context = {
            'user': user,
        }
        return render(request, 'user_profile.html', context)
    else:
        # Редирект на страницу входа или обработка неаутентифицированных пользователей
        pass
```

### Вывод

В этой статье мы рассмотрели базовые принципы настройки и использования кастомной модели пользователя в Django, наследуясь от `AbstractUser`. Этот подход подходит для большинства случаев. 

В дальнейшем вы можете изучить более продвинутые темы, такие как:

* Наследование от `AbstractBaseUser` для большей гибкости.
* Создание собственных форм аутентификации.
* Использование сторонних пакетов для работы с пользователями. 
