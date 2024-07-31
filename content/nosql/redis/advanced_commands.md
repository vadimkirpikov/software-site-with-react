## Расширенные возможности команд Redis

В предыдущих разделах мы рассмотрели основы работы с Redis, включая базовые команды для хранения и извлечения данных. В этом разделе мы углубимся в более продвинутые команды, которые открывают новые возможности для работы с данными и оптимизации приложений.

### 1. Списки (Lists)

Списки в Redis – это упорядоченные коллекции элементов, позволяющие хранить данные в последовательности. Для работы со списками используются следующие команды:

* **`LPUSH key value [value ...]`**: Добавляет один или несколько элементов в начало списка.
* **`RPUSH key value [value ...]`**: Добавляет один или несколько элементов в конец списка.
* **`LPOP key`**: Извлекает и удаляет первый элемент из списка.
* **`RPOP key`**: Извлекает и удаляет последний элемент из списка.
* **`LRANGE key start stop`**: Возвращает диапазон элементов из списка по индексу, включая `start` и `stop`.
* **`LINDEX key index`**: Возвращает элемент списка по индексу.
* **`LLEN key`**: Возвращает количество элементов в списке.

**Пример:**

```python
# Создание списка "my_list" с тремя элементами
redis.lpush("my_list", "banana", "apple", "orange")

# Добавление нового элемента в начало списка
redis.lpush("my_list", "mango")

# Вывод всех элементов списка
print(redis.lrange("my_list", 0, -1)) # ['mango', 'banana', 'apple', 'orange']

# Извлечение и удаление первого элемента
print(redis.lpop("my_list")) # 'mango'

# Получение элемента по индексу
print(redis.lindex("my_list", 1)) # 'banana'

# Вывод количества элементов в списке
print(redis.llen("my_list")) # 3
```

### 2. Множества (Sets)

Множества в Redis – это неупорядоченные коллекции уникальных элементов. Команды для работы с множествами:

* **`SADD key member [member ...]`**: Добавляет один или несколько элементов в множество.
* **`SMEMBERS key`**: Возвращает все элементы множества.
* **`SISMEMBER key member`**: Проверяет, существует ли элемент в множестве.
* **`SREM key member [member ...]`**: Удаляет один или несколько элементов из множества.
* **`SCARD key`**: Возвращает количество элементов в множестве.
* **`SUNION key1 [key2 ...]`**: Возвращает объединение множеств.
* **`SINTER key1 [key2 ...]`**: Возвращает пересечение множеств.
* **`SDIFF key1 [key2 ...]`**: Возвращает разность множеств.

**Пример:**

```python
# Создание множеств "fruits" и "vegetables"
redis.sadd("fruits", "apple", "banana", "orange")
redis.sadd("vegetables", "carrot", "tomato", "onion")

# Проверка, есть ли элемент "apple" в множестве "fruits"
print(redis.sismember("fruits", "apple")) # True

# Добавление элемента "kiwi" в множество "fruits"
redis.sadd("fruits", "kiwi")

# Получение всех элементов множества "fruits"
print(redis.smembers("fruits")) # {'orange', 'kiwi', 'banana', 'apple'}

# Получение объединения множеств "fruits" и "vegetables"
print(redis.sunion("fruits", "vegetables")) # {'orange', 'kiwi', 'banana', 'apple', 'carrot', 'tomato', 'onion'}

# Получение пересечения множеств "fruits" и "vegetables"
print(redis.sinter("fruits", "vegetables")) # set()

# Получение разности множеств "fruits" и "vegetables"
print(redis.sdiff("fruits", "vegetables")) # {'orange', 'kiwi', 'banana', 'apple'}
```

### 3. Словари (Hashes)

Словари в Redis позволяют хранить пары ключ-значение. Команды для работы со словарями:

* **`HSET key field value`**: Устанавливает значение для поля в словаре.
* **`HGET key field`**: Возвращает значение поля в словаре.
* **`HGETALL key`**: Возвращает все пары ключ-значение словаря.
* **`HDEL key field [field ...]`**: Удаляет одно или несколько полей из словаря.
* **`HEXISTS key field`**: Проверяет, существует ли поле в словаре.
* **`HKEYS key`**: Возвращает все ключи словаря.
* **`HVALS key`**: Возвращает все значения словаря.

**Пример:**

```python
# Создание словаря "user"
redis.hset("user", "name", "John Doe")
redis.hset("user", "age", 30)
redis.hset("user", "city", "New York")

# Получение значения поля "name"
print(redis.hget("user", "name")) # John Doe

# Получение всех пар ключ-значение словаря "user"
print(redis.hgetall("user")) # {'name': 'John Doe', 'age': 30, 'city': 'New York'}

# Удаление поля "age"
redis.hdel("user", "age")

# Проверка, существует ли поле "age"
print(redis.hexists("user", "age")) # False
```

### 4. Сортированные множества (Sorted Sets)

Сортированные множества – это неупорядоченные коллекции уникальных элементов, но с добавлением значения "score" для каждого элемента, которое используется для сортировки. Команды для работы сортированными множествами:

* **`ZADD key score member [score member ...]`**: Добавляет один или несколько элементов в множество.
* **`ZRANGE key start stop [WITHSCORES]`**: Возвращает диапазон элементов по "score", включая `start` и `stop`.
* **`ZSCORE key member`**: Возвращает "score" элемента.
* **`ZREM key member [member ...]`**: Удаляет один или несколько элементов из множества.
* **`ZCARD key`**: Возвращает количество элементов в множестве.
* **`ZRANK key member`**: Возвращает ранг элемента в множестве по "score".

**Пример:**

```python
# Создание сортированного множества "products"
redis.zadd("products", 10.5, "apple", 5.9, "banana", 7.2, "orange")

# Получение всех элементов множества "products" по "score"
print(redis.zrange("products", 0, -1, withscores=True)) # [('banana', 5.9), ('orange', 7.2), ('apple', 10.5)]

# Получение "score" элемента "apple"
print(redis.zscore("products", "apple")) # 10.5

# Получение ранга элемента "apple"
print(redis.zrank("products", "apple")) # 2

# Удаление элемента "banana" из множества "products"
redis.zrem("products", "banana")
```

### 5. Встроенные функции Lua

Redis поддерживает выполнение Lua-скриптов, которые могут выполняться непосредственно на сервере Redis. Это позволяет создавать более сложные операции, которые не могут быть реализованы с помощью стандартных команд.

**Пример:**

```python
# Создание Lua-скрипта, который увеличивает значение счетчика на 1
lua_script = """
local key = KEYS[1]
local count = redis.call('INCR', key)
return count
"""

# Загрузка скрипта в Redis
script_hash = redis.script_load(lua_script)

# Выполнение скрипта с ключом "counter"
print(redis.evalsha(script_hash, 1, "counter")) # 1
print(redis.evalsha(script_hash, 1, "counter")) # 2
```

### 6. Публикация и подписка (Pub/Sub)

Система публикации и подписки (Pub/Sub) в Redis позволяет приложениям обмениваться сообщениями в реальном времени.

* **`PUBLISH channel message`**: Публикует сообщение на канал.
* **`SUBSCRIBE channel [channel ...]`**: Подписывается на один или несколько каналов.
* **`UNSUBSCRIBE channel [channel ...]`**: Отписывается от одного или нескольких каналов.

**Пример:**

```python
# Создание двух процессов: один для публикации, другой для подписки

# Процесс для публикации
redis.publish("news", "Breaking news!")

# Процесс для подписки
pubsub = redis.pubsub()
pubsub.subscribe("news")
for message in pubsub.listen():
    if message['type'] == 'message':
        print(message['data']) # Breaking news!
```

### 7. Транзакции

Redis поддерживает атомарные операции для выполнения нескольких команд в одной транзакции. Это гарантирует, что все команды будут выполнены успешно или не будут выполнены вовсе.

* **`MULTI`**: Начинает транзакцию.
* **`EXEC`**: Выполняет все команды в транзакции.
* **`DISCARD`**: Отменяет транзакцию.
* **`WATCH key [key ...]`**: Наблюдает за одним или несколькими ключами.

**Пример:**

```python
# Создание транзакции для обновления двух ключей
redis.multi()
redis.hset("user", "name", "Jane Doe")
redis.hincrby("user", "age", 1)
redis.exec()
```

### 8. Потоки (Streams)

Потоки в Redis позволяют создавать и потреблять сообщения, упорядоченные по времени.

* **`XADD key ID field value [field value ...]`**: Добавляет сообщение в поток.
* **`XREAD BLOCK milliseconds STREAMS key ID`**: Читает сообщения из потока.
* **`XGROUP CREATE key group consumer ID`**: Создает группу потребителей.
* **`XGROUP SETID key group ID`**: Устанавливает идентификатор последнего обработанного сообщения для группы потребителей.

**Пример:**

```python
# Создание потока "chat"
redis.xadd("chat", "*", "user", "John Doe", "message", "Hello")

# Создание группы потребителей "group1"
redis.xgroup_create("chat", "group1", "$", True)

# Чтение сообщений из потока "chat" для группы "group1"
for message in redis.xread(block=0, streams=["chat", "0-0"]):
    print(message)
```

### 9. Срок действия ключей

Redis позволяет устанавливать время жизни ключей, после которого они будут автоматически удалены.

* **`EXPIRE key seconds`**: Устанавливает время жизни ключа в секундах.
* **`TTL key`**: Возвращает оставшееся время жизни ключа в секундах.
* **`PERSIST key`**: Удаляет время жизни ключа.

**Пример:**

```python
# Установка времени жизни ключа "my_key" в 10 секунд
redis.expire("my_key", 10)

# Получение оставшегося времени жизни ключа "my_key"
print(redis.ttl("my_key")) # 9

# Удаление времени жизни ключа "my_key"
redis.persist("my_key")
```

### 10. Поддержка JSON

Redis 7.2.0 предоставляет встроенную поддержку JSON, позволяющую хранить и извлекать JSON-данные с помощью новых команд:

* **`JSON.SET key path value`**: Задает значение по указанному пути в JSON-документе.
* **`JSON.GET key path`**: Возвращает значение по указанному пути в JSON-документе.
* **`JSON.DEL key path`**: Удаляет значение по указанному пути в JSON-документе.
* **`JSON.ARRAPPEND key path value [value ...]`**: Добавляет один или несколько элементов в массив.
* **`JSON.ARRLEN key path`**: Возвращает длину массива.

**Пример:**

```python
# Создание JSON-документа
redis.json_set("user", ".", {"name": "John Doe", "age": 30})

# Получение значения поля "name"
print(redis.json_get("user", ".name")) # John Doe

# Удаление поля "age"
redis.json_del("user", ".age")

# Добавление элемента "banana" в массив ".fruits"
redis.json_arrappend("user", ".fruits", "banana")
```

### Выводы

В этом разделе мы рассмотрели расширенные возможности команд Redis, позволяющие реализовать более сложные сценарии и оптимизировать работу с данными. Используйте эти команды для создания эффективных и масштабируемых приложений, используя весь потенциал Redis.
