## Виджет Слайдер jQuery

Слайдер - это популярный элемент веб-дизайна, который позволяет элегантно демонстрировать изображения, контент или продукты на сайте. jQuery предлагает множество плагинов для создания слайдеров,  предоставляя разработчикам гибкость и удобство в реализации. В этой статье мы рассмотрим создание простого слайдера изображений с использованием jQuery и CSS. 

### Создание базовой структуры HTML

Для начала нам нужно создать HTML-структуру нашего слайдера. 

```html
<!DOCTYPE html>
<html>
<head>
  <title>jQuery Слайдер</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="slider-container">
    <div class="slider">
      <div class="slide"><img src="image1.jpg" alt="Изображение 1"></div>
      <div class="slide"><img src="image2.jpg" alt="Изображение 2"></div>
      <div class="slide"><img src="image3.jpg" alt="Изображение 3"></div>
    </div>
    <div class="slider-nav">
      <button class="prev">&#10094;</button>
      <button class="next">&#10095;</button>
    </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.8.0/jquery.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

В этом коде мы создаем:

* **slider-container**: Контейнер для всего слайдера.
* **slider**: Элемент, содержащий слайды.
* **slide**: Отдельные слайды с изображениями.
* **slider-nav**: Контейнер для кнопок навигации.
* **prev**: Кнопка для перехода к предыдущему слайду.
* **next**: Кнопка для перехода к следующему слайду.

### Добавление стилей CSS

Теперь добавим базовые стили для нашего слайдера в файл `style.css`:

```css
.slider-container {
  width: 600px;
  margin: 50px auto;
  position: relative;
}

.slider {
  width: 100%;
  overflow: hidden;
}

.slide {
  display: none; /* По умолчанию скрываем все слайды */
}

.slide img {
  width: 100%;
  height: auto;
}

.slide:first-child {
  display: block; /* Показываем первый слайд */
}

.slider-nav {
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
}

.slider-nav button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
}
```

В этом коде мы:

* Задаем размеры и центрируем слайдер.
* Скрываем все слайды, кроме первого.
* Задаем стили для изображений внутри слайдов.
* Размещаем кнопки навигации.

### Реализация функционала слайдера с помощью jQuery

Теперь, когда у нас есть базовая структура и стили, добавим функционал слайдера с помощью jQuery. В файле `script.js` напишем следующий код:

```javascript
$(document).ready(function() {
  // Переменные для управления слайдером
  let currentSlide = 0;
  const totalSlides = $('.slide').length;

  // Функция для показа слайда
  function showSlide(n) {
    // Скрываем все слайды
    $('.slide').hide();
    // Показываем нужный слайд
    $('.slide').eq(n).show();
    // Обновляем текущий слайд
    currentSlide = n;
  }

  // Переход к следующему слайду
  $('.next').click(function() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  });

  // Переход к предыдущему слайду
  $('.prev').click(function() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  });

  // Показываем первый слайд при загрузке страницы
  showSlide(currentSlide);
});
```

В этом коде:

* **currentSlide**: Хранит индекс текущего слайда (начиная с 0).
* **totalSlides**: Хранит общее количество слайдов.
* **showSlide(n)**: Функция, которая принимает номер слайда (индекс) и показывает его, скрывая все остальные.
* **$('.next').click()**: Обработчик события клика по кнопке "следующий слайд".
* **$('.prev').click()**: Обработчик события клика по кнопке "предыдущий слайд".
* **(currentSlide + 1) % totalSlides** и **(currentSlide - 1 + totalSlides) % totalSlides**: Вычисляют индекс следующего/предыдущего слайда с учетом зацикленности.

Этот код реализует базовый функционал слайдера: переход между слайдами по клику на кнопки навигации. 

Это лишь базовый пример создания слайдера с использованием jQuery. Вы можете расширить его, добавив анимацию, автоматическое пролистывание, точки навигации и другие функции. 
