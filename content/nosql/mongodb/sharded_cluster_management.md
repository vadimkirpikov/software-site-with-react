## Управление данными в шардированном кластере MongoDB

Шардирование в MongoDB — это метод горизонтального масштабирования, который позволяет распределять данные по нескольким серверам (шардам). Это повышает производительность, емкость и доступность базы данных. Данная статья описывает основные аспекты управления данными в шардированном кластере MongoDB 7.0. 

### Ключевые компоненты шардированного кластера:

**Shard:** Сервер, хранящий подмножество данных. Каждый шард функционирует как независимый репликационный набор, обеспечивая отказоустойчивость.

**Mongos:** Маршрутизатор запросов. Mongos получает запросы от клиентов, определяет, к какому шарду обратиться, и направляет запрос на соответствующий сервер.

**Config server:** Хранит метаданные кластера, такие как схема шардирования и расположение шардов.

### Шардирование данных:

Шардирование данных осуществляется с помощью ключа шардирования (shard key). Ключ шардирования — это поле или набор полей документа, используемый для разделения данных по шардам. 

**Выбор ключа шардирования:**

Правильный выбор ключа шардирования критически важен для производительности и масштабируемости кластера.  При выборе ключа шардирования необходимо учитывать следующие факторы:

* **Равномерное распределение данных:** Ключ шардирования должен обеспечивать равномерное распределение данных по шардам, чтобы избежать перегрузки отдельных серверов.
* **Частота запросов:** Ключ шардирования должен соответствовать наиболее частым запросам, чтобы минимизировать количество шардов, к которым обращается запрос.
* **Операции записи:** Ключ шардирования должен учитывать характер операций записи, чтобы избежать частой миграции данных между шардами.

### Создание шардированного кластера:

Рассмотрим процесс создания простого шардированного кластера, состоящего из одного шарда:

1. **Запустите три сервера config server:**

   ```bash
   mongod --configsvr --dbpath /data/configdb --port 27019 --replSet cfg
   mongod --configsvr --dbpath /data/configdb-1 --port 27020 --replSet cfg
   mongod --configsvr --dbpath /data/configdb-2 --port 27021 --replSet cfg
   ```

2. **Инициализируйте репликационный набор config server:**

   ```javascript
   // Подключитесь к одному из узлов config server
   const conn = new Mongo("localhost:27019");

   // Инициализируйте репликационный набор
   rs.initiate({
     _id: "cfg",
     members: [
       { _id: 0, host: "localhost:27019" },
       { _id: 1, host: "localhost:27020" },
       { _id: 2, host: "localhost:27021" }
     ]
   });
   ```

3. **Запустите сервер mongos:**

   ```bash
   mongos --configdb cfg/localhost:27019,localhost:27020,localhost:27021 --port 27017
   ```

4. **Запустите сервер shard:**

   ```bash
   mongod --shardsvr --dbpath /data/shard1 --port 27018 --replSet shard1
   ```

5. **Подключитесь к mongos и добавьте shard:**

   ```javascript
   // Подключитесь к mongos
   const mongosConn = new Mongo("localhost:27017");

   // Добавьте shard
   sh.addShard("shard1/localhost:27018");
   ```

### Шардирование коллекции:

После создания кластера необходимо указать, какие коллекции будут шардированы.

**Пример:**

```javascript
// Подключитесь к mongos
const mongosConn = new Mongo("localhost:27017");

// Укажите ключ шардирования
sh.enableSharding("test"); 
sh.shardCollection("test.users", { "_id": "hashed" });
```

В данном примере мы шардируем коллекцию "users" в базе данных "test" с использованием хешированного ключа "_id".

### Балансировка данных:

MongoDB автоматически балансирует данные между шардами, перемещая чанки (диапазоны данных) с перегруженных шардов на менее загруженные. Балансировщик можно настроить на основе различных параметров, таких как размер чанка и порог дисбаланса.

### Мониторинг шардированного кластера:

Для эффективного управления шардированным кластером необходимо отслеживать его производительность и состояние. MongoDB предоставляет различные инструменты для мониторинга, такие как:

* **Команды оболочки:** `sh.status()`, `db.serverStatus()`, `mongostat`.
* **MongoDB Compass:** Графический инструмент для управления и мониторинга кластеров MongoDB.
* **Сторонние инструменты мониторинга:** Datadog, New Relic, Prometheus.

### Резюме:

Шардирование в MongoDB — это мощный инструмент для масштабирования баз данных. Правильный выбор ключа шардирования, настройка балансировщика и использование инструментов мониторинга помогут обеспечить высокую производительность, емкость и доступность вашего приложения.