## Фоновые задачи в FastAPI

FastAPI, помимо обработки HTTP-запросов, предоставляет возможность запускать фоновые задачи асинхронно. Это особенно полезно для операций, не требующих немедленного ответа клиенту, например, отправка писем, обработка файлов или взаимодействие с внешними API.

### Использование `BackgroundTasks`

FastAPI предоставляет зависимость `BackgroundTasks`, позволяющую легко запускать функции в фоновом режиме после ответа на запрос.

**Пример:**

```python
from fastapi import FastAPI, BackgroundTasks
from time import sleep

app = FastAPI()

def send_email_background(email: str):
    # Имитация отправки письма
    sleep(5)
    print(f"Письмо отправлено на адрес {email}")

@app.post("/send-email/{email}")
async def send_email(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email_background, email)
    return {"message": "Письмо поставлено в очередь на отправку"}
```

**Пояснения:**

1. Импортируем классы `FastAPI` и `BackgroundTasks`.
2. Определяем функцию `send_email_background`, которая симулирует отправку письма с задержкой в 5 секунд.
3. Создаем маршрут `/send-email/{email}`, принимающий адрес электронной почты.
4. Внедряем зависимость `BackgroundTasks` в обработчик маршрута.
5. Добавляем функцию `send_email_background` в очередь фоновых задач с помощью `background_tasks.add_task()`, передавая адрес электронной почты.
6. Возвращаем клиенту немедленный ответ, сообщая о постановке письма в очередь.

### Использование `fastapi.responses.StreamingResponse`

Для задач, генерирующих поток данных, например, загрузка большого файла, используйте `StreamingResponse`:

```python
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from time import sleep
import io

app = FastAPI()

async def generate_file():
    # Имитация генерации файла
    for i in range(10):
        yield f"Строка {i}\n".encode()
        sleep(1)

@app.get("/download")
async def download_file(request: Request):
    return StreamingResponse(generate_file(), media_type="text/plain",
                             headers={"Content-Disposition": "attachment; filename=data.txt"})
```

**Пояснения:**

1. Импортируем необходимые классы и функции.
2. Определяем асинхронный генератор `generate_file`, имитирующий генерацию файла по строкам с задержкой.
3. Создаем маршрут `/download`.
4. В обработчике маршрута возвращаем `StreamingResponse`, передавая генератор `generate_file`, тип содержимого и заголовки.

### Выбор между `BackgroundTasks` и `StreamingResponse`

| Особенность | `BackgroundTasks` | `StreamingResponse` |
|---|---|---|
| Тип задачи | Любая функция | Генерация потока данных |
| Взаимодействие с клиентом | Ответ отправляется немедленно | Данные отправляются по мере генерации |
| Пример | Отправка email | Загрузка файла |

### Заключение

Использование фоновых задач позволяет создавать более отзывчивые и эффективные приложения FastAPI, обрабатывая длительные операции асинхронно. Выбор между `BackgroundTasks` и `StreamingResponse` зависит от специфики задачи и требований к взаимодействию с клиентом. 
