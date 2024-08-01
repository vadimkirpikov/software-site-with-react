## Использование переводов в шаблонах и моделях

Интернационализация вашего Django-проекта – важный шаг на пути к привлечению более широкой аудитории. Django предоставляет встроенную систему интернационализации, которая упрощает процесс перевода вашего приложения на разные языки. В этой статье мы рассмотрим, как использовать переводы в шаблонах и моделях.

### Настройка проекта

Перед началом работы необходимо убедиться, что ваш проект настроен на использование переводов.

1. Установите необходимые пакеты:

   ```bash
   pip install django-translations
   ```

2. Добавьте `django.middleware.locale.LocaleMiddleware` в `MIDDLEWARE` вашего файла настроек (`settings.py`):

   ```python
   MIDDLEWARE = [
       # ...
       'django.middleware.locale.LocaleMiddleware',
       # ...
   ]
   ```

3. Убедитесь, что `'django.contrib.humanize'` добавлен в `INSTALLED_APPS` вашего файла настроек:

   ```python
   INSTALLED_APPS = [
       # ...
       'django.contrib.humanize',
       # ...
   ]
   ```

4. Добавьте следующие настройки в `settings.py`:

   ```python
   LANGUAGE_CODE = 'ru'  # Язык по умолчанию

   TIME_ZONE = 'Europe/Moscow'  # Временная зона по умолчанию

   USE_I18N = True  # Включить интернационализацию

   USE_L10N = True  # Включить локализацию

   USE_TZ = True  # Включить поддержку часовых поясов

   LANGUAGES = [
       ('ru', _('Русский')),
       ('en', _('English')),
       # ... другие языки
   ]

   LOCALE_PATHS = [
       os.path.join(BASE_DIR, 'locale/'),
   ]
   ```

   В этом примере `LANGUAGE_CODE` установлен на русский язык (`ru`), а `LANGUAGES` содержит кортежи с кодами языков и их названиями, которые будут доступны для пользователей. 

5. Создайте папку `locale` в корне вашего проекта Django.

### Создание файлов переводов

1. Для создания файлов перевода используйте команду `makemessages`:

   ```bash
   python manage.py makemessages -l ru -l en
   ```

   Эта команда найдет все строки, отмеченные для перевода, и создает файлы сообщений (`*.po`) в папках `locale/ru/LC_MESSAGES/` и `locale/en/LC_MESSAGES/`.

2. Откройте файлы `*.po` и добавьте переводы для каждой строки. Например:

   ```po
   msgid "Welcome to my site!"
   msgstr "Добро пожаловать на мой сайт!"
   ```

3. После завершения перевода скомпилируйте файлы сообщений с помощью команды `compilemessages`:

   ```bash
   python manage.py compilemessages
   ```

   Эта команда создаст файлы `*.mo`, которые будут использоваться Django для отображения переведенных строк.

### Использование переводов в шаблонах

Для использования переводов в шаблонах Django используйте следующие теги и фильтры:

- **`{% trans %}`:** Переводит строку непосредственно в шаблоне.

   ```html
   <h1>{% trans "Welcome to my site!" %}</h1>
   ```

- **`{% blocktrans %}`:** Переводит блок текста, позволяя использовать переменные.

   ```html
   {% blocktrans with name=user.username %}
     Hello, {{ name }}!
   {% endblocktrans %}
   ```

- **`{{ value|translate }}`:** Переводит значение переменной.

   ```html
   <p>{{ message|translate }}</p>
   ```

### Использование переводов в моделях

Для использования переводов в моделях Django используйте библиотеку `django-modeltranslation`.

1. Установите библиотеку:

   ```bash
   pip install django-modeltranslation
   ```

2. Добавьте `'modeltranslation'` в `INSTALLED_APPS` вашего файла настроек:

   ```python
   INSTALLED_APPS = [
       # ...
       'modeltranslation',
       # ...
   ]
   ```

3. Создайте файл `translation.py` в папке вашей модели и добавьте следующий код:

   ```python
   from modeltranslation.translator import register, TranslationOptions

   from .models import MyModel  # Импортируйте вашу модель


   @register(MyModel)
   class MyModelTranslationOptions(TranslationOptions):
       fields = ('title', 'description')  # Поля для перевода
   ```

4. Выполните миграции:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Теперь вы можете создавать переводы для полей модели в административной панели Django.

### Переключение языка

Для переключения языка используйте URL-адрес с префиксом языка:

```
/ru/  # Русский язык
/en/  # Английский язык
```

Вы также можете использовать функцию `activate()` из модуля `translation`:

```python
from django.utils import translation

def my_view(request):
    user_language = 'ru'
    translation.activate(user_language)
    # ... остальной код
```

### Заключение

В этой статье мы рассмотрели основы использования переводов в шаблонах и моделях Django. 
Использование встроенной системы интернационализации Django позволит вам легко создавать приложения, 
доступные для пользователей по всему миру.
