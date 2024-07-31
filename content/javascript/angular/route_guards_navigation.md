## Защита маршрутов и навигация

AngularJS предоставляет мощные механизмы для защиты маршрутов и управления навигацией в вашем одностраничном приложении (SPA). 

### Сервис $routeProvider

Сервис `$routeProvider` позволяет определить маршруты и связать их с контроллерами и представлениями. Для каждого маршрута можно установить правила доступа, используя свойство `resolve`. 

Рассмотрим пример. Допустим, у нас есть два типа пользователей: администраторы и обычные пользователи. Администраторы имеют доступ ко всем страницам, а обычные пользователи - только к некоторым. 

```javascript
// app.js
angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'admin.html',
        controller: 'AdminController',
        resolve: {
          isAdmin: function(AuthService) {
            return AuthService.isAdmin();
          }
        }
      })
      .when('/user', {
        templateUrl: 'user.html',
        controller: 'UserController',
        resolve: {
          isAuthenticated: function(AuthService) {
            return AuthService.isAuthenticated();
          }
        }
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
```

В этом примере мы определили два маршрута: `/admin` и `/user`. Для маршрута `/admin` мы указали, что для доступа к нему необходимо, чтобы функция `AuthService.isAdmin()` вернула `true`. Для маршрута `/user` мы указали, что для доступа к нему необходимо, чтобы функция `AuthService.isAuthenticated()` вернула `true`.

### Сервис AuthService

Сервис `AuthService` отвечает за аутентификацию и авторизацию пользователей. 

```javascript
// auth.service.js
angular.module('myApp')
  .factory('AuthService', function($http, $q) {
    var user = null;

    return {
      login: function(credentials) {
        // Отправка запроса на сервер для аутентификации пользователя
        return $http.post('/api/login', credentials)
          .then(function(response) {
            user = response.data;
            return user;
          });
      },
      logout: function() {
        // Отправка запроса на сервер для выхода из системы
        return $http.post('/api/logout')
          .then(function() {
            user = null;
          });
      },
      isAuthenticated: function() {
        // Проверка, аутентифицирован ли пользователь
        return !!user;
      },
      isAdmin: function() {
        // Проверка, является ли пользователь администратором
        return !!user && user.role === 'admin';
      }
    };
  });
```

### Перехват событий маршрутизации

AngularJS предоставляет возможность перехватывать события маршрутизации, используя сервис `$rootScope`. Это позволяет выполнять определенные действия до или после перехода на новый маршрут.

Например, мы можем перехватывать событие `$routeChangeStart` для проверки, аутентифицирован ли пользователь, перед тем как разрешить ему доступ к защищенному маршруту.

```javascript
// app.js
angular.module('myApp')
  .run(function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.access && next.access.requiresLogin && !AuthService.isAuthenticated()) {
        // Перенаправление на страницу входа, если пользователь не аутентифицирован
        $location.path('/login');
      }
    });
  });
```

В этом примере мы перехватываем событие `$routeChangeStart` и проверяем, есть ли у маршрута свойство `access.requiresLogin`. Если это свойство установлено и пользователь не аутентифицирован, то мы перенаправляем его на страницу входа.

### Сервис $location

Сервис `$location` позволяет получать текущий URL-адрес и переходить на другие страницы приложения.

```javascript
// some.controller.js
angular.module('myApp')
  .controller('SomeController', function($location) {
    // Переход на страницу профиля пользователя
    $location.path('/profile');
  });
```

### Директива ng-view

Директива `ng-view` используется для отображения представления, связанного с текущим маршрутом.

```html
<div ng-view></div>
```

### Пример реализации

```html
<!-- index.html -->
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>AngularJS Routing</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-route.min.js"></script>
  <script src="app.js"></script>
  <script src="auth.service.js"></script>
</head>
<body>
  <div ng-view></div>
</body>
</html>
```

```javascript
// app.js
angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'admin.html',
        controller: 'AdminController',
        resolve: {
          isAdmin: function(AuthService) {
            return AuthService.isAdmin();
          }
        }
      })
      .when('/user', {
        templateUrl: 'user.html',
        controller: 'UserController',
        resolve: {
          isAuthenticated: function(AuthService) {
            return AuthService.isAuthenticated();
          }
        }
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if (next.$$route && next.$$route.resolve && next.$$route.resolve.isAuthenticated && !AuthService.isAuthenticated()) {
        $location.path('/login');
      }
    });
  });
```

```javascript
// auth.service.js
angular.module('myApp')
  .factory('AuthService', function($q) {
    var currentUser = null;

    return {
      login: function(credentials) {
        var deferred = $q.defer();
        // Моделирование асинхронного запроса на сервер
        setTimeout(function() {
          if (credentials.username === 'admin' && credentials.password === 'admin') {
            currentUser = {
              username: 'admin',
              role: 'admin'
            };
            deferred.resolve(currentUser);
          } else if (credentials.username === 'user' && credentials.password === 'user') {
            currentUser = {
              username: 'user',
              role: 'user'
            };
            deferred.resolve(currentUser);
          } else {
            deferred.reject('Invalid credentials');
          }
        }, 1000);
        return deferred.promise;
      },
      logout: function() {
        var deferred = $q.defer();
        setTimeout(function() {
          currentUser = null;
          deferred.resolve();
        }, 1000);
        return deferred.promise;
      },
      isAuthenticated: function() {
        return !!currentUser;
      },
      isAdmin: function() {
        return !!currentUser && currentUser.role === 'admin';
      }
    };
  });
```

### Заключение

В этой статье мы рассмотрели основы защиты маршрутов и навигации в AngularJS. Сервисы `$routeProvider`, `$location`, `AuthService` и `$rootScope` предоставляют мощные инструменты для управления доступом к различным частям вашего приложения. Не забывайте использовать эти инструменты для обеспечения безопасности и удобства использования вашего одностраничного приложения. 
