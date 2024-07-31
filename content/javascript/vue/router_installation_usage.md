## Навигация с Vue Router

Одностраничные приложения (SPA), построенные на Vue.js, часто требуют навигации между различными "виртуальными" страницами без перезагрузки браузера. Vue Router - официальная библиотека для реализации маршрутизации в Vue.js приложениях, обеспечивающая плавные переходы и удобную организацию кода.

### Установка Vue Router

Для начала необходимо установить Vue Router в проект. Используйте npm или yarn:

```bash
npm install vue-router@4
```

### Подключение Vue Router

Создайте новый файл `router/index.js` в папке `src` вашего проекта и подключите Vue Router:

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(), // используем HTML5 history mode
  routes: [
    // здесь будут определены маршруты
  ]
})

export default router
```

Затем подключите роутер к вашему главному файлу `main.js`:

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // импортируем роутер

const app = createApp(App)

app.use(router) // подключаем роутер к приложению

app.mount('#app')
```

### Определение маршрутов

Маршруты определяют соответствие между URL-адресами и компонентами Vue.js, которые должны отображаться. Добавьте маршруты в массив `routes` в файле `src/router/index.js`:

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', // путь к домашней странице
      name: 'home', // имя маршрута
      component: HomeView // компонент для отображения
    },
    {
      path: '/about', // путь к странице "О нас"
      name: 'about',
      component: AboutView 
    }
  ]
})

export default router
```

В данном примере определены два маршрута: `/` (домашняя страница) и `/about` (страница "О нас"). Каждый маршрут содержит путь (`path`), имя (`name`) и компонент (`component`), который будет отображаться при переходе по данному пути.

### Отображение компонентов маршрутов

Для отображения компонентов, соответствующих текущему маршруту, используется компонент `<router-view>`:

```vue
<template>
  <div id="app">
    <h1>Мое приложение</h1>
    <router-view /> </div>
</template>
```

Компонент `<router-view>` действует как заполнитель, в котором Vue Router будет динамически отображать компоненты в соответствии с текущим маршрутом.

### Навигация по ссылкам

Для навигации между страницами используются компоненты `<router-link>`:

```vue
<template>
  <div>
    <router-link to="/">Домашняя</router-link>
    <router-link to="/about">О нас</router-link>
  </div>
</template>
```

Атрибут `to` компонента `<router-link>` указывает маршрут, по которому нужно перейти. Vue Router автоматически обработает переход и обновит URL-адрес в браузере без перезагрузки страницы.

### Передача параметров маршрута

Vue Router позволяет передавать параметры в маршруты, например, для отображения информации о конкретном элементе.

**Определение маршрута с параметром:**

```javascript
// src/router/index.js
// ...
{
  path: '/product/:id', // :id - параметр маршрута
  name: 'product',
  component: ProductView 
}
// ...
```

**Передача параметра через `<router-link>`:**

```vue
<router-link to="/product/123">Продукт 123</router-link>
```

**Доступ к параметру в компоненте:**

```vue
<template>
  <div>
    <h1>Продукт {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  // ...
  computed: {
    productId() {
      return this.$route.params.id
    }
  }
  // ...
}
</script>
```

### Программная навигация

Vue Router предоставляет методы для программной навигации:

```javascript
// Переход на страницу "О нас"
this.$router.push('/about')

// Переход на предыдущую страницу
this.$router.go(-1)
```

### Обработка навигации

Vue Router позволяет перехватывать события навигации и выполнять действия до или после перехода. Например, можно реализовать проверку прав доступа или загрузку данных перед отображением страницы:

```javascript
router.beforeEach((to, from, next) => {
  // to - маршрут, на который выполняется переход
  // from - текущий маршрут
  // next - функция, которую нужно вызвать для продолжения навигации

  // Проверка прав доступа
  if (to.name === 'admin' && !isAuthenticated) {
    next({ name: 'login' }) // перенаправление на страницу входа
  } else {
    next() // продолжение навигации
  }
})
```

Это лишь базовые возможности Vue Router. Библиотека предоставляет множество других функций, таких как ленивая загрузка компонентов, вложенные маршруты, прокрутка страницы и многое другое. Более подробную информацию можно найти в официальной документации Vue Router: [https://router.vuejs.org/](https://router.vuejs.org/). 
