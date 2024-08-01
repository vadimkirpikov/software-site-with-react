## Тестирование в Django

Тестирование — неотъемлемая часть разработки надёжных приложений. Django предоставляет богатый инструментарий для тестирования моделей, форм и представлений, помогая обеспечить стабильность и корректность вашего проекта. 

### Тестирование моделей

Тестирование моделей гарантирует, что логика работы с данными, заложенная в модели, функционирует должным образом. 

**Пример:**

Создадим модель `Product` в файле `models.py`:

```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name
```

Напишем тесты для этой модели в файле `tests.py`:

```python
from django.test import TestCase
from .models import Product

class ProductModelTest(TestCase):

    def test_create_product(self):
        """ Тестирование создания продукта """
        product = Product.objects.create(
            name="Тестовый продукт",
            price=100.00,
            description="Описание тестового продукта",
        )
        self.assertEqual(str(product), "Тестовый продукт")
        self.assertEqual(product.price, 100.00)

    def test_product_availability(self):
        """ Тестирование доступности продукта """
        product = Product.objects.create(
            name="Недоступный продукт",
            price=50.00,
            description="Описание недоступного продукта",
            is_available=False
        )
        self.assertFalse(product.is_available)
```

В этом примере мы:

1. Импортировали класс `TestCase` из `django.test`.
2. Создали класс `ProductModelTest`, наследующий от `TestCase`.
3. Написали два тестовых метода: 
    * `test_create_product`: проверяет создание продукта и корректность его атрибутов.
    * `test_product_availability`: проверяет установку флага доступности продукта.
4. Использовали ассерты (`assertEqual`, `assertFalse`) для проверки ожидаемого поведения.

Для запуска тестов выполните команду:

```bash
python manage.py test
```

### Тестирование форм

Тестирование форм гарантирует корректную валидацию данных, отправляемых пользователем.

**Пример:**

Создадим форму для модели `Product` в файле `forms.py`:

```python
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description', 'is_available']
```

Напишем тесты для формы `ProductForm` в файле `tests.py`:

```python
from django.test import TestCase
from .forms import ProductForm

class ProductFormTest(TestCase):

    def test_valid_form(self):
        """ Тестирование валидной формы """
        data = {'name': 'Тестовый продукт', 'price': 100.00, 'description': 'Описание', 'is_available': True}
        form = ProductForm(data=data)
        self.assertTrue(form.is_valid())

    def test_invalid_form(self):
        """ Тестирование невалидной формы """
        data = {'name': '', 'price': 'не число', 'description': '', 'is_available': True}
        form = ProductForm(data=data)
        self.assertFalse(form.is_valid())
        self.assertIn('This field is required.', form.errors['name'])
        self.assertIn('Enter a number.', form.errors['price'])
```

В этом примере мы:

1. Создали класс `ProductFormTest`, наследующий от `TestCase`.
2. Написали два тестовых метода:
    * `test_valid_form`: проверяет валидность формы с корректными данными.
    * `test_invalid_form`: проверяет невалидность формы с некорректными данными и наличие сообщений об ошибках.
3. Использовали ассерты (`assertTrue`, `assertFalse`, `assertIn`) для проверки ожидаемого поведения.

### Тестирование представлений

Тестирование представлений — важный этап, который гарантирует корректность обработки запросов и ответов. 

**Пример:**

Создадим простое представление для вывода списка продуктов в файле `views.py`:

```python
from django.shortcuts import render
from .models import Product

def product_list(request):
    products = Product.objects.all()
    context = {'products': products}
    return render(request, 'product_list.html', context)
```

Напишем тест для представления `product_list` в файле `tests.py`:

```python
from django.test import TestCase, Client
from .models import Product

class ProductListViewTest(TestCase):

    def test_product_list_view(self):
        """ Тестирование отображения списка продуктов """
        Product.objects.create(name="Продукт 1", price=50.00, description="Описание 1")
        Product.objects.create(name="Продукт 2", price=100.00, description="Описание 2")

        client = Client()
        response = client.get('/')  # Замените '/' на URL вашего представления

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Продукт 1')
        self.assertContains(response, 'Продукт 2')
```

В этом примере мы:

1. Создали класс `ProductListViewTest`, наследующий от `TestCase`.
2. Использовали `Client` для симуляции HTTP-запросов.
3. Написали тестовый метод `test_product_list_view`, который:
    * Создает два продукта.
    * Отправляет GET-запрос на URL представления.
    * Проверяет код ответа сервера (200).
    * Проверяет наличие названий продуктов в ответе.

Это базовый пример тестирования. Django предоставляет множество других инструментов и методов для более глубокого и комплексного тестирования вашего приложения. 
