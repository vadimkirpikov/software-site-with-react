## Примеры конфигураций для различных сценариев

В Kubernetes (k8s) существует множество сценариев развертывания приложений, и каждый сценарий может потребовать уникальной конфигурации. Этот раздел предоставляет практические примеры конфигураций, иллюстрирующие различные сценарии и помогающие освоить гибкость и мощь k8s.

### Развертывание простого веб-приложения

Этот сценарий демонстрирует развертывание простого веб-приложения с помощью Deployment и предоставление доступа к нему через Service.

**Шаг 1:** Создайте файл `deployment.yaml` со следующим содержанием:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-web-app
  template:
    metadata:
      labels:
        app: my-web-app
    spec:
      containers:
      - name: my-web-app
        image: nginx:latest
        ports:
        - containerPort: 80
```

**Описание:**

* `replicas: 3`: Запускает 3 реплики пода.
* `selector`: Выбирает поды с меткой `app: my-web-app`.
* `template`: Определяет шаблон пода, включая метки и контейнер.
* `image: nginx:latest`: Использует образ nginx:latest.
* `containerPort: 80`:  Открывает порт 80 внутри контейнера.

**Шаг 2:** Создайте файл `service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-web-app-service
spec:
  selector:
    app: my-web-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

**Описание:**

* `selector`: Направляет трафик на поды с меткой `app: my-web-app`.
* `ports`: Определяет порт службы (80) и порт контейнера (80).
* `type: LoadBalancer`:  Создает балансировщик нагрузки для доступа извне кластера.

**Шаг 3:** Примените конфигурации:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### Развертывание приложения с переменными окружения

В этом примере мы рассмотрим настройку переменных окружения для приложения.

**Шаг 1:** Создайте файл `configmap.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-app-config
data:
  DATABASE_URL: "https://mydatabase.example.com"
  API_KEY: "your-api-key"
```

**Описание:**

* `kind: ConfigMap`: Определяет объект ConfigMap.
* `data`: Содержит пары ключ-значение для переменных окружения.

**Шаг 2:** Измените файл `deployment.yaml`, добавив `envFrom`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-web-app
spec:
  # ... (остальные настройки)
  template:
    # ... (остальные настройки)
    spec:
      containers:
      - name: my-web-app
        # ... (остальные настройки)
        envFrom:
        - configMapRef:
            name: my-app-config
```

**Описание:**

* `envFrom`: Позволяет загружать переменные окружения из ConfigMap.

**Шаг 3:** Примените конфигурации:

```bash
kubectl apply -f configmap.yaml
kubectl apply -f deployment.yaml
```

### Масштабирование приложения

Kubernetes позволяет легко масштабировать приложения по горизонтали.

**Шаг 1:** Проверьте текущее количество реплик:

```bash
kubectl get deployment my-web-app
```

**Шаг 2:**  Измените количество реплик:

```bash
kubectl scale deployment my-web-app --replicas=5
```

**Описание:**

* `--replicas=5`: Устанавливает количество реплик равным 5.

### Обновление приложения без простоев

Kubernetes позволяет обновлять приложения без простоя с помощью Rolling Updates.

**Шаг 1:** Измените файл `deployment.yaml`, обновив версию образа:

```yaml
# ... (остальные настройки)
        image: nginx:1.23.1
```

**Шаг 2:** Примените обновленный Deployment:

```bash
kubectl apply -f deployment.yaml
```

Kubernetes будет постепенно заменять старые поды новыми, обеспечивая непрерывность работы приложения.

### Заключение

В этой статье были рассмотрены базовые сценарии конфигурации Kubernetes: развертывание простого веб-приложения, настройка переменных окружения, масштабирование и обновление приложения без простоев. Kubernetes предоставляет широкие возможности настройки, позволяя адаптировать конфигурации под различные сценарии.
