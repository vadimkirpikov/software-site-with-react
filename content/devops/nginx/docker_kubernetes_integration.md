## Nginx с Docker и Kubernetes

В современных микросервисных архитектурах Nginx часто используется в связке с Docker и Kubernetes. Docker позволяет упаковывать и запускать Nginx в изолированных контейнерах, а Kubernetes обеспечивает оркестрацию и управление этими контейнерами. Такое сочетание предоставляет гибкость, масштабируемость и отказоустойчивость для приложений.

### Docker и Nginx

#### Создание Docker-образа Nginx

Для запуска Nginx в Docker необходимо создать Docker-образ. Docker-образ - это шаблон, содержащий все необходимые компоненты для запуска приложения, включая операционную систему, зависимости и конфигурационные файлы. 

Создайте файл `Dockerfile` со следующим содержимым:

```dockerfile
FROM nginx:latest

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

В данном примере используется официальный образ `nginx:latest`. Команда `COPY` копирует ваш файл конфигурации `nginx.conf` в директорию конфигурации Nginx внутри образа.

#### Файл конфигурации Nginx (nginx.conf)

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
}
```

Этот конфигурационный файл прослушивает порт 80 и направляет все запросы к стандартной странице приветствия Nginx.

#### Сборка Docker-образа

Выполните следующую команду в терминале, находясь в директории с `Dockerfile`, чтобы собрать образ:

```bash
docker build -t my-nginx-image .
```

Эта команда соберет Docker-образ с именем `my-nginx-image`.

#### Запуск контейнера Docker

Теперь запустите контейнер из созданного образа:

```bash
docker run -d -p 80:80 my-nginx-image
```

Данная команда запустит контейнер в фоновом режиме (`-d`) и пробросит порт 80 из контейнера на порт 80 хост-машины (`-p 80:80`). 

Теперь Nginx будет доступен по адресу `http://localhost`.

### Kubernetes и Nginx

#### Разруливание трафика с помощью Ingress

В Kubernetes Ingress используется для маршрутизации HTTP- и HTTPS-трафика к сервисам, работающим в кластере. Nginx часто используется в качестве Ingress-контроллера в Kubernetes.

##### Установка Ingress-контроллера Nginx

Для установки Ingress-контроллера Nginx можно воспользоваться Helm. Helm - это пакетный менеджер для Kubernetes, упрощающий установку и управление приложениями.

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
```

Эти команды добавят репозиторий Helm для Ingress Nginx, обновят репозитории и установят Ingress-контроллер Nginx в namespace `ingress-nginx`.

##### Создание Ingress-ресурса

Для настройки маршрутизации трафика создайте файл `ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-nginx-ingress
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-nginx-service
            port:
              number: 80
```

Этот Ingress-ресурс направляет трафик с хоста `example.com` на сервис `my-nginx-service` на порту 80.

##### Применение Ingress-ресурса

Примените Ingress-ресурс к кластеру Kubernetes:

```bash
kubectl apply -f ingress.yaml
```

Теперь Ingress-контроллер Nginx будет перехватывать трафик, предназначенный для `example.com`, и направлять его на соответствующий сервис.

### Заключение

Использование Nginx с Docker и Kubernetes предоставляет мощный и гибкий способ развертывания и масштабирования веб-приложений. Docker упрощает упаковку и запуск Nginx, а Kubernetes обеспечивает оркестрацию и управление контейнерами. 

В этой статье были рассмотрены основы работы с Nginx в Docker и Kubernetes, а также примеры конфигурации. Более подробная информация доступна в официальной документации Nginx, Docker и Kubernetes.
