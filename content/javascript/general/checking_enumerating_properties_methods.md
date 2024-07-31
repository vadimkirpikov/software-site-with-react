## Проверка наличия и перебор методов и свойств

В JavaScript объекты представляют собой коллекции пар "ключ-значение", где ключами могут быть строки, а значениями - любые типы данных. Методы объекта - это функции, которые хранятся в его свойствах. В процессе разработки часто возникает необходимость проверить наличие определенного свойства или метода у объекта, а также перебрать все его свойства и методы.

### Проверка наличия свойства или метода

Существует несколько способов проверить, существует ли определенное свойство или метод у объекта:

1. **Оператор `in`**:

   Оператор `in` возвращает `true`, если указанное свойство существует в объекте, и `false` в противном случае.

   ```javascript
   const myObject = {
       name: 'Пример',
       value: 10,
       sayHello: function() {
           console.log('Привет!');
       }
   };

   console.log('name' in myObject); // true
   console.log('age' in myObject);  // false
   console.log('sayHello' in myObject); // true 
   ```

2. **Оператор `hasOwnProperty()`**:

   Метод `hasOwnProperty()` проверяет, является ли свойство собственным свойством объекта, то есть не наследуется ли оно по прототипу. 

   ```javascript
   console.log(myObject.hasOwnProperty('name')); // true
   console.log(myObject.hasOwnProperty('toString')); // false - метод toString наследуется по прототипу
   ```

3. **Оператор доступа к свойству**:

   Самый простой способ проверки - попытаться получить доступ к свойству с помощью оператора `.` или `[]`. Если свойство отсутствует, вернется значение `undefined`. Однако, этот способ не позволяет отличить несуществующее свойство от свойства, которому присвоено значение `undefined`.

   ```javascript
   console.log(myObject.name); // 'Пример'
   console.log(myObject.age); // undefined
   ```

### Перебор свойств объекта

Для перебора свойств объекта можно использовать следующие конструкции:

1. **Цикл `for...in`**:

   Цикл `for...in` перебирает все перечисляемые свойства объекта, включая унаследованные.

   ```javascript
   for (const key in myObject) {
       console.log(key + ': ' + myObject[key]); 
   }

   // Вывод:
   // name: Пример
   // value: 10
   // sayHello: function() { console.log('Привет!'); }
   ```

2. **Метод `Object.keys()`**:

   Метод `Object.keys()` возвращает массив ключей собственных перечисляемых свойств объекта.

   ```javascript
   const keys = Object.keys(myObject);

   for (let i = 0; i < keys.length; i++) {
       console.log(keys[i] + ': ' + myObject[keys[i]]);
   }

   // Вывод:
   // name: Пример
   // value: 10
   // sayHello: function() { console.log('Привет!'); }
   ```

3. **Метод `Object.values()`**:

   Метод `Object.values()` возвращает массив значений собственных перечисляемых свойств объекта.

   ```javascript
   const values = Object.values(myObject);

   for (let i = 0; i < values.length; i++) {
       console.log(values[i]);
   }

   // Вывод:
   // Пример
   // 10
   // function() { console.log('Привет!'); }
   ```

4. **Метод `Object.entries()`**:

   Метод `Object.entries()` возвращает массив массивов, где каждый внутренний массив содержит пару "ключ-значение" для каждого собственного перечисляемого свойства объекта.

   ```javascript
   const entries = Object.entries(myObject);

   for (let i = 0; i < entries.length; i++) {
       const key = entries[i][0];
       const value = entries[i][1];
       console.log(key + ': ' + value);
   }

   // Вывод:
   // name: Пример
   // value: 10
   // sayHello: function() { console.log('Привет!'); }
   ```

### Вывод

Проверка наличия и перебор свойств и методов объектов - базовые операции в JavaScript, которые часто используются при работе с объектами. Выбор способа проверки или перебора зависит от конкретной задачи. 
