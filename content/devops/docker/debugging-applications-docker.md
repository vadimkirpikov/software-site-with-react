## Отладка приложений в Docker

Docker значительно упрощает развертывание и запуск приложений, но что делать, когда что-то идет не так? В этом разделе мы рассмотрим инструменты и техники отладки приложений, работающих в контейнерах Docker.

### Логирование

Простейший способ отладки - анализ логов приложения. Docker собирает вывод (stdout и stderr) запущенных контейнеров. 

**Просмотр логов:**

```bash
docker logs <имя_контейнера>
```

**Пример:**

```bash
docker logs my-app
```

**Дополнительные опции:**

* `-f` -  следить за логами в реальном времени
* `--tail` -  указать количество строк логов для вывода
* `--timestamps` -  выводить временные метки для каждой строки лога

**Пример:**

```bash
docker logs -f --tail 50 --timestamps my-app
```

### Доступ к консоли контейнера

Иногда для отладки требуется доступ к работающему контейнеру.  Это можно сделать с помощью команды `docker exec`:

**Запуск bash в контейнере:**

```bash
docker exec -it <имя_контейнера> bash
```

**Пример:**

```bash
docker exec -it my-app bash
```

Внутри контейнера можно использовать стандартные инструменты отладки, доступные в образе.

### Отладка с помощью отладчика

Для более глубокой отладки можно использовать отладчики, такие как `gdb` или `pdb`. Для этого необходимо:

1. **Установить отладчик в образ.**
2. **Запустить контейнер с портом для отладки.**
3. **Подключиться к отладчику из хост-системы.**

**Пример Dockerfile с `gdb`:**

```dockerfile
FROM ubuntu:latest

RUN apt-get update && apt-get install -y gdb

# ... ваш код приложения ...

EXPOSE 8000 2222 # порт приложения и порт для gdb
```

**Запуск контейнера с открытым портом:**

```bash
docker run -p 8000:8000 -p 2222:2222 my-app
```

**Подключение к отладчику:**

```bash
gdbserver localhost:2222 ./my-app
```

**В другом терминале:**

```bash
gdb
(gdb) target remote :2222
```

**Пример Dockerfile с `pdb`:**

```dockerfile
FROM python:3.9-slim

# ... ваш код приложения ...

EXPOSE 8000 

CMD ["python", "-m", "pdb", "myapp.py"]
```

**Запуск контейнера и подключение отладчика:**

```bash
docker run -it -p 8000:8000 my-app
```

### Отладка с помощью инструментов Docker

Docker предоставляет инструменты для проверки состояния контейнеров и поиска проблем:

* **`docker ps`:** Показывает список запущенных контейнеров.
* **`docker stats`:** Отображает использование ресурсов контейнерами.
* **`docker top`:** Показывает запущенные процессы внутри контейнера.
* **`docker inspect`:** Предоставляет детальную информацию о контейнере.

**Пример:**

```bash
# Показать использование CPU и памяти контейнером "my-app"
docker stats my-app
```

### Использование инструментов профилирования

Для анализа производительности приложения и поиска узких мест можно использовать инструменты профилирования, такие как `perf` или `cProfile`. Эти инструменты можно установить в образ Docker и использовать для сбора данных о производительности приложения.

**Пример Dockerfile с `perf`:**

```dockerfile
FROM ubuntu:latest

RUN apt-get update && apt-get install -y linux-tools-common

# ... ваш код приложения ...

CMD ["perf", "record", "-g", "--", "./my-app"]
```

**Анализ данных `perf`:**

```bash
docker cp <контейнер_id>:/perf.data .
perf report -i perf.data
```

### Заключение

Отладка приложений в Docker не сильно отличается от отладки в других средах.  Ключевое отличие - необходимость доступа к контейнеру и понимание работы Docker. Используя описанные инструменты и техники, вы сможете эффективно находить и исправлять ошибки в приложениях, работающих в контейнерах Docker. 