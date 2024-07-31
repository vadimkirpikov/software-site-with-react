## Настройка маршрутизации для API в Django 5.1

В этом разделе мы настроим маршрутизацию для вашего API, построенного на Django REST Framework. Маршрутизация — это механизм, который связывает URL-адреса с соответствующими представлениями, которые будут обрабатывать запросы.

### Базовая настройка URL-адресов

Для начала создайте файл `urls.py` внутри вашего приложения (например, `myapp/urls.py`). В этом файле вы будете определять URL-шаблоны, специфичные для вашего приложения.

```python
# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.article_list),
    path('articles/<int:pk>/', views.article_detail),
]
```

В этом примере мы определили два URL-шаблона:

* `/articles/`: этот шаблон будет соответствовать запросам к списку всех статей и будет обрабатываться функцией `views.article_list`.
* `/articles/<int:pk>/`: этот шаблон будет соответствовать запросам к конкретной статье по ее ID (первичному ключу), переданному в URL-адресе. Запрос будет обрабатываться функцией `views.article_detail`.

Далее, необходимо включить URL-адреса вашего приложения в главный файл `urls.py` проекта. 

```python
# project/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('myapp.urls')),
]
```

Здесь мы использовали функцию `include()`, чтобы включить URL-адреса приложения `myapp` по пути `/api/`.

Теперь все запросы, начинающиеся с `/api/`, будут перенаправляться в файл `urls.py` вашего приложения.

### Использование роутеров Django REST Framework

Django REST Framework предоставляет удобный способ определения URL-адресов с помощью **роутеров**. Роутеры позволяют автоматически генерировать URL-шаблоны для общих действий с вашими API-ресурсами (CRUD-операции: создание, чтение, обновление, удаление).

#### Подключение роутеров

Для использования роутеров внесите следующие изменения в файл `urls.py` вашего приложения:

```python
# myapp/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'articles', views.ArticleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

В этом коде мы:

1. Импортировали классы `DefaultRouter` и `ArticleViewSet`.
2. Создали экземпляр роутера `DefaultRouter()`.
3. Зарегистрировали `ArticleViewSet` с помощью метода `router.register()`, указав префикс URL-адреса `'articles'`.
4. Включили URL-шаблоны, сгенерированные роутером, в список `urlpatterns`.

#### Создание `ViewSet`

`ViewSet` — это класс, который определяет набор представлений для работы с определенным ресурсом. В нашем примере мы используем класс `ArticleViewSet` для представления статей.

Создайте файл `views.py` в вашем приложении и определите `ArticleViewSet`:

```python
# myapp/views.py

from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
```

В этом коде:

1. Мы импортировали необходимые классы из `rest_framework` и модели и сериализаторы вашего приложения.
2. Определили класс `ArticleViewSet`, наследуясь от `viewsets.ModelViewSet`.
3. Установили атрибут `queryset` равным всем объектам модели `Article`.
4. Установили атрибут `serializer_class` равным `ArticleSerializer`, который будет использоваться для сериализации и десериализации данных.

#### URL-шаблоны, сгенерированные роутером

`DefaultRouter` автоматически генерирует следующие URL-шаблоны для `ArticleViewSet`:

| HTTP-метод | URL-адрес              | Действие           |
|------------|-------------------------|--------------------|
| GET         | /api/articles/         | Список всех статей  |
| POST        | /api/articles/         | Создание статьи     |
| GET         | /api/articles/{id}/     | Просмотр статьи    |
| PUT         | /api/articles/{id}/     | Обновление статьи    |
| PATCH       | /api/articles/{id}/     | Частичное обновление |
| DELETE      | /api/articles/{id}/     | Удаление статьи    |

### Заключение

В этом разделе мы рассмотрели базовые принципы настройки маршрутизации для API в Django с использованием Django REST Framework. Вы научились создавать базовые URL-шаблоны, использовать роутеры для автоматической генерации URL-адресов и определять `ViewSet` для обработки запросов к вашим API-ресурсам. 
