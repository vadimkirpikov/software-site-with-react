## Сетевые устройства в локальной сети (LAN)

Локальная сеть (LAN) представляет собой группу устройств, объединенных в пределах ограниченной области, например, дома, офиса или здания. Для построения и эффективной работы LAN используются различные сетевые устройства. В данном разделе мы рассмотрим наиболее распространенные из них.

### 1. Сетевые адаптеры

Сетевой адаптер (сетевая карта) – это устройство, позволяющее компьютеру или другому устройству подключаться к сети и обмениваться данными с другими устройствами. 
Существуют различные типы сетевых адаптеров:

* **Ethernet-адаптеры:** наиболее распространенный тип, обеспечивающий подключение к сети по витой паре с разъемом RJ-45.
* **Wi-Fi адаптеры:** обеспечивают беспроводное подключение к сети Wi-Fi.
* **Bluetooth адаптеры:**  используются для беспроводного подключения на коротких расстояниях.

Современные компьютеры и ноутбуки обычно имеют встроенные сетевые адаптеры. Однако, для подключения старых устройств или расширения функциональности, могут потребоваться внешние адаптеры, подключаемые через USB, PCI или другие интерфейсы.

### 2. Коммутаторы (Switches)

Коммутатор – это устройство, предназначенное для соединения нескольких устройств в одну сеть. 
Он работает на втором уровне модели OSI (канальном уровне) и пересылает данные между устройствами в пределах одной сети, основываясь на MAC-адресах. Коммутаторы бывают:

* **Неуправляемые:** простые и недорогие коммутаторы, не требующие настройки.
* **Управляемые:** обладают расширенными функциями, такими как VLAN, QoS, агрегирование каналов и т.д.
* **Многоуровневые (мультислойные):** работают на нескольких уровнях модели OSI и могут выполнять функции маршрутизатора.

### 3. Маршрутизаторы (Routers)

Маршрутизатор – это устройство, соединяющее две или более сетей, работающее на третьем уровне модели OSI (сетевом уровне). 
Он пересылает пакеты данных между сетями, основываясь на IP-адресах. 
Главные функции маршрутизатора:

* **Определение оптимального маршрута** для передачи данных.
* **NAT (преобразование сетевых адресов):** позволяет нескольким устройствам в локальной сети использовать один внешний IP-адрес.
* **Межсетевой экран (Firewall):** обеспечивает защиту локальной сети от несанкционированного доступа извне.

### 4. Точки доступа (Access Points)

Точка доступа – это устройство, обеспечивающее беспроводное подключение устройств к проводной сети. 
Она принимает данные из проводной сети и передает их по радиоканалу на устройства Wi-Fi, и наоборот. 
Точки доступа бывают:

* **Автономные:** простые точки доступа, подключаемые к проводной сети.
* **Контроллеры точек доступа:** централизованно управляющие несколькими точками доступа, обеспечивая единую точку управления беспроводной сетью.

### 5. Модемы

Модем – это устройство, модулирующее и демодулирующее сигналы для передачи данных по линиям связи, например, телефонным линиям или кабельному телевидению. 
Существуют различные типы модемов:

* **DSL-модемы:** используются для подключения к сети Интернет по телефонным линиям.
* **Кабельные модемы:** обеспечивают подключение к сети через кабельное телевидение.
* **Оптоволоконные модемы:** используются для подключения к высокоскоростным оптоволоконным сетям.

### 6. Пример настройки сетевого устройства

#### Настройка IP-адреса на маршрутизаторе MikroTik

1. Подключитесь к маршрутизатору MikroTik через Winbox или веб-интерфейс.
2. Перейдите в раздел **IP** -> **Addresses**.
3. Нажмите кнопку **"Add"** для добавления нового IP-адреса.
4. В поле **"Address"** введите IP-адрес, который вы хотите назначить маршрутизатору.
5. В поле **"Netmask"** введите маску подсети.
6. В поле **"Interface"** выберите сетевой интерфейс, к которому будет привязан IP-адрес.
7. Нажмите кнопку **"OK"** для сохранения настроек.

#### Пример кода для настройки IP-адреса на маршрутизаторе MikroTik с помощью скрипта:

```
/ip address add address=192.168.1.1/24 interface=ether1
```

**Комментарии к коду:**

* `/ip address add` - команда для добавления IP-адреса.
* `address=192.168.1.1/24` - IP-адрес и маска подсети.
* `interface=ether1` - сетевой интерфейс, к которому привязан IP-адрес.

### Заключение

В этом разделе мы рассмотрели основные сетевые устройства, используемые в локальных сетях. 
Выбор и настройка этих устройств зависит от конкретных потребностей сети. 
Важно понимать принципы работы и функции каждого устройства для построения эффективной и безопасной сети.