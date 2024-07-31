## Установка Neo4j на MacOS

Данный раздел посвящен установке Neo4j на операционную систему MacOS. 

### 1. Скачивание и установка Neo4j

1. **Скачать Neo4j**. Перейдите на официальный сайт Neo4j ([https://neo4j.com/](https://neo4j.com/)) и выберите раздел "Downloads". Выберите версию Neo4j 5.6.0 для MacOS.
2. **Распаковать архив**. После скачивания распакуйте архив с Neo4j в любое удобное место на вашем компьютере. 
3. **Запустить установку**. Перейдите в распакованную директорию и найдите файл `neo4j-community-5.6.0.dmg`. Дважды кликните по нему, чтобы запустить установку. 
4. **Перетащить Neo4j в папку "Applications"**. Перетащите иконку Neo4j из окна установщика в папку "Applications" на вашем компьютере. 
5. **Запустить Neo4j**. Найдите Neo4j в папке "Applications" и дважды кликните по нему, чтобы запустить. 

### 2. Настройка Neo4j

После запуска Neo4j появится окно с настройками. 

1. **Проверка версии Neo4j.** В окне настроек выберите вкладку "Neo4j Server" и убедитесь, что в поле "Neo4j Version" указана версия 5.6.0.
2. **Настройка пароля.** В поле "Default User Password" введите желаемый пароль для пользователя Neo4j. Пароль должен быть не менее 8 символов и содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ. 
3. **Проверка порта**. В поле "Bolt Port" убедитесь, что указан стандартный порт 7687. Если порт занят другим приложением, вы можете изменить его на другой свободный порт.
4. **Запуск Neo4j.** После настройки параметров нажмите кнопку "Start" для запуска Neo4j.

### 3. Доступ к Neo4j

После успешного запуска Neo4j вы можете получить к нему доступ с помощью браузера или командной строки.

#### 3.1. Доступ через браузер

1. **Открыть браузер**. Откройте ваш любимый веб-браузер.
2. **Ввести адрес**. Введите в адресную строку `http://localhost:7474/`.
3. **Авторизация.** На странице авторизации введите имя пользователя `neo4j` и пароль, который вы задали при установке. 

#### 3.2. Доступ через командную строку

1. **Открыть терминал**. Откройте терминал на вашем компьютере.
2. **Подключение к серверу Neo4j**. Используйте следующую команду для подключения к серверу Neo4j:

```bash
neo4j-admin shell
```

3. **Авторизация.** Введите имя пользователя `neo4j` и пароль, который вы задали при установке.

### 4. Проверка установки

1. **Создать узлы**. Используйте следующую команду для создания двух узлов:

```cypher
CREATE (a:Person { name: 'Alice' }), (b:Person { name: 'Bob' });
```

2. **Создать связь**. Используйте следующую команду для создания связи между узлами:

```cypher
CREATE (a)-[:KNOWS]->(b);
```

3. **Проверить результат**. Используйте следующую команду для проверки созданных узлов и связи:

```cypher
MATCH (a:Person)-[:KNOWS]->(b:Person)
RETURN a.name, b.name;
```

Если команда выполнилась успешно и вы получили результат в виде таблицы с именами "Alice" и "Bob", значит, Neo4j установлен и работает правильно.

### 5. Дополнительные настройки

В дальнейшем вы можете изменить настройки Neo4j, такие как:

* **Логирование**. 
* **Безопасность**. 
* **Настройка памяти**. 

Дополнительные настройки будут описаны в следующих разделах руководства. 

### 6. Заключение

В данном разделе вы ознакомились с процессом установки Neo4j на операционную систему MacOS. После успешной установки вы можете начать использовать Neo4j для работы с графическими базами данных. 