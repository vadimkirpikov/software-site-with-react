## Валидация и обработка ошибок в формах AngularJS

В этом разделе мы рассмотрим, как реализовать валидацию и обработку ошибок в формах AngularJS. Валидация формы – это важный аспект разработки любого веб-приложения, который позволяет проверить корректность введенных пользователем данных перед их отправкой на сервер.

### Базовая валидация

AngularJS предоставляет встроенные директивы для валидации наиболее распространенных типов данных, таких как email, URL, число и др. Эти директивы автоматически проверяют ввод пользователя и добавляют соответствующие CSS-классы к элементам формы, чтобы визуально обозначить успешную или неудачную валидацию.

**Пример:**

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>Валидация формы</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="formCtrl">

  <form name="myForm">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" ng-model="user.email" required>
    <span ng-show="myForm.email.$invalid && myForm.email.$touched">Пожалуйста, введите корректный email.</span><br><br>

    <label for="age">Возраст:</label>
    <input type="number" id="age" name="age" ng-model="user.age" min="18" required>
    <span ng-show="myForm.age.$invalid && myForm.age.$touched">Возраст должен быть не менее 18 лет.</span><br><br>

    <button type="submit" ng-disabled="myForm.$invalid">Отправить</button>
  </form>

  <script>
    var app = angular.module('myApp', []);
    app.controller('formCtrl', function($scope) {
      $scope.user = {};
    });
  </script>

</body>
</html>
```

**Описание:**

* `ng-model` связывает поле ввода с моделью `user` в контроллере.
* `required` делает поле обязательным для заполнения.
* `type="email"` и `min="18"` задают тип данных и ограничение на значение соответственно.
* `ng-show` показывает сообщение об ошибке, если поле не валидно (`$invalid`) и пользователь его коснулся (`$touched`).
* `ng-disabled` блокирует кнопку отправки, если форма не валидна (`myForm.$invalid`).

### Пользовательские сообщения об ошибках

Вы можете создавать собственные сообщения об ошибках, используя директиву `ng-messages`. 

**Пример:**

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>Валидация формы</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="formCtrl">

  <form name="myForm">
    <label for="username">Имя пользователя:</label>
    <input type="text" id="username" name="username" ng-model="user.username" required ng-minlength="5" ng-maxlength="15">
    <div ng-messages="myForm.username.$error" ng-if="myForm.username.$touched">
      <div ng-message="required">Пожалуйста, введите имя пользователя.</div>
      <div ng-message="minlength">Имя пользователя должно быть не менее 5 символов.</div>
      <div ng-message="maxlength">Имя пользователя должно быть не более 15 символов.</div>
    </div><br><br>

    <button type="submit" ng-disabled="myForm.$invalid">Отправить</button>
  </form>

  <script>
    var app = angular.module('myApp', []);
    app.controller('formCtrl', function($scope) {
      $scope.user = {};
    });
  </script>

</body>
</html>
```

**Описание:**

* `ng-messages` отображает сообщения об ошибках, указанные в директивах `ng-message`.
* `ng-message` отображается, если соответствующее условие валидации не выполнено.

### Пользовательская валидация

Вы можете создавать собственные директивы валидации для реализации более сложной логики проверки данных.

**Пример:**

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>Валидация формы</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body ng-controller="formCtrl">

  <form name="myForm">
    <label for="password">Пароль:</label>
    <input type="password" id="password" name="password" ng-model="user.password" required match-password="user.confirmPassword">
    <span ng-show="myForm.password.$error.match">Пароли не совпадают.</span><br><br>

    <label for="confirmPassword">Подтвердите пароль:</label>
    <input type="password" id="confirmPassword" name="confirmPassword" ng-model="user.confirmPassword" required>
    <br><br>

    <button type="submit" ng-disabled="myForm.$invalid">Отправить</button>
  </form>

  <script>
    var app = angular.module('myApp', []);
    app.controller('formCtrl', function($scope) {
      $scope.user = {};
    });

    app.directive('matchPassword', function() {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          ctrl.$validators.match = function(modelValue, viewValue) {
            var password = scope.$eval(attrs.matchPassword);
            return modelValue === password;
          };
        }
      };
    });
  </script>

</body>
</html>
```

**Описание:**

* `match-password="user.confirmPassword"` связывает поле пароля с полем подтверждения пароля.
* Директива `matchPassword` проверяет, совпадают ли значения в полях пароля и подтверждения пароля.

### Обработка отправки формы

При отправке формы вы можете обработать данные, полученные из модели `$scope`, и отправить их на сервер с помощью `$http` или другого сервиса.

**Пример:**

```javascript
app.controller('formCtrl', function($scope, $http) {
  $scope.user = {};

  $scope.submitForm = function() {
    if ($scope.myForm.$valid) {
      $http.post('/api/users', $scope.user)
        .then(function(response) {
          // Успешная отправка формы
          console.log(response.data);
        }, function(error) {
          // Обработка ошибки
          console.error(error);
        });
    }
  };
});
```

В этом примере мы проверяем валидность формы перед отправкой данных на сервер.  

Это лишь базовые примеры работы с валидацией и обработкой ошибок в формах AngularJS. В документации AngularJS вы найдете более подробную информацию о доступных директивах и методах работы с формами.
