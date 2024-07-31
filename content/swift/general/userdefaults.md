## Хранение настроек с помощью UserDefaults

UserDefaults – это механизм в iOS, который позволяет хранить небольшие порции данных в постоянной памяти устройства. Он идеально подходит для сохранения пользовательских настроек, флагов состояний и других данных, которые должны быть доступны при следующем запуске приложения.

**Типы данных, поддерживаемые UserDefaults:**

UserDefaults работает с ограниченным набором типов данных, которые могут быть сохранены:

| Тип данных Swift   | Тип данных UserDefaults |
|--------------------|-------------------------|
| String              | String                   |
| Int                | Integer                  |
| Float              | Float                    |
| Double             | Double                   |
| Bool               | Boolean                  |
| Data               | Data                     |
| Array<поддерживаемый тип> | Array                   |
| Dictionary<поддерживаемый тип, поддерживаемый тип> | Dictionary              |

**Основные операции с UserDefaults:**

1. **Получение экземпляра UserDefaults:**

    ```swift
    let defaults = UserDefaults.standard 
    ```

    Этот код возвращает объект `UserDefaults`, связанный с вашим приложением. 

2. **Сохранение данных:**

    ```swift
    // Сохранение строки
    defaults.set("Swift User", forKey: "username")

    // Сохранение целого числа
    defaults.set(25, forKey: "userAge")

    // Сохранение булевого значения
    defaults.set(true, forKey: "isDarkModeEnabled")
    ```

    Метод `set(_:forKey:)` используется для сохранения значения определенного типа данных по заданному ключу. 

3. **Чтение данных:**

    ```swift
    // Чтение строки
    let username = defaults.string(forKey: "username") ?? "Гость"

    // Чтение целого числа
    let userAge = defaults.integer(forKey: "userAge") 

    // Чтение булевого значения
    let isDarkModeEnabled = defaults.bool(forKey: "isDarkModeEnabled")
    ```

    Для чтения данных используются методы, соответствующие типу хранимого значения (например, `string(forKey:)`, `integer(forKey:)`, `bool(forKey:)`). Если значение по указанному ключу не найдено, эти методы возвращают значения по умолчанию: пустую строку для `string(forKey:)`, 0 для `integer(forKey:)`, `false` для `bool(forKey:)`.

4. **Удаление данных:**

    ```swift
    defaults.removeObject(forKey: "username") 
    ```

    Метод `removeObject(forKey:)` удаляет значение, связанное с указанным ключом.

**Пример использования UserDefaults для хранения настроек темы приложения:**

```swift
import UIKit

class SettingsViewController: UIViewController {

    @IBOutlet weak var darkModeSwitch: UISwitch!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Загружаем состояние переключателя из UserDefaults
        let defaults = UserDefaults.standard
        darkModeSwitch.isOn = defaults.bool(forKey: "isDarkModeEnabled")
    }

    @IBAction func darkModeSwitchToggled(_ sender: UISwitch) {
        // Сохраняем состояние переключателя в UserDefaults
        let defaults = UserDefaults.standard
        defaults.set(sender.isOn, forKey: "isDarkModeEnabled")

        // Обновляем тему приложения
        updateAppTheme()
    }

    func updateAppTheme() {
        // Логика обновления темы приложения на основе значения isDarkModeEnabled
    }
}
```

В этом примере `UserDefaults` используется для хранения настройки темного режима. При запуске приложения `viewDidLoad()` загружает сохраненное значение и устанавливает переключатель в соответствующее положение. При изменении состояния переключателя, метод `darkModeSwitchToggled(_:)` сохраняет новое значение в `UserDefaults` и обновляет тему приложения.

**Важно:** UserDefaults не подходит для хранения конфиденциальных данных, так как он не шифрует данные автоматически. Для хранения такой информации используйте Keychain.

UserDefaults – это простой и удобный инструмент для хранения небольших объемов данных. Он идеально подходит для пользовательских настроек, делая ваше приложение более удобным и персонализированным. 
