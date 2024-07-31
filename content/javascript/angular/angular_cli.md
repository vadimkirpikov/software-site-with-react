## Использование Angular CLI для сборки в AngularJS (1.8.x)

В то время как Angular CLI создавался преимущественно для работы с Angular (версии 2+), его можно эффективно использовать и для сборки проектов на AngularJS (1.x). Это особенно актуально для проектов, планирующих миграцию на Angular в будущем, так как Angular CLI упрощает управление зависимостями, сборку проекта и его развертывание. 

В данном разделе мы рассмотрим основные команды Angular CLI, которые помогут вам организовать сборку вашего приложения AngularJS.

### Установка Angular CLI

Перед началом работы, убедитесь, что на вашем компьютере установлен Node.js и npm (Node Package Manager). Проверить версии можно с помощью команд `node -v` и `npm -v` соответственно. 

Для установки Angular CLI выполните команду:

```bash
npm install -g @angular/cli
```

Флаг `-g` устанавливает Angular CLI глобально, что позволяет использовать его в любом проекте на вашем компьютере.

### Создание нового проекта

**Важно:** Angular CLI по умолчанию создает проекты на Angular. Для работы с AngularJS необходимо самостоятельно настроить проект. 

Создайте новый проект с помощью команды:

```bash
ng new my-angularjs-app --routing=false --style=css
```

* `my-angularjs-app` - название вашего проекта.
* `--routing=false` - отключает создание маршрутизации, так как мы будем использовать AngularJS роутинг.
* `--style=css` - устанавливает CSS как препроцессор стилей.

### Настройка проекта для AngularJS

После создания проекта, перейдите в его директорию:

```bash
cd my-angularjs-app
```

1. **Установка AngularJS:**

   Установите AngularJS и его зависимости с помощью npm:

   ```bash
   npm install angular@1.8.3 angular-route@1.8.3 --save
   ```

2. **Настройка `index.html`:**

   Откройте файл `src/index.html` и подключите библиотеки AngularJS и AngularJS Route:

   ```html
   <!doctype html>
   <html lang="en">
   <head>
     <meta charset="utf-8">
     <title>MyAngularjsApp</title>
     <base href="/">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="icon" type="image/x-icon" href="favicon.ico">
   </head>
   <body>
     <app-root></app-root>
     <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
     <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular-route.min.js"></script>
   </body>
   </html>
   ```
   Также, необходимо удалить тег `<app-root>` из `body` и заменить его на `ng-app`:
   ```html
   <body>
     <div ng-app="myApp"> </div>
     ...
   </body>
   ```

3. **Создание главного модуля AngularJS:**

   Создайте файл `src/app/app.module.js` и добавьте следующий код:

   ```javascript
   // Объявление главного модуля AngularJS
   angular.module('myApp', ['ngRoute'])
     .config(['$routeProvider', function($routeProvider) {
       $routeProvider.otherwise({redirectTo: '/'});
     }]);
   ```

4. **Создание простого контроллера и представления:**

   Создайте файлы `src/app/app.controller.js` и `src/app/app.template.html`:

   **app.controller.js:**

   ```javascript
   angular.module('myApp')
     .controller('AppCtrl', ['$scope', function($scope) {
       $scope.message = 'Hello from AngularJS!';
     }]);
   ```

   **app.template.html:**

   ```html
   <h1>{{message}}</h1>
   ```

5. **Подключение скриптов в `angular.json`:**

   Откройте файл `angular.json` и добавьте пути к вашим скриптам в секцию `projects.my-angularjs-app.architect.build.options.scripts`:

   ```json
   "scripts": [
       "src/app/app.module.js",
       "src/app/app.controller.js"
     ]
   ```

### Сборка и запуск приложения

Теперь вы можете собрать ваше приложение с помощью Angular CLI:

```bash
ng build
```

Эта команда соберет проект в папку `dist/my-angularjs-app`. 

Для запуска приложения используйте команду:

```bash
ng serve
```

Эта команда запустит локальный сервер разработки и автоматически откроет ваше приложение в браузере по адресу `http://localhost:4200/`. 

**Поздравляем!** Вы успешно настроили сборку приложения AngularJS с помощью Angular CLI.  

**Обратите внимание:** 

* Это базовая настройка проекта AngularJS с использованием Angular CLI. 
* В реальных проектах вам может понадобиться дополнительная настройка, например, конфигурация маршрутизации, подключение сторонних библиотек и настройка окружения для production-сборки. 

Использование Angular CLI для сборки проектов AngularJS позволяет использовать преимущества современных инструментов разработки, упрощает процесс сборки и  подготавливает проект к  подуальной миграции на Angular в будущем. 
