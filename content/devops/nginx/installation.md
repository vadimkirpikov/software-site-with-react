## Установка Nginx

Nginx – это популярный высокопроизводительный веб-сервер и обратный прокси-сервер.  В данном разделе мы рассмотрим процесс установки Nginx на различные операционные системы.

### Установка Nginx на Ubuntu/Debian

1. **Обновление системы:**

    Перед установкой любого нового программного обеспечения рекомендуется обновить список пакетов и саму систему. Используйте следующие команды:

    ```bash
    sudo apt update
    sudo apt upgrade -y
    ```

2. **Установка Nginx:**

    Установите Nginx, используя менеджер пакетов `apt`:

    ```bash
    sudo apt install nginx -y
    ```

3. **Проверка установки:**

    После завершения установки проверьте, запущен ли Nginx, используя команду:

    ```bash
    systemctl status nginx
    ```

    Если Nginx запущен, вы увидите статус `active (running)`. Вы также можете проверить работу Nginx, открыв в веб-браузере адрес `http://localhost/`.  Вы должны увидеть страницу приветствия Nginx по умолчанию.

### Установка Nginx на CentOS/RHEL

1. **Обновление системы:**

    Как и в случае с Ubuntu, рекомендуется обновить систему перед установкой Nginx:

    ```bash
    sudo yum update -y
    ```

2. **Установка Nginx:**

    Установите Nginx, используя менеджер пакетов `yum`:

    ```bash
    sudo yum install nginx -y
    ```

3. **Запуск и проверка Nginx:**

    После установки запустите Nginx и добавьте его в автозагрузку:

    ```bash
    sudo systemctl start nginx
    sudo systemctl enable nginx
    ```

    Проверьте статус Nginx:

    ```bash
    systemctl status nginx
    ```

    Как и в случае с Ubuntu, вы должны увидеть статус `active (running)`. Проверьте работу Nginx, открыв в браузере `http://localhost/`.

### Установка Nginx из исходного кода

Установка Nginx из исходного кода предоставляет больше контроля над процессом и позволяет настроить параметры сборки.

1. **Установка зависимостей:**

    Установите необходимые пакеты для сборки Nginx:

    ```bash
    sudo apt update  # Для Ubuntu/Debian
    sudo yum update -y  # Для CentOS/RHEL

    sudo apt install build-essential libpcre3 libpcre3-dev zlib1g-dev libssl-dev -y  # Для Ubuntu/Debian
    sudo yum install gcc pcre-devel zlib-devel openssl-devel -y  # Для CentOS/RHEL
    ```

2. **Загрузка исходного кода:**

    Скачайте последнюю стабильную версию Nginx с официального сайта:

    ```bash
    wget http://nginx.org/download/nginx-1.23.2.tar.gz  # Замените на актуальную версию
    ```

3. **Распаковка архива:**

    Распакуйте загруженный архив:

    ```bash
    tar -xzvf nginx-1.23.2.tar.gz
    ```

4. **Конфигурация и сборка:**

    Перейдите в директорию с исходным кодом и настройте Nginx с помощью скрипта `configure`:

    ```bash
    cd nginx-1.23.2
    ./configure 
    ```

    Вы можете добавить опции к `./configure` для настройки сборки, например, указать директорию установки. 

    После настройки соберите Nginx:

    ```bash
    make
    ```

5. **Установка:**

    Установите Nginx:

    ```bash
    sudo make install
    ```

6. **Создание ссылок и запуск:**

    Создайте символические ссылки для запуска Nginx:

    ```bash
    sudo ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/
    sudo ln -s /usr/local/nginx/sbin/nginx /usr/sbin/
    ```

    Запустите Nginx:

    ```bash
    sudo nginx
    ```

7. **Проверка установки:**

    Проверьте работу Nginx, открыв в браузере `http://localhost/`.

### Управление сервисом Nginx

После установки Nginx вы можете управлять им с помощью systemd:

| Команда                  | Описание                       |
|--------------------------|--------------------------------|
| `sudo systemctl start nginx` | Запустить Nginx                 |
| `sudo systemctl stop nginx`  | Остановить Nginx                |
| `sudo systemctl restart nginx` | Перезапустить Nginx              |
| `sudo systemctl reload nginx` | Перезагрузить конфигурацию Nginx |
| `sudo systemctl status nginx` | Проверить статус Nginx          |
| `sudo systemctl enable nginx` | Добавить Nginx в автозагрузку  |
| `sudo systemctl disable nginx` | Удалить Nginx из автозагрузки |

Это основные шаги по установке Nginx на различные операционные системы. В следующих разделах мы рассмотрим более подробно конфигурацию и использование Nginx. 
