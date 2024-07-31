## Управление контейнерами с помощью Docker API

Docker API предоставляет мощный интерфейс для управления контейнерами, образами, сетями и другими компонентами Docker Engine. Вместо использования командной строки `docker` вы можете взаимодействовать с Docker Engine программно, отправляя HTTP-запросы. Это открывает широкие возможности для автоматизации, интеграции с другими инструментами и создания собственных решений на базе Docker.

### Основы работы с Docker API

Docker API следует архитектуре REST (Representational State Transfer) и использует HTTP-методы для выполнения операций:

| HTTP-метод | Описание |
|---|---|
| GET | Получение информации о ресурсах |
| POST | Создание новых ресурсов |
| PUT | Обновление существующих ресурсов |
| DELETE | Удаление ресурсов |

Docker Engine прослушивает запросы к сокету Unix `/var/run/docker.sock` или к TCP-порту (по умолчанию 2377). Для взаимодействия с API вы можете использовать любой язык программирования, поддерживающий HTTP-запросы, например, Python, Go, JavaScript.

### Подключение к Docker API с помощью Python

В данном примере мы будем использовать язык программирования Python и библиотеку `docker`. Установите библиотеку с помощью pip:

```bash
pip install docker
```

Следующий код демонстрирует подключение к Docker API и получение информации о версии Docker Engine:

```python
import docker

# Подключение к Docker API
client = docker.from_env()

# Получение информации о версии Docker
version = client.version()

# Вывод информации о версии
print(version)
```

### Управление контейнерами

Docker API предоставляет богатый набор методов для управления контейнерами. 

#### 1. Создание и запуск контейнера

Для создания и запуска контейнера используется метод `containers.run()`. 

```python
# Запуск контейнера из образа 'ubuntu:latest' с командой 'echo "Hello from Docker!"'
container = client.containers.run("ubuntu:latest", "echo 'Hello from Docker!'")

# Вывод вывода контейнера
print(container.logs())
```

В данном примере мы запускаем контейнер из образа `ubuntu:latest`, выполняем команду `echo "Hello from Docker!"` внутри контейнера и выводим результат.

#### 2. Список контейнеров

Получить список всех контейнеров можно с помощью метода `containers.list()`:

```python
# Получение списка всех контейнеров
containers = client.containers.list(all=True)

# Вывод информации о каждом контейнере
for container in containers:
    print(f"ID: {container.id}, Image: {container.image.tags[0]}, Status: {container.status}")
```

В данном примере мы получаем список всех контейнеров, включая остановленные, и выводим информацию об их ID, используемом образе и текущем статусе.

#### 3. Остановка и запуск контейнера

Для остановки и запуска существующего контейнера используются методы `stop()` и `start()`:

```python
# Остановка контейнера по ID
client.containers.get('container_id').stop()

# Запуск остановленного контейнера
client.containers.get('container_id').start()
```

#### 4. Удаление контейнера

Для удаления контейнера используется метод `remove()`:

```python
# Удаление контейнера по ID
client.containers.get('container_id').remove()
```

### Примеры использования Docker API

#### Автоматизация развертывания приложения

```python
import docker

# Настройки приложения
image_name = 'my-app:latest'
container_name = 'my-app-container'
port_mapping = {8080: 80}

# Подключение к Docker API
client = docker.from_env()

# Проверка существования образа
try:
    client.images.get(image_name)
except docker.errors.ImageNotFound:
    print(f"Образ {image_name} не найден, загружаю...")
    client.images.pull(image_name)

# Создание и запуск контейнера
try:
    container = client.containers.run(
        image_name,
        name=container_name,
        ports=port_mapping,
        detach=True,
    )
    print(f"Контейнер {container_name} запущен.")
except docker.errors.APIError as e:
    print(f"Ошибка при запуске контейнера: {e}")
```

Этот скрипт проверяет наличие образа приложения, загружает его при необходимости и запускает контейнер с заданными настройками.

#### Мониторинг ресурсов контейнера

```python
import docker
import time

# ID контейнера для мониторинга
container_id = 'container_id'

# Подключение к Docker API
client = docker.from_env()

while True:
    # Получение информации о ресурсах контейнера
    stats = client.containers.get(container_id).stats(stream=False)

    # Вывод информации о потреблении CPU и памяти
    cpu_percent = stats['cpu_stats']['cpu_usage']['total_usage'] / stats['cpu_stats']['system_cpu_usage'] * 100
    memory_usage = stats['memory_stats']['usage'] / 1024 / 1024
    print(f"CPU: {cpu_percent:.2f}%, Memory: {memory_usage:.2f}MB")

    time.sleep(5)
```

Этот скрипт подключается к Docker API и выводит информацию о потреблении CPU и памяти контейнером каждые 5 секунд.

### Заключение

Docker API открывает широкие возможности для автоматизации, интеграции и создания собственных инструментов для работы с Docker. Изучение API поможет вам более эффективно управлять контейнерами и создавать собственные решения на базе Docker. 

Для более подробной информации о Docker API обратитесь к официальной документации: [https://docs.docker.com/engine/api/](https://docs.docker.com/engine/api/)