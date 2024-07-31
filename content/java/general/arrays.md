## Массивы

Массив – это структура данных, которая хранит упорядоченный набор элементов одного типа. Представьте его как контейнер с пронумерованными ячейками, где каждая ячейка может содержать значение определенного типа. Например, массив чисел или массив строк.

### Объявление массивов

В Java объявление массива включает в себя указание типа данных элементов массива и его имени. Выделяют два способа объявления:

1. **Объявление с указанием размера:**

```java
int[] numbers = new int[5]; // Массив целых чисел с 5 элементами
String[] names = new String[10]; // Массив строк с 10 элементами
```

В этом случае, при создании массива, вы указываете его размер в квадратных скобках. Java выделяет память под указанное количество элементов, и изначально все ячейки содержат значения по умолчанию (0 для чисел, `false` для boolean, `null` для ссылочных типов).

2. **Объявление с инициализацией:**

```java
int[] numbers = {1, 2, 3, 4, 5}; // Массив целых чисел с 5 элементами
String[] names = {"Alice", "Bob", "Charlie"}; // Массив строк с 3 элементами
```

Здесь вы одновременно объявляете массив и инициализируете его значениями, заключенными в фигурные скобки. Java автоматически определяет размер массива на основе количества переданных значений.

### Доступ к элементам массива

Для доступа к отдельным элементам массива используется **индекс**. Индекс – это целое число, которое указывает позицию элемента в массиве. **Важно:** нумерация индексов начинается с **0**.

```java
int[] numbers = {10, 20, 30, 40, 50};

int firstNumber = numbers[0]; // firstNumber = 10
int thirdNumber = numbers[2]; // thirdNumber = 30

System.out.println("Первый элемент: " + firstNumber);
System.out.println("Третий элемент: " + thirdNumber);
```

### Изменение элементов массива

Вы можете изменять значения элементов массива, обращаясь к ним по индексу:

```java
int[] numbers = {10, 20, 30, 40, 50};

numbers[1] = 25; // Изменяем второй элемент

System.out.println("Измененный второй элемент: " + numbers[1]);
```

### Длина массива

Чтобы узнать длину массива (количество элементов), используется свойство `length`:

```java
int[] numbers = {10, 20, 30, 40, 50};

int arrayLength = numbers.length; // arrayLength = 5

System.out.println("Длина массива: " + arrayLength);
```

### Многомерные массивы

Java поддерживает многомерные массивы, которые представляют собой массивы массивов. Например, двумерный массив можно представить как таблицу, где каждый элемент является строкой, а каждая строка содержит ячейки со значениями.

#### Объявление и инициализация двумерного массива:

```java
int[][] matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
};
```

#### Доступ к элементам двумерного массива:

```java
int element = matrix[1][2]; // element = 6 (вторая строка, третий столбец)
```

### Перебор элементов массива

Для перебора всех элементов массива обычно используется цикл `for`:

```java
int[] numbers = {10, 20, 30, 40, 50};

for (int i = 0; i < numbers.length; i++) {
    System.out.println("Элемент " + i + ": " + numbers[i]);
}
```

### Распространенные ошибки

- **Выход за границы массива:** Обращение к несуществующему индексу (меньше 0 или больше `length - 1`) приведет к ошибке `ArrayIndexOutOfBoundsException`.
- **Нумерация с 1:** Помните, что индексы массива начинаются с 0, а не с 1.

### Пример использования массива

```java
public class ArrayExample {
    public static void main(String[] args) {
        // Создаем массив для хранения оценок студентов
        int[] grades = new int[5];

        // Заполняем массив оценками
        grades[0] = 85;
        grades[1] = 92;
        grades[2] = 78;
        grades[3] = 95;
        grades[4] = 88;

        // Вычисляем среднюю оценку
        int sum = 0;
        for (int i = 0; i < grades.length; i++) {
            sum += grades[i];
        }
        double average = (double) sum / grades.length;

        // Выводим среднюю оценку
        System.out.println("Средняя оценка: " + average);
    }
}
```

В этом примере мы создали массив `grades` для хранения оценок пяти студентов. Затем мы заполнили массив значениями, вычислили среднюю оценку и вывели ее на консоль. 

Массивы - это базовая структура данных, которая широко используется в программировании. Понимание принципов работы с массивами является важным шагом в освоении Java.