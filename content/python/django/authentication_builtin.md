## Встроенные возможности аутентификации Django

Django предоставляет мощные и гибкие инструменты для аутентификации пользователей. В этой части руководства мы рассмотрим основные компоненты и возможности встроенной системы аутентификации Django.

### Модель пользователя User

В основе системы аутентификации лежит модель `User`, которая хранит информацию о пользователе. Django предоставляет готовую модель `User` в модуле `django.contrib.auth`. 

По умолчанию модель `User` содержит следующие поля:

| Поле | Описание |
|---|---|
| `username` | Уникальное имя пользователя |
| `password` | Хэш пароля |
| `email` | Адрес электронной почты |
| `first_name` | Имя |
| `last_name` | Фамилия |
| `is_staff` | Флаг, указывающий, является ли пользователь сотрудником |
| `is_active` | Флаг, указывающий, активен ли пользователь |
| `is_superuser` | Флаг, указывающий, является ли пользователь суперпользователем |

### Аутентификация в представлениях

Django предоставляет декораторы и миксины для управления доступом к представлениям на основе аутентификации:

* **`@login_required`**: Декоратор, ограничивающий доступ к представлению только для авторизованных пользователей.
* **`LoginRequiredMixin`**: Миксин, предоставляющий тот же функционал, что и `@login_required`.

**Пример использования `@login_required`**:

```python
from django.contrib.auth.decorators import login_required

@login_required
def my_view(request):
    # Код представления, доступный только авторизованным пользователям
    return HttpResponse("Привет, " + request.user.username)
```

### Форма входа

Django предоставляет готовую форму входа `AuthenticationForm`, которая упрощает процесс аутентификации пользователей.

**Пример использования `AuthenticationForm`**:

```python
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # Аутентификация пользователя
            # ...
            return redirect('home')  # Перенаправление на главную страницу
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})
```

**Пример шаблона `login.html`**:

```html
<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Войти</button>
</form>
```

### Выход из системы

Для выхода пользователя из системы Django предоставляет функцию `logout`.

**Пример использования `logout`**:

```python
from django.contrib.auth import logout
from django.shortcuts import redirect

def logout_view(request):
    logout(request)
    return redirect('login')  # Перенаправление на страницу входа
```

### Права доступа

Django предоставляет систему прав доступа, которая позволяет ограничивать действия пользователей на основе их роли или группы.

#### Создание групп пользователей

Для создания группы пользователей используется модель `Group` из модуля `django.contrib.auth.models`.

**Пример создания группы**:

```python
from django.contrib.auth.models import Group

group = Group.objects.create(name='Editors')
```

#### Назначение прав доступа

Права доступа назначаются моделям Django. Например, можно предоставить группе "Editors" право на добавление, изменение и удаление новостей.

**Пример назначения прав доступа**:

```python
from django.contrib.auth.models import Permission

content_type = ContentType.objects.get_for_model(News)
permission = Permission.objects.get(
    codename='change_news',
    content_type=content_type,
)
group.permissions.add(permission)
```

#### Проверка прав доступа

Для проверки прав доступа пользователя в представлении можно использовать метод `has_perm`.

**Пример проверки прав доступа**:

```python
@login_required
def edit_news(request, news_id):
    if request.user.has_perm('news.change_news'):
        # Пользователь имеет право на редактирование новостей
        # ...
    else:
        # Пользователь не имеет прав на редактирование новостей
        # ...
```

### Настройка аутентификации

Django предоставляет множество настроек для кастомизации системы аутентификации. 

**Основные настройки аутентификации**:

* **`AUTHENTICATION_BACKENDS`**: Список бэкендов аутентификации, используемых Django.
* **`LOGIN_URL`**: URL-адрес страницы входа в систему.
* **`LOGIN_REDIRECT_URL`**: URL-адрес, на который пользователь будет перенаправлен после успешного входа в систему.
* **`LOGOUT_REDIRECT_URL`**: URL-адрес, на который пользователь будет перенаправлен после выхода из системы.

**Пример настройки `LOGIN_REDIRECT_URL`**:

```python
# settings.py
LOGIN_REDIRECT_URL = '/profile/'
```

В этом разделе мы рассмотрели основные возможности встроенной системы аутентификации Django. В следующих разделах мы подробнее остановимся на кастомизации моделей пользователей, создании собственных форм аутентификации и интеграции сторонних систем аутентификации. 
