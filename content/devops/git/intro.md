## Система контроля версий Git

Git - это распределенная система контроля версий, разработанная Линусом Торвальдсом. Она отслеживает изменения в файлах проекта, позволяя возвращаться к предыдущим версиям, сравнивать изменения и совместно работать над проектом в команде.

### Зачем нужна система контроля версий?

Представьте, что вы разрабатываете приложение без системы контроля версий. 

* Как вы будете отслеживать изменения в коде? 
* Что делать, если нужно вернуться к предыдущей версии? 
* Как совместно работать над кодом с другими разработчиками?

Системы контроля версий, такие как Git, решают эти проблемы:

* **Отслеживание изменений**: Git фиксирует каждое изменение, внесенное в файлы проекта. Вы всегда можете просмотреть историю изменений и понять, кто, когда и что изменил.
* **Восстановление предыдущих версий**: Git позволяет вернуться к любой сохраненной версии проекта. Это полезно, если нужно исправить ошибку или восстановить удаленный код.
* **Совместная работа**: Git упрощает совместную работу над проектом. Разработчики могут работать над своими копиями кода и затем объединять изменения.

### Как работает Git?

Git хранит информацию о проекте в виде **репозитория**. Репозиторий - это своего рода база данных, содержащая историю всех изменений в файлах проекта.

Репозитории Git бывают **локальными** и **удаленными**. Локальный репозиторий хранится на компьютере разработчика. Удаленный репозиторий размещается на сервере и позволяет нескольким разработчикам обмениваться изменениями.

### Основные понятия Git

* **Коммит (commit)**: снимок состояния всех файлов проекта в определенный момент времени. Каждый коммит сопровождается описанием внесенных изменений.
* **Ветка (branch)**: независимая линия разработки. Ветки позволяют работать над новыми функциями или исправлять ошибки, не затрагивая основную ветку кода.
* **Слияние (merge)**: объединение изменений из разных ветвей.

### Начало работы с Git

1. **Установка Git:**
   * **Linux**: используйте менеджер пакетов вашего дистрибутива. Например, в Ubuntu:
     ```bash
     sudo apt-get install git
     ```
   * **macOS**: скачайте установщик с официального сайта [https://git-scm.com/](https://git-scm.com/)
   * **Windows**: скачайте установщик с официального сайта [https://git-scm.com/](https://git-scm.com/)

2. **Настройка Git:**
   ```bash
   git config --global user.name "Ваше имя"
   git config --global user.email "vasha.pochta@example.com"
   ```
   Эти команды настроят ваше имя и адрес электронной почты, которые будут использоваться для идентификации ваших коммитов.

3. **Создание репозитория:**
   ```bash
   mkdir my-project
   cd my-project
   git init
   ```
   Эти команды создадут новую папку "my-project", перейдут в нее и инициализируют пустой репозиторий Git.

4. **Добавление файлов в репозиторий:**
   ```bash
   touch main.py
   git add main.py
   ```
   Эти команды создадут новый файл "main.py" и добавят его в **индекс** Git - список файлов, которые будут включены в следующий коммит.

5. **Создание коммита:**
   ```bash
   git commit -m "Первоначальная версия проекта"
   ```
   Эта команда создаст первый коммит с сообщением "Первоначальная версия проекта". 

### Просмотр истории изменений

* **Просмотр лога коммитов:**
  ```bash
  git log
  ```
  Эта команда выведет список всех коммитов в репозитории с информацией об авторе, дате и времени коммита, а также сообщением коммита.

* **Просмотр изменений в коммите:**
  ```bash
  git show <хэш-коммита>
  ```
  Эта команда покажет изменения, внесенные в конкретный коммит. <хэш-коммита> - это уникальный идентификатор коммита, который можно найти в выводе команды `git log`.

### Работа с ветками

* **Создание новой ветки:**
  ```bash
  git branch <название-ветки>
  ```
* **Переключение на другую ветку:**
  ```bash
  git checkout <название-ветки>
  ```
* **Слияние ветки с текущей:**
  ```bash
  git merge <название-ветки>
  ```

### Работа с удаленными репозиториями

* **Клонирование удаленного репозитория:**
  ```bash
  git clone <адрес-репозитория>
  ```
* **Отправка изменений в удаленный репозиторий:**
  ```bash
  git push origin <название-ветки>
  ```
* **Получение изменений из удаленного репозитория:**
  ```bash
  git pull origin <название-ветки>
  ```

### Пример работы с Git

```python
# main.py
print("Hello, world!")
```

```bash
git add main.py
git commit -m "Добавлен вывод 'Hello, world!'"

git checkout -b feature/new-feature # создаем ветку feature/new-feature
# вносим изменения в main.py
git add main.py
git commit -m "Реализована новая функция"

git checkout master # переключаемся обратно на ветку master
git merge feature/new-feature # объединяем изменения из ветки feature/new-feature
```

В этом примере мы создали файл `main.py`, добавили его в репозиторий и сделали первый коммит. Затем мы создали новую ветку `feature/new-feature`, внесли в нее изменения и сделали коммит. 

После этого мы вернулись на ветку `master` и объединили ее с веткой `feature/new-feature`, чтобы добавить новую функцию в основную ветку разработки.


Это лишь краткий обзор возможностей Git. Более подробную информацию можно найти в официальной документации [https://git-scm.com/doc](https://git-scm.com/doc). 