## Развертывание FastAPI приложений

После успешной разработки FastAPI приложения, следующий важный шаг - его развертывание, чтобы сделать его доступным для пользователей. В этой статье мы рассмотрим три популярные платформы: Heroku, AWS и Azure.

**Heroku** 

Heroku – это облачная платформа как услуга (PaaS), предлагающая простой и быстрый способ развертывания, запуска и масштабирования приложений.

**Шаг 1. Установка необходимых инструментов**

Убедитесь, что у вас установлен Git и Heroku CLI. Инструкции по установке можно найти на официальных сайтах [https://git-scm.com/](https://git-scm.com/) и [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).

**Шаг 2. Создание приложения Heroku и файла Procfile**

Создайте приложение Heroku через веб-интерфейс или с помощью Heroku CLI:

```bash
heroku create <название-приложения> 
```

Создайте файл `Procfile` в корневой директории вашего проекта:

```
web: uvicorn main:app --host=0.0.0.0 --port=$PORT
```

Здесь:

* `web` указывает на тип процесса, необходимый для Heroku.
* `main:app` соответствует файлу `main.py` с объектом приложения FastAPI `app`.
* `--host=0.0.0.0` делает ваше приложение доступным извне.
* `--port=$PORT` использует порт, динамически назначаемый Heroku.

**Шаг 3. Создание файла requirements.txt**

Создайте файл `requirements.txt`, содержащий все зависимости вашего приложения:

```
fastapi==0.111.1
uvicorn
```

**Шаг 4. Развертывание приложения**

Инициализируйте репозиторий Git, добавьте изменения и отправьте их в Heroku:

```bash
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a <название-приложения>
git push heroku master
```

**AWS (Amazon Web Services)**

AWS – это комплексная облачная платформа, предлагающая широкий спектр сервисов, включая вычисления, хранение данных и сети.

Мы рассмотрим развертывание на AWS Elastic Beanstalk, сервисе, упрощающем развертывание веб-приложений и сервисов.

**Шаг 1. Создание виртуальной среды и установка зависимостей**

Создайте виртуальную среду и установите зависимости:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt 
```

**Шаг 2. Создание файла конфигурации Elastic Beanstalk**

Создайте папку `.ebextensions` в корневой директории проекта. Внутри папки создайте файл `python.config`:

```
option_settings:
  - namespace: aws:elasticbeanstalk:container:python
    option_name: WSGI_PATH
    value: main:app
```

Этот файл указывает Elastic Beanstalk на использование `main:app` как точки входа WSGI.

**Шаг 3. Создание и развертывание приложения Elastic Beanstalk**

Воспользуйтесь веб-интерфейсом или AWS CLI для создания нового приложения Elastic Beanstalk и развертывания вашего кода. Вам потребуется выбрать регион, платформу (Python) и загрузить zip-архив вашего проекта.

**Azure**

Azure – это облачная платформа от Microsoft, предлагающая аналогичные AWS сервисы. Для развертывания FastAPI приложений мы рассмотрим Azure App Service.

**Шаг 1. Подготовка приложения**

Следуйте шагам 1-3 из раздела AWS.

**Шаг 2. Создание файла web.config**

Создайте файл `web.config` в корневой директории вашего проекта:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="FastAPI" path="*" verb="*" modules="FastCgiModule" scriptProcessor="python.exe |path_to_your_venv|Scripts\uvicorn.exe main:app --host=0.0.0.0 --port=%HTTP_PLATFORM_PORT%" resourceType="Unspecified" requireAccess="Script"/>
    </handlers>
  </system.webServer>
</configuration>
```

Замените `|path_to_your_venv|` на фактический путь к вашей виртуальной среде.

**Шаг 3. Развертывание приложения на Azure App Service**

Используйте веб-интерфейс Azure или Azure CLI для создания нового приложения App Service и развертывания вашего кода. 

**Заключение**

Мы рассмотрели базовые шаги по развертыванию FastAPI приложений на Heroku, AWS и Azure. Каждая платформа имеет свои особенности, и выбор зависит от ваших потребностей и предпочтений. 
