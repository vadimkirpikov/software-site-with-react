## Управление доступом и разрешениями в Kubernetes

Безопасность кластера Kubernetes не ограничивается только защитой сети и узлов. Важнейшим аспектом является управление доступом и разрешениями, которое определяет, кто и к каким ресурсам кластера имеет доступ, а также какие действия может с ними выполнять.

### Обзор механизма RBAC

Kubernetes использует систему контроля доступа на основе ролей (RBAC), которая позволяет гибко настраивать разрешения для пользователей, групп и сервисных аккаунтов. RBAC реализована с помощью следующих объектов:

* **Role:** определяет набор разрешений для доступа к ресурсам в пределах одного пространства имен (namespace).
* **ClusterRole:** аналогичен Role, но определяет разрешения для доступа к ресурсам в масштабе всего кластера.
* **RoleBinding:** связывает объект Role с субъектами (пользователями, группами, сервисным аккаунтом), предоставляя им доступ к ресурсам в пределах пространства имен.
* **ClusterRoleBinding:** аналогичен RoleBinding, но связывает ClusterRole с субъектами, предоставляя им доступ к ресурсам в масштабе всего кластера.

### Субъекты доступа

* **Пользователь (User):** лицо, использующее Kubernetes. Пользователи управляются вне Kubernetes, например, через Active Directory или LDAP.
* **Группа (Group):** набор пользователей. Группы также управляются вне Kubernetes.
* **Сервисный аккаунт (ServiceAccount):** учетная запись, используемая приложениями, работающими в кластере, для взаимодействия с API Kubernetes.

### Ресурсы и операции

**Ресурсы:** объекты Kubernetes, к которым применяется управление доступом (например, Pod, Deployment, Namespace).
**Операции:** действия, которые можно выполнять с ресурсами (например, create, get, list, update, delete).

### Принципы работы RBAC

1. Субъект пытается выполнить операцию над ресурсом.
2. API server Kubernetes проверяет наличие соответствующих разрешений у субъекта.
3. Разрешения определяются на основе Role/ClusterRole, связанных с субъектом через RoleBinding/ClusterRoleBinding.

### Создание Role и RoleBinding

**Пример:** Создадим Role "pod-reader" с правом на чтение Pod в пространстве имен "development" и назначим ее сервисному аккаунту "myapp-sa".

**1. Создайте файл `pod-reader-role.yaml`:**

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: development
  name: pod-reader
rules:
- apiGroups: [""] # "" указывает на core API group
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```

**2. Создайте файл `pod-reader-binding.yaml`:**

```yaml
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: read-pods
  namespace: development
subjects:
- kind: ServiceAccount
  name: myapp-sa
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

**3. Примените конфигурацию:**

```bash
kubectl apply -f pod-reader-role.yaml
kubectl apply -f pod-reader-binding.yaml
```

**В этом примере:**

* **Role "pod-reader":** предоставляет доступ на чтение ("get", "list", "watch") Pod в пространстве имен "development".
* **RoleBinding "read-pods":** связывает Role "pod-reader" с ServiceAccount "myapp-sa" в пространстве имен "development".

### Использование ClusterRole и ClusterRoleBinding

**ClusterRole** и **ClusterRoleBinding** используются для предоставления доступа к ресурсам в масштабе всего кластера. 

**Пример:** Предоставим пользователю "admin-user" полный доступ ко всем ресурсам кластера.

**1. Создайте файл `cluster-admin-role.yaml`:**

```yaml
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cluster-admin
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
```

**2. Создайте файл `cluster-admin-binding.yaml`:**

```yaml
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cluster-admin-binding
subjects:
- kind: User
  name: admin-user
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
```

**3. Примените конфигурацию:**

```bash
kubectl apply -f cluster-admin-role.yaml
kubectl apply -f cluster-admin-binding.yaml
```

**В этом примере:**

* **ClusterRole "cluster-admin":** предоставляет полный доступ ("*") ко всем ресурсам ("*") во всех API группах ("*").
* **ClusterRoleBinding "cluster-admin-binding":** связывает ClusterRole "cluster-admin" с пользователем "admin-user".

### Рекомендации по управлению доступом

* **Принцип минимальных привилегий:** предоставляйте только необходимые разрешения.
* **Используйте Role вместо ClusterRole, когда это возможно.**
* **Группируйте пользователей по ролям.**
* **Регулярно проверяйте и обновляйте настройки RBAC.**

Управление доступом и разрешениями – важный аспект безопасности Kubernetes. RBAC предоставляет гибкий механизм для контроля доступа к ресурсам кластера, позволяя создавать безопасную и контролируемую среду. 
