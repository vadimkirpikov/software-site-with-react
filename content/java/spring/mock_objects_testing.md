## Тестирование с мок-объектами и внедрением зависимостей

Тестирование является неотъемлемой частью разработки ПО, а в контексте Spring Framework, с его упором на внедрение зависимостей, оно приобретает особую важность. Правильно написанные тесты гарантируют корректную работу приложения, даже при изменении отдельных его компонентов. 

В данном разделе мы рассмотрим тестирование Spring-приложений с использованием мок-объектов. Моки (от англ. mock — имитация) — это объекты, имитирующие поведение реальных объектов, от которых зависит тестируемый код.

### Зачем нужны мок-объекты?

Представим ситуацию: у нас есть сервис `UserService`, который использует репозиторий `UserRepository` для работы с базой данных. 

```java
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
```

Если мы хотим протестировать метод `findUserById`, то нам нужно создать экземпляр `UserService`, а для этого нужен экземпляр `UserRepository`. Создание реального репозитория для тестов нежелательно по нескольким причинам:

* Зависимость от базы данных. Тесты должны быть независимыми и быстрыми, а работа с реальной БД замедляет их и делает зависимыми от ее состояния.
* Сложность настройки. Создание и настройка тестовой базы данных усложняют процесс тестирования.

Вместо этого, мы можем использовать мок-объект `UserRepository`, который будет имитировать его поведение, не обращаясь к реальной базе данных.

### Использование Mockito для создания моков

В Spring Framework существует отличная поддержка для тестирования, включая интеграцию с популярными фреймворками для создания моков, таким как Mockito. Рассмотрим пример тестирования метода `findUserById` с помощью Mockito:

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testFindUserById_Success() {
        // given
        Long userId = 1L;
        User user = new User(userId, "John Doe");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // when
        User foundUser = userService.findUserById(userId);

        // then
        assertEquals(user, foundUser);
    }

    @Test
    void testFindUserById_NotFound() {
        // given
        Long userId = 1L;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // then
        assertThrows(UserNotFoundException.class, () -> userService.findUserById(userId));
    }
}
```

Разберем данный пример:

* **Аннотация `@ExtendWith(MockitoExtension.class)`**: Подключает расширение JUnit 5 для Mockito.
* **Аннотация `@Mock`**: Создает мок-объект `UserRepository`.
* **Аннотация `@InjectMocks`**: Создает экземпляр `UserService` и внедряет в него мок-объект `userRepository`.
* **Метод `when(..).thenReturn(..)`**:  Определяет поведение мока. В данном случае, мы указываем, что при вызове метода `findById` с определенным `userId`, мок должен вернуть объект `Optional.of(user)`.
* **Методы `assertEquals` и `assertThrows`**: Используются для проверки ожидаемого результата.

Таким образом, мы протестировали метод `findUserById`, не используя реальную базу данных, а сымитировав поведение `UserRepository` с помощью мок-объекта.

### Преимущества тестирования с моками:

* **Изоляция зависимостей:** Тесты фокусируются на тестируемом классе, исключая влияние внешних зависимостей.
* **Упрощение тестирования:** Моки позволяют легко сымитировать различное поведение зависимостей, включая граничные случаи.
* **Ускорение тестов:** Моки работают значительно быстрее реальных объектов, особенно при взаимодействии с внешними системами.

### Заключение

Тестирование с мок-объектами является неотъемлемой частью разработки Spring-приложений. Использование Mockito совместно с внедрением зависимостей позволяет создавать простые, быстрые и надежные тесты, которые гарантируют качество вашего кода. 
