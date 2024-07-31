## Сборка и развертывание AngularJS приложений

После того, как вы создали AngularJS приложение, необходимо его собрать и развернуть, чтобы оно стало доступно пользователям. В этой части руководства мы рассмотрим основы этого процесса, сосредоточившись на версии AngularJS 1.8.3.

### Инструменты

Существует множество инструментов для сборки и развертывания AngularJS приложений. Вот некоторые из самых популярных:

* **Gulp:**  Автоматизатор задач, позволяющий оптимизировать и автоматизировать повторяющиеся действия при разработке.
* **Grunt:**  Еще один популярный инструмент для автоматизации задач, похожий на Gulp.
* **Webpack:**  Модульный сборщик, который может быть использован для упаковки вашего приложения и его зависимостей.

Выбор инструмента зависит от ваших предпочтений и требований проекта. Для простоты, в данном руководстве мы будем использовать Gulp.

### Установка Gulp

Перед использованием Gulp, необходимо его установить:

1. Убедитесь, что у вас установлен Node.js и npm (Node Package Manager):
   ```
   node -v
   npm -v
   ```

2. Установите Gulp глобально:
   ```
   npm install -g gulp-cli
   ```

### Создание файла gulpfile.js

Файл `gulpfile.js` содержит конфигурацию задач Gulp. Создайте этот файл в корневой папке вашего проекта:

```
touch gulpfile.js
```

### Настройка задачи сборки

Для начала, настроим простую задачу Gulp для сборки нашего приложения. Добавьте следующий код в `gulpfile.js`:

```javascript
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('build', function() {
  return gulp.src(['./app/**/*.js']) // Путь к вашим JavaScript файлам
    .pipe(concat('app.min.js')) // Объединяем файлы в один
    .pipe(uglify()) // Минифицируем код
    .pipe(gulp.dest('./dist')); // Сохраняем в папку dist
});
```

В этом примере мы используем следующие плагины Gulp:

* `gulp-concat`:  Объединяет несколько файлов в один.
* `gulp-uglify`:  Минифицирует JavaScript код для уменьшения размера файлов.

### Запуск задачи сборки

Теперь вы можете запустить задачу сборки, выполнив команду:

```
gulp build
```

Gulp выполнит указанные действия и создаст папку `dist` в корне вашего проекта. Внутри `dist` вы найдете файл `app.min.js`, содержащий минифицированную версию вашего приложения.

### Развертывание

После сборки приложения, вы можете развернуть его на веб-сервере. Конкретные шаги зависят от выбранного вами сервера и хостинга. 

В простейшем случае, вы можете скопировать содержимое папки `dist` в корневую папку вашего веб-сервера. 

### Заключение

В этой части руководства мы рассмотрели основы сборки и развертывания AngularJS приложений. Мы изучили как использовать Gulp для автоматизации задач, объединения и минификации кода, а также создания дистрибутива приложения. 

Следует отметить, что это лишь базовый пример, и в реальных проектах процесс сборки и развертывания может быть значительно сложнее. Рекомендуется изучить возможности Gulp и других инструментов более подробно, чтобы настроить оптимальный процесс для вашего проекта. 