## Циклы в Python

Циклы – это фундаментальная концепция программирования, позволяющая выполнять определенный блок кода многократно, пока заданное условие истинно. Python предлагает два основных типа циклов: `for` и `while`.

### Цикл `for`

Цикл `for` используется для итерации по последовательности (например, строке, списку, кортежу, множеству) или по итерируемому объекту.

#### Синтаксис:

```python
for <переменная> in <последовательность>:
    # код, который будет выполняться для каждого элемента
```

#### Пример:

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

В этом примере:

1. Мы создаем список `fruits`, содержащий три элемента.
2. Цикл `for` проходит по каждому элементу в списке `fruits`.
3. В каждой итерации переменная `fruit` принимает значение текущего элемента.
4. Код внутри цикла (в данном случае `print(fruit)`) выполняется с использованием значения `fruit`.

**Вывод:**

```
apple
banana
cherry
```

#### Функция `range()`

Функция `range()` часто используется с циклами `for` для генерации последовательности чисел.

```python
for i in range(5):
    print(i)
```

**Вывод:**

```
0
1
2
3
4
```

#### Оператор `break`

Оператор `break` позволяет выйти из цикла `for` досрочно, даже если условие цикла всё ещё истинно.

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
    if fruit == "banana":
        break
```

**Вывод:**

```
apple
banana
```

#### Оператор `continue`

Оператор `continue` прекращает текущую итерацию цикла и переходит к следующей.

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    if fruit == "banana":
        continue
    print(fruit)
```

**Вывод:**

```
apple
cherry
```

### Цикл `while`

Цикл `while` выполняет блок кода до тех пор, пока заданное условие истинно.

#### Синтаксис:

```python
while <условие>:
    # код, который будет выполняться, пока условие истинно
```

#### Пример:

```python
i = 1
while i <= 5:
    print(i)
    i += 1
```

В этом примере:

1. Мы инициализируем переменную `i` значением 1.
2. Цикл `while` проверяет условие `i <= 5`.
3. Пока условие истинно, код внутри цикла (печать `i` и увеличение `i` на 1) выполняется.
4. Когда `i` становится равным 6, условие становится ложным, и цикл завершается.

**Вывод:**

```
1
2
3
4
5
```

#### Бесконечные циклы

Важно убедиться, что условие в цикле `while` в конечном итоге станет ложным, иначе цикл будет выполняться бесконечно.

#### Операторы `break` и `continue`

Операторы `break` и `continue` работают в цикле `while` так же, как и в цикле `for`.

### Вложенные циклы

Циклы могут быть вложены друг в друга для создания более сложной логики. 

```python
for i in range(3):
    for j in range(2):
        print(f"i = {i}, j = {j}")
```

**Вывод:**

```
i = 0, j = 0
i = 0, j = 1
i = 1, j = 0
i = 1, j = 1
i = 2, j = 0
i = 2, j = 1
```

В этом примере внешний цикл `for` выполняется 3 раза, а внутренний цикл `for` – 2 раза для каждой итерации внешнего цикла.

### Заключение

Циклы являются неотъемлемой частью программирования на Python. Понимание того, как работают циклы `for` и `while`, а также операторы `break` и `continue`, позволит вам писать более эффективные и функциональные программы.