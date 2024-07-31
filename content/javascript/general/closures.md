## Замыкания в JavaScript

Замыкания - одна из ключевых концепций JavaScript, позволяющая создавать более гибкий и выразительный код. Понимание замыканий открывает двери к более продвинутым техникам программирования.

### Что такое замыкание?

Замыкание - это комбинация функции и лексического окружения, в котором эта функция была объявлена. Проще говоря, функция "запоминает" свое окружение и имеет доступ ко всем переменным и функциям, которые были доступны в момент ее создания, даже если функция выполняется в другом контексте.

**Пример:**

```javascript
function outerFunction() {
  let outerVar = "Я внешняя переменная";

  function innerFunction() {
    console.log(outerVar); // Доступ к outerVar из замыкания
  }

  return innerFunction; 
}

let myClosure = outerFunction();
myClosure(); // Выведет: "Я внешняя переменная" 
```

В этом примере:

1. `outerFunction` - внешняя функция, которая определяет переменную `outerVar` и возвращает внутреннюю функцию `innerFunction`.
2. `innerFunction` - внутренняя функция, которая имеет доступ к `outerVar` из своего замыкания.
3. `myClosure` - переменная, которой мы присваиваем результат вызова `outerFunction()`. Фактически, `myClosure` теперь ссылается на `innerFunction`.
4. При вызове `myClosure()`, `innerFunction` выполняется и имеет доступ к `outerVar`, даже though `outerFunction` уже завершила свое выполнение.

### Как работают замыкания?

JavaScript использует концепцию лексического окружения (lexical environment) для реализации замыканий.  Лексическое окружение - это структура данных, которая хранит соответствие между идентификаторами (именами переменных) и их значениями.

Когда функция создается, она формирует свое лексическое окружение, которое включает в себя:

* **Лексическое окружение родительской области видимости:** Если функция объявлена внутри другой функции, она имеет доступ к лексическому окружению родительской функции.
* **Собственное лексическое окружение:**  Содержит переменные и функции, объявленные внутри самой функции.

При поиске переменной JavaScript сначала ищет ее в локальном лексическом окружении функции. Если переменная не найдена, поиск продолжается в лексическом окружении родительской функции и так далее, пока не будет достигнут глобальный объект.

Замыкание сохраняет ссылку на свое лексическое окружение, что позволяет функции "помнить" свои переменные даже после того, как внешняя функция завершила выполнение.

### Практическое применение замыканий

Замыкания широко используются в JavaScript для:

**1. Сокрытия данных (Data Privacy):**

Замыкания позволяют создавать приватные переменные и методы, которые недоступны извне.

```javascript
function createCounter() {
  let count = 0;

  return {
    increment: function() {
      count++;
      return count;
    },
    getValue: function() {
      return count;
    }
  };
}

let myCounter = createCounter();
console.log(myCounter.increment()); // Выведет: 1
console.log(myCounter.increment()); // Выведет: 2
console.log(myCounter.getValue());  // Выведет: 2
```

В этом примере переменная `count` недоступна извне функции `createCounter()`. Доступ к ней можно получить только через методы `increment` and `getValue`, которые "замыкают" `count` в своем лексическом окружении.

**2. Каррирование (Currying):**

Каррирование - это техника создания функций, которые принимают свои аргументы по одному. 

```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // Выведет: 6
console.log(curriedSum(1, 2)(3));  // Выведет: 6
console.log(curriedSum(1)(2, 3));  // Выведет: 6
```

В этом примере `curry` принимает функцию и возвращает "каррированную" версию. Каждая вложенная функция запоминает свои аргументы, используя замыкания, и вызывает исходную функцию только тогда, когда получено достаточное количество аргументов.

**3. Обработчики событий:**

Замыкания часто используются в обработчиках событий, чтобы сохранить доступ к контексту события и элементам DOM.

```javascript
const buttons = document.querySelectorAll("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    console.log(`Вы нажали на кнопку ${i + 1}`);
  });
}
```

В этом примере каждый обработчик событий "запоминает" свое значение `i` благодаря замыканию, что позволяет определить, какая кнопка была нажата.

### Заключение

Замыкания - мощный инструмент JavaScript, который позволяет создавать более гибкий, модульный и выразительный код. Понимание замыканий является важным шагом на пути к освоению JavaScript на более глубоком уровне. 