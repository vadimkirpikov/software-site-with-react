## Обзор папок и файлов конфигурации Nginx

Понимание структуры папок и файлов конфигурации Nginx — это ключ к гибкой настройке веб-сервера. 

### Основные директории

Местоположение основных директорий может варьироваться в зависимости от дистрибутива и способа установки Nginx. В этом разделе мы рассмотрим стандартное расположение, используемое в большинстве дистрибутивов Linux.

| Директория | Описание |
|---|---|
| `/usr/local/nginx` | Корневая директория установки Nginx (по умолчанию) |
| `/etc/nginx` | Директория с основными конфигурационными файлами |
| `/var/log/nginx` | Директория с логами Nginx |
| `/usr/share/nginx/html` | Директория с файлами сайта по умолчанию |

### Ключевые файлы конфигурации

#### nginx.conf

`/etc/nginx/nginx.conf` — главный конфигурационный файл Nginx. Он содержит глобальные директивы, влияющие на работу всего сервера. 

Пример структуры `nginx.conf`:

```
# Глобальные настройки производительности
worker_processes  auto;

events {
    worker_connections  1024;
}

http {
    # MIME-типы и кодировки
    include       mime.types;
    default_type  application/octet-stream;

    # Логирование
    access_log  /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log;

    # Виртуальные хосты
    include  /etc/nginx/conf.d/*.conf;
    include  /etc/nginx/sites-enabled/*;

    server {
        # Настройки сервера по умолчанию
        listen       80;
        server_name  localhost;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
    }
}
```

#### mime.types

`/etc/nginx/mime.types` — файл, содержащий список соответствий расширений файлов и MIME-типов. Nginx использует эту информацию для корректной обработки и передачи файлов клиентам.

Файл `mime.types` содержит строки вида:

```
text/html                             html htm shtml;
text/css                              css;
```

#### conf.d/*.conf

Директория `/etc/nginx/conf.d/` предназначена для хранения дополнительных конфигурационных файлов. Обычно в этой директории хранятся настройки, не связанные с виртуальными хостами, например, конфигурация модулей.

##### Пример создания файла в `conf.d`:

1. Создайте файл `gzip.conf` в директории `/etc/nginx/conf.d/`:

```bash
sudo nano /etc/nginx/conf.d/gzip.conf
```

2. Добавьте в файл настройки сжатия Gzip:

```
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss text/javascript;
```

3. Сохраните файл и перезапустите Nginx:

```bash
sudo systemctl restart nginx
```

#### sites-available/ и sites-enabled/

Директории `/etc/nginx/sites-available/` и `/etc/nginx/sites-enabled/` используются для управления виртуальными хостами. 

* **`/etc/nginx/sites-available/`**: Хранит конфигурационные файлы всех доступных виртуальных хостов.
* **`/etc/nginx/sites-enabled/`**: Содержит символические ссылки на файлы конфигурации активных виртуальных хостов. 

Такая структура упрощает активацию/деактивацию виртуальных хостов без необходимости удаления или переименования файлов.

##### Создание и активация виртуального хоста:

1. Создайте файл конфигурации виртуального хоста в `/etc/nginx/sites-available/`:

```bash
sudo nano /etc/nginx/sites-available/example.com.conf
```

2. Добавьте конфигурацию виртуального хоста:

```
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

3. Создайте символическую ссылку для активации виртуального хоста:

```bash
sudo ln -s /etc/nginx/sites-available/example.com.conf /etc/nginx/sites-enabled/
```

4. Перезапустите Nginx:

```bash
sudo systemctl restart nginx
```

### Структура конфигурационного файла виртуального хоста

Конфигурационный файл виртуального хоста обычно содержит следующие директивы:

* **`listen`**: Указывает IP-адрес и порт, на котором будет прослушиваться виртуальный хост.
* **`server_name`**:  Определяет доменное имя (или имена) виртуального хоста.
* **`root`**: Указывает корневую директорию сайта для виртуального хоста.
* **`index`**:  Список файлов, которые Nginx будет искать в корневой директории при запросе директории.
* **`location`**:  Позволяет настраивать обработку запросов к определенным URL-адресам.

### Заключение

Знание структуры папок и файлов конфигурации Nginx является важной частью администрирования веб-сервера. Используя  описанные  директории и файлы, вы можете гибко настраивать Nginx под  потребности  ваших  сайтов и  приложений.  
