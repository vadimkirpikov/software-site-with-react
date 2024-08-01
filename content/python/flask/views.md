## Представления Flask: создание HTML-страниц

В Flask, микрофреймворке для Python, **представления (views)** являются функциями или классами, отвечающими за обработку запросов от пользователей и генерацию ответов. Простейшим типом ответа является **HTML-страница**, отображаемая в браузере пользователя.

### Функции-представления

Основной способ создания представлений в Flask - это использование **функций-представлений**. Каждая функция-представление сопоставляется с одним или несколькими **URL-адресами** при помощи декоратора `@app.route()`. 

```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
  return "<h1>Привет, мир!</h1>"

if __name__ == "__main__":
  app.run(debug=True)
```

В этом примере функция `index()` является представлением, которое возвращает строку HTML-кода. Декоратор `@app.route("/")` связывает эту функцию с корневым URL-адресом приложения (`/`). 

#### Передача данных в HTML

Для создания динамических HTML-страниц можно передавать данные из функции-представления в HTML-шаблон. Для этого используется механизм шаблонизации **Jinja2**, встроенный в Flask.

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/<name>")
def hello(name):
  return render_template('hello.html', username=name)

if __name__ == "__main__":
  app.run(debug=True)
```

В этом примере функция `hello()` принимает имя пользователя в качестве аргумента и передает его в шаблон `hello.html` с помощью функции `render_template()`. Внутри шаблона можно получить доступ к переменной `username` и использовать ее для отображения имени пользователя.

**hello.html:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Привет!</title>
</head>
<body>
  <h1>Привет, {{ username }}!</h1>
</body>
</html>
```

### Классы-представления

В дополнение к функциям-представлениям, Flask позволяет создавать **классы-представления**. Они предоставляют более структурированный подход к созданию сложных представлений, особенно если требуется обрабатывать несколько HTTP-методов (GET, POST и т.д.) в рамках одного представления.

Чтобы создать класс-представление, необходимо:

1. **Создать класс, наследующийся от `flask.views.View`**.
2. **Реализовать метод `dispatch_request()`**, который будет принимать объект запроса (`request`) и возвращать ответ.
3. **Зарегистрировать класс-представление с помощью функции `app.add_url_rule()`, указав URL-адрес и имя представления.**

```python
from flask import Flask, render_template, request, redirect, url_for
from flask.views import View

app = Flask(__name__)

class ContactForm(View):
    methods = ['GET', 'POST']

    def dispatch_request(self):
        if request.method == 'POST':
            # Обработка данных формы
            name = request.form['name']
            email = request.form['email']
            return f"Спасибо, {name}! Мы получили ваше сообщение."
        else:
            return render_template('contact.html')

app.add_url_rule('/contact', view_func=ContactForm.as_view('contact'))

if __name__ == "__main__":
  app.run(debug=True)
```

В этом примере класс `ContactForm` обрабатывает GET и POST запросы. При GET запросе он отображает форму `contact.html`. При POST запросе он обрабатывает данные формы и перенаправляет пользователя на другую страницу.

**contact.html:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Контактная форма</title>
</head>
<body>
  <h1>Свяжитесь с нами</h1>
  <form method="POST">
    <label for="name">Имя:</label>
    <input type="text" id="name" name="name" required>
    <br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <br>
    <button type="submit">Отправить</button>
  </form>
</body>
</html>
```

### Выбор между функциями и классами

Выбор между функциями и классами-представлениями зависит от сложности приложения и личных предпочтений. Функции-представления проще для понимания и использования в небольших проектах. Классы-представления обеспечивают лучшую структуру и организацию кода в более крупных приложениях, особенно при работе с множеством представлений и маршрутов.
