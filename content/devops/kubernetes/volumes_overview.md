## Обзор хранилищ в Kubernetes

В Kubernetes приложения, запущенные в подах, эфемерны. Это означает, что при перезапуске пода данные, хранящиеся в нем, будут потеряны. Для решения этой проблемы Kubernetes предоставляет возможность монтировать persistent volumes (PV) в поды как persistent volume claims (PVC).

### Persistent Volumes (PV)

PV - это единица хранения, предоставляемая администратором кластера Kubernetes.  Ресурсы PV  не привязаны к какому-либо конкретному узлу и могут быть динамически или статически provisioned.

#### Типы PV

Kubernetes поддерживает множество типов PV, предоставляемых облачными провайдерами и локальными системами хранения:

| Тип         | Описание                                                         |
|--------------|-------------------------------------------------------------------|
| hostPath     | Использует путь на хост-машине. **Использовать с осторожностью!** |
| nfs          | Использует NFS-сервер.                                             |
| iscsi       | Использует iSCSI-сервер.                                           |
| glusterfs   | Использует GlusterFS-сервер.                                       |
| cephfs      | Использует CephFS-сервер.                                         |
| awsElasticBlockStore | Использует EBS-тома в AWS.                                    |
| azureDisk    | Использует Azure Disk.                                          |
| gcePersistentDisk | Использует Persistent Disk в Google Cloud.                    |

#### Создание PV

Для создания PV используется YAML-файл с описанием ресурса. 

**Пример:**

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: example-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  nfs:
    server: nfs-server.example.com
    path: /volume1
```

В этом примере мы создаем PV `example-pv` размером 10 ГБ с типом `nfs`. 

**Описание параметров:**

* `capacity`: размер тома.
* `accessModes`: режимы доступа к тому (ReadWriteOnce, ReadOnlyMany, ReadWriteMany).
* `persistentVolumeReclaimPolicy`: политика обработки PV после удаления PVC (Retain, Recycle, Delete).
* `nfs`: параметры подключения к NFS-серверу.

#### Просмотр доступных PV

```bash
kubectl get pv
```

### Persistent Volume Claims (PVC)

PVC - это запрос пода на выделение хранилища. PVC  связывает под с PV, удовлетворяющим его требованиям.

#### Создание PVC

Для создания PVC используется YAML-файл с описанием ресурса. 

**Пример:**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: example-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
```

В этом примере мы создаем PVC `example-pvc`, запрашивающий 5 ГБ хранилища с режимом доступа `ReadWriteOnce`. 

#### Просмотр доступных PVC

```bash
kubectl get pvc
```

### Монтирование PV в под

Чтобы использовать PV в поде, необходимо примонтировать его как том. 

**Пример:**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
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
      claimName: example-pvc
```

В этом примере мы создаем под `example-pod` с томом `my-volume`, примонтированным в `/var/www/html`. PVC `example-pvc` будет автоматически связан с PV, удовлетворяющим его требованиям.

### Динамическое выделение PV

Kubernetes может автоматически создавать PV при создании PVC, если настроено dynamic provisioning. Для этого необходимо создать StorageClass.

#### Создание StorageClass

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: example-storageclass
provisioner: <provisioner_name>
parameters:
  <provisioner_parameters>
```

В этом примере `provisioner` - это имя provisioner-а, а `parameters` - параметры, специфичные для provisioner-а. 

#### Использование StorageClass

Для использования StorageClass укажите его имя в PVC:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: example-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: example-storageclass
```

### Вывод

Хранилища играют важную роль в Kubernetes, позволяя запускать stateful-приложения. PV и PVC обеспечивают абстракцию над физическими ресурсами, упрощая управление хранилищем.  
