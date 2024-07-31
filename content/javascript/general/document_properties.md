## Свойства объекта `document`

Объект `document` является одним из ключевых объектов в JavaScript, предоставляя интерфейс для взаимодействия с HTML-документом, отображаемым в браузере. Через свойства и методы объекта `document` мы можем получать информацию о структуре документа, манипулировать элементами, отслеживать события и многое другое. В этой статье мы подробно рассмотрим основные свойства объекта `document`, которые чаще всего используются в веб-разработке.

### Свойства для доступа к элементам документа

**1. `documentElement`**: Возвращает элемент `<html>`, представляющий корневой элемент HTML-документа.

```javascript
const rootElement = document.documentElement; 
console.log(rootElement); // Выведет объект HTMLElement, представляющий тег <html>
```

**2. `head`**: Возвращает элемент `<head>`, содержащий метаинформацию о документе, такую как заголовок, ссылки на стили и скрипты.

```javascript
const headElement = document.head;
console.log(headElement.querySelector('title').textContent); // Выведет текст заголовка страницы
```

**3. `body`**: Возвращает элемент `<body>`, содержащий основное содержимое HTML-документа, видимое пользователю.

```javascript
const bodyElement = document.body;
const newParagraph = document.createElement('p'); 
newParagraph.textContent = 'Это новый параграф!';
bodyElement.appendChild(newParagraph); // Добавляет новый параграф в конец тела документа
```

**4. `title`**: Возвращает заголовок HTML-документа, указанный в теге `<title>`.

```javascript
document.title = 'Новый заголовок страницы'; // Изменяет заголовок страницы в браузере
```

**5. `forms`**: Возвращает HTMLCollection всех элементов `<form>` в документе.

```javascript
const forms = document.forms;
console.log(forms[0]); // Выведет первый элемент <form> в документе
```

**6. `images`**: Возвращает HTMLCollection всех элементов `<img>` в документе.

```javascript
const images = document.images;
for (let i = 0; i < images.length; i++) {
  images[i].style.border = '1px solid red'; // Добавляет красную рамку ко всем изображениям на странице
}
```

**7. `links`**: Возвращает HTMLCollection всех ссылок (элементов `<a>`) и элементов `<area>` с атрибутом `href` в документе.

```javascript
const links = document.links;
console.log(links[0].href); // Выведет URL первой ссылки на странице
```

### Свойства, предоставляющие информацию о документе

**1. `URL`**: Возвращает полный URL текущего документа.

```javascript
console.log(document.URL); // Выведет адрес текущей страницы
```

**2. `domain`**: Возвращает доменное имя текущего документа.

```javascript
console.log(document.domain); // Выведет домен текущей страницы, например, "example.com"
```

**3. `referrer`**: Возвращает URL документа, с которого пользователь перешел на текущую страницу.

```javascript
console.log(document.referrer); // Выведет URL предыдущей страницы или пустую строку, если переход был выполнен не по ссылке
```

**4. `lastModified`**: Возвращает дату и время последнего изменения документа в формате строки.

```javascript
console.log(document.lastModified); // Выведет дату и время последнего изменения документа
```

**5. `readyState`**: Возвращает текущее состояние загрузки документа ("loading", "interactive" или "complete").

```javascript
if (document.readyState === 'complete') {
  console.log('Документ загружен!'); // Выполнит код, когда документ будет полностью загружен
}
```

**6. `characterSet`**: Возвращает кодировку символов, используемую в документе (например, "UTF-8").

```javascript
console.log(document.characterSet); // Выведет кодировку символов документа
```

**7. `contentType`**: Возвращает тип контента документа (например, "text/html").

```javascript
console.log(document.contentType); // Выведет тип контента документа
```

**8. `cookie`**: Позволяет получать, устанавливать и удалять cookie для текущего домена.

```javascript
document.cookie = "username=John Doe; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/"; // Устанавливает cookie
console.log(document.cookie); // Выведет все cookie для текущего домена
```

### Другие полезные свойства

**1. `activeElement`**: Возвращает элемент, который в данный момент находится в фокусе.

```javascript
const active = document.activeElement;
console.log(active.tagName); // Выведет тег активного элемента (например, "INPUT", "BUTTON")
```

**2. `defaultView`**: Возвращает объект window, связанный с документом.

```javascript
console.log(document.defaultView === window); // Выведет true
```

**3. `scrollingElement`**: Возвращает элемент, который прокручивается при использовании полос прокрутки браузера.

```javascript
document.scrollingElement.scrollTop = 100; // Прокручивает страницу на 100 пикселей вниз
```

**4. `compatMode`**: Указывает режим совместимости браузера ("CSS1Compat" для стандартного режима или "BackCompat" для режима quirks).

```javascript
console.log(document.compatMode); // Выведет режим совместимости браузера
```

### Заключение

Это лишь основные свойства объекта `document`, которые используются в JavaScript. Более подробную информацию о всех доступных свойствах и методах можно найти в документации по JavaScript. Понимание работы с объектом `document` является фундаментальным навыком для веб-разработчика, позволяющим создавать динамические и интерактивные веб-страницы.
