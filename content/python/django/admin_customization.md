## Настройка и кастомизация админки Django

Административная панель Django - мощный инструмент, упрощающий управление контентом сайта. Базовая настройка не требует особых усилий, но для полного раскрытия потенциала админки, ее нужно кастомизировать под свои нужды. 

### Базовая настройка

1. **Регистрация моделей:**

   Чтобы модели отображались в админке, их нужно зарегистрировать. Откройте файл `admin.py` вашего приложения и добавьте следующий код:

   ```python
   from django.contrib import admin
   from .models import Product # Импортируем модель Product

   admin.site.register(Product) # Регистрируем модель Product
   ```

2. **Создание суперпользователя:**

   Для доступа к админке необходим суперпользователь. Создайте его командой:

   ```bash
   python manage.py createsuperuser
   ```

   Следуйте инструкциям и введите имя пользователя, адрес электронной почты и пароль.

3. **Запуск сервера разработки:**

   Запустите сервер разработки Django:

   ```bash
   python manage.py runserver
   ```

4. **Вход в админку:**

   Откройте в браузере адрес `http://127.0.0.1:8000/admin/` и войдите, используя данные суперпользователя.

Теперь вы видите список зарегистрированных моделей. Пока что он выглядит просто, но Django предоставляет широкие возможности для кастомизации.

### Кастомизация списка объектов

1. **Отображаемые поля:**

   По умолчанию в списке объектов отображаются все поля модели. Чтобы изменить это, используйте атрибут `list_display`:

   ```python
   from django.contrib import admin
   from .models import Product

   class ProductAdmin(admin.ModelAdmin):
       list_display = ('name', 'price', 'is_available')

   admin.site.register(Product, ProductAdmin)
   ```

   Теперь в списке объектов модели `Product` будут отображаться только поля `name`, `price` и `is_available`.

2. **Фильтрация:**

   Для удобства поиска нужных объектов добавьте фильтры, используя атрибут `list_filter`:

   ```python
   class ProductAdmin(admin.ModelAdmin):
       # ...
       list_filter = ('category', 'is_available')
   ```

   Теперь в правой части списка объектов появятся фильтры по полям `category` и `is_available`.

3. **Поиск:**

   Добавьте возможность поиска по определенным полям с помощью атрибута `search_fields`:

   ```python
   class ProductAdmin(admin.ModelAdmin):
       # ...
       search_fields = ('name', 'description')
   ```

   Теперь вы можете искать объекты `Product` по полям `name` и `description`.

### Кастомизация формы редактирования

1. **Группировка полей:**

   Для удобства редактирования сгруппируйте поля модели в логические секции с помощью `fieldsets`:

   ```python
   class ProductAdmin(admin.ModelAdmin):
       # ...
       fieldsets = (
           ('Основная информация', {
               'fields': ('name', 'description', 'price')
           }),
           ('Дополнительно', {
               'fields': ('category', 'is_available'),
               'classes': ('collapse',) # Скрывает секцию по умолчанию
           }),
       )
   ```

2. **Виджеты полей:**

   Django позволяет использовать разные виджеты для разных типов полей. Например, замените стандартное текстовое поле для описания на `Textarea`:

   ```python
   from django.forms import Textarea

   class ProductAdmin(admin.ModelAdmin):
       # ...
       formfield_overrides = {
           models.TextField: {'widget': Textarea(attrs={'rows': 4, 'cols': 40})},
       }
   ```

3. **Настройка отображения связанных объектов:**

   Django предлагает несколько способов отображения связанных объектов:

   * **`ForeignKey` и `ManyToManyField`:**

      * **`select` (по умолчанию):** Отображает выпадающий список со связанными объектами.
      * **`radio`:** Отображает список радио-кнопок для выбора связанного объекта.
      * **`raw_id_fields`:** Отображает поле ввода ID связанного объекта.

     ```python
     class ProductAdmin(admin.ModelAdmin):
         # ...
         raw_id_fields = ('category',)
     ```

   * **`OneToOneField`:**

      * **`select` (по умолчанию):** Отображает выпадающий список со связанными объектами.
      * **`raw_id_fields`:** Отображает поле ввода ID связанного объекта.

4. **Добавление собственных действий:**

   Вы можете добавить собственные действия, доступные в списке объектов и на странице редактирования:

   ```python
   def make_published(modeladmin, request, queryset):
       queryset.update(is_published=True)
   make_published.short_description = "Опубликовать выбранные продукты"

   class ProductAdmin(admin.ModelAdmin):
       # ...
       actions = [make_published]
   ```

### Расширенная кастомизация

Django предоставляет еще больше возможностей кастомизации админки:

* **Настройка шаблонов:** Вы можете создавать собственные шаблоны для изменения внешнего вида админки.
* **Добавление JavaScript и CSS:** Вы можете добавлять собственные JavaScript и CSS файлы для расширения функциональности и стилизации админки.
* **Использование сторонних приложений:** Существует множество сторонних Django-приложений, расширяющих функциональность админки.

Это базовая информация о настройке и кастомизации админки Django. Документация Django содержит подробную информацию о всех доступных опциях и функциях: [https://docs.djangoproject.com/en/5.1/ref/admin/](https://docs.djangoproject.com/en/5.1/ref/admin/) 