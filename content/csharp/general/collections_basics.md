## Основы работы с коллекциями (List, Dictionary, HashSet)

В программировании часто возникает необходимость работы с наборами данных. C# предоставляет для этого мощный инструментарий - коллекции.  Рассмотрим три базовые коллекции: `List<T>`, `Dictionary<TKey, TValue>` и `HashSet<T>`.

### List<T>

`List<T>` - это упорядоченная коллекция, позволяющая хранить элементы одного типа.  Она реализует принцип "первым пришел - первым вышел" (FIFO). 

**Основные операции:**

* **Создание:**

```C#
List<string> names = new List<string>(); // Создание пустого списка
List<int> numbers = new List<int>() { 1, 2, 3 }; // Создание списка с начальными значениями
```

* **Добавление элементов:**

```C#
names.Add("Alice"); // Добавляет элемент в конец списка
names.Insert(1, "Bob"); // Вставляет элемент "Bob" по индексу 1
```

* **Доступ к элементам:**

```C#
string firstName = names[0]; // Получение элемента по индексу
```

* **Удаление элементов:**

```C#
names.RemoveAt(1); // Удаляет элемент по индексу
names.Remove("Alice"); // Удаляет первое вхождение элемента "Alice"
```

* **Проверка наличия элемента:**

```C#
bool containsBob = names.Contains("Bob"); // Проверяет, содержит ли список элемент "Bob"
```

**Пример:**

```C#
// Создаем список строк
List<string> fruits = new List<string>();

// Добавляем элементы в список
fruits.Add("Apple");
fruits.Add("Banana");
fruits.Add("Orange");

// Выводим элементы списка на консоль
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}

// Удаляем элемент "Banana" из списка
fruits.Remove("Banana");

// Проверяем, содержит ли список элемент "Banana"
if (fruits.Contains("Banana"))
{
    Console.WriteLine("Список содержит элемент 'Banana'");
}
else
{
    Console.WriteLine("Список не содержит элемент 'Banana'");
}
```

### Dictionary<TKey, TValue>

`Dictionary<TKey, TValue>` - это коллекция, хранящая пары "ключ-значение" (`TKey` - тип ключа, `TValue` - тип значения).  Каждый ключ в словаре уникален.

**Основные операции:**

* **Создание:**

```C#
Dictionary<string, int> ages = new Dictionary<string, int>(); // Создание пустого словаря
```

* **Добавление элементов:**

```C#
ages.Add("Alice", 30); // Добавляет пару "ключ-значение"
```

* **Доступ к значению по ключу:**

```C#
int aliceAge = ages["Alice"]; // Получение значения по ключу "Alice"
```

* **Удаление элементов:**

```C#
ages.Remove("Alice"); // Удаляет пару с ключом "Alice"
```

* **Проверка наличия ключа:**

```C#
bool containsAlice = ages.ContainsKey("Alice"); // Проверяет, содержит ли словарь ключ "Alice"
```

**Пример:**

```C#
// Создаем словарь, где ключи - строки, а значения - целые числа
Dictionary<string, int> scores = new Dictionary<string, int>();

// Добавляем пары "ключ-значение" в словарь
scores.Add("Alice", 95);
scores.Add("Bob", 88);
scores.Add("Carol", 92);

// Выводим значения из словаря на консоль
Console.WriteLine($"Счет Alice: {scores["Alice"]}");

// Изменяем значение по ключу
scores["Bob"] = 90;

// Проверяем наличие ключа в словаре
if (scores.ContainsKey("Dave"))
{
    Console.WriteLine($"Счет Dave: {scores["Dave"]}");
}
else
{
    Console.WriteLine("Счет Dave не найден.");
}
```

### HashSet<T>

`HashSet<T>` - это неупорядоченная коллекция, хранящая только уникальные элементы.

**Основные операции:**

* **Создание:**

```C#
HashSet<string> uniqueNames = new HashSet<string>(); // Создание пустого множества
```

* **Добавление элементов:**

```C#
uniqueNames.Add("Alice"); // Добавляет элемент в множество (только если его там еще нет)
```

* **Удаление элементов:**

```C#
uniqueNames.Remove("Alice"); // Удаляет элемент "Alice" из множества
```

* **Проверка наличия элемента:**

```C#
bool containsAlice = uniqueNames.Contains("Alice"); // Проверяет, содержит ли множество элемент "Alice"
```

**Пример:**

```C#
// Создаем множество строк
HashSet<string> colors = new HashSet<string>();

// Добавляем элементы в множество
colors.Add("Red");
colors.Add("Green");
colors.Add("Blue");
colors.Add("Red"); // Повторное добавление "Red" не даст эффекта

// Выводим элементы множества на консоль
foreach (string color in colors)
{
    Console.WriteLine(color);
}

// Проверяем количество элементов в множестве
Console.WriteLine($"Количество элементов в множестве: {colors.Count}");
```

## Заключение

`List<T>`, `Dictionary<TKey, TValue>` и `HashSet<T>` - это базовые коллекции в C#. Выбор  зависит от конкретной задачи. 
