## Шаблоны и наследование шаблонов

FastAPI не ограничивается исключительно API, он также предоставляет инструменты для разработки полноценных веб-приложений, включая рендеринг HTML-страниц. Для этого FastAPI интегрируется с Jinja2, мощным и гибким шаблонизатором для Python.

### Подключение Jinja2

Прежде чем начать работу с шаблонами, необходимо подключить Jinja2 к вашему приложению FastAPI. 

```python
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
```

В этом примере:

1.  Мы импортируем необходимые классы: `FastAPI`, `Request` и `Jinja2Templates`.
2.  Создаем экземпляр приложения FastAPI: `app = FastAPI()`.
3.  Создаем экземпляр `Jinja2Templates`, указывая директорию, где будут храниться ваши шаблоны: `templates = Jinja2Templates(directory="templates")`.
4.  Определяем маршрут `/`, который при обращении будет рендерить шаблон `index.html` из указанной директории. Обратите внимание на передачу объекта `request` в контекст шаблона.

### Создание шаблона

Создайте папку `templates` в корне вашего проекта и файл `index.html` внутри нее:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>FastAPI Templates</title>
</head>
<body>
    <h1>Привет, FastAPI!</h1>
</body>
</html>

```

Теперь, запустив приложение и перейдя по адресу `http://127.0.0.1:8000/`, вы увидите результат рендеринга этого шаблона.

### Передача данных в шаблон

Для передачи данных из вашего кода Python в шаблон Jinja2 используйте словарь в качестве второго аргумента метода `TemplateResponse`.

```python
@app.get("/items/{item_id}")
async def read_item(request: Request, item_id: int):
    return templates.TemplateResponse("item.html", {"request": request, "item_id": item_id})
```

Внутри шаблона вы можете получить доступ к переданным данным по их ключам:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>FastAPI Templates</title>
</head>
<body>
    <h1>Просмотр товара #{{ item_id }}</h1>
</body>
</html>

```

### Наследование шаблонов

Jinja2 поддерживает наследование шаблонов, что позволяет создавать базовые шаблоны с общей структурой и переопределять только необходимые блоки в дочерних шаблонах.

Создайте базовый шаблон `base.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}{% endblock %} - Мое приложение</title>
</head>
<body>
    <header>
        <h1>Мое приложение</h1>
    </header>
    <main>
        {% block content %}{% endblock %}
    </main>
    <footer>
        <p>&copy; 2023</p>
    </footer>
</body>
</html>
```

В этом шаблоне мы определили блоки `title` и `content`, которые могут быть переопределены в дочерних шаблонах.

Теперь создайте дочерний шаблон `index.html`, который наследует `base.html`:

```html
{% extends "base.html" %}

{% block title %}Главная страница{% endblock %}

{% block content %}
    <h2>Добро пожаловать на главную страницу!</h2>
{% endblock %}
```

В этом шаблоне мы:

1.  Указываем, что он наследует `base.html`: `{% extends "base.html" %}`.
2.  Переопределяем блок `title`.
3.  Переопределяем блок `content`.

Теперь, обратившись к маршруту `/`, вы увидите, что страница отображается с использованием структуры, определенной в `base.html`, и содержимым, переопределенным в `index.html`.

### Заключение

Использование шаблонов Jinja2 в FastAPI позволяет создавать динамические HTML-страницы, эффективно отделяя логику приложения от представления. Наследование шаблонов делает код более структурированным и удобным в поддержке, особенно в крупных проектах.
