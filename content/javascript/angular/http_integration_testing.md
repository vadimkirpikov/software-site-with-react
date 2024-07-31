## Тестирование HTTP-запросов и интеграционное тестирование в AngularJS 1.8.3

В этой части руководства мы рассмотрим тестирование HTTP-запросов и интеграционное тестирование в AngularJS. Тестирование HTTP-запросов играет важную роль в приложениях AngularJS, поскольку они часто взаимодействуют с серверной частью для получения и отправки данных. Интеграционное тестирование позволяет проверить, как различные компоненты вашего приложения работают вместе.

### Тестирование HTTP-запросов с помощью $httpBackend

AngularJS предоставляет сервис `$httpBackend` для имитации HTTP-запросов в тестах. `$httpBackend` перехватывает запросы, отправляемые с помощью `$http`, и позволяет задать ожидаемое поведение сервера, например, вернуть определенные данные или код ответа. 

**Шаг 1:** Внедрите `$httpBackend` и `$http` в ваши тесты.

```javascript
describe('MyService', function() {
  var $httpBackend, $http, myService;

  // Перед каждым тестом получаем зависимости
  beforeEach(inject(function(_$httpBackend_, _$http_, MyService) {
    $httpBackend = _$httpBackend_;
    $http = _$http_;
    myService = MyService;
  }));

  // ... ваши тесты ...
});
```

**Шаг 2:** Определите ожидаемый запрос и ответ.

```javascript
it('должен получить данные с сервера', function() {
  // Ожидаем GET-запрос на /api/data и возвращаем данные
  $httpBackend.expectGET('/api/data').respond({ message: 'Успешно!' });

  // Вызываем функцию сервиса, которая делает HTTP-запрос
  myService.getData().then(function(response) {
    expect(response.data.message).toBe('Успешно!');
  });

  // Проверяем, что все ожидаемые запросы были выполнены
  $httpBackend.flush();
});
```

В этом примере мы ожидаем, что сервис `myService` сделает GET-запрос на `/api/data`. Мы используем `$httpBackend.expectGET()` для определения этого ожидания и `$httpBackend.respond()` для задания ответа сервера.

**Шаг 3:** Проверьте ожидаемое поведение.

После выполнения HTTP-запроса мы проверяем, что данные, возвращенные сервером, соответствуют ожидаемым. В данном случае мы проверяем, что свойство `message` объекта ответа равно "Успешно!".

**Шаг 4:** Используйте `$httpBackend.verifyNoOutstandingExpectation()` и `$httpBackend.verifyNoOutstandingRequest()` для проверки, что нет невыполненных запросов или ожиданий.

```javascript
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
```

### Интеграционное тестирование

Интеграционное тестирование фокусируется на проверке взаимодействия между различными частями вашего приложения. В AngularJS это может включать взаимодействие между контроллерами, сервисами, директивами и DOM.

Рассмотрим пример интеграционного теста для простой директивы:

**Файл: myDirective.js**

```javascript
angular.module('myApp').directive('myDirective', function() {
  return {
    restrict: 'E',
    template: '<div>{{ message }}</div>',
    scope: {
      message: '@'
    }
  };
});
```

**Файл: myDirective.spec.js**

```javascript
describe('myDirective', function() {
  var $compile, $rootScope;

  beforeEach(module('myApp')); // Загружаем модуль приложения

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('должен отображать сообщение', function() {
    // Создаем область видимости и устанавливаем значение message
    var scope = $rootScope.$new();
    scope.message = 'Привет, мир!';

    // Компилируем директиву
    var element = $compile('<my-directive message="{{ message }}"></my-directive>')(scope);

    // Запускаем цикл дайджеста
    scope.$digest();

    // Проверяем, что сообщение отображается
    expect(element.html()).toContain('Привет, мир!');
  });
});
```

В этом примере мы тестируем директиву `myDirective`, которая отображает сообщение, переданное через атрибут `message`. Мы используем `$compile` для компиляции директивы и `$rootScope` для создания новой области видимости. После компиляции мы запускаем цикл дайджеста с помощью `$digest()` и проверяем, что сообщение отображается в DOM.

### Заключение

Тестирование HTTP-запросов и интеграционное тестирование являются важными аспектами разработки приложений AngularJS. `$httpBackend` предоставляет удобный способ имитации HTTP-запросов в тестах, а интеграционное тестирование помогает убедиться, что различные компоненты вашего приложения работают вместе должным образом. 
