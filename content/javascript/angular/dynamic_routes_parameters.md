## Динамические маршруты и параметры в AngularJS 1.8.3

В процессе разработки веб-приложений часто возникает необходимость создавать гибкие и динамические маршруты, способные обрабатывать переменные данные. AngularJS предоставляет мощный механизм для работы с такими маршрутами и извлечения параметров из URL.

### Основы динамических маршрутов

Динамические маршруты в AngularJS определяются с помощью двоеточия (`:`) перед именем параметра в шаблоне URL. Например, маршрут `/products/:productId` будет соответствовать любому URL, начинающемуся с `/products/`, за которым следует произвольный текст, представляющий собой идентификатор продукта (`productId`).

**Пример:**

```javascript
// Конфигурация маршрутизации
angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/products/:productId', {
        templateUrl: 'product-details.html',
        controller: 'ProductDetailsController'
      });
  });
```

В данном примере `/products/123`, `/products/abc` и `/products/product-name` будут соответствовать определенному маршруту.

### Извлечение параметров в контроллере

Для доступа к значениям параметров, извлеченным из URL, используется служба `$routeParams`, внедряемая в контроллер. Свойства объекта `$routeParams` соответствуют именам параметров, определенных в шаблоне маршрута.

**Пример:**

```javascript
// Контроллер для страницы сведений о продукте
angular.module('myApp')
  .controller('ProductDetailsController', function($scope, $routeParams) {
    // Получаем идентификатор продукта из URL
    var productId = $routeParams.productId;

    // Используем идентификатор для загрузки данных о продукте
    // ...
  });
```

### Типы параметров и ограничения

По умолчанию параметры маршрута считаются строками. Однако AngularJS позволяет указывать типы параметров и ограничения на их значения. Для этого используется объект конфигурации, передаваемый в метод `when()` службы `$routeProvider`.

**Пример:**

```javascript
$routeProvider
  .when('/users/:userId/orders/:orderId', {
    templateUrl: 'order-details.html',
    controller: 'OrderDetailsController',
    resolve: {
      // Загрузка данных о заказе
      order: function(OrderService, $routeParams) {
        return OrderService.getOrder($routeParams.userId, $routeParams.orderId);
      }
    }
  });
```

В данном примере определены два параметра: `userId` и `orderId`. 

### Вложенные представления и маршрутизация

Динамические маршруты можно использовать совместно с директивой `ng-view` для создания вложенных представлений. 

**Пример:**

```html
<!-- index.html -->
<div ng-view></div>
```

```html
<!-- products.html -->
<h2>Список продуктов</h2>
<ul>
  <li ng-repeat="product in products">
    <a href="#/products/{{product.id}}">{{product.name}}</a>
  </li>
</ul>

<div ng-view></div>
```

```javascript
// Конфигурация маршрутизации
$routeProvider
  .when('/products', {
    templateUrl: 'products.html',
    controller: 'ProductsController'
  })
  .when('/products/:productId', {
    templateUrl: 'product-details.html',
    controller: 'ProductDetailsController'
  });
```

В этом примере при переходе по ссылке на страницу продукта, содержимое `product-details.html` будет загружено во вложенный `ng-view` внутри `products.html`.

### Передача дополнительных параметров

Для передачи дополнительных параметров, не являющихся частью URL, можно использовать свойства объекта `$route`.

**Пример:**

```javascript
// В контроллере
$scope.goToDetails = function(product) {
  $location.path('/products/' + product.id).search({category: product.category});
};
```

```javascript
// В контроллере ProductDetailsController
var categoryId = $route.current.params.category;
```

### Заключение

Динамические маршруты и параметры являются важной частью разработки одностраничных приложений на AngularJS. Они позволяют создавать гибкие и удобные в использовании приложения с поддержкой сложных сценариев навигации. 
