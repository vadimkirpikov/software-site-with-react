## Установка AngularJS 1.8.3

Данная статья посвящена установке AngularJS 1.8.3 и настройке проекта для начала работы с ним.

### Способы установки AngularJS

Существует несколько способов установки AngularJS в проект:

1. **Загрузка файлов с официального сайта:**

    * Перейдите на сайт AngularJS: https://angularjs.org/
    * Выберите нужную версию (1.8.3).
    * Скачайте архив с файлами библиотеки.
    * Подключите файлы `angular.min.js` (или `angular.js` для не минифицированной версии) и `angular-route.min.js` (опционально, если планируется использовать маршрутизацию) в ваш HTML файл:

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>Мое приложение на AngularJS</title>
        <script src="путь/до/angular.min.js"></script>
        <script src="путь/до/angular-route.min.js"></script> 
    </head>
    <body>
        </body>
    </html>
    ```

2. **Использование CDN:**

    * Подключите AngularJS напрямую с CDN Google:

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>Мое приложение на AngularJS</title>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-route.min.js"></script> 
    </head>
    <body>
        </body>
    </html>
    ```

3. **Установка с помощью менеджера пакетов (npm, bower):**

    * Установите Node.js и npm (https://nodejs.org/).
    * Используйте npm или bower для установки AngularJS:

    ```
    // npm
    npm install angular@1.8.3 

    // bower
    bower install angular#1.8.3
    ```

    * Подключите файлы библиотеки в HTML, как описано в первом способе, указав путь к папке с установленной библиотекой.

### Создание простого приложения AngularJS

Создайте HTML файл `index.html` и добавьте следующий код:

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <title>Мое приложение на AngularJS</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
</head>
<body>
    <div ng-controller="myController">
        <h1>{{ message }}</h1>
    </div>
    <script>
        // Определяем модуль приложения
        var app = angular.module("myApp", []);

        // Определяем контроллер
        app.controller("myController", function($scope) {
            $scope.message = "Привет, AngularJS!";
        });
    </script>
</body>
</html>
```

**Описание кода:**

* `ng-app="myApp"`: определяет корневой элемент приложения AngularJS.
* `ng-controller="myController"`: связывает элемент `div` с контроллером `myController`.
* `{{ message }}`: директива AngularJS для вывода значения переменной `message` из области видимости контроллера.
* `angular.module("myApp", [])`: создает модуль приложения с именем `myApp`.
* `app.controller("myController", function($scope) {...})`: определяет контроллер `myController` и внедряет сервис `$scope`.
* `$scope.message = "Привет, AngularJS!";`: задает значение переменной `message` в области видимости контроллера.

Откройте файл `index.html` в браузере, и вы увидите сообщение "Привет, AngularJS!".

### Заключение

В данной статье были рассмотрены основные способы установки AngularJS 1.8.3. Выберите наиболее удобный для вас способ и настройте проект для начала разработки. 
