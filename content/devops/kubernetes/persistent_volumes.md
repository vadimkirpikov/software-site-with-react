## Создание и использование постоянных томов (Persistent Volumes)

В Kubernetes поды по умолчанию эфемерны. Это означает, что при удалении пода, удаляются и все его данные. Для хранения данных, которые должны сохраняться после перезапуска пода или узла, используются **Persistent Volumes (PV)**.

PV - это абстракция хранилища на уровне кластера. Они существуют независимо от подов и могут быть подключены к ним по мере необходимости. 

### Типы Persistent Volumes

Kubernetes поддерживает множество типов PV, например:

| Тип           | Описание                                                       |
|--------------|-----------------------------------------------------------------|
| hostPath       | Использует директорию на узле хоста.                          |
| nfs           | Использует NFS (Network File System) сервер.                |
| iscsi         | Использует iSCSI (Internet Small Computer System Interface) сервер. |
| glusterfs     | Использует GlusterFS (распределенная файловая система).     |
| cephfs       | Использует CephFS (распределенная файловая система).      |
| awsElasticBlockStore | Использует тома EBS (Elastic Block Storage) в AWS.            |
| azureDisk     | Использует управляемые диски Azure.                          |
| gcePersistentDisk | Использует постоянные диски Google Compute Engine.             |

### Создание Persistent Volume

Чтобы создать PV, нужно определить его спецификацию в YAML-файле и применить ее с помощью команды `kubectl apply`.

**Пример:**

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-example
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  nfs:
    server: 172.17.0.2
    path: /volume1
```

**Описание параметров:**

* **capacity.storage:**  Размер тома.
* **accessModes:**  Режимы доступа к тому:
    * **ReadWriteOnce:**  Том может быть подключен к одному поду в режиме чтения и записи.
    * **ReadOnlyMany:**  Том может быть подключен к нескольким подам только для чтения.
    * **ReadWriteMany:**  Том может быть подключен к нескольким подам в режиме чтения и записи.
* **persistentVolumeReclaimPolicy:**  Политика обработки тома после удаления PVC:
    * **Retain:**  Данные сохраняются, том нужно чистить вручную.
    * **Recycle:**  Данные удаляются, том становится доступным для использования.
    * **Delete:**  Том удаляется вместе с данными (зависит от типа хранилища).
* **nfs:**  Параметры подключения к NFS серверу.

### Persistent Volume Claims (PVC)

**Persistent Volume Claim (PVC)** - это запрос пода на выделение хранилища. PVC использует PV для удовлетворения своих требований.

**Пример:**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-example
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 500Mi
```

**Описание параметров:**

* **accessModes:**  Режимы доступа к тому (должны соответствовать PV).
* **resources.requests.storage:**  Запрашиваемый размер тома.

### Использование Persistent Volumes в Pod

Чтобы использовать PV в поде, нужно:

1. Создать PV и PVC.
2. Указать PVC в спецификации тома пода.

**Пример:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-example
spec:
  containers:
    - name: my-container
      image: nginx:latest
      volumeMounts:
        - mountPath: /var/www/html
          name: my-volume
  volumes:
    - name: my-volume
      persistentVolumeClaim:
        claimName: pvc-example
```

**Описание параметров:**

* **volumeMounts:**  Точки монтирования тома в контейнере.
* **volumes.persistentVolumeClaim.claimName:**  Имя PVC, который будет использован.

### Шаги по созданию и использованию PV:

1. **Создайте файл с описанием PV.** 
2. **Примените конфигурацию PV:**
    ```
    kubectl apply -f pv.yaml
    ```
3. **Создайте файл с описанием PVC.** 
4. **Примените конфигурацию PVC:**
    ```
    kubectl apply -f pvc.yaml
    ```
5. **Создайте файл с описанием пода, использующего PVC.** 
6. **Запустите под:**
    ```
    kubectl apply -f pod.yaml
    ```

После запуска пода Kubernetes найдет подходящий PV для PVC и подключит его к поду. 

**Важно:** 

* Убедитесь, что PV и PVC находятся в одном namespace.
* Убедитесь, что запрашиваемый PVC размер не превышает размер PV.
* Убедитесь, что режимы доступа PVC совместимы с режимами доступа PV.

Использование Persistent Volumes позволяет создавать приложения, которые могут хранить данные независимо от жизненного цикла пода, что делает Kubernetes  пригодным для запуска stateful-приложений. 
