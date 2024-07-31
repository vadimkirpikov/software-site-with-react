## Обзор структуры проекта AngularJS

Приступая к разработке приложения на AngularJS, важно понимать организацию его файловой структуры. Грамотная структура проекта – залог его поддерживаемости, масштабируемости и простоты в работе для команды разработчиков. В этом разделе мы рассмотрим типичную структуру проекта AngularJS и разберем назначение основных папок и файлов.

### Типичная структура проекта

```
my-angular-app/
├── app/
│   ├── components/
│   │   └── example-component/
│   │       ├── example-component.component.js
│   │       ├── example-component.controller.js
│   │       └── example-component.template.html
│   ├── app.module.js
│   └── app.config.js
├── index.html
└── ...
```

### Описание основных элементов

- **`my-angular-app/`**: Корневая папка проекта, содержащая все файлы приложения.

- **`app/`**: Папка, содержащая исходный код приложения.

    - **`components/`**: Папка для хранения компонентов приложения. Компоненты – это основные строительные блоки приложения AngularJS, которые позволяют разбить пользовательский интерфейс на независимые и переиспользуемые части. Каждый компонент, как правило, располагается в отдельной папке и включает в себя:
        - **`.component.js`**: Файл определения компонента, содержащий его конфигурацию (например, шаблон, контроллер, селектор).
        - **`.controller.js`**: Файл контроллера, отвечающего за логику компонента.
        - **`.template.html`**: Файл шаблона, определяющего внешний вид компонента.

    - **`app.module.js`**: Файл, содержащий определение главного модуля приложения.

    ```javascript
    // app/app.module.js

    angular.module('myAngularApp', []); 
    ```

    - **`app.config.js`**: Файл для конфигурации приложения, например, настройки маршрутизации или провайдеров.

    ```javascript
    // app/app.config.js

    angular.module('myAngularApp')
      .config(['$routeProvider', function($routeProvider) {
        // ... конфигурация маршрутизации
      }]);
    ```

- **`index.html`**: Главный HTML-файл приложения, который загружает AngularJS и другие зависимости, а также определяет корневой элемент приложения.

```html
<!DOCTYPE html>
<html lang="ru" ng-app="myAngularApp">
<head>
  <meta charset="UTF-8">
  <title>Мое приложение AngularJS</title>
  <script src="path/to/angular.js"></script>
  <!-- Другие зависимости -->
  <script src="app/app.module.js"></script>
  <script src="app/app.config.js"></script>
  <!-- Другие скрипты приложения -->
</head>
<body>
  <div ng-view></div>
</body>
</html>
```

### Пример компонента

Рассмотрим пример простого компонента "Список дел":

**`app/components/todo-list/todo-list.component.js`**

```javascript
// app/components/todo-list/todo-list.component.js

angular.module('myAngularApp')
  .component('todoList', {
    templateUrl: 'app/components/todo-list/todo-list.template.html',
    controller: 'TodoListController'
  });
```

**`app/components/todo-list/todo-list.controller.js`**

```javascript
// app/components/todo-list/todo-list.controller.js

angular.module('myAngularApp')
  .controller('TodoListController', function() {
    var vm = this; // Сохраняем ссылку на this

    vm.todos = [
      { text: 'Купить молоко', completed: false },
      { text: 'Выгулять собаку', completed: true }
    ];

    vm.addTodo = function() {
      vm.todos.push({ text: vm.newTodoText, completed: false });
      vm.newTodoText = '';
    };

    vm.remaining = function() {
      return vm.todos.filter(function(todo) {
        return !todo.completed;
      }).length;
    };
  });
```

**`app/components/todo-list/todo-list.template.html`**

```html
<ul>
  <li ng-repeat="todo in $ctrl.todos">
    <input type="checkbox" ng-model="todo.completed">
    <span ng-class="{ 'completed': todo.completed }">{{ todo.text }}</span>
  </li>
</ul>
<form ng-submit="$ctrl.addTodo()">
  <input type="text" ng-model="$ctrl.newTodoText" placeholder="Новая задача">
  <button type="submit">Добавить</button>
</form>
<p>Осталось задач: {{ $ctrl.remaining() }}</p>
```

### Заключение

Это лишь базовая структура проекта AngularJS. В зависимости от сложности и специфики приложения, вам может потребоваться добавить дополнительные папки и файлы. Важно стремиться к тому, чтобы структура проекта была логичной, понятной и легко масштабируемой. 
