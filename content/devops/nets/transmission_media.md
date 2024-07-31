## Средства передачи данных

Для передачи данных по сети используются различные физические среды. От выбора среды зависят такие характеристики сети, как скорость передачи данных, дальность связи, стоимость и устойчивость к внешним помехам. Рассмотрим основные типы сред передачи данных:

**1. Витая пара:**

Витая пара - это наиболее распространенный тип кабеля для компьютерных сетей. Он состоит из двух изолированных проводов, скрученных вместе для уменьшения электромагнитных помех.  

**Преимущества:**

* Низкая стоимость
* Простота установки
* Достаточная для большинства задач скорость передачи данных

**Недостатки:**

* Ограниченная дальность передачи
* Уязвимость к электромагнитным помехам

Витая пара подразделяется на два основных типа:

* **Неэкранированная витая пара (UTP):** Наиболее распространенный и доступный тип.
* **Экранированная витая пара (STP):** Имеет дополнительный экран для защиты от помех, что делает ее подходящей для использования в условиях сильных электромагнитных полей.

Скорость передачи данных по витой паре зависит от категории кабеля:

| Категория | Максимальная скорость | Применение |
|---|---|---|
| Cat 5e | 1 Гбит/с | Гигабитные сети Ethernet |
| Cat 6 | 10 Гбит/с (на расстоянии до 55 метров) | Гигабитные и 10-гигабитные сети Ethernet |
| Cat 6a | 10 Гбит/с (на расстоянии до 100 метров) | 10-гигабитные сети Ethernet |

**Пример подключения витой пары:**

Для подключения витой пары к сетевому устройству используется разъем RJ-45. Провода в кабеле должны быть обжаты в определенном порядке (наиболее распространены схемы T568A и T568B).

**2. Коаксиальный кабель:**

Коаксиальный кабель состоит из центрального проводника, окруженного диэлектриком, экраном и внешней оболочкой. Такая конструкция обеспечивает лучшую защиту от помех по сравнению с витой парой.

**Преимущества:**

* Более высокая скорость передачи данных, чем у витой пары
* Большая дальность передачи
* Хорошая защита от помех

**Недостатки:**

* Более высокая стоимость, чем у витой пары
* Сложность установки

Коаксиальный кабель ранее широко использовался в сетях Ethernet, но сегодня он чаще применяется для передачи телевизионного сигнала.

**Пример коаксиального кабеля:** RG-6 - распространенный тип коаксиального кабеля для домашнего использования.

**3. Оптоволоконный кабель:**

Оптоволоконный кабель передает данные с помощью световых импульсов, проходящих по стеклянным или пластиковым волокнам. 

**Преимущества:**

* Самая высокая скорость передачи данных
* Большая дальность передачи
* Иммунитет к электромагнитным помехам

**Недостатки:**

* Высокая стоимость
* Сложность установки и обслуживания

Оптоволоконный кабель используется для создания высокоскоростных магистральных каналов связи, а также для подключения сетей в пределах зданий и кампусов.

**Пример оптоволоконного кабеля:** 
* Одномодовый кабель (SMF) - использует одно оптическое волокно для передачи данных на большие расстояния.
* Многомодовый кабель (MMF) - использует несколько оптических волокон для передачи данных на короткие расстояния.

**4. Беспроводные сети:**

Беспроводные сети используют радиоволны для передачи данных.

**Преимущества:**

* Мобильность
* Простота установки
* Гибкость

**Недостатки:**

* Более низкая скорость передачи данных, чем у проводных сетей
* Ограниченная дальность связи
* Уязвимость к помехам
* Проблемы безопасности

Существуют различные стандарты беспроводных сетей, такие как Wi-Fi, Bluetooth и сотовая связь.

**Пример кода для подключения к сети Wi-Fi с помощью Python:**

```python
import wifi

# Список доступных сетей Wi-Fi
wifi_networks = wifi.Cell.all('wlan0')

# Подключение к сети Wi-Fi
cell = wifi.Cell.where('wlan0', lambda cell: cell.ssid == 'Название_сети')
scheme = wifi.Scheme.for_cell('wlan0', 'home', cell, password='пароль')
scheme.save()
scheme.activate()

# Проверка подключения
if cell.connected():
    print("Подключено к сети Wi-Fi!")
else:
    print("Ошибка подключения")
```

**Комментарий к коду:** 

* Код использует библиотеку `wifi` для управления подключениями Wi-Fi. 
* `wifi.Cell.all('wlan0')` - получает список доступных сетей Wi-Fi на интерфейсе `wlan0`.
* `wifi.Cell.where()` - находит сеть Wi-Fi с заданным SSID (именем сети).
* `wifi.Scheme` - создает схему подключения к сети Wi-Fi.
* `scheme.save()` - сохраняет схему подключения.
* `scheme.activate()` - активирует схему подключения.
* `cell.connected()` - проверяет подключение к сети Wi-Fi.

Выбор среды передачи данных является важным этапом проектирования компьютерной сети. При выборе следует учитывать требования к скорости, дальности, стоимости и другим параметрам.