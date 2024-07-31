## Ограничения обобщений

Обобщения в Java, представленные в версии 1.5, привнесли в язык типобезопасность и возможность повторного использования кода. Однако, без ограничений на типы-параметры, обобщения были бы ограничены использованием методов класса Object. 

Ограничения позволяют сузить тип-параметр до определенного класса или интерфейса, предоставляя доступ к методам и полям этого типа. 

### Ограничения наследования

Ограничение наследования определяется с помощью ключевого слова `extends`, за которым следует название класса или интерфейса. 

```java
// Ограничение типом Number и его наследниками
public class GenericClass<T extends Number> { 
    private T value;

    public GenericClass(T value) {
        this.value = value;
    }

    public double getValueAsDouble() {
        // Метод doubleValue() доступен, так как T ограничен Number
        return value.doubleValue(); 
    }
}
```

В данном примере класс `GenericClass` принимает тип-параметр `T`, ограниченный классом `Number`. Это означает, что `T` может быть `Integer`, `Double`, `Float` или любым другим подклассом `Number`. 

Пример использования:

```java
GenericClass<Integer> intContainer = new GenericClass<>(10);
double value = intContainer.getValueAsDouble(); // value = 10.0
```

### Множественные ограничения

Можно использовать несколько ограничений наследования, разделяя их знаком `&`. При этом допускается указывать не более одного класса, а остальные ограничения должны быть интерфейсами.

```java
// Ограничение классом Number и интерфейсом Comparable
public class GenericClass<T extends Number & Comparable<T>> { 
    // ...
}
```

### Ограничения с использованием wildcard

Wildcard (?), используемый в качестве типа-параметра, означает "любой тип". В сочетании с ограничениями, он позволяет работать с типами, удовлетворяющими определенным условиям.

#### Верхняя граница

`<? extends Type>` ограничивает тип-параметр подтипами `Type`. 

```java
public void printNumbers(List<? extends Number> list) {
    for (Number n : list) {
        System.out.println(n);
    }
}
```

Метод `printNumbers` принимает список, содержащий объекты типа `Number` или его подклассов.

#### Нижняя граница

`<? super Type>` ограничивает тип-параметр супертипами `Type`.

```java
public void addNumbersToList(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}
```

Метод `addNumbersToList` принимает список, который может содержать объекты типа `Integer` или его суперклассов.

### Ограничения и типобезопасность

Ограничения позволяют компилятору проверить типы во время компиляции и предотвратить ошибки ClassCastException во время выполнения. 

В заключение, ограничения обобщений являются мощным инструментом, позволяющим создавать более гибкий, безопасный и повторно используемый код. Они позволяют сузить типы-параметры, обеспечивая доступ к методам и полям нужных классов и интерфейсов.