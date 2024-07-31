## Виджет progressbar

Виджет `progressbar` в jQuery UI используется для отображения прогресса выполнения задачи. Он предоставляет простой и понятный способ визуализации текущего состояния процесса для пользователя.

### Подключение библиотеки

Для использования виджета `progressbar` убедитесь, что у вас подключены библиотеки jQuery и jQuery UI:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Пример progressbar</title>
  <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-3.8.0.js"></script>
  <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
</head>
<body>
  <div id="progressbar"></div>
  <script>
    // Код JavaScript будет здесь
  </script>
</body>
</html>
```

### Создание progressbar

Для создания базового `progressbar` достаточно вызвать метод `.progressbar()` на HTML элементе, который будет использован для отображения прогресса. Обычно это пустой `<div>` элемент:

```html
<div id="progressbar"></div>
```

```javascript
$(function() {
  $("#progressbar").progressbar();
});
```

Этот код создаст горизонтальный индикатор прогресса с начальным значением 0.

### Установка значения

Значение `progressbar` можно установить с помощью опции `value` при инициализации или вызвав метод `.progressbar("value", newValue)`:

```javascript
// Установка значения при инициализации
$("#progressbar").progressbar({
  value: 50
});

// Установка значения после инициализации
$("#progressbar").progressbar("value", 75);
```

Значение должно быть целым числом от 0 до 100, где 0 - начало прогресса, а 100 - его завершение.

### Изменение внешнего вида

Внешний вид `progressbar` можно изменить с помощью CSS и предоставляемых jQuery UI классов.

#### Темы

jQuery UI предоставляет несколько готовых тем, которые можно подключить к странице. Для этого нужно изменить ссылку на файл стилей в HTML коде:

```html
<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/smoothness/jquery-ui.css">
```

В этом примере используется тема `smoothness`. Список доступных тем можно найти в документации jQuery UI.

#### Классы

Можно использовать CSS классы для более точной настройки внешнего вида `progressbar`:

* `ui-progressbar`: основной класс для контейнера `progressbar`.
* `ui-progressbar-value`: класс для элемента, отображающего текущее значение.

Пример изменения цвета `progressbar`:

```css
.ui-progressbar-value {
  background-color: #4CAF50; /* Зеленый цвет */
}
```

### Анимация

`progressbar` можно анимировать для плавного изменения значения. Для этого нужно передать объект с параметрами анимации в метод `.progressbar("value", newValue)`:

```javascript
$("#progressbar").progressbar({
  value: 0
});

// Анимировать изменение значения до 100 за 2 секунды
$("#progressbar").progressbar("value", 100, {
  duration: 2000, // Длительность анимации в миллисекундах
  easing: "linear" // Тип анимации
});
```

Доступные типы анимации можно найти в документации jQuery UI.

### События

`progressbar` поддерживает следующие события:

* `create`: срабатывает после создания `progressbar`.
* `change`: срабатывает при изменении значения.
* `complete`: срабатывает, когда значение достигает 100.

Пример использования события `change`:

```javascript
$("#progressbar").progressbar({
  change: function(event, ui) {
    console.log("Текущее значение:", ui.value);
  }
});
```

### Пример использования

Пример использования `progressbar` для отображения прогресса загрузки файла:

```html
<div id="progressbar"></div>
<button id="startUpload">Загрузить файл</button>

<script>
$(function() {
  $("#progressbar").progressbar();

  $("#startUpload").on("click", function() {
    // Имитация загрузки файла
    var progress = 0;
    var intervalId = setInterval(function() {
      progress += 10;
      $("#progressbar").progressbar("value", progress);

      if (progress >= 100) {
        clearInterval(intervalId);
        alert("Файл загружен!");
      }
    }, 500);
  });
});
</script>
```

В этом примере при нажатии на кнопку "Загрузить файл" запускается имитация загрузки, которая увеличивает значение `progressbar` каждые 500 миллисекунд. После достижения 100% выводится сообщение о завершении загрузки.

### Заключение

Виджет `progressbar` в jQuery UI предоставляет простой и удобный способ визуализации прогресса выполнения задач. С помощью CSS и JavaScript его можно легко настроить под требования вашего проекта.
