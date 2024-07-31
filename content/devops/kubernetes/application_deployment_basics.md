## Основы развертывания приложений в Kubernetes

Kubernetes (K8s) предоставляет мощную платформу для развертывания и управления приложениями. В этой статье мы рассмотрим основы развертывания приложений в Kubernetes, используя Deployment и Service. 

**Deployment** – это объект Kubernetes, который отвечает за запуск и управление определенным количеством идентичных подов (Pods). Deployment следит за состоянием подов и автоматически перезапускает их в случае сбоя или при обновлении приложения.

**Service** – это абстракция, которая предоставляет постоянный доступ к группе подов. Service позволяет обращаться к подам по постоянному имени, даже если IP-адреса подов изменяются.

### Создание Deployment

Для создания Deployment используется YAML-файл с описанием конфигурации.

**Пример YAML-файла для Deployment:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3 # Количество подов
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest # Образ Docker
        ports:
        - containerPort: 80
```

**Описание параметров:**

| Параметр | Описание |
|---|---|
| `replicas` | Количество подов, которые Deployment должен поддерживать в рабочем состоянии. |
| `selector` | Критерии выбора подов, которыми управляет Deployment. |
| `template` | Шаблон пода, который Deployment использует для создания новых подов. |

**Создание Deployment:**

```bash
kubectl apply -f nginx-deployment.yaml
```

### Создание Service

Для создания Service также используется YAML-файл.

**Пример YAML-файла для Service:**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80 # Порт Service
    targetPort: 80 # Порт контейнера
  type: LoadBalancer # Тип Service
```

**Описание параметров:**

| Параметр | Описание |
|---|---|
| `selector` | Критерии выбора подов, к которым Service будет направлять трафик. |
| `ports` | Список портов, которые Service будет прослушивать. |
| `type: LoadBalancer` | Тип Service. `LoadBalancer` создает внешний балансировщик нагрузки, который направляет трафик на Service. |

**Создание Service:**

```bash
kubectl apply -f nginx-service.yaml
```

### Доступ к приложению

После создания Deployment и Service вы можете получить доступ к приложению через внешний IP-адрес, предоставленный балансировщиком нагрузки.

```bash
kubectl get service nginx-service
```

В выводе команды вы увидите внешний IP-адрес Service. Используйте этот IP-адрес для доступа к приложению.

### Обновление приложения

Для обновления приложения достаточно изменить образ Docker в файле Deployment и применить изменения.

**Пример обновления Deployment:**

```yaml
# ...
spec:
  template:
    spec:
      containers:
      - name: nginx
        image: nginx:1.23.1 # Обновленный образ Docker
# ...
```

**Применение изменений:**

```bash
kubectl apply -f nginx-deployment.yaml
```

Deployment автоматически обновит поды до новой версии образа.

### Заключение

В этой статье мы рассмотрели основы развертывания приложений в Kubernetes с помощью Deployment и Service. Kubernetes предоставляет мощные инструменты для автоматизации развертывания, управления и масштабирования приложений. 
