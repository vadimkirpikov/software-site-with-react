## Создание нового проекта AngularJS

Эта статья проведет вас через процесс создания нового проекта AngularJS, используя последнюю версию фреймворка (1.8.3) и необходимые инструменты.

### Установка Node.js и npm

Прежде чем начать, убедитесь, что на вашей системе установлены Node.js и npm (Node Package Manager). Node.js предоставляет среду выполнения JavaScript, а npm используется для установки пакетов JavaScript, включая сам AngularJS.

1. **Загрузите Node.js:**
   - Перейдите на официальный сайт Node.js: [https://nodejs.org/](https://nodejs.org/)
   - Скачайте установочный файл, соответствующий вашей операционной системе.
2. **Установите Node.js:**
   - Запустите загруженный файл и следуйте инструкциям мастера установки.
3. **Проверьте установку Node.js и npm:**
   - Откройте терминал или командную строку и выполните следующие команды:
     ```bash
     node -v
     npm -v
     ```
   - Если установка прошла успешно, вы увидите версии Node.js и npm.

### Установка Angular CLI

Angular CLI (Command Line Interface) - это инструмент командной строки, который упрощает создание проекта AngularJS, добавление компонентов, запуск сервера разработки и другие задачи.

1. **Установите Angular CLI глобально:**
   ```bash
   npm install -g @angular/cli
   ```
2. **Проверьте установку Angular CLI:**
   ```bash
   ng version
   ```
   - Вы должны увидеть информацию о версии Angular CLI.

### Создание нового проекта

Теперь, когда у нас есть все необходимые инструменты, давайте создадим новый проект AngularJS:

1. **Создайте новый проект с помощью Angular CLI:**
   ```bash
   ng new my-angular-project
   ```
   - Замените `my-angular-project` на желаемое имя вашего проекта.
   - Angular CLI создаст новую папку проекта с указанным именем и установит все необходимые зависимости.
2. **Перейдите в папку проекта:**
   ```bash
   cd my-angular-project
   ```

### Структура проекта

После создания проекта вы увидите следующую структуру папок:

```
my-angular-project/
  e2e/
  node_modules/
  src/
    app/
    assets/
    environments/
    index.html
    main.ts
    polyfills.ts
    styles.css
    test.ts
  angular.json
  package.json
  README.md
  tsconfig.json
  tslint.json
```

Давайте кратко рассмотрим некоторые из этих папок и файлов:

- **`e2e/`**: Содержит файлы для сквозного тестирования (end-to-end).
- **`node_modules/`**: Содержит все установленные пакеты npm, необходимые для проекта.
- **`src/`**: Содержит исходный код вашего приложения.
    - **`app/`**: Основная папка для компонентов, модулей и других файлов вашего приложения.
    - **`assets/`**: Содержит статические файлы, такие как изображения, шрифты и т. д.
    - **`environments/`**: Содержит файлы конфигурации для различных сред (например, разработки, production).
    - **`index.html`**: Основной HTML-файл вашего приложения.
- **`angular.json`**: Файл конфигурации Angular CLI.
- **`package.json`**: Файл конфигурации npm, содержащий информацию о зависимостях проекта.

### Запуск сервера разработки

Angular CLI предоставляет встроенный сервер разработки, который позволяет запускать приложение локально.

1. **Запустите сервер разработки:**
   ```bash
   ng serve
   ```
2. **Откройте приложение в браузере:**
   - По умолчанию приложение будет доступно по адресу `http://localhost:4200/`.

### Создание простого компонента

Компоненты - это основные строительные блоки приложения AngularJS. 

1. **Создайте новый компонент с помощью Angular CLI:**
   ```bash
   ng generate component my-component
   ```
   - Angular CLI создаст новую папку `my-component` внутри папки `src/app` и сгенерирует файлы компонента.
2. **Откройте файл `my-component.component.ts`:**
   ```typescript
   import { Component, OnInit } from '@angular/core';

   @Component({
     selector: 'app-my-component',
     templateUrl: './my-component.component.html',
     styleUrls: ['./my-component.component.css']
   })
   export class MyComponentComponent implements OnInit {

     constructor() { }

     ngOnInit(): void {
     }

   }
   ```
3. **Измените шаблон компонента `my-component.component.html`:**
   ```html
   <h1>Мой первый компонент Angular!</h1>
   ```

### Использование компонента в главном шаблоне

1. **Откройте файл `src/app/app.component.html`:**
   ```html
   <app-my-component></app-my-component>
   ```
   - Мы добавили селектор нашего компонента (`app-my-component`) в главный шаблон приложения.

Теперь, если вы откроете приложение в браузере (`http://localhost:4200/`), вы увидите заголовок "Мой первый компонент Angular!", отображаемый нашим компонентом.

Это лишь базовая информация о создании нового проекта AngularJS. В следующих разделах руководства мы рассмотрим более подробно компоненты, модули, сервисы, маршрутизацию и другие важные аспекты разработки приложений AngularJS.