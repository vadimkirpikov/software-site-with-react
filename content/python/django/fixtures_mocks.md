## Фикстуры и моки в Django 

Тестирование - неотъемлемая часть разработки на Django. Для изоляции логики приложения и ускорения тестирования используются фикстуры и моки.

### Фикстуры

Фикстуры - это наборы данных, используемые для инициализации базы данных в известное состояние перед запуском тестов. Они позволяют запускать тесты в одинаковых условиях, что обеспечивает надежность и повторяемость результатов.

#### Создание фикстур

Фикстуры хранятся в файлах формата JSON или YAML в директории `fixtures` внутри приложения. 

Пример фикстуры `products.json` для приложения `shop`:

```json
[
  {
    "model": "shop.product",
    "pk": 1,
    "fields": {
      "name": "T-Shirt",
      "price": 20.00,
      "description": "Cool t-shirt"
    }
  },
  {
    "model": "shop.product",
    "pk": 2,
    "fields": {
      "name": "Jeans",
      "price": 50.00,
      "description": "Stylish jeans"
    }
  }
]
```

- **model:** Указывает модель Django, к которой относятся данные.
- **pk:** Задает первичный ключ объекта.
- **fields:** Содержит значения полей модели.

#### Использование фикстур в тестах

1. **Загрузка фикстур:** 

   ```python
   from django.test import TestCase

   class ProductTests(TestCase):
       fixtures = ['products.json']

       def test_product_list(self):
           # Тестирование
   ```

   Атрибут `fixtures` класса `TestCase` указывает на используемые фикстуры.

2. **Доступ к данным фикстур:**

   ```python
   from shop.models import Product

   class ProductTests(TestCase):
       fixtures = ['products.json']

       def test_product_count(self):
           self.assertEqual(Product.objects.count(), 2)

       def test_product_name(self):
           product = Product.objects.get(pk=1)
           self.assertEqual(product.name, "T-Shirt")
   ```

   После загрузки фикстур данные доступны через модели Django.

### Моки

Моки - это объекты, имитирующие поведение реальных объектов в тестах. Они позволяют изолировать тестируемый код от внешних зависимостей, таких как базы данных, сетевые запросы и файловая система.

#### Библиотека `unittest.mock`

Django включает библиотеку `unittest.mock` для создания моков.

Пример использования `Mock`:

```python
from unittest.mock import Mock
from django.test import TestCase

class PaymentTests(TestCase):
    def test_successful_payment(self):
        # Создание мок-объекта для платёжной системы
        payment_gateway = Mock()
        payment_gateway.process_payment.return_value = True

        # Вызов функции, использующей платёжную систему
        result = process_payment(payment_gateway, amount=100)

        # Проверка результата
        self.assertTrue(result)
        payment_gateway.process_payment.assert_called_once_with(amount=100)
```

- `Mock()` создает мок-объект.
- `return_value` задает возвращаемое значение мок-метода.
- `assert_called_once_with()` проверяет, был ли вызван мок-метод с заданными аргументами.

#### Мокирование запросов к базе данных

Для мокирования запросов к базе данных можно использовать `Mock` и `patch`:

```python
from unittest.mock import patch
from django.test import TestCase

class MyTests(TestCase):
    @patch('myapp.models.MyModel.objects.get')
    def test_my_view(self, mock_get):
        # Настройка мок-объекта
        mock_get.return_value = Mock(name='Test')

        # Вызов функции, делающей запрос к базе данных
        response = self.client.get('/my-view/')

        # Проверка
        self.assertEqual(response.status_code, 200)
```

- `@patch` заменяет `MyModel.objects.get` на мок-объект `mock_get`.
- `Mock(name='Test')` создает мок-объект с атрибутом `name`.

### Заключение

Фикстуры и моки - важные инструменты для написания эффективных и надежных тестов в Django. Фикстуры позволяют создавать предсказуемое состояние базы данных, а моки изолируют тестируемый код от внешних зависимостей. Сочетание этих инструментов обеспечивает высокое качество кода и упрощает процесс разработки.
