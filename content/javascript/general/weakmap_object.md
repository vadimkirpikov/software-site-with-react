## Объект WeakMap в JavaScript

`WeakMap` - это встроенный объект JavaScript, предоставляющий способ хранения пар "ключ-значение", где ключ должен быть объектом.  Главная особенность `WeakMap` заключается в том, что ссылки на ключи-объекты хранятся **слабо**. Это означает, что сборщик мусора JavaScript может удалить объект-ключ из памяти, если на него нет других ссылок, даже если он используется в `WeakMap`. 

### Отличия от Map

`WeakMap` похож на `Map`, но имеет несколько ключевых отличий:

| Характеристика | `Map` | `WeakMap` |
|---|---|---|
| Тип ключей | Может быть любым типом данных | Только объекты |
| Итерация | Поддерживается | Не поддерживается |
| Размер | Можно узнать с помощью свойства `size` | Нельзя узнать размер |
| Очистка памяти | Ключи-объекты не удаляются, пока существует `Map` | Ключи-объекты могут быть удалены сборщиком мусора |

### Зачем использовать WeakMap?

`WeakMap`  используется в основном в следующих случаях:

* **Хранение приватных данных объекта:** 

    ```javascript
    const privateData = new WeakMap();

    class User {
      constructor(name) {
        this.name = name;
        privateData.set(this, { age: 30 }); // Связываем данные с объектом User
      }

      getAge() {
        return privateData.get(this).age;
      }
    }

    const user = new User('John');
    console.log(user.getAge()); // 30
    ```

    В этом примере `WeakMap` используется для хранения приватного свойства `age` для объектов класса `User`.  Данные доступны только через методы класса и не видны извне.

* **Кэширование:** 

    ```javascript
    const cache = new WeakMap();

    function expensiveCalculation(obj) {
      if (cache.has(obj)) {
        return cache.get(obj);
      }

      // ...  дорогостоящие вычисления ...
      const result = /* ... */;
      cache.set(obj, result);
      return result;
    }
    ```

    Здесь `WeakMap` используется для кэширования результатов ресурсоемких вычислений. Если объект уже есть в кэше, результат будет взят оттуда. Если объект удален сборщиком мусора, соответствующая запись в кэше также будет удалена.

### Основные методы WeakMap

* `set(key, value)`: добавляет пару "ключ-значение" в `WeakMap`.

    ```javascript
    const map = new WeakMap();
    const obj = {};

    map.set(obj, 'value'); 
    ```

* `get(key)`: возвращает значение, связанное с ключом `key`. Если ключ не найден, возвращает `undefined`.

    ```javascript
    const value = map.get(obj); // 'value'
    ```

* `has(key)`: проверяет, существует ли ключ `key` в `WeakMap`. Возвращает `true` или `false`.

    ```javascript
    map.has(obj); // true
    ```

* `delete(key)`: удаляет пару "ключ-значение", связанную с ключом `key`.

    ```javascript
    map.delete(obj);
    map.has(obj); // false
    ```

### Заключение

`WeakMap` - это мощный инструмент для работы с объектами в JavaScript. Он позволяет хранить данные, связанные с объектами, не мешая сборщику мусора очищать память от неиспользуемых объектов. 