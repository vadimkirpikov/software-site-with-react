## Настройка RBAC и аутентификации в Kubernetes

Безопасность кластера Kubernetes выходит далеко за рамки простой изоляции сети. Контроль доступа на основе ролей (RBAC) и надежная система аутентификации являются краеугольными камнями безопасности Kubernetes, гарантирующими, что доступ к ресурсам кластера имеют только авторизованные пользователи и приложения.

### Основы RBAC

RBAC в Kubernetes следует простой, но мощной модели, основанной на следующих компонентах:

* **Subject**: Пользователь, группа или служебная учетная запись, запрашивающая доступ.
* **Role**: Определяет набор разрешений (глаголов) для ресурсов в определенном пространстве имен (namespace).
* **ClusterRole**: Аналогичен роли, но с областью действия на уровне всего кластера.
* **RoleBinding**: Связывает **Subject** с **Role** для предоставления доступа.
* **ClusterRoleBinding**: Связывает **Subject** с **ClusterRole**.

### Аутентификация

Прежде чем предоставить доступ, Kubernetes должен аутентифицировать пользователя или приложение. Kubernetes поддерживает множество методов аутентификации, включая:

* X.509 сертификаты
* Bearer токены
* Интеграцию с внешними провайдерами OpenID Connect

Выбор метода зависит от требований безопасности и существующей инфраструктуры.

### Настройка RBAC

#### 1. Создание Role

Создадим **Role**, предоставляющую разрешения на чтение подов в пространстве имен "development":

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: development
  name: pod-reader
rules:
- apiGroups: [""] 
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```

#### 2. Создание RoleBinding

Создадим **RoleBinding**, связывающий пользователя "jane" с созданной ранее **Role**:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: development
subjects:
- kind: User
  name: jane 
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

#### 3. Использование ClusterRole

**ClusterRole** предоставляет разрешения на уровне всего кластера. Например, создадим **ClusterRole** для просмотра событий:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: event-viewer
rules:
- apiGroups: [""]
  resources: ["events"]
  verbs: ["get", "list", "watch"]
```

#### 4. Использование ClusterRoleBinding

Свяжем **ClusterRole** с группой пользователей "developers" с помощью **ClusterRoleBinding**:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: developers-view-events
subjects:
- kind: Group
  name: developers
roleRef:
  kind: ClusterRole
  name: event-viewer
  apiGroup: rbac.authorization.k8s.io
```

### Примеры использования

#### Предоставление доступа к пространству имен

Для предоставления пользователю "john" полного доступа к пространству имен "test" можно использовать встроенную **Role** "admin" и **RoleBinding**:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: john-admin-test
  namespace: test
subjects:
- kind: User
  name: john
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: admin
```

#### Ограничение доступа к ресурсам

Для ограничения доступа сервисной учетной записи "myapp" к созданию и удалению подов в пространстве имен "production":

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: myapp-role
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["create", "delete"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: myapp-rolebinding
  namespace: production
subjects:
- kind: ServiceAccount
  name: myapp
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: myapp-role
```

### Заключение

RBAC и аутентификация являются неотъемлемыми частями безопасной эксплуатации Kubernetes. Понимание принципов работы и способов настройки RBAC позволяет гибко управлять доступом к ресурсам кластера, минимизируя риски несанкционированного доступа. 
