## Создание и вызов функций в MySQL

Функции в MySQL - это именованные блоки кода SQL, которые могут принимать параметры, выполнять определенные действия и возвращать значение. Функции позволяют инкапсулировать логику, сделать код более читаемым и избежать дублирования.

### Создание функции

Для создания функции в MySQL используется оператор `CREATE FUNCTION`, за которым следует имя функции, список параметров (если есть), тип возвращаемого значения и тело функции, заключенное в блок `BEGIN ... END`.

```sql
CREATE FUNCTION имя_функции(параметр1 тип1, параметр2 тип2, ...)
RETURNS тип_возвращаемого_значения
BEGIN
    -- Тело функции
    RETURN значение;
END;
```

- **имя_функции:**  уникальное имя, по которому будет вызываться функция
- **параметрN:** имя параметра
- **типN:** тип данных параметра
- **тип_возвращаемого_значения:**  тип данных, возвращаемый функцией
- **Тело функции:**  код SQL, выполняемый функцией
- **RETURN:** оператор, возвращающий значение из функции

#### Пример создания функции

Создадим функцию `get_customer_discount`, которая принимает на вход id клиента и возвращает его скидку:

```sql
CREATE FUNCTION get_customer_discount(customer_id INT)
RETURNS DECIMAL(5,2)
BEGIN
    DECLARE discount DECIMAL(5,2);
    
    SELECT discount_rate 
    INTO discount 
    FROM customers 
    WHERE customer_id = customer_id;
    
    RETURN discount;
END;
```

В данном примере:

-  Функция `get_customer_discount` принимает один параметр `customer_id` типа `INT`.
-  Тип возвращаемого значения — `DECIMAL(5,2)`.
-  В теле функции объявляется переменная `discount` типа `DECIMAL(5,2)`.
-  С помощью оператора `SELECT INTO` получаем значение скидки из таблицы `customers` по заданному `customer_id` и сохраняем его в переменной `discount`.
-  В конце функция возвращает значение переменной `discount` с помощью оператора `RETURN`.

### Вызов функции

Вызывать функции в MySQL можно различными способами:

-  Внутри оператора `SELECT`:

```sql
SELECT customer_id, get_customer_discount(customer_id) AS discount
FROM orders;
```

Этот запрос выберет все заказы и для каждого заказа вычислит скидку, используя функцию `get_customer_discount`.

-  Внутри других функций:

```sql
CREATE FUNCTION calculate_order_total(order_id INT)
RETURNS DECIMAL(10,2)
BEGIN
    DECLARE order_total DECIMAL(10,2);
    DECLARE customer_id INT;
    
    SELECT customer_id, SUM(price * quantity) 
    INTO customer_id, order_total
    FROM order_items
    WHERE order_id = order_id;
    
    SET order_total = order_total * (1 - get_customer_discount(customer_id));
    
    RETURN order_total;
END;
```

В этом примере функция `calculate_order_total` вызывает функцию `get_customer_discount` для расчета скидки при определении общей стоимости заказа.

-  Внутри хранимых процедур и триггеров:

```sql
CREATE PROCEDURE process_order(IN order_id INT)
BEGIN
    -- ...
    UPDATE orders SET total_amount = calculate_order_total(order_id) WHERE order_id = order_id;
    -- ...
END;
```

Здесь функция `calculate_order_total` вызывается внутри хранимой процедуры `process_order`.

### Особенности работы с функциями

-  Функции в MySQL всегда возвращают одно значение.
-  Функции не могут изменять данные в таблицах.
-  Функции могут быть использованы в различных частях запроса, например, в условиях `WHERE` или `HAVING`, в выражениях `CASE`, в операторах `JOIN` и др.

### Примеры функций

#### Функция для проверки, является ли строка палиндромом

```sql
CREATE FUNCTION is_palindrome(str VARCHAR(255))
RETURNS BOOLEAN
BEGIN
    DECLARE reversed_str VARCHAR(255);
    SET reversed_str = REVERSE(str);
    RETURN str = reversed_str;
END;
```

#### Функция для расчета возраста по дате рождения

```sql
CREATE FUNCTION calculate_age(birthdate DATE)
RETURNS INT
BEGIN
    DECLARE age INT;
    SET age = TIMESTAMPDIFF(YEAR, birthdate, CURDATE());
    RETURN age;
END;
```

#### Функция для форматирования телефонного номера

```sql
CREATE FUNCTION format_phone_number(phone_number VARCHAR(20))
RETURNS VARCHAR(20)
BEGIN
    DECLARE formatted_number VARCHAR(20);
    SET formatted_number = CONCAT('(', SUBSTR(phone_number, 1, 3), ') ', SUBSTR(phone_number, 4, 3), '-', SUBSTR(phone_number, 7));
    RETURN formatted_number;
END;
```

### Заключение

Функции являются мощным инструментом в MySQL, позволяющим создавать модульный, читаемый и легко поддерживаемый код. Использование функций позволяет избежать дублирования кода и повысить эффективность разработки.
