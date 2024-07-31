## Настройка Git

После установки Git на ваш компьютер, перед началом работы необходимо выполнить несколько важных настроек.  Эти настройки позволят Git корректно идентифицировать вас как автора коммитов и настроить предпочитаемый режим работы. 

### Первоначальная настройка

Первым делом нужно сообщить Git ваше имя и адрес электронной почты. Эта информация будет использоваться для подписи всех ваших коммитов. Откройте терминал или командную строку и выполните следующие команды, заменив "Ваше имя" и "your_email@example.com" на ваши данные:

```bash
git config --global user.name "Ваше имя"
git config --global user.email "your_email@example.com"
```

Опция `--global` указывает, что эти настройки будут применены ко всем вашим проектам Git на данном компьютере.  

**Проверка настроек**

Вы можете проверить текущие настройки Git, выполнив команду:

```bash
git config --list
```

### Настройка редактора

Git использует текстовый редактор по умолчанию для создания сообщений коммитов и другой информации.  Вы можете выбрать любой удобный вам редактор. Например, чтобы использовать **Nano** в качестве редактора по умолчанию, выполните команду:

```bash
git config --global core.editor nano
```

Аналогично можно установить другие редакторы, например:

* **Vim:**  `git config --global core.editor vim`
* **VS Code:** `git config --global core.editor "code --wait"` 

### Просмотр изменений

Git предоставляет возможность настроить формат вывода команды `git diff`, которая используется для просмотра различий между файлами.  

Например, для использования цветового выделения различий выполните команду:

```bash
git config --global color.ui auto
```

###  Настройка игнорирования файлов

Часто в проектах присутствуют файлы и папки, которые не нужно отслеживать в системе контроля версий. Это могут быть временные файлы, логи, сгенерированный код и т.д. Для указания Git, какие файлы и папки следует игнорировать, используется файл **.gitignore**.

**Создание файла .gitignore**

Создайте файл `.gitignore` в корневом каталоге вашего проекта. 

**Добавление правил игнорирования**

В файле `.gitignore`  указывайте имена файлов и папок, которые нужно игнорировать, по одной строке на каждый элемент.  Например:

```
# Игнорировать все файлы с расширением .tmp
*.tmp

# Игнорировать папку logs
logs/
```

**Шаблоны игнорирования**

Git поддерживает использование шаблонов в файле `.gitignore`:

* `*` -  заменяет любое количество символов
* `?` - заменяет один символ
* `[abc]` - соответствует любому символу из списка `a`, `b`, `c`

**Глобальное игнорирование**

Вы можете создать глобальный файл `.gitignore`  для игнорирования файлов во всех ваших проектах.  Для этого выполните команду:

```bash
git config --global core.excludesfile ~/.gitignore_global
```

 Затем создайте файл `~/.gitignore_global` и добавьте в него необходимые правила игнорирования.

### Кэширование паролей

Для удобства работы с удаленными репозиториями, требующими аутентификации, Git позволяет кэшировать ваш пароль.

**Кэширование пароля на определенное время**

```bash
git config --global credential.helper 'cache --timeout=3600'
```
Эта команда сохранит ваш пароль в кэше на 1 час (3600 секунд).

**Использование менеджера учётных данных**

Для более безопасного хранения паролей рекомендуется использовать менеджеры учётных данных, такие как **Credential Manager** в Windows или **Keychain** в macOS. 

**Отключение кэширования**

```bash
git config --global --unset credential.helper
```


## Заключение

Правильная настройка Git является важным шагом для комфортной и эффективной работы с системой контроля версий. Уделив время настройке Git под свои нужды, вы сможете сосредоточиться на разработке, не отвлекаясь на решение проблем, связанных с конфигурацией.