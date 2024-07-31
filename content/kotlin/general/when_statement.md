## Конструкция When

В Kotlin, `when` является мощной заменой оператора `switch` из других языков программирования, предоставляя более лаконичный и гибкий способ обработки множества условий. 

### Основы конструкции When

В своей базовой форме `when` сравнивает выражение с несколькими ветвями, определяемыми ключевым словом `case`. Первая ветка, значение которой совпадает с выражением, выполняется.

```kotlin
val dayOfWeek = 3

when (dayOfWeek) {
    1 -> println("Понедельник - день тяжёлый")
    2 -> println("Вторник - день надежд")
    3 -> println("Среда - середина пути")
    4 -> println("Четверг - почти пятница")
    5 -> println("Пятница - развратница")
    else -> println("Выходные - время отдыха")
}
```

В этом примере, `dayOfWeek` сравнивается с каждым значением после `case`. Так как `dayOfWeek` равен 3, выполнится ветка `3 -> println("Среда - середина пути")`. 

**Важно:**

* В отличие от `switch` в некоторых языках, `when` не требует ключевого слова `break` в конце каждой ветки.
* Ветка `else` является опциональной, но рекомендуется для обработки случаев, не предусмотренных другими ветками.

### Множественные условия в одной ветке

`When` позволяет объединять несколько условий в одной ветке, разделяя их запятой:

```kotlin
val month = 11
val season = when (month) {
    12, 1, 2 -> "Зима"
    3, 4, 5 -> "Весна"
    6, 7, 8 -> "Лето"
    9, 10, 11 -> "Осень"
    else -> "Неверный месяц" 
}
```

В этом примере, если `month` равен 12, 1 или 2, переменная `season` будет содержать значение "Зима".

### Проверки типов

`When` может использоваться для проверки типов данных с помощью оператора `is`:

```kotlin
fun describe(value: Any) {
    when (value) {
        is String -> println("Это строка: $value")
        is Int -> println("Это число: $value")
        is Boolean -> println("Это логическое значение: $value")
        else -> println("Неизвестный тип")
    }
}
```

В данном примере функция `describe` принимает аргумент любого типа (`Any`). С помощью `when` мы проверяем тип `value` и выводим соответствующее сообщение.

### Диапазоны и условия

Ветви `when` могут содержать не только константы, но и диапазоны, проверяемые с помощью операторов `in` и `!in`, а также логические выражения.

```kotlin
val age = 25
val lifeStage = when (age) {
    in 0..12 -> "Детство"
    in 13..17 -> "Юность"
    in 18..65 -> "Взрослая жизнь"
    else -> "Пожилой возраст"
}

val number = -5
val description = when {
    number > 0 -> "Положительное число"
    number < 0 -> "Отрицательное число"
    else -> "Ноль"
}
```

В первом примере мы определяем `lifeStage` на основе возраста, используя диапазоны. Во втором примере, мы не указываем проверяемое выражение после `when`, а используем логические условия напрямую в ветках.

### Использование When как выражения

Как и `if`, конструкция `when` может использоваться как выражение, возвращающее значение:

```kotlin
fun calculateDiscount(day: Int): Int {
    return when (day) {
        6, 7 -> 15 // Скидка 15% в выходные
        in 1..5 -> 10 // Скидка 10% в будни
        else -> 0 // Нет скидки
    }
}
```

Здесь `when` используется для вычисления значения скидки в зависимости от дня недели. 

### Заключение

Конструкция `when` предоставляет мощный и гибкий механизм для обработки множества условий. С ее помощью код становится более читаемым и лаконичным, чем при использовании каскадных операторов `if-else`.