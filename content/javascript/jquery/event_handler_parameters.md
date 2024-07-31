## Параметры обработчика. Объект Event

Обработчики событий в jQuery, такие как `.click()`, `.mouseover()` и другие, позволяют выполнять JavaScript код при наступлении определенного события на веб-странице. Эти обработчики могут принимать необязательные параметры, которые предоставляют дополнительную информацию о событии и позволяют более гибко управлять его поведением.

### Первый параметр обработчика: объект Event

Первый и наиболее важный параметр, который может принимать обработчик событий - это объект Event. Этот объект содержит подробную информацию о произошедшем событии, такую как:

* **Тип события**: `event.type` - строка, указывающая тип события (например, "click", "mouseover").
* **Целевой элемент**: `event.target` - ссылка на DOM-элемент, на котором произошло событие.
* **Текущий элемент**: `event.currentTarget` -  ссылка на DOM-элемент, к которому привязан обработчик события.
* **Координаты курсора**: 
    * `event.clientX`, `event.clientY` - координаты курсора относительно окна браузера.
    * `event.pageX`, `event.pageY` - координаты курсора относительно документа.
* **Клавиши клавиатуры**: `event.keyCode`, `event.which` - код нажатой клавиши (для событий клавиатуры).
* **Предотвращение дефолтного поведения**: `event.preventDefault()` - метод, предотвращающий стандартное действие браузера для данного события.
* **Остановка всплытия**: `event.stopPropagation()` - метод, останавливающий всплытие события вверх по DOM-дереву.

### Использование объекта Event

Давайте рассмотрим пример, демонстрирующий использование объекта Event:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Пример объекта Event</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.8.0/jquery.min.js"></script>
  <script>
    $(document).ready(function(){
      $("div").click(function(event){
        // Вывод типа события и координат курсора
        alert("Тип события: " + event.type + 
              "\nКоординаты: (" + event.clientX + ", " + event.clientY + ")");

        // Предотвращение всплытия события
        event.stopPropagation();
      });
    });
  </script>
</head>
<body>
  <div style="width:200px; height:100px; background:yellow;">
    Нажмите внутри блока
  </div>
</body>
</html>
```

В этом примере мы создаем простой HTML-документ с одним div-элементом. При клике на этом элементе выполняется следующий код:

1. **Получение информации о событии**:  мы получаем доступ к объекту `event`, передаваемому в функцию-обработчик.
2. **Вывод информации**:  выводим тип события (`event.type`) и координаты курсора (`event.clientX`, `event.clientY`) в окне alert.
3. **Предотвращение всплытия**:  вызываем метод `event.stopPropagation()`, чтобы предотвратить всплытие события клика на родительские элементы.

### Дополнительные методы объекта Event

Помимо перечисленных выше, объект Event предоставляет и другие полезные методы:

* `event.isDefaultPrevented()` - возвращает true, если было вызвано `event.preventDefault()`, иначе false.
* `event.isPropagationStopped()` - возвращает true, если было вызвано `event.stopPropagation()`, иначе false.
* `event.stopImmediatePropagation()` - останавливает всплытие события и предотвращает вызов других обработчиков, привязанных к тому же элементу и событию.

### Заключение

Объект Event - мощный инструмент, предоставляющий доступ к важной информации о событиях на веб-странице. Используя его свойства и методы, вы можете создавать более интерактивные и функциональные веб-приложения.  Более подробно о типах событий и их особенностях мы поговорим в следующих разделах.