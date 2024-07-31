## Объект Node. Навигация по DOM

JavaScript предоставляет мощный инструмент для работы с HTML-документами – Document Object Model (DOM). DOM представляет собой структурированное представление HTML-документа в виде дерева узлов, где каждый узел является объектом, содержащим свойства и методы для доступа и манипуляции с ним.

В основе DOM лежит **объект Node**. Все остальные объекты, представляющие различные элементы HTML-документа (элементы, текст, комментарии и т.д.), являются его потомками и наследуют его свойства и методы. 

### Свойства объекта Node

| Свойство   | Описание                                                                         |
|------------|---------------------------------------------------------------------------------|
| `nodeType` | Возвращает числовой код, представляющий тип узла (например, 1 для элемента, 3 для текста). |
| `nodeName` | Возвращает имя узла (например, "DIV", "P", "#text").                           |
| `nodeValue`| Возвращает или задает текстовое содержимое узла (только для текстовых узлов).     |
| `parentNode`| Возвращает родительский узел.                                                 |
| `childNodes`| Возвращает коллекцию всех дочерних узлов.                                        |
| `firstChild`| Возвращает первый дочерний узел.                                                |
| `lastChild` | Возвращает последний дочерний узел.                                               |
| `previousSibling` | Возвращает предыдущий узел на том же уровне.                                  |
| `nextSibling` | Возвращает следующий узел на том же уровне.                                    |

### Навигация по DOM

Используя свойства объекта Node, можно легко перемещаться по DOM-дереву и получать доступ к нужным элементам. Рассмотрим несколько примеров:

```javascript
// Получаем элемент с id="myElement"
const myElement = document.getElementById('myElement');

// Получаем родительский элемент
const parentElement = myElement.parentNode;

// Получаем первый дочерний элемент
const firstChild = myElement.firstChild;

// Получаем последний дочерний элемент
const lastChild = myElement.lastChild;

// Получаем следующий элемент на том же уровне
const nextSibling = myElement.nextSibling;

// Получаем предыдущий элемент на том же уровне
const previousSibling = myElement.previousSibling;
```

### Работа с коллекцией дочерних узлов

Свойство `childNodes` возвращает коллекцию всех дочерних узлов, которая является объектом типа `NodeList`. Для доступа к отдельным узлам можно использовать индексы, начиная с 0:

```javascript
// Получаем коллекцию всех дочерних элементов
const childNodes = myElement.childNodes;

// Получаем первый дочерний элемент
const firstChild = childNodes[0];

// Получаем последний дочерний элемент
const lastChild = childNodes[childNodes.length - 1];
```

Также можно использовать метод `forEach` для перебора всех элементов коллекции:

```javascript
// Перебираем все дочерние элементы
childNodes.forEach(child => {
  // Делаем что-то с каждым элементом
  console.log(child.nodeName);
});
```

### Практический пример

```html
<!DOCTYPE html>
<html>
<head>
  <title>Пример навигации по DOM</title>
</head>
<body>
  <ul id="myList">
    <li>Элемент 1</li>
    <li>Элемент 2</li>
    <li id="lastItem">Элемент 3</li>
  </ul>

  <script>
    // Получаем элемент списка
    const list = document.getElementById('myList');

    // Добавляем новый элемент в конец списка
    const newItem = document.createElement('li');
    newItem.textContent = 'Новый элемент';
    list.appendChild(newItem);

    // Вставляем новый элемент перед последним элементом списка
    const lastItem = document.getElementById('lastItem');
    const newItem2 = document.createElement('li');
    newItem2.textContent = 'Еще один новый элемент';
    list.insertBefore(newItem2, lastItem);

    // Удаляем первый элемент списка
    const firstItem = list.firstChild;
    list.removeChild(firstItem);
  </script>
</body>
</html>
```

В этом примере мы:

1. Получаем ссылку на элемент `<ul>` с помощью `getElementById`.
2. Создаем два новых элемента `<li>` с помощью `createElement`.
3. Добавляем один элемент в конец списка с помощью `appendChild`.
4. Вставляем другой элемент перед последним элементом списка с помощью `insertBefore`.
5. Удаляем первый элемент списка с помощью `removeChild`.

Это лишь базовые примеры работы с объектом Node и навигации по DOM. JavaScript предоставляет множество других методов и свойств для манипуляции с HTML-документом. Подробнее о них можно узнать в документации по DOM. 
