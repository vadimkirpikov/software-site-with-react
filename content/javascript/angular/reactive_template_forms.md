## Реактивные формы и шаблонные формы в AngularJS

AngularJS предоставляет два способа создания форм и управления ими: **шаблонные формы** и **реактивные формы**. Выбор подхода зависит от сложности формы и требований к управлению состоянием формы.

### Шаблонные формы

Шаблонные формы - это самый простой способ создания форм в AngularJS. Они основаны на использовании директив AngularJS непосредственно в HTML-шаблоне. 

#### Создание шаблонной формы

Для создания шаблонной формы используется директива `ng-model`, которая связывает элемент формы с переменной в области видимости контроллера. 

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
  <title>Шаблонная форма</title>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>
  <script>
    angular.module('myApp', [])
      .controller('formCtrl', function($scope) {
        $scope.userData = {};
      });
  </script>
</head>
<body ng-controller="formCtrl">

  <form name="userForm">
    Имя: <input type="text" ng-model="userData.name"><br>
    Email: <input type="email" ng-model="userData.email"><br>
    <button type="submit">Отправить</button>
  </form>

  <pre>{{ userData | json }}</pre>

</body>
</html>
```

В этом примере:

* Директива `ng-model="userData.name"` связывает значение поля ввода с свойством `name` объекта `userData` в области видимости контроллера.
* `userData` инициализирован как пустой объект в контроллере.
* Данные формы выводятся на странице с помощью интерполяции `{{ userData | json }}`.

#### Валидация в шаблонных формах

AngularJS предоставляет набор встроенных директив валидации, которые можно использовать в шаблонных формах.

```html
<form name="userForm">
  Имя: <input type="text" ng-model="userData.name" required><br> 
  Email: <input type="email" ng-model="userData.email" required><br>
  <button type="submit" ng-disabled="userForm.$invalid">Отправить</button>
</form>
```

В этом примере:

* Директива `required` делает поля "Имя" и "Email" обязательными для заполнения.
* Кнопка "Отправить" становится активной только после того, как оба поля будут заполнены корректно (`ng-disabled="userForm.$invalid"`).

#### Доступ к состоянию формы

AngularJS предоставляет объект `form`, который содержит информацию о состоянии формы и ее элементов.

```html
<form name="userForm">
  <span ng-show="userForm.$dirty">Форма изменена</span>
</form>
```

В этом примере:

* `userForm.$dirty` -  флаг, который становится `true`, если форма была изменена.

### Реактивные формы

Реактивные формы -  более мощный и гибкий подход к созданию форм в AngularJS. Они основаны на использовании классов и объектов JavaScript для управления состоянием формы.

#### Создание реактивной формы

Для создания реактивной формы используется класс `FormController`.

```javascript
angular.module('myApp', [])
  .controller('formCtrl', function($scope) {
    $scope.userForm = new FormController({
      name: new Control('', Validators.required),
      email: new Control('', [Validators.required, Validators.email])
    });
  });
```

В этом примере:

* Создаётся новый объект `FormController` с двумя контролами: `name` и `email`.
* Для каждого контрола определены валидаторы: `required` и `email`.

#### Привязка реактивной формы к шаблону

Для привязки реактивной формы к HTML-шаблону используется директива `ng-form-model`.

```html
<form ng-form-model="userForm">
  Имя: <input type="text" ng-model-options="{ updateOn: 'blur' }" ng-model="userForm.name.$viewValue">
  <span ng-show="userForm.name.$touched && userForm.name.$invalid">Поле обязательно для заполнения</span><br>
  
  Email: <input type="email" ng-model="userForm.email.$viewValue">
  <span ng-show="userForm.email.$touched && userForm.email.$invalid">Введите корректный email</span><br>

  <button type="submit" ng-disabled="userForm.$invalid">Отправить</button>
</form>
```

В этом примере:

* Директива `ng-form-model="userForm"` связывает форму с объектом `userForm` в контроллере.
* `ng-model-options="{ updateOn: 'blur' }"` обновляет модель только после потери фокуса на поле ввода.
* `ng-model="userForm.name.$viewValue"` связывает значение поля ввода со значением контрола `name`.
* Директива `ng-show` отображает сообщения об ошибках валидации.

### Сравнение шаблонных и реактивных форм

| Критерий         | Шаблонные формы              | Реактивные формы                         |
|--------------------|-------------------------------|--------------------------------------------|
| Сложность          | Проще                        | Сложнее                                   |
| Гибкость          | Менее гибкие                | Более гибкие                             |
| Тестируемость     | Сложнее тестировать           | Проще тестировать                           |
| Производительность | Небольшие преимущества        | Могут быть медленнее при большом количестве элементов |

### Заключение

Выбор между шаблонными и реактивными формами зависит от конкретных потребностей проекта. Для простых форм шаблонные формы являются более простым и быстрым решением. Для сложных форм с большим количеством логики валидации и управления состоянием рекомендуется использовать реактивные формы. 
