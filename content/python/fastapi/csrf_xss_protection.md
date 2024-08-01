## Защита от CSRF и XSS в FastAPI

Безопасность веб-приложений - критически важный аспект разработки. Две распространенные уязвимости, с которыми приходится сталкиваться, - это Cross-Site Request Forgery (CSRF) и Cross-Site Scripting (XSS). В этом разделе мы рассмотрим, как защитить ваше FastAPI приложение от этих угроз.

### Cross-Site Request Forgery (CSRF)

CSRF - это тип атаки, при которой злоумышленник заставляет пользователя выполнить нежелательные действия на веб-сайте, на котором он аутентифицирован. Это происходит, когда злоумышленник может заставить браузер пользователя отправить HTTP-запрос на целевой сайт без ведома или согласия пользователя.

#### Защита от CSRF в FastAPI

FastAPI интегрируется с Starlette, которая предоставляет встроенную защиту от CSRF. Чтобы включить ее, вам нужно импортировать и использовать middleware `CSRFProtect`.

**Установка необходимых зависимостей:**

```bash
pip install fastapi[all]
```

**Пример использования:**

```python
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from starlette.middleware.csrf import CSRFProtect

app = FastAPI()
app.add_middleware(CSRFProtect, secret_key="your_secret_key")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def get_form(request: Request):
    return templates.TemplateResponse("form.html", {"request": request})

@app.post("/submit", response_class=RedirectResponse)
async def post_form(request: Request, name: str = Form(...)):
    # Обработка данных формы
    return RedirectResponse(url="/", status_code=303)
```

**Файл шаблона `templates/form.html`:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Форма</title>
</head>
<body>
    <form method="post" action="/submit">
        <input type="hidden" name="csrf_token" value="{{ csrf_token }}">
        <label for="name">Имя:</label>
        <input type="text" id="name" name="name">
        <button type="submit">Отправить</button>
    </form>
</body>
</html>
```

**Пояснения:**

1. Мы добавляем middleware `CSRFProtect` в приложение FastAPI, передавая ему секретный ключ.
2. В обработчике маршрута `/` мы рендерим шаблон `form.html`.
3. В шаблоне `form.html` мы используем `{{ csrf_token }}`, чтобы получить токен CSRF, сгенерированный middleware `CSRFProtect`, и включить его в скрытое поле формы.
4. При отправке формы middleware `CSRFProtect` проверяет наличие и валидность токена CSRF. Если токен отсутствует или недействителен, запрос будет отклонен.

**Важно:**

* Храните секретный ключ `secret_key` в безопасности. Не передавайте его в систему контроля версий и храните его в переменных окружения или в менеджере секретов.
* Используйте HTTPS для вашего сайта, чтобы предотвратить перехват токена CSRF.

### Cross-Site Scripting (XSS)

XSS - это тип уязвимости, при которой злоумышленник может внедрить вредоносный код в веб-страницу, которая будет отображаться другим пользователям. 

#### Защита от XSS в FastAPI

FastAPI использует Jinja2 в качестве шаблонизатора по умолчанию. Jinja2 предоставляет автоматическое экранирование HTML-кода, что является эффективной мерой защиты от XSS.

**Пример:**

```python
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/user/{username}", response_class=HTMLResponse)
async def get_user(request: Request, username: str):
    return templates.TemplateResponse("user.html", {"request": request, "username": username})
```

**Файл шаблона `templates/user.html`:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Профиль пользователя</title>
</head>
<body>
    <h1>Привет, {{ username }}!</h1>
</body>
</html>
```

В этом примере, даже если `username` содержит вредоносный HTML-код, он будет автоматически экранирован Jinja2 и отобразится как обычный текст, предотвращая атаку XSS.

#### Дополнительные меры защиты

* **Валидация данных:** Всегда валидируйте и санируйте пользовательский ввод на стороне сервера, прежде чем использовать его в вашем приложении.
* **Использование Content Security Policy (CSP):**  CSP позволяет вам контролировать, какие ресурсы разрешено загружать браузеру, что может помочь предотвратить XSS-атаки.

Защита от CSRF и XSS - это важные аспекты безопасности веб-приложений. Используйте встроенные механизмы защиты FastAPI и следуйте рекомендациям, чтобы сделать ваше приложение более безопасным.
