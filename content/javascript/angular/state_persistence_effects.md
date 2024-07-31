## Сохранение состояния и работа с эффектами в AngularJS

В этой статье мы рассмотрим важный аспект разработки одностраничных приложений - сохранение состояния приложения и использование эффектов анимации.  

### Сохранение состояния приложения

AngularJS предоставляет несколько способов сохранения состояния приложения между маршрутами и сессиями:

* **$rootScope:** Эта служба доступна глобально во всех частях приложения. Можно использовать $rootScope для хранения данных, которые должны быть доступны на протяжении всей жизни приложения. Однако, чрезмерное использование $rootScope может привести к трудностям в отладке и тестировании.

```javascript
angular.module('myApp').run(function($rootScope) {
  $rootScope.userName = 'Гость';
});

// В контроллере
angular.module('myApp').controller('myCtrl', function($scope, $rootScope) {
  $scope.greetUser = function() {
    alert('Привет, ' + $rootScope.userName + '!');
  };
});
```

* **Сервисы:** Сервисы - это синглтоны, что означает, что они создаются один раз и остаются доступными на протяжении всего времени жизни приложения. Сервисы отлично подходят для хранения данных и реализации логики, которая должна быть доступна в разных частях приложения.

```javascript
angular.module('myApp').service('UserService', function() {
  var userName = 'Гость';

  this.getUserName = function() {
    return userName;
  };

  this.setUserName = function(newName) {
    userName = newName;
  };
});

// В контроллере
angular.module('myApp').controller('myCtrl', function($scope, UserService) {
  $scope.greetUser = function() {
    alert('Привет, ' + UserService.getUserName() + '!');
  };
});
```

* **localStorage/sessionStorage:** Объекты `localStorage` и `sessionStorage` браузера позволяют сохранять данные на стороне клиента. `localStorage` хранит данные постоянно, пока пользователь не очистит хранилище браузера, в то время как `sessionStorage` хранит данные только в течение текущей сессии браузера.

```javascript
angular.module('myApp').controller('myCtrl', function($scope) {
  $scope.saveName = function() {
    localStorage.setItem('userName', $scope.userName);
  };

  $scope.loadName = function() {
    $scope.userName = localStorage.getItem('userName');
  };
});
```

### Работа с эффектами анимации

AngularJS интегрирован с библиотекой анимаций **ngAnimate**, которая предоставляет простой способ добавления плавных переходов и эффектов к вашим приложениям.

#### 1. Подключение ngAnimate

Убедитесь, что вы подключили файл библиотеки ngAnimate в свой HTML-файл:

```html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-animate.min.js"></script>
```

#### 2. Добавление зависимости ngAnimate

Добавьте модуль `ngAnimate` в качестве зависимости в ваше приложение:

```javascript
angular.module('myApp', ['ngAnimate']);
```

#### 3. Использование директив анимации

ngAnimate предоставляет ряд директив, которые можно использовать для создания анимаций:

* **ng-show, ng-hide:** Анимируют появление и исчезновение элементов.
* **ng-class:** Анимирует добавление и удаление классов CSS.
* **ng-repeat:** Анимирует добавление и удаление элементов в ng-repeat.

#### Пример анимации с ng-show

```html
<div ng-app="myApp" ng-controller="myCtrl">
  <button ng-click="showBox = !showBox">Показ/Скрытие</button>
  <div ng-show="showBox" class="my-box">
    Этот элемент анимируется!
  </div>
</div>
```

```javascript
angular.module('myApp', ['ngAnimate']).controller('myCtrl', function($scope) {
  $scope.showBox = false;
});
```

```css
.my-box {
  height: 100px;
  width: 100px;
  background-color: lightblue;
  transition: 0.5s ease-in-out;
}

.my-box.ng-hide-add,
.my-box.ng-hide-remove {
  transition: 0.5s ease-in-out;
}

.my-box.ng-hide-add.ng-hide-add-active,
.my-box.ng-hide-remove {
  opacity: 0;
}
```

В этом примере при нажатии на кнопку элемент с классом "my-box" плавно появится и исчезнет благодаря директиве ng-show и CSS-переходам.

#### Настройка анимаций

Вы можете настраивать анимации, создавая собственные классы CSS и используя JavaScript-анимации. Подробнее о настройке анимаций можно узнать в документации ngAnimate.


### Заключение

В этой статье мы рассмотрели основы сохранения состояния приложения с помощью $rootScope, сервисов и хранилища браузера, а также добавили анимации в наше приложение с помощью ngAnimate. Используя эти инструменты, вы можете создавать более удобные и интерактивные одностраничные приложения с AngularJS.
