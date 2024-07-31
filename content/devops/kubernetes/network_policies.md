## Настройка сетевых политик и подключений

Безопасность и управляемость сетевых взаимодействий — ключевые аспекты работы с Kubernetes. В этой статье мы рассмотрим, как настраивать сетевые политики для контроля доступа к подам, а также разберем основные принципы управления сетевыми подключениями в кластере Kubernetes версии 1.28.

### Сетевые политики

Сетевые политики в Kubernetes позволяют определить правила доступа к подам на основе различных атрибутов, таких как:

* Пространства имен (Namespaces)
* Метки (Labels)
* IP-адреса
* Порты

Для работы с сетевыми политиками необходимо установить плагин сетевой безопасности (CNI), который поддерживает NetworkPolicy API.

#### Создание сетевой политики

Сетевые политики определяются с помощью ресурса `NetworkPolicy` в формате YAML. 

**Пример:** 

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress-from-same-namespace
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: myapp
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: myapp
  policyTypes:
  - Ingress
```

**Описание параметров:**

* **apiVersion:** версия API сетевых политик.
* **kind:** тип ресурса Kubernetes.
* **metadata:** метаданные сетевой политики, включая имя и пространство имен.
* **spec:** спецификация сетевой политики.
    * **podSelector:** определяет, к каким подам применяется данная политика. В данном случае, ко всем подам с меткой `app: myapp`.
    * **ingress:** определяет правила входящего трафика.
        * **from:** список источников трафика, которым разрешен доступ. В данном случае, доступ разрешен только подам с меткой `app: myapp`.
    * **policyTypes:** определяет типы правил, которые применяются к данной политике. В данном случае, применяется только правило для входящего трафика (`Ingress`).

Данная политика разрешает входящий трафик только от подов с меткой `app: myapp` к подам с такой же меткой в пространстве имен `default`.

**Применение политики:**

```bash
kubectl apply -f network-policy.yaml
```

#### Типы правил

Существует два типа правил сетевой политики:

* **Ingress:** определяет правила для входящего трафика к подам.
* **Egress:** определяет правила для исходящего трафика из подов.

#### Селекторы

Селекторы используются для выбора подов, к которым применяется политика, и для определения источников трафика. 

**Типы селекторов:**

* **podSelector:** выбирает поды по меткам.
* **namespaceSelector:** выбирает пространства имен по меткам.
* **ipBlock:** выбирает IP-адреса по диапазонам.

#### Примеры политик

**1. Запрет всего трафика:**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

**2. Разрешить трафик только из определенного пространства имен:**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress-from-namespace
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: myapp
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: allowed-namespace
  policyTypes:
  - Ingress
```

**3. Разрешить трафик только на определенный порт:**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-ingress-on-port
  namespace: default
spec:
  podSelector:
    matchLabels:
      app: myapp
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: allowed-app
  ports:
  - protocol: TCP
    port: 8080
  policyTypes:
  - Ingress
```

### Управление сетевыми подключениями

#### DNS

Kubernetes предоставляет встроенный DNS-сервис, который позволяет подам обращаться друг к другу по именам сервисов. 

#### Сервисы

Сервисы в Kubernetes предоставляют абстракцию над набором подов и позволяют организовать доступ к ним по статическому IP-адресу и DNS-имени.

#### Ingress

Ingress-контроллер — это компонент, который позволяет направлять внешний трафик в кластер Kubernetes. Он работает с Ingress-ресурсами, которые определяют правила маршрутизации трафика.

### Заключение

В этой статье мы рассмотрели основные принципы настройки сетевых политик и управления сетевыми подключениями в Kubernetes. 
