## Установка MongoDB

Данный раздел содержит пошаговую инструкцию по установке MongoDB Community Edition версии 7.0 на операционные системы Windows, macOS и Linux.

### Установка MongoDB на Windows

1. **Скачивание дистрибутива:**
   - Перейдите на страницу загрузки MongoDB Community Server: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Выберите версию **7.0** и вашу версию Windows (64-bit или 32-bit).
   - Нажмите кнопку "Download".

2. **Запуск установщика:**
   - Запустите скачанный `.msi` файл.
   - Следуйте инструкциям мастера установки. 
   - Вы можете выбрать "Complete" для установки всех компонентов или "Custom" для выбора конкретных компонентов.

3. **Настройка MongoDB как сервиса (опционально):**
   - Во время установки вы можете выбрать опцию "Install MongoDB as a Service". 
   - Это позволит MongoDB запускаться автоматически при старте системы.

4. **Запуск MongoDB:**
   - Откройте командную строку и введите:
     ```
     net start MongoDB
     ```
   - Если MongoDB установлен как сервис, он запустится автоматически.

### Установка MongoDB на macOS

1. **Установка с помощью Homebrew (рекомендуется):**
   - Установите Homebrew, если он еще не установлен: [https://brew.sh/](https://brew.sh/)
   - Обновите Homebrew:
     ```
     brew update
     ```
   - Установите MongoDB:
     ```
     brew install mongodb-community@7.0
     ```

2. **Запуск MongoDB:**
   - Запустите службу MongoDB:
     ```
     brew services start mongodb-community@7.0
     ```

### Установка MongoDB на Linux (Ubuntu/Debian)

1. **Импорт публичного ключа GPG:**
   ```
   wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
   ```

2. **Добавление репозитория MongoDB:**
   ```
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```

3. **Обновление списка пакетов:**
   ```
   sudo apt-get update
   ```

4. **Установка пакета MongoDB:**
   ```
   sudo apt-get install -y mongodb-org
   ```

5. **Запуск и проверка статуса MongoDB:**
   ```
   sudo systemctl start mongod
   sudo systemctl status mongod
   ```

### Подключение к MongoDB

После успешной установки MongoDB, вы можете подключиться к серверу базы данных с помощью клиента MongoDB Shell:

1. **Запустите MongoDB Shell:**
   - Откройте командную строку (Windows) или терминал (macOS, Linux).
   - Введите команду:
     ```
     mongo
     ```

2. **Проверка подключения:**
   - Вы должны увидеть приветственное сообщение MongoDB Shell и информацию о подключении к серверу.

### Создание базы данных и коллекции

1. **Создание базы данных:**
   - Используйте команду `use`, чтобы создать новую базу данных (если она не существует) и переключиться на нее:
     ```
     use mydatabase
     ```

2. **Создание коллекции:**
   - Создайте коллекцию с помощью команды `db.createCollection()`:
     ```
     db.createCollection("mycollection")
     ```

### Заключение

В этом разделе были рассмотрены шаги по установке MongoDB Community Edition 7.0 на Windows, macOS и Linux. Вы также научились подключаться к серверу MongoDB, создавать базы данных и коллекции. В следующих разделах руководства будут подробно рассмотрены другие аспекты работы с MongoDB, такие как типы данных, запросы и агрегация. 
