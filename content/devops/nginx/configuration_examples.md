## Примеры конфигураций Nginx для различных сценариев

Эта часть руководства посвящена практическим примерам настройки Nginx для реализации различных сценариев работы веб-сервера. Рассмотрим конфигурации для следующих случаев: 

*   Простой веб-сервер
*   Размещение нескольких сайтов на одном сервере
*   Настройка редиректов
*   Кэширование статического контента
*   Балансировка нагрузки

### Простой веб-сервер

Это базовая конфигурация Nginx, используемая для обслуживания одного сайта.

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/example.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

**Описание:**

*   `listen 80`: прослушивает порт 80 для HTTP-запросов.
*   `server_name example.com www.example.com`: определяет доменные имена сайта.
*   `root /var/www/example.com`: указывает корневую директорию сайта.
*   `index index.html`: определяет файл индекса (index.html), который будет отображаться при обращении к корневой директории.
*   `location /`: блок описывает обработку запросов к корневой директории сайта.
*   `try_files $uri $uri/ =404`: директива указывает Nginx искать файл или директорию, соответствующую запросу. Если ничего не найдено, возвращается код ответа 404.

### Размещение нескольких сайтов на одном сервере

С помощью Nginx можно размещать несколько сайтов на одном сервере, используя виртуальные хосты.

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 80;
    server_name test.com www.test.com;
    root /var/www/test.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

В данном примере определены два блока `server`, каждый из которых отвечает за свой сайт:

*   Первый блок настроен на обслуживание `example.com` и `www.example.com`.
*   Второй блок настроен на обслуживание `test.com` и `www.test.com`.

### Настройка редиректов

Nginx позволяет настраивать редиректы с одного URL-адреса на другой.

**Пример редиректа с HTTP на HTTPS:**

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com www.example.com;
    ... # Остальные настройки для HTTPS
}
```

**Описание:**

*   Первый блок `server` прослушивает порт 80 (HTTP).
*   Директива `return 301` выполняет постоянный редирект (код 301) на HTTPS-версию сайта.
*   `$host` и `$request_uri` - переменные Nginx, содержащие имя хоста и URI запроса.
*   Второй блок `server` настроен на обработку HTTPS-запросов.

### Кэширование статического контента

Nginx может кэшировать статический контент (изображения, CSS, JavaScript), чтобы ускорить загрузку сайта.

```nginx
http {
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g;

    server {
        ... # Остальные настройки сервера

        location ~* \.(jpg|jpeg|gif|png|css|js)$ {
            proxy_cache my_cache;
            proxy_cache_valid 200 1h;
        }
    }
}
```

**Описание:**

*   `proxy_cache_path` определяет параметры кэша:
    *   `/var/cache/nginx` - путь к директории кэша.
    *   `levels=1:2` - структура директорий кэша.
    *   `keys_zone=my_cache:10m` - имя и размер зоны памяти для хранения ключей кэша.
    *   `max_size=1g` - максимальный размер кэша.
*   `location ~* \.(jpg|jpeg|gif|png|css|js)$`: блок настроен на кэширование файлов с расширениями jpg, jpeg, gif, png, css, js.
*   `proxy_cache my_cache`: активирует кэширование для данного блока `location`.
*   `proxy_cache_valid 200 1h`: устанавливает время жизни кэша для успешных ответов (код 200) равным 1 часу.

### Балансировка нагрузки

Nginx может выступать в качестве балансировщика нагрузки, распределяя запросы между несколькими серверами.

```nginx
http {
    upstream backend {
        server backend1.example.com weight=5;
        server backend2.example.com;
        server backend3.example.com backup;
    }

    server {
        ... # Остальные настройки сервера

        location / {
            proxy_pass http://backend;
        }
    }
}
```

**Описание:**

*   `upstream backend`: определяет группу серверов.
*   `server backend1.example.com weight=5`: сервер `backend1.example.com` получает в 5 раз больше запросов, чем остальные.
*   `server backend3.example.com backup`: сервер `backend3.example.com` используется только в том случае, если остальные серверы недоступны.
*   `proxy_pass http://backend`: передает запросы на группу серверов `backend`.

Это лишь некоторые примеры конфигураций Nginx. Более подробную информацию о настройке Nginx можно найти в официальной документации. 
