## Работа с несколькими промисами: all, allSettled, any и race

JavaScript позволяет работать асинхронно благодаря промисам. Но что делать, если вам нужно работать с несколькими промисами одновременно? Для этого в JavaScript существует набор специальных методов, упрощающих эту задачу: `Promise.all`, `Promise.allSettled`, `Promise.any` и `Promise.race`. Рассмотрим каждый из них подробнее.

### Promise.all: Ожидание выполнения всех промисов

Метод `Promise.all` принимает на вход массив промисов и возвращает новый промис. Этот новый промис будет выполнен успешно (resolved) только тогда, когда **все** переданные промисы будут выполнены успешно. 

**Пример:**

```javascript
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = Promise.resolve(2);
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 500));

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [1, 2, 3] - выводятся значения всех промисов в порядке их определения
  });
```

В этом примере `Promise.all` дождется выполнения всех трех промисов (`promise1`, `promise2` и `promise3`), а затем выведет массив с результатами их выполнения.

**Что если один из промисов будет отклонен (rejected)?**

В случае, если хотя бы один промис из переданного массива будет отклонен, `Promise.all` **сразу** перейдет в состояние отклонено (rejected), и обработчик `.catch()` получит ошибку первого отклоненного промиса. 

**Пример:**

```javascript
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = Promise.reject(new Error('Ошибка!')); // Промис будет отклонен
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 500));

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // Этот код не выполнится
  })
  .catch(error => {
    console.log(error); // Выведется ошибка: "Error: Ошибка!"
  });
```

### Promise.allSettled: Ожидание завершения всех промисов

Метод `Promise.allSettled` похож на `Promise.all`, но с одним ключевым отличием: он **всегда** возвращает промис, который будет выполнен успешно, независимо от того, были ли переданные промисы выполнены успешно или отклонены.

**Пример:**

```javascript
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error('Ошибка!'));
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 500));

Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    console.log(results); 
    /* Вывод:
    [
      { status: 'fulfilled', value: 1 }, 
      { status: 'rejected', reason: Error: Ошибка! }, 
      { status: 'fulfilled', value: 3 }
    ]
    */
  });
```

`Promise.allSettled` возвращает массив объектов. Каждый объект содержит информацию о состоянии промиса:

* `status: 'fulfilled'`: Промис был выполнен успешно.
* `value`: Значение, с которым был выполнен промис (если `status: 'fulfilled'`).
* `status: 'rejected'`: Промис был отклонен.
* `reason`: Причина отклонения промиса (если `status: 'rejected'`).

### Promise.any: Ожидание первого успешно выполненного промиса

Метод `Promise.any` возвращает промис, который будет выполнен успешно, как только **хотя бы один** из переданных промисов будет выполнен успешно. Значением будет результат первого успешно выполненного промиса. 

**Пример:**

```javascript
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = Promise.reject(new Error('Ошибка!'));
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 500));

Promise.any([promise1, promise2, promise3])
  .then(value => {
    console.log(value); // Выведется: 3 
  });
```

**Что если все промисы будут отклонены?**

В этом случае `Promise.any` вернет промис, который будет отклонен с AggregateError, содержащим информацию о всех ошибках. 

**Пример:**

```javascript
const promise1 = Promise.reject(new Error('Ошибка 1!'));
const promise2 = Promise.reject(new Error('Ошибка 2!'));

Promise.any([promise1, promise2])
  .catch(error => {
    console.log(error); // Выведется AggregateError с информацией об ошибках
  });
```

### Promise.race: Ожидание первого завершенного промиса

Метод `Promise.race` возвращает промис, который будет выполнен (успешно или с ошибкой), как только **хотя бы один** из переданных промисов будет завершен (выполнен успешно или отклонен). 

**Пример:**

```javascript
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const promise2 = Promise.reject(new Error('Ошибка!'));
const promise3 = new Promise((resolve) => setTimeout(() => resolve(3), 500));

Promise.race([promise1, promise2, promise3])
  .then(value => {
    console.log(value); // Не выполнится
  })
  .catch(error => {
    console.log(error); // Выведется ошибка: "Error: Ошибка!"
  });
```

В этом примере `promise2` отклоняется первым, поэтому `Promise.race` переходит в состояние отклонено, не дожидаясь выполнения других промисов.

### Заключение

Методы `Promise.all`, `Promise.allSettled`, `Promise.any` и `Promise.race` предоставляют мощный инструментарий для работы с несколькими промисами одновременно. Выбор нужного метода зависит от конкретной задачи и желаемого поведения в случае успеха или ошибки.
