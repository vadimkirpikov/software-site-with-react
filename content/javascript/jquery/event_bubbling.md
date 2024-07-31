## Всплытие событий в jQuery

Всплытие событий — это механизм в JavaScript, при котором событие, возникшее на определенном элементе страницы, не обрабатывается этим элементом моментально. Вместо этого, оно начинает "всплывать" вверх по DOM-дереву, последовательно проверяя родительские элементы на наличие обработчиков этого события. 

Представьте себе дерево, где каждый узел — это HTML-элемент. Если событие происходит на листе этого дерева, оно не остаётся на месте. Вместо этого, оно начинает путешествие к корню, проверяя каждый узел на своём пути.

### Почему это важно в jQuery?

jQuery активно использует всплытие событий для своей работы. Понимание этого механизма позволит вам:

* Эффективно назначать обработчики событий на группы элементов.
* Избегать конфликтов между разными скриптами.
* Создавать более производительный и чистый код.

### Как это работает?

Рассмотрим пример. Допустим, у нас есть следующая HTML-структура:

```html
<div id="grandfather">
  <div id="father">
    <p id="child">Click me!</p>
  </div>
</div>
```

Теперь, давайте назначим обработчики событий на каждый из этих элементов:

```javascript
$(document).ready(function() {
  $("#child").click(function() {
    alert("Вы кликнули на абзац!");
  });

  $("#father").click(function() {
    alert("Вы кликнули на div с id 'father'!");
  });

  $("#grandfather").click(function() {
    alert("Вы кликнули на div с id 'grandfather'!");
  });
});
```

Что произойдет, если мы кликнем на абзац (`<p id="child">`)? 

1. Сначала сработает обработчик, назначенный непосредственно на абзац (`#child`). Вы увидите сообщение "Вы кликнули на абзац!".
2. Далее, событие "всплывет" к родительскому элементу - `div` с `id="father"`.  Сработает и его обработчик, выдав сообщение "Вы кликнули на div с id 'father'!".
3. Наконец, событие достигнет `div` с `id="grandfather"`. Соответственно, появится сообщение "Вы кликнули на div с id 'grandfather'!".

### Остановка всплытия

В некоторых случаях вам может понадобиться предотвратить всплытие события. Например, если вы хотите, чтобы обработчик, назначенный на дочерний элемент, выполнился, а обработчики родительских элементов - нет. 

Для этого в jQuery используется метод `stopPropagation()`. 

Модифицируем наш пример, чтобы событие не всплывало выше `div` с `id="father"`:

```javascript
$(document).ready(function() {
  $("#child").click(function() {
    alert("Вы кликнули на абзац!");
  });

  $("#father").click(function(event) {
    event.stopPropagation(); // Останавливаем всплытие
    alert("Вы кликнули на div с id 'father'!");
  });

  $("#grandfather").click(function() {
    alert("Вы кликнули на div с id 'grandfather'!");
  });
});
```

Теперь, при клике на абзац, вы увидите только два сообщения: "Вы кликнули на абзац!" и "Вы кликнули на div с id 'father'!". 

### Делегирование событий

Всплытие событий лежит в основе делегирования событий в jQuery. Делегирование позволяет назначить один обработчик события на родительский элемент, который будет срабатывать для всех его потомков, удовлетворяющих определенному условию.

Например, давайте создадим список задач, где при клике на любую задачу будет выводиться её текст:

```html
<ul id="tasks">
  <li>Купить молоко</li>
  <li>Позвонить маме</li>
  <li>Закончить проект</li>
</ul>
```

Вместо того, чтобы назначать обработчик на каждый `<li>` по отдельности, мы можем использовать делегирование:

```javascript
$(document).ready(function() {
  $("#tasks").on("click", "li", function() {
    alert($(this).text());
  });
});
```

В этом примере:

* `$("#tasks")`:  выбираем родительский элемент (`<ul>`).
* `.on("click", "li", ...)`: назначаем обработчик события `click` на все дочерние элементы `li` within `#tasks`.
* `$(this)`: внутри обработчика, `this` будет ссылаться на конкретный элемент `li`, на котором произошло событие.

Таким образом, мы добиваемся желаемого поведения с помощью всего одного обработчика, что делает код чище и эффективнее.

Всплытие событий - это важный аспект работы с событиями в jQuery. Понимание этого механизма позволит вам создавать более сложные и интерактивные веб-приложения. 