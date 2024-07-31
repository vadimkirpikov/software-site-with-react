## Параметры методов в Java

Методы в Java, как правило, не являются изолированными блоками кода. Для выполнения своих функций им часто требуется информация извне. Эту информацию методы получают через **параметры**.

**Параметры** - это переменные, определенные в объявлении метода, которые действуют как специальные локальные переменные внутри этого метода. При вызове метода значения, передаваемые в качестве аргументов, копируются в соответствующие параметры.

### Типы параметров

В Java существует два основных типа параметров:

1. **Значимые типы**:  Передача параметров по значению означает, что при вызове метода создается копия значения аргумента и передается методу. Изменение значения параметра внутри метода не повлияет на исходное значение аргумента. Все примитивные типы данных в Java (например, int, float, boolean) передаются по значению.

2. **Ссылочные типы**:  Передача параметров по ссылке означает, что вместо копирования значения передается ссылка на объект. Это позволяет методу напрямую обращаться к исходному объекту и потенциально изменять его состояние.  Все объекты в Java (например, String, массивы, собственные классы) передаются по ссылке.

### Объявление параметров

Параметры объявляются в круглых скобках после имени метода.  Каждый параметр имеет **тип данных** и **имя**. Разные параметры разделяются запятыми.

```java
public void printMessage(String message, int count) { 
    // Код метода
}
```

В этом примере метод `printMessage` принимает два параметра:  `message` типа `String` и `count` типа `int`.

### Вызов метода с параметрами

При вызове метода с параметрами нужно передать **аргументы**, соответствующие объявленным параметрам. Аргументы должны соответствовать параметрам по **типу** и **порядку**.

```java
String text = "Hello, world!";
int number = 5;
printMessage(text, number); // Вызов метода с аргументами
```

В этом примере переменные `text` и `number` используются в качестве аргументов при вызове метода `printMessage`. Значение переменной `text` будет скопировано в параметр `message`, а значение переменной `number` - в параметр `count`.

### Пример

Рассмотрим пример метода, который принимает два целочисленных параметра и возвращает их сумму:

```java
public class Main {

  public static int sum(int a, int b) { // Объявление метода с двумя параметрами
    int result = a + b; // Вычисление суммы
    return result; // Возвращение результата
  }

  public static void main(String[] args) {
    int x = 5;
    int y = 10;
    int z = sum(x, y); // Вызов метода с аргументами
    System.out.println("Сумма " + x + " и " + y + " равна " + z);
  }
}
```

В этом примере:

* Метод `sum` принимает два параметра типа `int`: `a` и `b`.
* Внутри метода переменная `result` используется для хранения суммы `a` и `b`.
* Ключевое слово `return` используется для возвращения значения `result` из метода.
* В методе `main`:
    * Создаются две переменные `x` и `y`.
    * Метод `sum` вызывается с `x` и `y` в качестве аргументов. Возвращаемое значение присваивается переменной `z`.
    * Результат выводится на консоль.

### Переменное число аргументов (Varargs)

В Java можно объявлять методы, которые принимают переменное число аргументов одного типа. Для этого используется синтаксис **varargs** с тремя точками (`...`) после типа данных параметра.

```java
public void printNumbers(int... numbers) {
    for (int number : numbers) {
        System.out.println(number);
    }
}
```

В этом примере метод `printNumbers` может принимать любое количество аргументов типа `int`. Внутри метода параметр `numbers` трактуется как массив, содержащий все переданные аргументы.

Пример использования:

```java
printNumbers(1, 2, 3);
printNumbers(10, 20, 30, 40);
printNumbers(); //  Можно вызвать метод без аргументов
```

### Заключение

Параметры - это важный механизм, который делает методы в Java более гибкими и позволяет им обрабатывать разнообразные данные. 

Понимание разницы между передачей по значению и по ссылке, а также умение работать с varargs, являются важными навыками для любого Java-разработчика. 