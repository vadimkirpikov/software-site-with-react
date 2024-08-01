## Jinja2: Добавляем динамику в FastAPI

FastAPI предоставляет мощный инструмент для создания API, но что делать, если нужно вернуть данные не в формате JSON, а в виде полноценной HTML-страницы? Для решения этой задачи используется связка FastAPI с шаблонизатором Jinja2.

Jinja2 – это гибкий и производительный шаблонизатор для Python, который позволяет генерировать динамический HTML-код. 

### Настройка Jinja2

Прежде чем начать использовать Jinja2, необходимо установить его:

```bash
pip install jinja2
```

Далее, импортируем необходимые классы и создадим экземпляр `Jinja2Templates`:

```python
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")
```

В данном примере мы указали, что Jinja2 будет искать шаблоны в директории `templates`, расположенной в корне проекта.

### Создание первого шаблона

Создадим файл `index.html` в директории `templates` со следующим содержимым:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Привет, Jinja2!</title>
</head>
<body>
    <h1>Привет, мир!</h1>
</body>
</html>
```

Теперь создадим маршрут в FastAPI, который будет использовать этот шаблон:

```python
@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
```

Здесь `TemplateResponse` – это специальный объект ответа FastAPI, который принимает имя шаблона и контекст (словарь данных, доступных в шаблоне). Обратите внимание на параметр `request` - он передается в контекст, что позволяет использовать его внутри шаблона для доступа к информации о запросе.

Запустите сервер (`uvicorn main:app --reload`) и перейдите по адресу `http://127.0.0.1:8000/`. Вы увидите страницу с заголовком "Привет, мир!".

### Передача данных в шаблон

Jinja2 позволяет передавать данные из Python-кода в шаблон. Давайте изменим маршрут и передадим туда имя пользователя:

```python
@app.get("/user/{user_id}")
async def read_user(request: Request, user_id: int):
    user = {"id": user_id, "name": "Иван"}
    return templates.TemplateResponse("user.html", {"request": request, "user": user})
```

Теперь создадим файл `user.html` в директории `templates`:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Профиль пользователя</title>
</head>
<body>
    <h1>Профиль пользователя</h1>
    <p>ID: {{ user.id }}</p>
    <p>Имя: {{ user.name }}</p>
</body>
</html>
```

В этом шаблоне мы используем двойные фигурные скобки `{{ ... }}`, чтобы вывести значения переменных, переданных из Python-кода. 

Перейдите по адресу `http://127.0.0.1:8000/user/1`, и вы увидите страницу с данными пользователя.

### Условия и циклы в Jinja2

Jinja2 поддерживает использование условий и циклов прямо в шаблонах. Например, изменим `user.html` следующим образом:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Профиль пользователя</title>
</head>
<body>
    <h1>Профиль пользователя</h1>
    <p>ID: {{ user.id }}</p>
    <p>Имя: {{ user.name }}</p>

    <h2>Список товаров:</h2>
    <ul>
        {% for item in items %}
            <li>{{ item }}</li>
        {% endfor %}
    </ul>
</body>
</html>
```

И измените маршрут:

```python
@app.get("/user/{user_id}")
async def read_user(request: Request, user_id: int):
    user = {"id": user_id, "name": "Иван"}
    items = ["Товар 1", "Товар 2", "Товар 3"]
    return templates.TemplateResponse("user.html", {"request": request, "user": user, "items": items})
```

Теперь на странице пользователя будет отображаться список товаров.

### Фильтры Jinja2

Jinja2 предоставляет множество фильтров для форматирования данных в шаблоне. 

Например, для изменения регистра текста используется фильтр `upper`:

```html
<p>Имя: {{ user.name|upper }}</p>
```

В данном случае имя пользователя будет отображено заглавными буквами. 

Это лишь базовые возможности Jinja2. Более подробно о шаблонизаторе и его возможностях можно узнать из официальной документации: [https://jinja.palletsprojects.com/](https://jinja.palletsprojects.com/)

Совместное использование FastAPI и Jinja2 открывает широкие возможности для создания динамических веб-приложений.