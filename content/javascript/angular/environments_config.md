## Конфигурация окружений и переменные среды в AngularJS 1.8.3

При разработке AngularJS приложений часто возникает необходимость иметь разные конфигурации для различных окружений, например, для разработки, тестирования и продакшена. Это позволяет легко переключаться между различными настройками, такими как адреса API, ключи API, режимы отладки и т.д. 

AngularJS предоставляет несколько способов управления конфигурациями и переменными среды:

### 1. Использование констант

Константы - это неизменяемые значения, которые определяются один раз и доступны во всем приложении. Они идеально подходят для хранения значений, которые не должны меняться во время выполнения приложения.

**Пример:**

```javascript
angular.module('myApp', [])
  .constant('API_URL', 'https://api.example.com/v1/');

angular.module('myApp')
  .controller('MyController', function($scope, API_URL) {
    // использование API_URL в контроллере
    $scope.apiUrl = API_URL;
  });
```

В этом примере мы определили константу `API_URL` и использовали ее в контроллере.

### 2. Использование сервисов значений

Сервисы значений - это объекты, которые содержат свойства и методы. Они похожи на константы, но могут содержать более сложную логику.

**Пример:**

```javascript
angular.module('myApp', [])
  .value('AppConfig', {
    apiUrl: 'https://api.example.com/v1/',
    debugMode: true
  });

angular.module('myApp')
  .controller('MyController', function($scope, AppConfig) {
    // использование свойств AppConfig в контроллере
    $scope.apiUrl = AppConfig.apiUrl;
    $scope.debugMode = AppConfig.debugMode;
  });
```

В этом примере мы определили сервис значений `AppConfig` с двумя свойствами: `apiUrl` и `debugMode`.

### 3. Использование провайдеров

Провайдеры - это функции, которые используются для конфигурации сервисов. Они позволяют динамически настраивать сервисы во время запуска приложения.

**Пример:**

```javascript
angular.module('myApp', [])
  .provider('AppConfig', function() {
    var apiUrl = 'https://api.example.com/v1/';
    var debugMode = true;

    this.setApiUrl = function(url) {
      apiUrl = url;
    };

    this.setDebugMode = function(mode) {
      debugMode = mode;
    };

    this.$get = function() {
      return {
        apiUrl: apiUrl,
        debugMode: debugMode
      };
    };
  });

angular.module('myApp')
  .config(function(AppConfigProvider) {
    // настройка AppConfigProvider во время конфигурации
    if (window.location.hostname === 'localhost') {
      AppConfigProvider.setApiUrl('http://localhost:3000/api/');
      AppConfigProvider.setDebugMode(true);
    } else {
      AppConfigProvider.setApiUrl('https://api.example.com/v1/');
      AppConfigProvider.setDebugMode(false);
    }
  })
  .controller('MyController', function($scope, AppConfig) {
    // использование AppConfig в контроллере
    $scope.apiUrl = AppConfig.apiUrl;
    $scope.debugMode = AppConfig.debugMode;
  });
```

В этом примере мы определили провайдер `AppConfigProvider`, который позволяет настраивать `apiUrl` и `debugMode`. Мы использовали метод `config` для настройки `AppConfigProvider` в зависимости от имени хоста.

### 4. Использование переменных окружения

Переменные окружения - это переменные, которые устанавливаются вне кода приложения. Они используются для хранения конфиденциальной информации, такой как ключи API, пароли и т.д.

**Пример:**

```javascript
// файл config.js
angular.module('myApp', [])
  .constant('API_KEY', process.env.API_KEY);
```

В этом примере мы определили константу `API_KEY`, значение которой берется из переменной окружения `API_KEY`.

**Настройка переменных окружения:**

* **Локальная разработка:** Создайте файл `.env` в корне проекта и добавьте переменные окружения:

```
API_KEY=your_api_key
```

Установите пакет `dotenv`:

```
npm install dotenv --save-dev
```

Импортируйте `dotenv` в файл `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="node_modules/dotenv/lib/main.js"></script>
</head>
</html>
```

* **Сервер:** Настройте переменные окружения на сервере, где работает ваше приложение.

### Выбор метода

Выбор метода зависит от конкретных потребностей приложения. 

* **Константы:** Используйте для неизменяемых значений.
* **Сервисы значений:** Используйте для хранения значений и простой логики.
* **Провайдеры:** Используйте для динамической конфигурации сервисов.
* **Переменные окружения:** Используйте для хранения конфиденциальной информации.

### Заключение

В этой статье мы рассмотрели различные способы конфигурации окружений и управления переменными среды в AngularJS 1.8.3. Выбор метода зависит от конкретных потребностей приложения. Важно выбирать правильный метод, чтобы обеспечить безопасность и гибкость вашего приложения. 
