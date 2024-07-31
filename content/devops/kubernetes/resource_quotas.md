## Настройка квот на ресурсы

В Kubernetes квоты на ресурсы позволяют администраторам кластера контролировать объем ресурсов (CPU, память, PersistentVolumeClaims и др.), которые могут потреблять пространства имен и проекты. Это позволяет:

* **Обеспечить справедливое распределение ресурсов**: Предотвращение монополизации ресурсов одним пространством имен или проектом.
* **Повысить предсказуемость производительности**:  Ограничение потребления ресурсов может помочь предотвратить перегрузку узлов и обеспечить стабильную производительность приложений.
* **Улучшить управление затратами**:  Квоты помогают контролировать и прогнозировать расходы на ресурсы в кластере.

Существует два типа квот ресурсов в Kubernetes:

* **ResourceQuota**: Определяет ограничения на вычислительные ресурсы, такие как CPU, память, запросы и лимиты для контейнеров.
* **LimitRange**: Устанавливает ограничения на ресурсы для отдельных контейнеров и Pod'ов в пространстве имен.

### Настройка ResourceQuota

ResourceQuota применяется к пространству имен и ограничивает общее количество ресурсов, которые могут быть запрошены или использованы объектами в этом пространстве имен.

#### Создание ResourceQuota

Для создания ResourceQuota можно использовать файл конфигурации YAML или команду `kubectl create`.

**Пример файла конфигурации YAML (`resource-quota.yaml`):**

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: example-quota
spec:
  limits:
  - resource: cpu
    max: "10"
  - resource: memory
    max: "20Gi"
  - resource: requests.cpu
    max: "5"
  - resource: requests.memory
    max: "10Gi"
  - resource: pods
    max: "20"
```

**Описание параметров:**

* **limits**: Список ограничений ресурсов.
* **resource**: Тип ресурса (cpu, memory, requests.cpu, requests.memory, pods).
* **max**: Максимальное количество ресурса, которое может быть использовано.

**Создание ResourceQuota с помощью команды `kubectl`:**

```bash
kubectl apply -f resource-quota.yaml
```

#### Просмотр ResourceQuota

Для просмотра информации о созданном ResourceQuota используйте команду:

```bash
kubectl describe resourcequota example-quota -n <namespace>
```

Замените `<namespace>` на имя пространства имен, в котором создан ResourceQuota.

#### Обновление ResourceQuota

Для обновления ResourceQuota можно использовать команду `kubectl edit` или `kubectl apply` с обновленным файлом конфигурации YAML.

**Обновление ResourceQuota с помощью команды `kubectl edit`:**

```bash
kubectl edit resourcequota example-quota -n <namespace>
```

#### Удаление ResourceQuota

Для удаления ResourceQuota используйте команду:

```bash
kubectl delete resourcequota example-quota -n <namespace>
```

### Настройка LimitRange

LimitRange задает ограничения на ресурсы для отдельных Pod'ов и контейнеров в пространстве имен.

#### Создание LimitRange

Для создания LimitRange используйте файл конфигурации YAML или команду `kubectl create`.

**Пример файла конфигурации YAML (`limit-range.yaml`):**

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: example-limit-range
spec:
  limits:
  - type: Pod
    max:
      cpu: "2"
      memory: "4Gi"
    min:
      cpu: "100m"
      memory: "512Mi"
  - type: Container
    max:
      cpu: "1"
      memory: "2Gi"
    min:
      cpu: "50m"
      memory: "256Mi"
    default:
      cpu: "500m"
      memory: "1Gi"
    defaultRequest:
      cpu: "200m"
      memory: "512Mi"
```

**Описание параметров:**

* **type**: Тип объекта, к которому применяются ограничения (Pod, Container).
* **max**: Максимальное количество ресурса для объекта.
* **min**: Минимальное количество ресурса для объекта.
* **default**: Значение по умолчанию для ресурса, если оно не указано в Pod'е.
* **defaultRequest**: Значение запроса по умолчанию для ресурса, если оно не указано в Pod'е.

**Создание LimitRange с помощью команды `kubectl`:**

```bash
kubectl apply -f limit-range.yaml
```

#### Просмотр LimitRange

Для просмотра информации о созданном LimitRange используйте команду:

```bash
kubectl describe limitrange example-limit-range -n <namespace>
```

#### Обновление LimitRange

Для обновления LimitRange можно использовать команду `kubectl edit` или `kubectl apply` с обновленным файлом конфигурации YAML.

#### Удаление LimitRange

Для удаления LimitRange используйте команду:

```bash
kubectl delete limitrange example-limit-range -n <namespace>
```

Используя ResourceQuota и LimitRange, администраторы Kubernetes могут эффективно управлять потреблением ресурсов в кластере, обеспечивая стабильность и предсказуемость для всех приложений. 
