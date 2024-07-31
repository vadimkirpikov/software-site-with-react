## Классы исключений

Исключения играют ключевую роль в написании надёжных и отказоустойчивых программ на Java. Они представляют собой нестандартные ситуации, которые нарушают нормальный поток выполнения программы.  Когда происходит подобная ситуация, выбрасывается исключение. 

### Типы исключений

В Java все исключения являются объектами классов, наследующихся от класса `Throwable`.  Существует два основных типа исключений:

* **Проверяемые исключения (Checked Exceptions)**:  Компилятор Java обязывает разработчика обрабатывать эти исключения.  Они представлены классами, наследующимися от `Exception`, но не от `RuntimeException`. 
* **Непроверяемые исключения (Unchecked Exceptions)**: Эти исключения не требуют обязательной обработки.  Они представлены классами, наследующимися от `RuntimeException`.

### Обработка исключений

Для обработки исключений используются блоки `try-catch-finally`:

```java
try {
    // Код, который может выбросить исключение
} catch (ТипИсключения1 e1) {
    // Обработка исключения типа ТипИсключения1
} catch (ТипИсключения2 e2) {
    // Обработка исключения типа ТипИсключения2
} finally {
    // Код, который выполнится в любом случае (и при наличии, и при отсутствии исключений)
} 
```

**Пример**: 

```java
import java.io.FileNotFoundException;
import java.io.FileReader;

public class ExceptionHandlingExample {
    public static void main(String[] args) {
        try {
            FileReader file = new FileReader("nonexistent_file.txt"); // Попытка открыть несуществующий файл
        } catch (FileNotFoundException e) {
            System.out.println("Файл не найден: " + e.getMessage()); 
        } finally {
            System.out.println("Этот код выполнится в любом случае.");
        }
    }
}
```

В этом примере:

1. В блоке `try` предпринимается попытка открыть несуществующий файл. Это действие может вызвать исключение `FileNotFoundException`.
2. Блок `catch` перехватывает исключение `FileNotFoundException` и выводит сообщение об ошибке. 
3. Блок `finally` гарантирует, что определенный код будет выполнен, независимо от того, было ли выброшено исключение или нет.

### Создание собственных исключений

Вы можете создавать собственные классы исключений, расширяя класс `Exception` (для проверяемых исключений) или `RuntimeException` (для непроверяемых исключений).

**Пример**:

```java
public class InsufficientFundsException extends Exception {
    private double currentBalance;
    private double withdrawalAmount;

    public InsufficientFundsException(double currentBalance, double withdrawalAmount) {
        super("Недостаточно средств на счете.");
        this.currentBalance = currentBalance;
        this.withdrawalAmount = withdrawalAmount;
    }

    public double getCurrentBalance() {
        return currentBalance;
    }

    public double getWithdrawalAmount() {
        return withdrawalAmount;
    }
}
```

В этом примере:

1. Создаётся новый класс исключения `InsufficientFundsException`, наследующий класс `Exception`. Это означает, что он будет проверяемым исключением.
2. Конструктор класса принимает текущий баланс и сумму снятия, сохраняет их в полях объекта и вызывает конструктор родительского класса с сообщением об ошибке.
3. Добавлены методы `getCurrentBalance` и `getWithdrawalAmount` для доступа к информации об исключении.

**Использование собственного исключения**:

```java
public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(balance, amount);
        }
        balance -= amount;
    }
}
```

В этом примере:

1. Метод `withdraw` выбрасывает исключение `InsufficientFundsException`, если запрашиваемая сумма превышает доступный баланс. Ключевое слово `throws` используется для указания того, что метод может выбрасывать это проверяемое исключение. 

**Обработка собственного исключения**:

```java
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(100.0);
        try {
            account.withdraw(150.0);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage()); // Вывод сообщения об ошибке
            System.out.println("Текущий баланс: " + e.getCurrentBalance());
            System.out.println("Попытка снятия: " + e.getWithdrawalAmount());
        }
    }
}
```

В этом примере:

1. Создаётся объект `BankAccount` с начальным балансом.
2. В блоке `try` предпринимается попытка снять сумму, превышающую баланс.
3. Блок `catch` перехватывает исключение `InsufficientFundsException` и выводит информацию об ошибке, используя методы, определённые в классе исключения.

### Важность обработки исключений

Обработка исключений важна по нескольким причинам:

* **Предотвращение аварийного завершения программы**: Обработка исключений позволяет программе продолжить работу даже при возникновении ошибок.
* **Логирование и отладка**: Механизм исключений предоставляет информацию о возникших ошибках, что упрощает их поиск и исправление.
* **Улучшение пользовательского опыта**:  Грамотная обработка исключений позволяет предоставить пользователю понятные сообщения об ошибках и предложить альтернативные действия.


### Рекомендации

* Используйте специфичные типы исключений: Вместо использования общих типов исключений, старайтесь создавать и использовать более специфичные типы, которые точно отражают характер ошибки.
* Не игнорируйте исключения: Избегайте пустых блоков `catch`, которые не предпринимают никаких действий. 
* Документируйте выбрасываемые исключения:  Используйте `@throws` в документации к методам, чтобы указать, какие исключения они могут выбрасывать. 
