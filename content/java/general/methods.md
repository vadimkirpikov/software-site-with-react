## Методы в Java

Методы являются основными строительными блоками программ на Java. Они позволяют разбить ваш код на логические блоки, делая его более структурированным, читаемым и удобным для повторного использования. 

**Что такое метод?**

Метод - это блок кода, который выполняет определенную задачу. Он имеет имя, которое используется для его вызова, и может принимать входные данные (параметры) и возвращать результат. 

**Объявление метода**

Объявление метода в Java состоит из следующих частей:

* **Модификаторы доступа:** определяют уровень доступа к методу (например, `public`, `private`).
* **Тип возвращаемого значения:**  тип данных, который метод возвращает после выполнения.
* **Имя метода:**  уникальное имя, используемое для вызова метода.
* **Список параметров (в круглых скобках):**  входные данные для метода, разделенные запятыми.
* **Тело метода (в фигурных скобках):**  блок кода, который выполняется при вызове метода.

**Пример объявления метода:**

```java
public int calculateSum(int a, int b) {
  int sum = a + b; 
  return sum;
}
```

В этом примере:

* `public` - модификатор доступа, делающий метод доступным из любого места программы.
* `int` - тип возвращаемого значения, указывающий, что метод возвращает целое число.
* `calculateSum` - имя метода.
* `(int a, int b)` - список параметров, принимающий два целых числа: `a` и `b`.
* `{ int sum = a + b; return sum; }` - тело метода, которое вычисляет сумму `a` и `b` и возвращает ее.

**Вызов метода**

Чтобы использовать метод, его нужно вызвать по имени с указанием значений для всех параметров (если они есть). 

**Пример вызова метода `calculateSum`:**

```java
int result = calculateSum(5, 10);
System.out.println("Сумма: " + result); // Вывод: Сумма: 15
```

В этом примере:

* `calculateSum(5, 10)` - вызов метода с передачей ему значений `5` и `10` в качестве параметров.
* `int result = ...` -  результат работы метода (возвращаемое значение) сохраняется в переменной `result`.
* `System.out.println(...)` -  вывод значения переменной `result` на консоль.

**Типы методов**

* **Методы, возвращающие значение:**  возвращают значение определенного типа, указанного в объявлении метода.
* **Void методы:**  не возвращают никакого значения. В объявлении таких методов вместо типа возвращаемого значения указывается ключевое слово `void`.

**Пример void метода:**

```java
public void printMessage(String message) {
  System.out.println(message);
}
```

Этот метод принимает строку `message` в качестве параметра и выводит ее на консоль. Он не возвращает никакого значения.

**Перегрузка методов**

В Java можно создавать несколько методов с одинаковым именем, но с разными списками параметров. Это называется перегрузкой методов. 

**Пример перегрузки метода:**

```java
public int calculateSum(int a, int b) {
  return a + b;
}

public double calculateSum(double a, double b) {
  return a + b;
}
```

В этом примере определены два метода с именем `calculateSum`. Первый метод принимает два целых числа, а второй - два числа с плавающей точкой. В зависимости от типа передаваемых параметров будет вызван соответствующий метод.

**Рекурсивные методы**

Метод может вызывать сам себя внутри своего тела. Такие методы называются рекурсивными. 

**Пример рекурсивного метода:**

```java
public int factorial(int n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```

Этот метод вычисляет факториал числа. Он вызывает сам себя с уменьшенным значением `n` до тех пор, пока `n` не станет равно 0.

**Заключение**

Методы являются важной частью языка Java. Они делают код более организованным, читаемым и удобным для повторного использования. 