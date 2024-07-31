## ConfigMaps и Secrets: Хранение конфигурации и конфиденциальных данных в Kubernetes

В Kubernetes ConfigMaps и Secrets играют важную роль, предоставляя механизмы для хранения и управления конфигурацией приложений и конфиденциальными данными, такими как пароли, токены и ключи. В этом разделе мы подробно рассмотрим оба этих объекта, их различия, способы создания и использования в ваших приложениях.

### ConfigMaps: Управление конфигурацией приложения

ConfigMap - это объект Kubernetes, предназначенный для хранения конфигурационных данных в виде пар "ключ-значение". Эти данные могут быть использованы приложениями, работающими в кластере, без необходимости жестко прописывать их в коде или образах контейнеров.

#### Преимущества использования ConfigMaps:

* **Централизованное управление конфигурацией:** Хранение конфигурации в ConfigMap позволяет легко изменять ее без необходимости перестраивать или повторно развертывать образы контейнеров.
* **Разделение конфигурации от кода:**  ConfigMaps способствуют разделению кода приложения от его конфигурации, делая код более переносимым и удобным в сопровождении.
* **Улучшение безопасности:** ConfigMaps хранятся в etcd, защищенном хранилище Kubernetes, что обеспечивает лучшую безопасность по сравнению с хранением конфигурации в коде приложения.

#### Создание ConfigMap:

Существует несколько способов создать ConfigMap:

**1. Из файла:**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-config
data:
  database.host: my-database
  database.port: "3306"
```

Сохраните этот файл как `configmap.yaml` и выполните команду:

```bash
kubectl apply -f configmap.yaml
```

**2. Из литеральных значений:**

```bash
kubectl create configmap my-config --from-literal=database.host=my-database --from-literal=database.port=3306
```

**3. Из существующего файла:**

```bash
kubectl create configmap my-config --from-file=config.properties
```

В этом примере предполагается, что файл `config.properties` содержит пары "ключ-значение".

#### Использование ConfigMap в Pod:

Существует два основных способа использования данных из ConfigMap в Pod:

**1. Как переменные окружения:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image
    env:
    - name: DATABASE_HOST
      valueFrom:
        configMapKeyRef:
          name: my-config
          key: database.host
    - name: DATABASE_PORT
      valueFrom:
        configMapKeyRef:
          name: my-config
          key: database.port
```

В этом примере переменные окружения `DATABASE_HOST` и `DATABASE_PORT` будут установлены значениями, хранящимися в ConfigMap `my-config` под ключами `database.host` и `database.port` соответственно.

**2. Как монтирование тома:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: my-config
```

В этом примере ConfigMap `my-config` монтируется как том `config-volume` в каталог `/etc/config` внутри контейнера. Данные ConfigMap будут доступны в виде файлов в этом каталоге.

### Secrets: Хранение конфиденциальных данных

Secrets, подобно ConfigMaps, предназначены для хранения данных в формате "ключ-значение". Однако, Secrets оптимизированы для хранения конфиденциальных данных, таких как пароли, токены API и сертификаты SSL/TLS. Kubernetes шифрует Secrets в состоянии покоя, что обеспечивает дополнительный уровень безопасности.

#### Создание Secret:

**1. Из литеральных значений:**

```bash
kubectl create secret generic my-secret --from-literal=username=myuser --from-literal=password=mypassword
```

**2. Из файла:**

```bash
kubectl create secret generic my-secret --from-file=credentials.json
```

**3. Для хранения пароля в формате base64:**

```bash
echo -n 'mypassword' | base64 | kubectl create secret generic my-secret --from-literal=password=
```

#### Использование Secret в Pod:

Использовать данные из Secret можно теми же способами, что и данные из ConfigMap:

**1. Как переменные окружения:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image
    env:
    - name: DATABASE_PASSWORD
      valueFrom:
        secretKeyRef:
          name: my-secret
          key: password
```

**2. Как монтирование тома:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: my-image
    volumeMounts:
    - name: secret-volume
      mountPath: /etc/secret
  volumes:
  - name: secret-volume
    secret:
      secretName: my-secret
```

#### Важные моменты безопасности:

* Никогда не храните конфиденциальные данные в ConfigMaps.
* Ограничьте доступ к Secrets, используя Role-Based Access Control (RBAC) в Kubernetes.
* Регулярно меняйте конфиденциальные данные, хранящиеся в Secrets.

### Заключение

ConfigMaps и Secrets являются неотъемлемой частью управления конфигурацией и конфиденциальными данными в Kubernetes. Правильное использование этих объектов способствует повышению безопасности, переносимости и удобству обслуживания ваших приложений.