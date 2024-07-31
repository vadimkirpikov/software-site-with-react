## Установка и настройка веб-серверов

Веб-серверы являются основой интернета, обрабатывая запросы пользователей и предоставляя им доступ к веб-страницам. В Linux доступно множество веб-серверов, но наиболее популярными являются Apache и Nginx. В рамках этой статьи мы рассмотрим установку и базовую настройку этих серверов.

### Apache

Apache - это надежный и функциональный веб-сервер, который используется многими популярными сайтами. Он обладает широкими возможностями настройки и поддерживает множество модулей. 

#### Установка Apache

Для установки Apache в Debian/Ubuntu выполните следующие команды:

```bash
sudo apt update
sudo apt install apache2
```

Для установки Apache в CentOS/RHEL:

```bash
sudo yum update
sudo yum install httpd
```

#### Проверка установки

После установки Apache запустите сервер и проверьте его работоспособность:

```bash
sudo systemctl start apache2  # Debian/Ubuntu
sudo systemctl start httpd    # CentOS/RHEL
```

Откройте в браузере адрес `http://localhost/`. Вы должны увидеть страницу приветствия Apache.

#### Базовая настройка Apache

Конфигурационные файлы Apache обычно находятся в директории `/etc/apache2/` (Debian/Ubuntu) или `/etc/httpd/` (CentOS/RHEL). 

Основной конфигурационный файл - это `apache2.conf` (Debian/Ubuntu) или `httpd.conf` (CentOS/RHEL).  

##### Виртуальные хосты

Виртуальные хосты позволяют запускать несколько сайтов на одном сервере. Каждый виртуальный хост имеет свой собственный конфигурационный файл, который обычно располагается в `/etc/apache2/sites-available/` (Debian/Ubuntu) или `/etc/httpd/conf.d/` (CentOS/RHEL).

Пример конфигурации виртуального хоста:

```apache
<VirtualHost *:80>
    ServerName example.com
    ServerAlias www.example.com
    DocumentRoot /var/www/example.com/html
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

* **ServerName:**  указывает доменное имя сайта.
* **ServerAlias:**  указывает альтернативные доменные имена сайта.
* **DocumentRoot:**  указывает директорию, где хранятся файлы сайта.
* **ErrorLog:**  указывает файл для записи ошибок.
* **CustomLog:**  указывает файл для записи логов доступа.

##### Активация виртуального хоста

Для активации виртуального хоста используйте команду `a2ensite` (Debian/Ubuntu) или `ln -s` (CentOS/RHEL).

```bash
sudo a2ensite example.com   # Debian/Ubuntu
sudo ln -s /etc/httpd/conf.d/example.com.conf /etc/httpd/conf/httpd.conf  # CentOS/RHEL
```

##### Перезапуск Apache

После внесения изменений в конфигурацию Apache необходимо перезапустить сервер:

```bash
sudo systemctl restart apache2  # Debian/Ubuntu
sudo systemctl restart httpd    # CentOS/RHEL
```

### Nginx

Nginx - это высокопроизводительный веб-сервер, который также популярен благодаря своей легковесности и простоте настройки. 

#### Установка Nginx

Для установки Nginx в Debian/Ubuntu выполните следующие команды:

```bash
sudo apt update
sudo apt install nginx
```

Для установки Nginx в CentOS/RHEL:

```bash
sudo yum update
sudo yum install nginx
```

#### Проверка установки

После установки Nginx запустите сервер и проверьте его работоспособность:

```bash
sudo systemctl start nginx
```

Откройте в браузере адрес `http://localhost/`. Вы должны увидеть страницу приветствия Nginx.

#### Базовая настройка Nginx

Конфигурационные файлы Nginx обычно находятся в директории `/etc/nginx/`. 

Основной конфигурационный файл - это `nginx.conf`. 

##### Виртуальные хосты

Nginx также поддерживает виртуальные хосты. Конфигурация виртуальных хостов обычно хранится в отдельных файлах в директории `/etc/nginx/sites-available/` (Debian/Ubuntu) или `/etc/nginx/conf.d/` (CentOS/RHEL).

Пример конфигурации виртуального хоста:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com/html;

    location / {
        index index.html;
    }
}
```

* **listen:**  указывает порт, на котором сервер будет прослушивать запросы.
* **server_name:**  указывает доменное имя сайта.
* **root:**  указывает директорию, где хранятся файлы сайта.
* **location:**  позволяет настраивать обработку запросов к различным частям сайта.
* **index:**  указывает файл, который будет отображаться по умолчанию.

##### Активация виртуального хоста

Для активации виртуального хоста создайте символическую ссылку на файл конфигурации в директории `/etc/nginx/sites-enabled/`.

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

##### Перезапуск Nginx

После внесения изменений в конфигурацию Nginx необходимо перезапустить сервер:

```bash
sudo systemctl restart nginx
```

В этой статье мы рассмотрели базовые шаги по установке и настройке Apache и Nginx. Более подробную информацию о настройке этих серверов можно найти в документации на официальных сайтах. 
