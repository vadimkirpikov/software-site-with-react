## Аутентификация и авторизация в AngularJS 1.8.3

Безопасность веб-приложений играет критическую роль в современном мире. Одним из важных аспектов обеспечения безопасности является аутентификация и авторизация пользователей. 

**Аутентификация** - это процесс проверки подлинности пользователя, подтверждающий, что он является тем, за кого себя выдает. 

**Авторизация** - это процесс проверки прав доступа пользователя к определенным ресурсам или функциям приложения. 

В данном разделе мы рассмотрим основные принципы реализации аутентификации и авторизации в приложениях AngularJS 1.8.3.

### Принципы работы

В большинстве случаев аутентификация реализуется путем проверки введенных пользователем учетных данных (логин и пароль) на сервере. В случае успешной проверки сервер генерирует специальный токен (например, JWT - JSON Web Token), который отправляется клиенту и используется для последующей авторизации запросов.

Авторизация выполняется путем проверки наличия и валидности токена при каждом запросе к защищенным ресурсам. На основе информации, хранящейся в токене (например, роли пользователя), сервер принимает решение о предоставлении или отказе в доступе к запрошенному ресурсу.

### Реализация на стороне клиента

Рассмотрим пример реализации аутентификации и авторизации на стороне клиента с использованием AngularJS 1.8.3.

**1. Создание сервиса аутентификации**

```javascript
angular.module('myApp')
  .factory('AuthService', ['$http', '$window', function($http, $window) {
    var authService = {};

    // Функция для сохранения токена в localStorage
    authService.saveToken = function(token) {
      $window.localStorage.setItem('token', token);
    };

    // Функция для получения сохраненного токена
    authService.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    // Функция для авторизации пользователя (отправка запроса на сервер)
    authService.login = function(username, password) {
      return $http.post('/api/login', {username: username, password: password})
        .then(function(response) {
          authService.saveToken(response.data.token);
          return response.data;
        });
    };

    // Функция для выхода пользователя
    authService.logout = function() {
      $window.localStorage.removeItem('token');
    };

    // Функция для проверки, авторизован ли пользователь
    authService.isLoggedIn = function() {
      var token = authService.getToken();
      return !!token; // Проверка на наличие токена
    };

    return authService;
  }]);
```

**2. Создание HTTP-перехватчика для добавления токена в заголовки запросов**

```javascript
angular.module('myApp')
  .factory('authInterceptor', ['$q', 'AuthService', function($q, AuthService) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        var token = AuthService.getToken();
        if (token) {
          config.headers.Authorization = 'Bearer ' + token; // Добавление токена в заголовок Authorization
        }
        return config;
      },
      responseError: function(response) {
        // Обработка ошибок авторизации (например, 401 Unauthorized)
        if (response.status === 401) {
          AuthService.logout(); // Выход пользователя
          // Перенаправление на страницу входа
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor'); // Добавление перехватчика в $httpProvider
  }]);
```

**3. Использование сервиса аутентификации в контроллерах**

```javascript
angular.module('myApp')
  .controller('LoginController', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.login = function() {
      AuthService.login($scope.username, $scope.password)
        .then(function() {
          // Перенаправление на защищенную страницу
          $location.path('/dashboard');
        })
        .catch(function(error) {
          // Обработка ошибки авторизации
          $scope.errorMessage = error.data.message;
        });
    };
  }])
  .controller('DashboardController', ['$scope', 'AuthService', function($scope, AuthService) {
    // Проверка авторизации пользователя
    if (!AuthService.isLoggedIn()) {
      // Перенаправление на страницу входа
      $location.path('/login');
    }

    // Логика контроллера для защищенной страницы
  }]);
```

### Реализация на стороне сервера

Реализация на стороне сервера выходит за рамки данной статьи. Важно помнить, что сервер должен обеспечивать следующие функции:

* Обработка запросов на аутентификацию и генерация токенов
* Проверка токенов при каждом запросе к защищенным ресурсам
* Предоставление или отказ в доступе к ресурсам на основе информации, хранящейся в токене

### Заключение

В этом разделе мы рассмотрели основные принципы реализации аутентификации и авторизации в приложениях AngularJS 1.8.3. Важно помнить, что безопасность - это непрерывный процесс, требующий постоянного внимания и совершенствования. 
