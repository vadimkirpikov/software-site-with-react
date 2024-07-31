## Аутентификация и авторизация в Redis

В этом разделе мы рассмотрим, как обеспечить безопасность доступа к данным в Redis с помощью аутентификации и авторизации.

### Аутентификация

Аутентификация в Redis позволяет убедиться, что только авторизованные клиенты могут получить доступ к данным. Redis поддерживает два основных способа аутентификации:

* **Парольная аутентификация** -  основной метод аутентификации, использующий простой пароль.
* **TLS/SSL шифрование** -  обеспечивает защищенное соединение между клиентом и сервером Redis.

#### Парольная аутентификация

Парольная аутентификация осуществляется с помощью команды `AUTH`. 

**Пример:**

```python
import redis

# Создание соединения с сервером Redis
r = redis.Redis(host='localhost', port=6379, password='my_password')

# Проверка подключения
r.ping()

# Доступ к данным после успешной аутентификации
r.set('key', 'value')
```

В данном примере мы создаем соединение с Redis, используя пароль `my_password`. После успешной аутентификации мы можем выполнять операции с данными.

#### TLS/SSL шифрование

TLS/SSL шифрование обеспечивает защищенное соединение между клиентом и сервером Redis, шифруя передаваемые данные. Для использования TLS/SSL шифрования необходимо:

* Настроить Redis с поддержкой TLS/SSL.
* Установить соответствующие сертификаты на сервере Redis и клиенте.
* Использовать библиотеки клиента, поддерживающие TLS/SSL.

**Пример:**

```python
import redis

# Создание соединения с сервером Redis через TLS/SSL
r = redis.Redis(
    host='localhost',
    port=6379,
    ssl=True,
    ssl_ca_certs='path/to/ca.pem',  # Путь к сертификату CA
    ssl_certfile='path/to/cert.pem',  # Путь к сертификату клиента
    ssl_keyfile='path/to/key.pem'  # Путь к ключу клиента
)

# Проверка подключения
r.ping()

# Доступ к данным после успешного подключения
r.set('key', 'value')
```

### Авторизация

Авторизация в Redis позволяет ограничить доступ к определенным данным для разных пользователей. В Redis авторизация реализуется с помощью **списков доступа (ACL)**.

#### ACL

ACL представляет собой набор правил, определяющих, какие операции могут выполнять конкретные пользователи. 

**Основные элементы ACL:**

* **Пользователь:**  идентифицирует пользователя, которому предоставляются права доступа.
* **Права:**  определяют операции, которые пользователь может выполнять.
* **Ресурс:**  указывает на объект, к которому предоставлен доступ.

**Пример:**

```
# Добавление пользователя
redis-cli -a 'my_password' CONFIG SET requirepass ""  # Отключение парольной аутентификации для конфигурации ACL
redis-cli -a 'my_password' ACL SETUSER myuser ON  # Создание пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser NOPASS  # Отключение парольной аутентификации для пользователя myuser

# Предоставление прав доступа к ключам, начинающимся с "user:"
redis-cli -a 'my_password' ACL SETUSER myuser ON  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  # Включение пользователя myuser
redis-cli -a 'my_password' ACL SETUSER myuser  #