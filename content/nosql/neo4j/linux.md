## Установка Neo4j на Linux

Данный раздел посвящен установке Neo4j на Linux. Мы рассмотрим различные варианты установки, включая использование пакетов и ручную сборку. 

### 1. Установка с помощью пакетов

Самый простой способ установки Neo4j на Linux - это использование пакетов, доступных в репозиториях дистрибутива. 

#### 1.1 Ubuntu/Debian

Для установки Neo4j на Ubuntu/Debian, используйте следующие команды:

```bash
sudo apt update
sudo apt install neo4j
```

#### 1.2 Fedora/CentOS/RHEL

Для установки Neo4j на Fedora/CentOS/RHEL, используйте следующие команды:

```bash
sudo dnf update
sudo dnf install neo4j
```

#### 1.3  Другие дистрибутивы

Для других дистрибутивов, проверьте документацию по установке Neo4j на сайте [https://neo4j.com/](https://neo4j.com/).

### 2. Ручная установка

Если вам нужна более гибкая установка, вы можете установить Neo4j вручную.

#### 2.1 Загрузка Neo4j

Загрузите Neo4j с официального сайта [https://neo4j.com/](https://neo4j.com/) в формате `.tar.gz`. 

#### 2.2 Распаковка архива

Распакуйте архив в директорию по вашему выбору. Например:

```bash
tar -xvzf neo4j-community-5.6.0.tar.gz -C /opt/
```

#### 2.3 Настройка Neo4j

Перейдите в директорию установки Neo4j и настройте конфигурационные файлы:

```bash
cd /opt/neo4j-community-5.6.0
```

#### 2.4 Настройка конфигурации

Отредактируйте файл `conf/neo4j.conf` и настройте следующие параметры:

* **dbms.active_database**: Укажите имя базы данных, которую вы хотите использовать.
* **dbms.connector.bolt.listen_address**: Укажите адрес, на котором Neo4j будет слушать запросы Bolt.
* **dbms.connector.http.listen_address**: Укажите адрес, на котором Neo4j будет слушать HTTP-запросы.
* **dbms.security.auth_enabled**: Укажите, требуется ли аутентификация для доступа к Neo4j.

Пример настроек:

```
dbms.active_database=graph.db
dbms.connector.bolt.listen_address=0.0.0.0
dbms.connector.http.listen_address=0.0.0.0
dbms.security.auth_enabled=false
```

#### 2.5 Запуск Neo4j

Запустите Neo4j с помощью следующей команды:

```bash
./bin/neo4j start
```

#### 2.6 Проверка запуска

Проверьте, что Neo4j запущен, используя команду:

```bash
./bin/neo4j status
```

### 3. Безопасность

По умолчанию Neo4j не защищен от несанкционированного доступа. Для обеспечения безопасности, рекомендуется:

* **Включить аутентификацию**: Установите `dbms.security.auth_enabled=true` в файле `neo4j.conf`.
* **Создать пользователей**: Создайте пользователей с разными уровнями доступа.
* **Использовать SSL**: Настройте SSL-соединение для защиты трафика между клиентами и сервером.

### 4. Заключение

В данной статье мы рассмотрели два способа установки Neo4j на Linux: с использованием пакетов и ручную установку. Выбор способа установки зависит от ваших предпочтений и потребностей. 

Не забывайте о безопасности и настройке Neo4j для защиты от несанкционированного доступа. 