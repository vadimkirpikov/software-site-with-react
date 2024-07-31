## Настройка логирования запросов и ошибок в nginx

Логирование — неотъемлемая часть работы любого веб-сервера, и nginx не исключение.  Правильная настройка логирования позволяет отслеживать ошибки, анализировать поведение пользователей и выявлять узкие места в производительности. 

### Основные параметры лог-файлов

Конфигурация логирования nginx осуществляется в основном конфигурационном файле **nginx.conf** или в конфигурационных файлах виртуальных хостов. Ключевые директивы для настройки логирования:

* **error_log**: Задает файл для записи ошибок. 
* **access_log**: Задает файл для записи логов доступа.
* **log_format**: Определяет формат записи логов.

### Уровни логирования ошибок

Директива **error_log** принимает два параметра: путь к файлу лога и уровень логирования.  Доступны следующие уровни:

| Уровень      | Описание                                                                                                       |
|--------------|----------------------------------------------------------------------------------------------------------------|
| debug        | Наиболее подробный уровень, используется для отладки.                                                        |
| info         | Информационные сообщения, например, запуск и остановка сервера.                                                 |
| notice       | Важные события, требующие внимания, но не являющиеся ошибками.                                             |
| warn         | Предупреждения о потенциальных проблемах.                                                                   |
| error        | Ошибки, которые не позволили выполнить запрос.                                                                |
| crit         | Критические ошибки, приводящие к остановке работы nginx.                                                       |
| alert        | Сообщения, требующие немедленного вмешательства.                                                              |
| emerg        | Аварийные сообщения, означающие, что система находится в неработоспособном состоянии.                       |

**Пример**: 

```nginx
error_log /var/log/nginx/error.log warn;
```

Этот код настроит запись ошибок уровня `warn` и выше в файл `/var/log/nginx/error.log`.

### Форматы логов доступа

Директива **log_format** определяет, какая информация будет записываться в лог-файлы. Она принимает два параметра: имя формата и строку формата, содержащую переменные nginx.

**Пример**:

```nginx
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
```
Этот код определяет формат лога `main`.  

В строке формата используются следующие переменные:

* `$remote_addr` - IP-адрес клиента.
* `$remote_user` - Имя авторизованного пользователя.
* `$time_local` - Локальное время сервера.
* `$request` - Строка запроса.
* `$status` - Код ответа сервера.
* `$body_bytes_sent` - Размер тела ответа в байтах.
* `$http_referer` - URL, с которого был выполнен переход.
* `$http_user_agent` - User-Agent браузера.
* `$http_x_forwarded_for` - Значение заголовка X-Forwarded-For.

### Применение формата лога

Чтобы применить созданный формат лога, его нужно указать в директиве **access_log**.

**Пример**:

```nginx
access_log /var/log/nginx/access.log main;
```

Этот код настроит запись логов доступа в файл `/var/log/nginx/access.log` с использованием формата `main`.

### Раздельное логирование по виртуальным хостам

nginx позволяет настраивать логирование отдельно для каждого виртуального хоста. Это удобно, если на одном сервере размещено несколько сайтов.

**Пример**:

```nginx
server {
    listen 80;
    server_name example.com;
    access_log /var/log/nginx/example.com.access.log main;
    error_log /var/log/nginx/example.com.error.log warn;
    # ... другие настройки виртуального хоста
}
```

В этом примере лог-файлы для сайта `example.com` будут сохраняться в отдельных файлах.

### Логирование ошибок PHP

Для логирования ошибок PHP в nginx используется директива **fastcgi_param** внутри блока `location`.

**Пример**:

```nginx
location ~ \.php$ {
    # ... другие настройки PHP
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    fastcgi_param  PHP_VALUE  "error_log=/var/log/php/example.com.error.log";
    fastcgi_pass   unix:/var/run/php/php7.4-fpm.sock; 
}
```

Этот код настроит запись ошибок PHP в файл `/var/log/php/example.com.error.log`.

###  Ротация лог-файлов

Лог-файлы nginx могут быстро разрастаться, занимая много места на диске. Для управления размером лог-файлов используется утилита **logrotate**. Она позволяет настраивать автоматическую ротацию и сжатие лог-файлов. 

### Заключение

Правильная настройка логирования в nginx - важный аспект обеспечения безопасности, анализа производительности и  успешного функционирования веб-сервера. Используйте представленные в этой статье рекомендации для настройки логирования в соответствии с вашими потребностями.