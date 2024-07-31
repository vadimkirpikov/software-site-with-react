## Оркестрация контейнеров с помощью Docker Compose

Docker Compose — это инструмент, который упрощает запуск и управление многоконтейнерных Docker-приложений. Вместо ручного запуска и настройки каждого контейнера по отдельности, Docker Compose позволяет описать всю конфигурацию приложения в одном файле `docker-compose.yml` и управлять им с помощью простых команд.

### Установка Docker Compose

#### Linux

1. **Скачивание**: Скачайте последнюю версию Docker Compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2. **Права доступа**: Предоставьте права на выполнение:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

3. **Проверка**: Убедитесь, что установка прошла успешно:

```bash
docker-compose --version
```

#### macOS

Самый простой способ установить Docker Compose на macOS — использовать Docker Desktop. Docker Desktop уже включает в себя Docker Compose. 

#### Windows

Аналогично macOS, Docker Compose входит в состав Docker Desktop для Windows.

### Основы Docker Compose

#### Файл `docker-compose.yml`

Сердцем Docker Compose является файл `docker-compose.yml`, в котором описывается конфигурация приложения. Файл использует синтаксис YAML.

**Пример файла `docker-compose.yml`:**

```yaml
version: "3.9"

services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: example
```

**Описание:**

- `version`: Указывает версию синтаксиса Docker Compose.
- `services`: Определяет сервисы, из которых состоит приложение.
  - `web`: Сервис веб-сервера Nginx.
    - `image`: Используемый образ Docker (nginx:latest).
    - `ports`: Проброс портов (80:80 — проброс порта 80 контейнера на порт 80 хост-машины).
  - `db`: Сервис базы данных MySQL.
    - `image`: Используемый образ Docker (mysql:latest).
    - `environment`: Переменные окружения для контейнера (MYSQL_ROOT_PASSWORD).

#### Основные команды

- `docker-compose up`: Запускает все сервисы, определенные в файле `docker-compose.yml`.
- `docker-compose up -d`: Запускает сервисы в фоновом режиме.
- `docker-compose down`: Останавливает и удаляет все запущенные контейнеры, сети и образы, созданные с помощью `docker-compose up`.
- `docker-compose ps`: Отображает список запущенных контейнеров.
- `docker-compose logs`: Отображает логи контейнеров.
- `docker-compose build`: Собирает или пересобирает образы сервисов.

### Пример использования

Создадим простое веб-приложение, состоящее из веб-сервера Nginx и базы данных MySQL.

1. **Создание файлов**: Создайте директорию для проекта и файл `docker-compose.yml`:

```bash
mkdir my-app
cd my-app
touch docker-compose.yml
```

2. **Наполнение `docker-compose.yml`**: Добавьте следующий код в файл `docker-compose.yml`:

```yaml
version: "3.9"

services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    depends_on:
      - db
  db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: example
```

В этом примере мы добавили зависимость сервиса `web` от сервиса `db` с помощью `depends_on`, чтобы убедиться, что база данных будет запущена перед запуском веб-сервера.

3. **Запуск приложения**:

```bash
docker-compose up -d
```

4. **Проверка**: Откройте браузер и перейдите по адресу `http://localhost`. Вы должны увидеть страницу приветствия Nginx.

5. **Остановка приложения**:

```bash
docker-compose down
```

### Заключение

Docker Compose — это мощный инструмент для управления многоконтейнерными Docker-приложениями. Он упрощает запуск, настройку и управление приложениями, делая разработку и развертывание более эффективными. 
