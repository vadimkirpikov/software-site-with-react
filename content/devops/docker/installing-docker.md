## Установка Docker Engine

Docker Engine - ядро Docker, позволяющее создавать, запускать и управлять контейнерами. В этой части руководства мы рассмотрим процесс установки Docker Engine на операционные системы Ubuntu, Debian, CentOS и Fedora.

### Установка Docker Engine на Ubuntu и Debian

1. **Обновите список пакетов и установите зависимости:**

    ```bash
    sudo apt update
    sudo apt install -y ca-certificates curl gnupg lsb-release
    ```
    
2. **Добавьте GPG-ключ официального репозитория Docker:**

    ```bash
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    ```

3. **Добавьте репозиторий Docker в список источников приложений:**

    ```bash
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

4. **Обновите список пакетов и установите Docker Engine:**

    ```bash
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```

5. **Проверьте установку Docker Engine:**

    ```bash
    sudo docker run hello-world
    ```
    
    Эта команда загрузит тестовый образ "hello-world" и запустит его в контейнере. Если установка прошла успешно, вы увидите сообщение "Hello from Docker!".

### Установка Docker Engine на CentOS и Fedora

1. **Установите необходимые пакеты:**

    ```bash
    sudo yum install -y yum-utils
    ```

2. **Добавьте репозиторий Docker:**

    ```bash
    sudo yum-config-manager \
        --add-repo \
        https://download.docker.com/linux/centos/docker-ce.repo
    ```

3. **Установите Docker Engine:**

    ```bash
    sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```
    
4. **Запустите Docker Engine:**

    ```bash
    sudo systemctl start docker
    ```

5. **Добавьте Docker Engine в автозагрузку:**

    ```bash
    sudo systemctl enable docker
    ```

6. **Проверьте установку Docker Engine:**

    ```bash
    sudo docker run hello-world
    ```

### Управление Docker Engine

После установки Docker Engine вы можете управлять им с помощью команды `sudo docker`. 

Вот некоторые основные команды:

* `sudo docker version`: отображает информацию о версии Docker Engine
* `sudo docker ps`: отображает список запущенных контейнеров
* `sudo docker ps -a`: отображает список всех контейнеров (включая остановленные)
* `sudo docker stop <имя_контейнера>`: останавливает запущенный контейнер
* `sudo docker start <имя_контейнера>`: запускает остановленный контейнер
* `sudo docker restart <имя_контейнера>`: перезапускает контейнер
* `sudo docker kill <имя_контейнера>`: принудительно останавливает контейнер
* `sudo docker rm <имя_контейнера>`: удаляет контейнер

Более подробную информацию о командах Docker Engine вы можете найти в официальной документации: [https://docs.docker.com/engine/reference/commandline/](https://docs.docker.com/engine/reference/commandline/)

**Важно:** Для выполнения команд Docker Engine от имени обычного пользователя, добавьте его в группу `docker`. Для этого выполните команду `sudo usermod -aG docker $USER` и перезапустите сеанс (выйдите из системы и войдите снова).

В следующей части руководства мы рассмотрим основные понятия Docker, такие как образы, контейнеры и реестры.
