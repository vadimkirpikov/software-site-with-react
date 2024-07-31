## Управление состоянием в AngularJS с помощью NgRx

NgRx – это фреймворк для управления состоянием, основанный на RxJS и вдохновленный Redux. Он предоставляет инструменты для централизованного хранения и обновления состояния приложения, упрощая тем самым разработку и поддержку крупных AngularJS-приложений.

### Почему NgRx?

В приложениях AngularJS, особенно с ростом их сложности, часто возникают проблемы с управлением состоянием:

* **Разрозненность данных:** Состояние может храниться в различных компонентах, сервисах и директивах, затрудняя отслеживание изменений и синхронизацию данных.
* **Мутации состояния:** Случайные изменения состояния в разных частях приложения могут привести к непредсказуемому поведению.
* **Сложность тестирования:** При отсутствии централизованного хранилища состояния тестирование компонентов, зависящих от него, становится затруднительным.

NgRx решает эти проблемы, предлагая единый источник достоверной информации о состоянии приложения и набор инструментов для предсказуемого управления изменениями.

### Основные концепции NgRx

* **Store:** Глобальное хранилище состояния приложения, представленное в виде объекта-наблюдателя (observable).
* **Actions:** Объекты, описывающие намерение изменить состояние.
* **Reducers:** Чистые функции, которые принимают текущее состояние и action, возвращая новое состояние.
* **Effects:** Слушатели actions, которые могут взаимодействовать с внешними сервисами (например, API) и генерировать новые actions.
* **Selectors:** Функции для получения фрагментов состояния из store.

### Начало работы с NgRx

Для начала работы с NgRx необходимо установить следующие пакеты:

```
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools --save
```

#### 1. Определение Actions

Actions – это объекты, описывающие намерение изменить состояние приложения. Создадим action для получения списка продуктов:

```typescript
// products.actions.ts
export const GET_PRODUCTS = '[Products] Get Products';

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}
```

#### 2. Создание Reducer

Reducer – это чистая функция, которая принимает текущее состояние и action, возвращая новое состояние. Создадим reducer для обработки actions, связанных с продуктами:

```typescript
// products.reducer.ts
import { Action } from '@ngrx/store';
import { GET_PRODUCTS } from './products.actions';

export interface Product {
  id: number;
  name: string;
}

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export function productsReducer(state = initialState, action: Action): ProductsState {
  switch (action.type) {
    case GET_PRODUCTS:
      // Логика обработки получения продуктов
      return { ...state, products: /* Загруженные продукты */ };
    default:
      return state;
  }
}
```

#### 3. Конфигурация Store

Store – это глобальное хранилище состояния приложения. Для его настройки импортируем `StoreModule` в модуль приложения:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './products.reducer';

@NgModule({
  // ...
  imports: [
    // ...
    StoreModule.forRoot({ products: productsReducer }),
  ],
  // ...
})
export class AppModule {}
```

#### 4. Диспетчеризация Actions

Для отправки actions в store используется метод `dispatch()`:

```typescript
// products.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetProducts } from './products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private store: Store<{ products: any }>) {}

  getProducts() {
    // ... Логика получения продуктов
    this.store.dispatch(new GetProducts());
  }
}
```

#### 5. Выбор данных из Store

Для получения данных из store используются selectors:

```typescript
// products.selectors.ts
import { createSelector } from '@ngrx/store';

export const selectProducts = (state) => state.products;

export const selectAllProducts = createSelector(
  selectProducts,
  (state) => state.products
);
```

#### 6. Использование данных в компоненте

Для доступа к данным из store используется `Store.select()`:

```typescript
// products.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllProducts } from './products.selectors';

@Component({
  selector: 'app-products',
  // ...
})
export class ProductsComponent {
  products$: Observable<any[]>;

  constructor(private store: Store<{ products: any }>) {
    this.products$ = this.store.select(selectAllProducts);
  }
}
```

### Преимущества NgRx

* **Единый источник правды:** Состояние хранится в одном месте, что упрощает отслеживание изменений и обеспечивает консистентность данных.
* **Предсказуемость:** Изменения состояния происходят только в reducers, что делает приложение более предсказуемым и простым в отладке.
* **Тестируемость:** Reducers – это чистые функции, которые легко тестировать независимо от других частей приложения.
* **Улучшенная производительность:** NgRx использует механизмы изменения обнаружения AngularJS, чтобы обновлять только те части представления, которые зависят от изменившихся данных.

### Заключение

NgRx – это мощный инструмент для управления состоянием в AngularJS-приложениях. Он помогает структурировать код, упрощает отладку и тестирование, а также улучшает общую производительность приложения.