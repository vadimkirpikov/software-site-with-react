## Расширение объектов. Прототипы

В JavaScript объекты обладают невероятной гибкостью.  Один из ключевых аспектов этой гибкости - возможность их расширения. Вы можете добавлять новые свойства и методы к объектам, даже после их создания. Это открывает двери для динамического изменения поведения объектов и создания более специализированных структур данных. В основе этого механизма лежат прототипы.

### Прототипы: Основы

Каждый объект в JavaScript связан с другим объектом, называемым его **прототипом**. Прототип - это своего рода шаблон, предоставляющий свои свойства и методы объекту. 

Представьте себе прототип как чертеж дома.  Сам дом, построенный по этому чертежу, - это объект. Чертеж определяет базовые характеристики дома: количество комнат, этажность, расположение окон. Аналогично, прототип задает базовые характеристики объекта.

Когда вы обращаетесь к свойству объекта, JavaScript сначала ищет его в самом объекте. Если свойство не найдено, поиск продолжается в прототипе объекта.  Этот процесс повторяется вверх по **цепочке прототипов**, пока свойство не будет найдено или не будет достигнут конец цепочки.

### `__proto__` и `prototype`

В JavaScript есть два важных свойства, связанных с прототипами:

- `__proto__`: Это свойство объекта, указывающее на его прототип.
- `prototype`: Это свойство доступно только у функций-конструкторов и используется для установки прототипа для всех объектов, создаваемых этой функцией.

Давайте разберемся на примере:

```javascript
// Создаем функцию-конструктор
function Animal(name) {
  this.name = name;
}

// Добавляем метод в прототип Animal
Animal.prototype.speak = function() {
  console.log(`${this.name} издает звук`);
};

// Создаем объект с помощью конструктора
const cat = new Animal('Мурзик');

// Вызываем метод, определенный в прототипе
cat.speak(); // Выведет: "Мурзик издает звук"

// Проверяем прототип объекта
console.log(cat.__proto__ === Animal.prototype); // Выведет: true
```

В этом примере:

1.  Мы создаем функцию-конструктор `Animal`, которая принимает имя животного и присваивает его свойству `name` создаваемого объекта.
2.  Мы добавляем метод `speak` в прототип функции-конструктора `Animal`. Теперь все объекты, созданные с помощью `Animal`, будут иметь доступ к этому методу.
3.  Создаем объект `cat` с помощью конструктора `Animal`.
4.  Вызываем метод `speak` у объекта `cat`. JavaScript находит этот метод в прототипе объекта и выполняет его.

### Расширение встроенных объектов

Одним из интересных применений прототипов является расширение встроенных объектов JavaScript, таких как `Array`, `String` или `Object`. Вы можете добавлять свои собственные методы в эти объекты, чтобы сделать их более удобными для работы в вашем проекте.

**Пример:**

```javascript
// Добавляем метод для проверки, является ли строка палиндромом
String.prototype.isPalindrome = function() {
  const reversedString = this.split('').reverse().join('');
  return this.toLowerCase() === reversedString.toLowerCase();
};

// Используем новый метод
const word = 'level';
console.log(`${word} палиндром? ${word.isPalindrome()}`); // Выведет: "level палиндром? true" 
```

**Важно:**

-   Изменение прототипов встроенных объектов может привести к конфликтам с другими библиотеками или кодом. Будьте осторожны и используйте эту возможность с умом.
-   Рекомендуется создавать свои собственные объекты для реализации новой логики, вместо изменения прототипов встроенных объектов.

### Прототипное наследование

Прототипы лежат в основе **прототипного наследования** в JavaScript.  Каждый раз, когда вы создаете объект с помощью функции-конструктора или литерала объекта, он наследует свойства и методы своего прототипа. 

Это означает, что вы можете создавать иерархии объектов, где дочерние объекты наследуют характеристики родительских объектов.

**Пример:**

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} издает звук`);
};

function Cat(name, breed) {
  Animal.call(this, name); // Вызываем конструктор родителя
  this.breed = breed;
}

// Устанавливаем прототип Cat в новый объект, созданный с помощью Animal.prototype
Cat.prototype = Object.create(Animal.prototype);

// Добавляем метод, специфичный для Cat
Cat.prototype.purr = function() {
  console.log(`${this.name} мурлычет`);
};

const myCat = new Cat('Барсик', 'Сибирский');
myCat.speak(); // Выведет: "Барсик издает звук"
myCat.purr(); // Выведет: "Барсик мурлычет"
```

В этом примере:

1.  Мы создаем функцию-конструктор `Cat`, которая наследует от `Animal`.
2.  Внутри конструктора `Cat` мы вызываем конструктор родительского объекта `Animal` с помощью `Animal.call(this, name)`. 
3.  Устанавливаем прототип `Cat.prototype` в новый объект, созданный с помощью `Object.create(Animal.prototype)`.
4.  Добавляем метод `purr`, специфичный для объекта `Cat`.

Теперь объекты типа `Cat` имеют доступ ко всем свойствам и методам объекта `Animal`, а также к своим собственным.

### Заключение

Прототипы играют важную роль в JavaScript, определяя механизмы наследования и расширения объектов.  Понимание того, как работают прототипы, поможет вам писать более эффективный и гибкий код. 