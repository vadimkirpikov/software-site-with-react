## Перечисления (enum) в Java

Перечисления (enums) в Java – это специальный тип данных, который позволяет определить набор именованных констант. Они делают код более читаемым, понятным и безопасным, ограничивая возможные значения переменной предопределенным списком.

### Объявление перечисления

Объявление перечисления похоже на объявление класса, но вместо ключевого слова `class` используется `enum`:

```java
public enum DayOfWeek {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

В этом примере мы создали перечисление `DayOfWeek` с семью константами, представляющими дни недели. 

### Использование перечислений

Вы можете использовать константы перечисления как обычные значения:

```java
DayOfWeek today = DayOfWeek.MONDAY;
System.out.println("Today is " + today); // Вывод: Today is MONDAY
```

### Перечисления как классы

На самом деле, перечисления в Java — это полноценные классы. Каждая константа перечисления неявно является статической final переменной типа самого перечисления. Это означает, что вы можете обращаться к ним, используя имя перечисления и оператор `.` :

```java
DayOfWeek day = DayOfWeek.FRIDAY;
```

### Методы перечислений

Java предоставляет ряд встроенных методов для работы с перечислениями:

* `name()`: возвращает имя константы перечисления в виде строки.

```java
DayOfWeek day = DayOfWeek.TUESDAY;
String dayName = day.name(); // "TUESDAY"
```

* `ordinal()`: возвращает порядковый номер константы в перечислении (начиная с 0).

```java
int dayIndex = day.ordinal(); // 1
```

* `valueOf(String name)`: возвращает константу перечисления по ее имени.

```java
DayOfWeek day = DayOfWeek.valueOf("WEDNESDAY"); 
```

* `values()`: возвращает массив всех констант перечисления.

```java
DayOfWeek[] days = DayOfWeek.values(); 
for (DayOfWeek d : days) {
    System.out.println(d);
}
```

### Добавление конструкторов, полей и методов в перечисления

Вы можете определить конструкторы, поля и методы внутри перечисления, как и в обычном классе. Это позволяет создавать более сложные и функциональные перечисления.

**Пример:**

```java
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS  (4.869e+24, 6.0518e6),
    EARTH  (5.976e+24, 6.37814e6),
    MARS   (6.421e+23, 3.3962e6),
    JUPITER(1.900e+27, 7.1492e7),
    SATURN (5.688e+26, 6.0268e7),
    URANUS (8.686e+25, 2.5559e7),
    NEPTUNE(1.024e+26, 2.4746e7);

    private final double mass;   // в килограммах
    private final double radius; // в метрах

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    public double getMass() { return mass; }
    public double getRadius() { return radius; }

    // гравитационная постоянная
    public static final double G = 6.67300E-11;

    public double surfaceGravity() {
        return G * mass / (radius * radius);
    }
    public double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}
```

В этом примере:

*  у каждой планеты есть масса и радиус
*  конструктор `Planet` инициализирует эти значения
*  методы `getMass` и `getRadius` возвращают массу и радиус планеты
*  метод `surfaceGravity` вычисляет ускорение свободного падения на планете
*  метод `surfaceWeight` вычисляет вес объекта на планете

### Перечисления и switch

Вы можете использовать перечисления в операторе `switch`:

```java
DayOfWeek today = DayOfWeek.WEDNESDAY;

switch (today) {
    case MONDAY:
        System.out.println("Начало рабочей недели");
        break;
    case FRIDAY:
        System.out.println("Скоро выходные!");
        break;
    case SATURDAY, SUNDAY:
        System.out.println("Выходной!");
        break;
    default:
        System.out.println("Рабочий день");
}
```

### Преимущества использования перечислений

* **Повышение читаемости кода**: имена констант делают код самодокументируемым.
* **Безопасность типов**: ограничение возможных значений предотвращает ошибки.
* **Удобство рефакторинга**: изменение значений констант в одном месте автоматически применяется ко всему коду.
* **Дополнительные возможности**: добавление методов и конструкторов расширяет функциональность.

Перечисления являются мощным инструментом в Java, который делает ваш код более читаемым, безопасным и удобным в поддержке. 
