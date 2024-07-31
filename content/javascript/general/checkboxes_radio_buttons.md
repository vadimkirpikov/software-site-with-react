## Флажки и радиокнопки

Флажки (checkboxes) и радиокнопки (radio buttons) являются важными элементами форм в HTML, которые позволяют пользователям взаимодействовать с вашим сайтом, выбирая один или несколько вариантов из предложенных. JavaScript предоставляет широкие возможности для работы с этими элементами, позволяя динамически создавать, изменять и обрабатывать их состояние.

### Создание флажков и радиокнопок с помощью JavaScript

Создание флажков и радиокнопок с помощью JavaScript аналогично созданию других HTML-элементов. Для этого используется метод `createElement()` и последующее добавление необходимых атрибутов.

```javascript
// Создание флажка
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.id = "myCheckbox";
checkbox.name = "myCheckbox";

// Создание радиокнопки
const radioButton = document.createElement("input");
radioButton.type = "radio";
radioButton.id = "myRadioButton";
radioButton.name = "myRadioGroup";
```

В этом примере мы создали флажок с идентификатором `myCheckbox` и радиокнопку с идентификатором `myRadioButton`. Обратите внимание, что для радиокнопок необходимо задавать одинаковое значение атрибута `name` для группировки, чтобы пользователь мог выбрать только одну опцию из группы.

### Добавление элементов в DOM

После создания элемента необходимо добавить его в документ HTML. Обычно это делается путем добавления элемента как дочернего к существующему элементу на странице.

```javascript
// Получаем элемент-контейнер, куда будем добавлять элементы
const container = document.getElementById("myContainer");

// Добавляем флажок и радиокнопку в контейнер
container.appendChild(checkbox);
container.appendChild(radioButton);
```

### Добавление меток к элементам

Чтобы пользователи понимали, за что отвечает каждый флажок или радиокнопка, необходимо добавить к ним метки. Это можно сделать с помощью элемента `<label>`.

```javascript
// Создаем метку для флажка
const checkboxLabel = document.createElement("label");
checkboxLabel.htmlFor = "myCheckbox";
checkboxLabel.textContent = "Мой флажок";

// Создаем метку для радиокнопки
const radioButtonLabel = document.createElement("label");
radioButtonLabel.htmlFor = "myRadioButton";
radioButtonLabel.textContent = "Моя радиокнопка";

// Добавляем метки в контейнер
container.appendChild(checkboxLabel);
container.appendChild(radioButtonLabel);
```

### Обработка событий

JavaScript позволяет отслеживать события, связанные с флажками и радиокнопками, например, когда пользователь устанавливает или снимает флажок. Для этого используется метод `addEventListener()`.

```javascript
// Обработчик события для флажка
checkbox.addEventListener("change", function() {
  if (this.checked) {
    console.log("Флажок установлен");
  } else {
    console.log("Флажок снят");
  }
});

// Обработчик события для радиокнопки
radioButton.addEventListener("change", function() {
  if (this.checked) {
    console.log("Выбрана радиокнопка");
  }
});
```

В этом примере мы добавили обработчики событий `change` для флажка и радиокнопки. Код внутри обработчика будет выполняться каждый раз, когда состояние элемента меняется.

### Получение значений

Для получения значений флажков и радиокнопок используется свойство `checked`. 

```javascript
// Проверка состояния флажка
if (checkbox.checked) {
  // Флажок установлен
} else {
  // Флажок снят
}

// Получение значения выбранной радиокнопки
const selectedRadioButton = document.querySelector("input[name='myRadioGroup']:checked");
if (selectedRadioButton) {
  const radioButtonValue = selectedRadioButton.value;
  console.log("Значение выбранной радиокнопки:", radioButtonValue);
}
```

### Динамическое изменение состояния

JavaScript позволяет динамически устанавливать или снимать флажки, а также выбирать нужную радиокнопку.

```javascript
// Установить флажок
checkbox.checked = true;

// Снять флажок
checkbox.checked = false;

// Выбрать радиокнопку
radioButton.checked = true;
```

### Пример: Список задач

Давайте рассмотрим пример создания простого списка задач с использованием флажков.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Список задач</title>
</head>
<body>
  <h1>Список задач</h1>
  <ul id="taskList">
    </ul>
  <button id="addTaskButton">Добавить задачу</button>

  <script>
    const taskList = document.getElementById("taskList");
    const addTaskButton = document.getElementById("addTaskButton");

    addTaskButton.addEventListener("click", function() {
      const newTask = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const taskText = document.createElement("span");
      taskText.textContent = "Новая задача";

      newTask.appendChild(checkbox);
      newTask.appendChild(taskText);
      taskList.appendChild(newTask);

      checkbox.addEventListener("change", function() {
        if (this.checked) {
          taskText.style.textDecoration = "line-through";
        } else {
          taskText.style.textDecoration = "none";
        }
      });
    });
  </script>
</body>
</html>
```

В этом примере мы создаем список задач, где каждая задача представлена элементом `<li>` с флажком и текстом. При нажатии на кнопку "Добавить задачу" создается новая задача. При установке флажка текст задачи перечеркивается.

Это лишь базовые примеры работы с флажками и радиокнопками. JavaScript предоставляет множество возможностей для создания интерактивных элементов форм и обработки пользовательского ввода.
