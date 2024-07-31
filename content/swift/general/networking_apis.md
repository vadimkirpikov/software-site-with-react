## Взаимодействие с сетевыми API

Современные приложения зачастую полагаются на данные, получаемые из сети. Взаимодействие с сетевыми API — неотъемлемая часть разработки на Swift, позволяющая получать и отправлять данные на сервер, используя HTTP-запросы.

### Основы URLSession

В Swift для работы с сетевыми запросами используется фреймворк `URLSession`. Он предоставляет инструменты для создания запросов, отправки их на сервер и обработки ответов.

**Создание URL:**

Первым шагом при работе с сетевыми запросами является создание URL-адреса ресурса, с которым вы хотите взаимодействовать. 

```swift
let urlString = "https://api.example.com/users" // Замените на реальный адрес API
guard let url = URL(string: urlString) else {
    // Обработка ошибки создания URL
    fatalError("Invalid URL")
}
```

**Создание URLSession:**

Для отправки запросов используется объект `URLSession`. Вы можете использовать `shared` сессию, если у вас нет особых требований к конфигурации.

```swift
let session = URLSession.shared 
```

**Создание запроса (URLRequest):**

Для отправки запроса необходимо создать объект `URLRequest`, указав URL и HTTP-метод (например, GET, POST).

```swift
var request = URLRequest(url: url)
request.httpMethod = "GET" // Установка HTTP-метода
```

**Отправка запроса:**

Для отправки запроса используется метод `dataTask(with:completionHandler:)` объекта `URLSession`.

```swift
let task = session.dataTask(with: request) { (data, response, error) in
    // Обработка ответа сервера
    if let error = error {
        print("Ошибка запроса: \(error)")
        return
    }
    
    guard let data = data else {
        print("Данные не получены")
        return
    }
    
    // Обработка данных (например, декодирование JSON)
    // ...
}

task.resume() // Запуск запроса
```

### Обработка ответа сервера

Метод `dataTask(with:completionHandler:)` возвращает три параметра:

- **data:** данные, полученные от сервера (опционально).
- **response:** объект `URLResponse`, содержащий метаданные ответа (опционально).
- **error:** объект `Error`, если произошла ошибка (опционально).

**Проверка кода состояния HTTP:**

Перед обработкой данных необходимо проверить код состояния HTTP, чтобы убедиться, что запрос был успешным.

```swift
if let httpResponse = response as? HTTPURLResponse,
   (200...299).contains(httpResponse.statusCode) {
    // Обработка данных
} else {
    // Обработка ошибки
}
```

**Декодирование JSON:**

Если API возвращает данные в формате JSON, их необходимо декодировать в объекты Swift. Для этого используется класс `JSONDecoder`.

```swift
struct User: Decodable {
    let id: Int
    let name: String
    let email: String
}

// ...

do {
    let users = try JSONDecoder().decode([User].self, from: data)
    // Обработка массива пользователей
} catch {
    print("Ошибка декодирования JSON: \(error)")
}
```

### Пример: получение списка пользователей

Рассмотрим пример получения списка пользователей с API, возвращающего данные в формате JSON.

```swift
import UIKit

// Структура данных пользователя
struct User: Decodable {
    let id: Int
    let name: String
    let email: String
}

// Функция для получения списка пользователей
func fetchUsers(completion: @escaping ([User]?, Error?) -> Void) {
    let urlString = "https://jsonplaceholder.typicode.com/users"
    guard let url = URL(string: urlString) else {
        completion(nil, NSError(domain: "Invalid URL", code: -1, userInfo: nil))
        return
    }

    let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
        // Обработка ошибок
        if let error = error {
            completion(nil, error)
            return
        }

        guard let data = data else {
            completion(nil, NSError(domain: "No data received", code: -1, userInfo: nil))
            return
        }

        // Декодирование JSON
        do {
            let users = try JSONDecoder().decode([User].self, from: data)
            completion(users, nil)
        } catch {
            completion(nil, error)
        }
    }

    task.resume()
}

// Вызов функции и обработка результата
fetchUsers { (users, error) in
    if let error = error {
        print("Ошибка: \(error)")
    } else if let users = users {
        print("Список пользователей:")
        for user in users {
            print("ID: \(user.id), Имя: \(user.name), Email: \(user.email)")
        }
    }
}
```

Этот код выполняет следующие действия:

1. Определяет структуру данных `User` для декодирования JSON.
2. Создает функцию `fetchUsers`, которая отправляет GET-запрос на API и возвращает список пользователей в замыкании.
3. Вызывает функцию `fetchUsers` и обрабатывает полученный результат.

### Заключение

В этой статье мы рассмотрели основы взаимодействия с сетевыми API в Swift. Вы научились создавать URL-адреса, отправлять HTTP-запросы, обрабатывать ответы сервера и декодировать JSON. Это базовые знания, которые позволят вам начать создавать приложения, взаимодействующие с сетью. В дальнейшем вы можете изучить более продвинутые темы, такие как аутентификация, загрузка файлов, обработка ошибок и работа с различными форматами данных.
