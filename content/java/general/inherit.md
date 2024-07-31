## Наследование

Наследование — один из фундаментальных принципов объектно-ориентированного программирования (ООП). Оно позволяет создавать новые классы на основе существующих, наследуя их свойства (поля) и поведение (методы). 

### Базовые понятия

* **Базовый класс (родительский класс, суперкласс):** Класс, от которого наследуются свойства и поведение. 
* **Производный класс (дочерний класс, подкласс):** Класс, который наследует свойства и поведение от базового класса. 

Наследование способствует повторному использованию кода и созданию иерархий классов, отражающих отношения "является". Например, автомобиль "является" транспортным средством, яблоко "является" фруктом.

### Ключевое слово `extends`

Для создания производного класса используется ключевое слово `extends`:

```java
class Vehicle { // Базовый класс
    String brand;
    int wheels;

    public void move() {
        System.out.println("Транспортное средство движется");
    }
}

class Car extends Vehicle { // Производный класс
    String model;

    public void honk() {
        System.out.println("Бип-бип!");
    }
}
```

В этом примере класс `Car` наследует свойства (`brand`, `wheels`) и метод (`move`) от класса `Vehicle`.

### Доступ к членам базового класса

Производный класс имеет доступ к не приватным членам (полям и методам) своего базового класса.  

```java
public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.brand = "Toyota"; // Доступ к полю базового класса
        myCar.wheels = 4;       // Доступ к полю базового класса
        myCar.model = "Camry";
        
        myCar.move();        // Доступ к методу базового класса
        myCar.honk(); 
    }
}
```

### Ключевое слово `super`

Ключевое слово `super` используется в производном классе для:

* **Вызова конструктора базового класса:** `super()` вызывается в конструкторе производного класса для инициализации полей базового класса.
* **Доступ к членам базового класса, переопределенным в производном:** Используется, когда необходимо обратиться к переопределенному методу или скрытому полю базового класса.

**Пример использования `super`:**

```java
class Animal {
    String name;
    
    public Animal(String name){
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println("Животное издает звук");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name); // Вызов конструктора базового класса
    }

    @Override 
    public void makeSound() {
        System.out.println("Гав-гав!");
    }

    public void fetch() {
        System.out.println(name + " приносит палку");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog("Шарик");
        myDog.makeSound(); // Вызов переопределенного метода
        myDog.fetch();     
    }
}
```

### Переопределение методов

Производный класс может переопределить методы базового класса, предоставив свою реализацию. Для явного указания переопределения используется аннотация `@Override`.

```java
class Bird extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Чирик-чирик!"); 
    }
}
```

### Преимущества наследования

* **Повторное использование кода:** Нет необходимости писать уже существующий код заново.
* **Расширяемость:** Легко добавлять новые функции, создавая новые классы на основе существующих.
* **Иерархия классов:** Наследование помогает моделировать отношения между объектами реального мира.

###  Пример

Рассмотрим пример с фигурами:

```java
class Shape { // Базовый класс
    String color;

    public Shape(String color) {
        this.color = color;
    }

    public double getArea() {
        return 0; // Базовая реализация, будет переопределена в производных классах
    }
}

class Circle extends Shape { // Круг
    double radius;

    public Circle(String color, double radius) {
        super(color); 
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape { // Прямоугольник
    double width;
    double height;

    public Rectangle(String color, double width, double height) {
        super(color); 
        this.width = width;
        this.height = height;
    }

    @Override
    public double getArea() {
        return width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Circle circle = new Circle("Красный", 5);
        Rectangle rectangle = new Rectangle("Синий", 4, 6);

        System.out.println("Площадь круга: " + circle.getArea());
        System.out.println("Площадь прямоугольника: " + rectangle.getArea());
    }
}
```

В этом примере классы `Circle` и `Rectangle` наследуют базовый класс `Shape`. Каждый из них переопределяет метод `getArea()` для расчета площади, специфичной для данного типа фигуры.


### Заключение

Наследование — мощный инструмент, позволяющий создавать гибкие и расширяемые приложения. Понимание принципов наследования необходимо для разработки качественного объектно-ориентированного кода на Java.
