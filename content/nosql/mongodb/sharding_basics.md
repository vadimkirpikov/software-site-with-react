## Шардинг в MongoDB: Основы

Шардинг - это метод горизонтального масштабирования в MongoDB, который позволяет распределить данные коллекции по нескольким серверам (шардам). Это особенно полезно при работе с большими объёмами данных и высокой нагрузкой, так как позволяет:

* **Горизонтально масштабировать чтение и запись:** запросы распределяются по нескольким серверам, что увеличивает общую пропускную способность системы.
* **Обеспечивать высокую доступность:** при выходе из строя одного шарда, данные остаются доступными на других.
* **Размещать данные ближе к пользователям:** шарды можно размещать в разных географических точках, сокращая задержки при обращении к данным.

### Архитектура шардированного кластера MongoDB

Шардированный кластер MongoDB состоит из трёх основных компонентов:

| Компонент | Описание |
|---|---|
| **Shard** | Сервер MongoDB, хранящий часть данных шардированной коллекции. |
| **Mongos** | Маршрутизатор запросов, который получает запросы от клиента и перенаправляет их на соответствующие шарды. |
| **Config Server** | Хранит метаданные о кластере, включая информацию о шардах, диапазонах ключей шардирования и конфигурации маршрутизации. |

### Ключ шардирования

Ключ шардирования - это поле или набор полей документа, используемый для распределения данных по шардам. Выбор правильного ключа шардирования очень важен для равномерного распределения нагрузки и избежания узких мест.

### Процесс шардирования

1. **Создание шардированного кластера:** необходимо развернуть и настроить серверы конфигурации, mongos и шарды.
2. **Выбор ключа шардирования:** определите поле или набор полей, которые будут использоваться для распределения данных.
3. **Включение шардирования для коллекции:** укажите ключ шардирования для коллекции, которую нужно шардировать.
4. **Добавление шардов:** по мере роста объёма данных и нагрузки можно добавлять новые шарды в кластер.

### Пример: Создание шардированного кластера

#### Шаг 1: Запуск серверов конфигурации

Запустите три сервера конфигурации с использованием команды `mongod`:

```
mongod --configsvr --dbpath /data/cfg1 --port 27017
mongod --configsvr --dbpath /data/cfg2 --port 27018
mongod --configsvr --dbpath /data/cfg3 --port 27019
```

#### Шаг 2: Запуск сервера mongos

Запустите сервер mongos, указав строку подключения к серверам конфигурации:

```
mongos --configdb "localhost:27017,localhost:27018,localhost:27019" --port 27017
```

#### Шаг 3: Запуск шардов

Запустите два шарда с использованием команды `mongod`:

```
mongod --shardsvr --port 27018 --dbpath /data/shard1
mongod --shardsvr --port 27019 --dbpath /data/shard2
```

#### Шаг 4: Подключение к серверу mongos

Подключитесь к серверу mongos с помощью клиента MongoDB:

```
mongo --port 27017
```

#### Шаг 5: Добавление шардов в кластер

Добавьте шарды в кластер с помощью команды `sh.addShard()`:

```javascript
sh.addShard( "localhost:27018" )
sh.addShard( "localhost:27019" )
```

#### Шаг 6: Включение шардирования для коллекции

Включите шардирование для коллекции `users`, указав ключ шардирования `_id`:

```javascript
sh.enableSharding("test")
sh.shardCollection("test.users", { "_id": 1 })
```

Теперь коллекция `users` будет шардирована по ключу `_id`, а данные будут распределены между двумя шардами.

### Заключение

Шардинг - мощный инструмент для масштабирования MongoDB, который позволяет обрабатывать большие объёмы данных и высокую нагрузку. Выбор правильного ключа шардирования и понимание архитектуры шардированного кластера являются критически важными факторами для успешной реализации шардинга. 