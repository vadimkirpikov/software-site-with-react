## Формы и валидация в AngularJS

Формы являются основой для взаимодействия с пользователем в большинстве веб-приложений.  AngularJS предлагает мощный и гибкий механизм для создания форм и валидации данных, вводимых пользователем. 

### Создание простой формы

Для создания формы в AngularJS используется директива `ng-model`, которая связывает поля формы с переменными в области видимости контроллера. Рассмотрим пример:

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>AngularJS Forms</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="formCtrl">

  <form name="myForm">
    Имя: <input type="text" ng-model="name">
  </form>

  <p>Привет, {{ name }}!</p>

  <script>
    var app = angular.module('myApp', []);
    app.controller('formCtrl', function($scope) {
      
    });
  </script>

</body>
</html>
```

В этом примере мы создаем простую форму с одним полем ввода "Имя". Директива `ng-model="name"` связывает это поле с переменной `$scope.name` в контроллере. Изменения в поле ввода будут автоматически отражаться в переменной `$scope.name` и наоборот. 

### Валидация формы

AngularJS предоставляет набор встроенных директив для валидации форм. Рассмотрим пример добавления валидации на обязательное поле "Имя":

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>AngularJS Forms</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="formCtrl">

  <form name="myForm">
    Имя: <input type="text" ng-model="name" required> 
    <span ng-show="myForm.name.$error.required">Поле "Имя" обязательно для заполнения</span>
  </form>

  <p>Привет, {{ name }}!</p>

  <script>
    var app = angular.module('myApp', []);
    app.controller('formCtrl', function($scope) {
      
    });
  </script>

</body>
</html>
```

В этом примере мы добавили атрибут `required` к полю ввода "Имя". Теперь AngularJS будет проверять, заполнено ли это поле. Если поле пустое, появится сообщение об ошибке. 

**Основные директивы валидации:**

| Директива | Описание |
|---|---|
| `required` | Проверяет, заполнено ли поле. |
| `ng-minlength` | Проверяет, не короче ли значение в поле указанной длины. |
| `ng-maxlength` | Проверяет, не длиннее ли значение в поле указанной длины. |
| `ng-pattern` | Проверяет, соответствует ли значение в поле указанному регулярному выражению. |
| `ng-disabled` | Блокирует поле формы, если значение выражения истинно. |

### Отображение состояния формы

AngularJS предоставляет набор свойств для отслеживания состояния формы и отдельных полей. Используя эти свойства, мы можем динамически изменять стили элементов формы или отображать сообщения об ошибках.

**Свойства формы и полей:**

| Свойство | Описание |
|---|---|
| `$dirty` | Возвращает `true`, если поле было изменено пользователем. |
| `$pristine` | Возвращает `true`, если поле не было изменено пользователем. |
| `$valid` | Возвращает `true`, если поле проходит валидацию. |
| `$invalid` | Возвращает `true`, если поле не проходит валидацию. |
| `$touched` | Возвращает `true`, если поле было "тронуто" (получило фокус). |
| `$untouched` | Возвращает `true`, если поле не было "тронуто". |
| `$error` | Содержит объект с информацией об ошибках валидации. |

**Пример отображения состояния формы:**

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>AngularJS Forms</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="formCtrl">

  <form name="myForm">
    Имя: <input type="text" ng-model="name" name="userName" required> 
    <span ng-show="myForm.userName.$touched && myForm.userName.$error.required">Поле "Имя" обязательно для заполнения</span>
  </form>
  <p ng-show="myForm.$dirty">Форма была изменена</p>
  <p ng-show="myForm.$valid">Форма валидна</p>

  <script>
    var app = angular.module('myApp', []);
    app.controller('formCtrl', function($scope) {
      
    });
  </script>

</body>
</html>
```

В этом примере мы используем свойство `$touched`, чтобы сообщение об ошибке отображалось только после того, как пользователь "тронул" поле "Имя". Также мы выводим сообщения о изменении и валидности всей формы.

### Отправка формы

Для отправки формы в AngularJS используется директива `ng-submit`, которая перехватывает событие отправки формы и выполняет указанную функцию. Внутри этой функции мы можем получить доступ к данным формы и выполнить необходимые действия, например, отправить данные на сервер.

**Пример отправки формы:**

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>AngularJS Forms</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="formCtrl">

  <form name="myForm" ng-submit="submitForm()">
    Имя: <input type="text" ng-model="name" required>
    <br>
    <button type="submit">Отправить</button>
  </form>

  <script>
    var app = angular.module('myApp', []);
    app.controller('formCtrl', function($scope) {
      $scope.submitForm = function() {
        if ($scope.myForm.$valid) {
          // Отправка данных формы на сервер
          console.log("Форма отправлена:", $scope.name);
        }
      };
    });
  </script>

</body>
</html>
```

В этом примере мы добавили директиву `ng-submit="submitForm()"` к форме. При отправке формы будет вызвана функция `$scope.submitForm()`. Внутри этой функции мы проверяем валидность формы с помощью свойства `$valid` и, если форма валидна, отправляем данные на сервер (в данном примере просто выводим данные в консоль).


## Заключение

В этом разделе мы рассмотрели основы работы с формами и валидацией в AngularJS. Мы научились создавать простые формы, добавлять валидацию к полям, отслеживать состояние формы и отправлять данные на сервер. AngularJS предоставляет широкие возможности для работы с формами, и это лишь базовые знания, которые помогут вам начать создавать интерактивные веб-приложения.
