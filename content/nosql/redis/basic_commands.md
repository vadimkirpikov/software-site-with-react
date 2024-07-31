## Основные команды Redis

Redis - это высокопроизводительная система хранения данных в оперативной памяти, использующая ключ-значение. Она предоставляет различные типы данных,  что позволяет хранить информацию различного рода. В этом разделе мы рассмотрим основные команды Redis, которые помогут вам начать работу с этой системой. 

### Команды работы с ключами

* **EXISTS key:** Проверяет, существует ли ключ в базе данных. Возвращает `1`, если ключ существует, и `0` в противном случае.

  ```python
  # Проверка существования ключа 'mykey'
  redis.exists('mykey')
  ```

* **DEL key [key ...]**: Удаляет указанные ключи из базы данных. 

  ```python
  # Удаление ключа 'mykey'
  redis.delete('mykey')
  ```

* **TYPE key**: Возвращает тип данных, связанного с ключом. Возможные типы: `string`, `list`, `set`, `zset`, `hash`.

  ```python
  # Получение типа данных, связанного с ключом 'mykey'
  redis.type('mykey')
  ```

* **KEYS pattern**: Возвращает список ключей, соответствующих заданному шаблону. Шаблон может содержать символы `*` и `?`.

  ```python
  # Получение списка ключей, начинающихся с 'my'
  redis.keys('my*')
  ```

* **RENAME key newkey**: Переименовывает ключ.

  ```python
  # Переименование ключа 'oldkey' в 'newkey'
  redis.rename('oldkey', 'newkey')
  ```

* **MOVE key db**: Перемещает ключ в другую базу данных.

  ```python
  # Перемещение ключа 'mykey' в базу данных с номером 1
  redis.move('mykey', 1)
  ```

### Команды работы со строками

* **SET key value**: Записывает строку `value` по ключу `key`.

  ```python
  # Запись строки 'Hello world' по ключу 'mykey'
  redis.set('mykey', 'Hello world') 
  ```

* **GET key**: Возвращает значение, связанное с ключом `key`.

  ```python
  # Получение значения, связанного с ключом 'mykey'
  redis.get('mykey')
  ```

* **GETSET key value**: Записывает новое значение `value` по ключу `key` и возвращает предыдущее значение.

  ```python
  # Запись нового значения 'Goodbye world' по ключу 'mykey' и получение предыдущего значения
  redis.getset('mykey', 'Goodbye world')
  ```

* **APPEND key value**: Добавляет строку `value` в конец значения, связанного с ключом `key`.

  ```python
  # Добавление строки '!' в конец значения по ключу 'mykey'
  redis.append('mykey', '!')
  ```

* **STRLEN key**: Возвращает длину строки, связанной с ключом `key`.

  ```python
  # Получение длины строки, связанной с ключом 'mykey'
  redis.strlen('mykey')
  ```

* **SETNX key value**: Записывает строку `value` по ключу `key` только в том случае, если ключ не существует. Возвращает `1`, если запись прошла успешно, и `0` в противном случае.

  ```python
  # Запись строки 'Hello world' по ключу 'mykey', если ключ не существует
  redis.setnx('mykey', 'Hello world') 
  ```

* **INCR key**: Увеличивает значение, связанное с ключом `key`, на 1.

  ```python
  # Увеличение значения по ключу 'mykey' на 1
  redis.incr('mykey')
  ```

* **INCRBY key increment**: Увеличивает значение, связанное с ключом `key`, на заданный `increment`.

  ```python
  # Увеличение значения по ключу 'mykey' на 5
  redis.incrby('mykey', 5)
  ```

### Команды работы со списками

* **LPUSH key value [value ...]**: Добавляет один или несколько элементов в начало списка, связанного с ключом `key`.

  ```python
  # Добавление элементов 'a', 'b' в начало списка по ключу 'mylist'
  redis.lpush('mylist', 'a', 'b')
  ```

* **RPUSH key value [value ...]**: Добавляет один или несколько элементов в конец списка, связанного с ключом `key`.

  ```python
  # Добавление элементов 'c', 'd' в конец списка по ключу 'mylist'
  redis.rpush('mylist', 'c', 'd')
  ```

* **LLEN key**: Возвращает количество элементов в списке, связанном с ключом `key`.

  ```python
  # Получение количества элементов в списке по ключу 'mylist'
  redis.llen('mylist')
  ```

* **LRANGE key start stop**: Возвращает диапазон элементов из списка, связанного с ключом `key`, начиная с элемента `start` и заканчивая элементом `stop`.

  ```python
  # Получение элементов с индекса 0 до 2 из списка по ключу 'mylist'
  redis.lrange('mylist', 0, 2)
  ```

* **LINDEX key index**: Возвращает элемент списка, связанного с ключом `key`, с заданным индексом.

  ```python
  # Получение элемента с индексом 1 из списка по ключу 'mylist'
  redis.lindex('mylist', 1)
  ```

* **LSET key index value**: Изменяет значение элемента списка, связанного с ключом `key`, с заданным индексом.

  ```python
  # Изменение значения элемента с индексом 1 в списке по ключу 'mylist' на 'e'
  redis.lset('mylist', 1, 'e')
  ```

* **LPOP key**: Удаляет и возвращает первый элемент из списка, связанного с ключом `key`.

  ```python
  # Удаление и получение первого элемента из списка по ключу 'mylist'
  redis.lpop('mylist')
  ```

* **RPOP key**: Удаляет и возвращает последний элемент из списка, связанного с ключом `key`.

  ```python
  # Удаление и получение последнего элемента из списка по ключу 'mylist'
  redis.rpop('mylist')
  ```

* **RPOPLPUSH source destination**: Удаляет и возвращает последний элемент из списка `source` и добавляет его в начало списка `destination`.

  ```python
  # Удаление и получение последнего элемента из списка 'sourcelist' и добавление его в начало списка 'destinationlist'
  redis.rpoplpush('sourcelist', 'destinationlist')
  ```

### Команды работы с множествами

* **SADD key member [member ...]**: Добавляет один или несколько элементов в множество, связанное с ключом `key`.

  ```python
  # Добавление элементов 'a', 'b', 'c' в множество по ключу 'myset'
  redis.sadd('myset', 'a', 'b', 'c')
  ```

* **SMEMBERS key**: Возвращает список элементов множества, связанного с ключом `key`.

  ```python
  # Получение списка элементов множества по ключу 'myset'
  redis.smembers('myset')
  ```

* **SISMEMBER key member**: Проверяет, содержится ли элемент `member` в множестве, связанном с ключом `key`. Возвращает `1`, если элемент содержится, и `0` в противном случае.

  ```python
  # Проверка, содержится ли элемент 'a' в множестве по ключу 'myset'
  redis.sismember('myset', 'a')
  ```

* **SCARD key**: Возвращает количество элементов в множестве, связанном с ключом `key`.

  ```python
  # Получение количества элементов в множестве по ключу 'myset'
  redis.scard('myset')
  ```

* **SREM key member [member ...]**: Удаляет один или несколько элементов из множества, связанного с ключом `key`.

  ```python
  # Удаление элемента 'a' из множества по ключу 'myset'
  redis.srem('myset', 'a')
  ```

* **SPOP key**: Удаляет и возвращает случайный элемент из множества, связанного с ключом `key`.

  ```python
  # Удаление и получение случайного элемента из множества по ключу 'myset'
  redis.spop('myset')
  ```

* **SRANDMEMBER key [count]**: Возвращает случайный элемент или список случайных элементов из множества, связанного с ключом `key`.

  ```python
  # Получение случайного элемента из множества по ключу 'myset'
  redis.srandmember('myset')

  # Получение списка из 2 случайных элементов из множества по ключу 'myset'
  redis.srandmember('myset', 2)
  ```

### Команды работы с упорядоченными множествами

* **ZADD key score member [score member ...]**: Добавляет один или несколько элементов в упорядоченное множество, связанное с ключом `key`, с указанными баллами.

  ```python
  # Добавление элементов 'a', 'b', 'c' в упорядоченное множество по ключу 'myzset' с баллами 1, 2, 3
  redis.zadd('myzset', 1, 'a', 2, 'b', 3, 'c')
  ```

* **ZRANGE key start stop [WITHSCORES]**: Возвращает диапазон элементов из упорядоченного множества, связанного с ключом `key`, начиная с элемента `start` и заканчивая элементом `stop`. 

  ```python
  # Получение элементов с индекса 0 до 2 из упорядоченного множества по ключу 'myzset'
  redis.zrange('myzset', 0, 2)

  # Получение элементов с индекса 0 до 2 из упорядоченного множества по ключу 'myzset' с баллами
  redis.zrange('myzset', 0, 2, withscores=True)
  ```

* **ZSCORE key member**: Возвращает балл элемента `member` в упорядоченном множестве, связанном с ключом `key`.

  ```python
  # Получение балла элемента 'a' в упорядоченном множестве по ключу 'myzset'
  redis.zscore('myzset', 'a')
  ```

* **ZCARD key**: Возвращает количество элементов в упорядоченном множестве, связанном с ключом `key`.

  ```python
  # Получение количества элементов в упорядоченном множестве по ключу 'myzset'
  redis.zcard('myzset')
  ```

* **ZREM key member [member ...]**: Удаляет один или несколько элементов из упорядоченного множества, связанного с ключом `key`.

  ```python
  # Удаление элемента 'a' из упорядоченного множества по ключу 'myzset'
  redis.zrem('myzset', 'a')
  ```

* **ZINCRBY key increment member**: Увеличивает балл элемента `member` в упорядоченном множестве, связанном с ключом `key`, на заданный `increment`.

  ```python
  # Увеличение балла элемента 'a' в упорядоченном множестве по ключу 'myzset' на 1
  redis.zincrby('myzset', 1, 'a')
  ```

### Команды работы с хэшами

* **HSET key field value**: Записывает значение `value` по полю `field` в хэш, связанный с ключом `key`.

  ```python
  # Запись значения 'value1' по полю 'field1' в хэш по ключу 'myhash'
  redis.hset('myhash', 'field1', 'value1')
  ```

* **HGET key field**: Возвращает значение, связанное с полем `field` в хэше, связанном с ключом `key`.

  ```python
  # Получение значения, связанного с полем 'field1' в хэше по ключу 'myhash'
  redis.hget('myhash', 'field1')
  ```

* **HGETALL key**: Возвращает все пары ключ-значение хэша, связанного с ключом `key`.

  ```python
  # Получение всех пар ключ-значение хэша по ключу 'myhash'
  redis.hgetall('myhash')
  ```

* **HEXISTS key field**: Проверяет, существует ли поле `field` в хэше, связанном с ключом `key`. Возвращает `1`, если поле существует, и `0` в противном случае.

  ```python
  # Проверка, существует ли поле 'field1' в хэше по ключу 'myhash'
  redis.hexists('myhash', 'field1')
  ```

* **HKEYS key**: Возвращает список всех полей хэша, связанного с ключом `key`.

  ```python
  # Получение списка всех полей хэша по ключу 'myhash'
  redis.hkeys('myhash')
  ```

* **HVALS key**: Возвращает список всех значений хэша, связанного с ключом `key`.

  ```python
  # Получение списка всех значений хэша по ключу 'myhash'
  redis.hvals('myhash')
  ```

* **HDEL key field [field ...]**: Удаляет одно или несколько полей из хэша, связанного с ключом `key`.

  ```python
  # Удаление поля 'field1' из хэша по ключу 'myhash'
  redis.hdel('myhash', 'field1')
  ```

* **HINCRBY key field increment**: Увеличивает значение, связанное с полем `field` в хэше, связанном с ключом `key`, на заданный `increment`.

  ```python
  # Увеличение значения, связанного с полем 'field1' в хэше по ключу 'myhash', на 1
  redis.hincrby('myhash', 'field1', 1)
  ```

### Заключение

Этот список команд предоставляет вам базовые инструменты для работы с Redis. С помощью этих команд вы можете хранить, извлекать, обновлять и удалять данные в различных форматах. Помните, что это лишь малая часть функциональности Redis. В последующих разделах руководства вы узнаете о более продвинутых командах, позволяющих выполнять более сложные операции, такие как транзакции, скрипты Lua и т.д.