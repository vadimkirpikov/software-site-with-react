## Директивы и пайпы в AngularJS 1.8.3

AngularJS расширяет HTML новыми атрибутами и тегами. Эти расширения называются **директивами**. Директивы - это функции, которые выполняются при компиляции HTML-шаблона AngularJS. 

### Встроенные директивы

AngularJS предоставляет множество встроенных директив, которые добавляют динамическое поведение в ваши веб-приложения. Рассмотрим некоторые из них:

**ng-app:**  Определяет корневой элемент приложения AngularJS.

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>Мое приложение</title>
</head>
<body>
  <!-- Содержимое приложения -->
</body>
</html>
```

**ng-model:**  Создает двустороннюю привязку данных между HTML-элементом формы и переменной в области видимости.

```html
<div ng-app>
  <input type="text" ng-model="userName">
  <p>Привет, {{ userName }}!</p>
</div>
```

В этом примере, все, что пользователь вводит в поле input, автоматически обновляет переменную `userName`, и наоборот.

**ng-repeat:**  Позволяет перебирать массив и создавать элементы DOM для каждого элемента массива.

```html
<div ng-app>
  <ul>
    <li ng-repeat="item in items">
      {{ item.name }} - {{ item.price }}
    </li>
  </ul>
</div>

<script>
  angular.module('myApp', [])
    .controller('myCtrl', function($scope) {
      $scope.items = [
        { name: 'Яблоко', price: 10 },
        { name: 'Банан', price: 15 },
        { name: 'Апельсин', price: 20 }
      ];
    });
</script>
```

В этом примере директива `ng-repeat` проходит по массиву `items` и создает элемент списка `<li>` для каждого элемента. 

**ng-show/ng-hide:**  Управляют видимостью HTML-элементов.

```html
<div ng-app>
  <button ng-click="show = !show">Показать/скрыть</button>
  <p ng-show="show">Этот текст виден</p>
</div>
```

В этом примере, абзац будет виден только если переменная `show` имеет значение `true`.

**ng-if:**  Добавляет/удаляет HTML-элемент из DOM в зависимости от условия. 

```html
<div ng-app>
  <input type="checkbox" ng-model="showElement">
  <div ng-if="showElement">
    Этот элемент появится, если флажок установлен.
  </div>
</div>
```

### Создание собственных директив

AngularJS позволяет создавать собственные директивы для расширения функциональности HTML.

```javascript
angular.module('myApp', [])
  .directive('myDirective', function() {
    return {
      // Опции директивы
    };
  });
```

**Опции директивы:**

| Опция | Описание |
|---|---|
| restrict | Определяет, как директива может быть использована в HTML (E - элемент, A - атрибут, C - класс, M - комментарий). По умолчанию: EA. |
| template | Указывает HTML-шаблон для директивы. |
| templateUrl | Указывает URL шаблона для директивы. |
| scope | Определяет область видимости директивы (true - новая изолированная область видимости, {} - новая область видимости, наследующая родительскую, false - использование области видимости родителя). |
| link | Функция, которая вызывается после связывания области видимости с шаблоном. |
| controller | Функция-конструктор контроллера для директивы. |
| controllerAs |  Псевдоним для контроллера директивы. |

**Пример:**

```javascript
angular.module('myApp', [])
  .directive('helloWorld', function() {
    return {
      restrict: 'E',
      template: '<h1>Привет, мир!</h1>'
    };
  });
```

Использование директивы в HTML:

```html
<hello-world></hello-world>
```

### Пайпы

**Пайпы** - это функции, которые принимают данные в качестве входных и преобразуют их в нужный формат. 

**Использование пайпа:**

```html
{{ значение | пайп }}
```

**Встроенные пайпы:**

AngularJS предоставляет множество встроенных пайпов, например:

* **uppercase/lowercase:**  Преобразует строку в верхний/нижний регистр.
* **date:**  Форматирует дату.
* **currency:**  Форматирует число как валюту.
* **filter:**  Фильтрует массив по заданному условию.
* **orderBy:**  Сортирует массив по заданному полю.

**Пример:**

```html
<div ng-app>
  <p>Дата: {{ currentDate | date:'dd.MM.yyyy' }}</p>
  <p>Цена: {{ price | currency:'RUB' }}</p>
</div>

<script>
  angular.module('myApp', [])
    .controller('myCtrl', function($scope) {
      $scope.currentDate = new Date();
      $scope.price = 1234.56;
    });
</script>
```

### Создание собственных пайпов

```javascript
angular.module('myApp', [])
  .filter('myPipe', function() {
    return function(input, argument1, argument2) {
      // Преобразование данных
      return output;
    };
  });
```

**Пример:**

```javascript
angular.module('myApp', [])
  .filter('reverse', function() {
    return function(input) {
      return input.split('').reverse().join('');
    };
  });
```

Использование пайпа:

```html
<div ng-app>
  <p>{{ 'Hello world' | reverse }}</p> 
</div>
```

Этот код выведет "dlrow olleH".

Директивы и пайпы - мощные инструменты AngularJS, которые позволяют создавать динамичные и интерактивные веб-приложения. 
