## Введение в DOM

JavaScript, помимо управления собственными структурами данных, обладает мощным инструментом взаимодействия с веб-страницами - Document Object Model, или DOM. DOM представляет HTML-документ в виде древовидной структуры, где каждый элемент, атрибут и даже текст  являются узлами (nodes), с которыми можно взаимодействовать.

### Что такое DOM?

Представьте HTML-страницу не как статичный текст, а как живой организм, состоящий из взаимосвязанных частей. Каждая часть - заголовок, параграф, картинка - это объект, обладающий свойствами и методами. Свойства описывают объект (например, цвет текста, адрес ссылки), а методы позволяют выполнять над ним действия (например, изменить содержимое, скрыть элемент).

DOM предоставляет JavaScript интерфейс для доступа к этим объектам и управления ими. Благодаря DOM, JavaScript может:

*   Изменять содержимое элементов на странице
*   Изменять стили элементов (цвет, размер, положение)
*   Создавать новые элементы и добавлять их на страницу
*   Удалять существующие элементы
*   Реагировать на действия пользователя (клики, наведение мыши, ввод текста)

### Работа с DOM

#### Доступ к элементам

Прежде чем манипулировать элементами страницы, нужно получить к ним доступ. Для этого JavaScript предоставляет ряд методов:

| Метод              | Описание                                                     |
| ------------------ | ------------------------------------------------------------ |
| `getElementById`   | Возвращает элемент по его уникальному идентификатору (id)      |
| `getElementsByTagName` | Возвращает коллекцию элементов с заданным тегом (например, все параграфы) |
| `getElementsByClassName` | Возвращает коллекцию элементов с заданным классом       |
| `querySelector`     | Возвращает первый элемент, соответствующий CSS-селектору      |
| `querySelectorAll` | Возвращает коллекцию всех элементов, соответствующих CSS-селектору |

**Пример:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Пример работы с DOM</title>
</head>
<body>
  <h1 id="main-heading">Заголовок страницы</h1>
  <p class="paragraph">Первый параграф.</p>
  <p class="paragraph">Второй параграф.</p>

  <script>
    // Получаем элемент по id
    const mainHeading = document.getElementById("main-heading"); 
    console.log(mainHeading.textContent); // Вывод: "Заголовок страницы"

    // Получаем коллекцию элементов по тегу
    const paragraphs = document.getElementsByTagName("p");
    console.log(paragraphs.length); // Вывод: 2

    // Получаем первый элемент, соответствующий CSS-селектору
    const firstParagraph = document.querySelector(".paragraph");
    console.log(firstParagraph.textContent); // Вывод: "Первый параграф."
  </script>
</body>
</html>
```

#### Модификация элементов

Получив доступ к элементу, можно изменять его свойства:

*   `textContent`: текст внутри элемента
*   `innerHTML`: HTML-содержимое элемента
*   `style`: стили элемента (доступ к каждому свойству как к полю объекта, например `element.style.color = "red"`)
*   `classList`: управление классами элемента (добавление, удаление, проверка наличия)

**Пример:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Пример работы с DOM</title>
</head>
<body>
  <p id="my-paragraph">Этот текст будет изменен.</p>
  <button id="change-button">Изменить текст</button>

  <script>
    const paragraph = document.getElementById("my-paragraph");
    const button = document.getElementById("change-button");

    button.addEventListener("click", () => {
      paragraph.textContent = "Текст успешно изменен!";
      paragraph.style.color = "blue";
      paragraph.classList.add("changed"); // Добавляем класс 'changed'
    });
  </script>
</body>
</html>
```

#### Создание и удаление элементов

DOM позволяет динамически создавать и удалять элементы на странице:

*   `createElement`: создает новый HTML-элемент
*   `appendChild`: добавляет дочерний элемент в конец списка дочерних элементов
*   `removeChild`: удаляет дочерний элемент
*   `insertBefore`: вставляет элемент перед другим элементом

**Пример:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Пример работы с DOM</title>
</head>
<body>
  <ul id="my-list">
    <li>Первый элемент</li>
  </ul>
  <button id="add-button">Добавить элемент</button>

  <script>
    const list = document.getElementById("my-list");
    const addButton = document.getElementById("add-button");

    addButton.addEventListener("click", () => {
      const newListItem = document.createElement("li"); // Создаем новый li
      newListItem.textContent = "Новый элемент списка"; // Добавляем текст
      list.appendChild(newListItem); // Добавляем li в конец списка
    });
  </script>
</body>
</html>
```

### Заключение

DOM - это мощный инструмент, открывающий перед JavaScript безграничные возможности по управлению веб-страницами. Понимание основ работы с DOM - ключевой шаг на пути к созданию интерактивных и динамичных веб-приложений.
