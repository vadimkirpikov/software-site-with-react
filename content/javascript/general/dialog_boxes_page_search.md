## Диалоговые окна и поиск на странице

JavaScript предоставляет инструменты для взаимодействия с пользователем и манипуляции содержимым страницы. В этом разделе мы рассмотрим диалоговые окна и методы поиска по странице.

### Диалоговые окна

Диалоговые окна позволяют выводить информацию пользователю и получать от него простые данные.  

#### Alert

Окно `alert` отображает сообщение и ожидает, пока пользователь нажмет кнопку "OK". 

```javascript
alert("Это сообщение alert!"); 
```

#### Confirm

Окно `confirm` отображает сообщение с двумя кнопками: "OK" и "Отмена". 

```javascript
let result = confirm("Вы уверены?"); 
if (result) {
  // Код, выполняемый при нажатии "OK"
  console.log("Пользователь подтвердил действие."); 
} else {
  // Код, выполняемый при нажатии "Отмена"
  console.log("Пользователь отменил действие."); 
}
```

#### Prompt

Окно `prompt` запрашивает у пользователя ввод текста. 

```javascript
let name = prompt("Введите ваше имя:", "Имя пользователя");
if (name) {
  console.log(`Привет, ${name}!`);
} else {
  console.log("Вы не ввели имя."); 
}
```

### Поиск на странице

JavaScript предоставляет методы для поиска элементов и текста на веб-странице.

#### Поиск элементов по ID

Метод `getElementById` возвращает элемент с указанным ID.

```html
<p id="myParagraph">Это параграф текста.</p>
```

```javascript
let paragraph = document.getElementById("myParagraph");
console.log(paragraph.textContent); // Вывод: "Это параграф текста."
```

#### Поиск элементов по имени тега

Метод `getElementsByTagName` возвращает коллекцию элементов с указанным тегом.

```html
<ul>
  <li>Первый элемент</li>
  <li>Второй элемент</li>
</ul>
```

```javascript
let listItems = document.getElementsByTagName("li");
for (let i = 0; i < listItems.length; i++) {
  console.log(listItems[i].textContent);
}
```

#### Поиск элементов по классу

Метод `getElementsByClassName` возвращает коллекцию элементов с указанным классом.

```html
<div class="product">Товар 1</div>
<div class="product">Товар 2</div>
```

```javascript
let products = document.getElementsByClassName("product");
for (let product of products) {
  console.log(product.textContent);
}
```

#### Поиск элементов с помощью querySelector и querySelectorAll

Методы `querySelector` и `querySelectorAll` позволяют искать элементы с помощью CSS-селекторов.

```javascript
// Находит первый элемент с классом "product"
let firstProduct = document.querySelector(".product"); 

// Находит все элементы с тегом "p" внутри элемента с ID "content"
let paragraphs = document.querySelectorAll("#content p"); 
```

#### Поиск текста на странице

Для поиска текста на странице можно использовать метод `textContent`.

```javascript
let pageContent = document.body.textContent;
if (pageContent.includes("JavaScript")) {
  console.log("На странице найден текст 'JavaScript'."); 
}
```

###  Важно помнить:

* Диалоговые окна блокируют выполнение кода до тех пор, пока пользователь не закроет окно.
* При поиске элементов важно учитывать, что методы могут возвращать как один элемент, так и коллекцию элементов.
* Для более сложных сценариев поиска и манипуляции элементами рекомендуется использовать библиотеки, такие как jQuery.


Используя диалоговые окна и методы поиска, вы можете создавать более интерактивные и динамические веб-страницы. 
