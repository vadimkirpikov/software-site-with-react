## Обмен данными между потоками: Класс Exchanger

В многопоточных приложениях часто возникает необходимость организовать безопасный и эффективный обмен данными между разными потоками. Java предоставляет для этого различные инструменты, и один из них — класс `Exchanger`.

### Класс Exchanger: Основы

`Exchanger` — это класс-утилита, предоставляющий точку синхронизации для двух потоков. Он позволяет двум потокам встретиться в определенной точке и обменяться объектами. 

**Основные характеристики:**

* **Синхронизированный обмен:**  `Exchanger` гарантирует, что обмен данными произойдет только тогда, когда оба потока достигнут точки обмена.
* **Типизированный обмен:**  Вы можете указать тип данных, которыми будут обмениваться потоки, используя generics.
* **Одноразовый или многоразовый обмен:**  `Exchanger` может быть использован для однократного обмена или для многократных обменов между двумя потоками.

### Принцип работы

`Exchanger` работает по принципу "встречи" ("rendezvous"). Оба потока вызывают метод `exchange()`, передавая в него объект для обмена.  

* **Если первый поток вызывает `exchange()` раньше второго:** он блокируется, ожидая, пока второй поток не вызовет `exchange()`.
* **Когда второй поток вызывает `exchange()`:** происходит обмен данными, и оба потока разблокируются, продолжая свою работу.

### Использование класса Exchanger

Давайте рассмотрим простой пример, демонстрирующий использование `Exchanger`. Представим, что у нас есть два потока: `Producer` и `Consumer`. `Producer` генерирует строки, а `Consumer` их потребляет. 

```java
import java.util.concurrent.Exchanger;

public class ExchangerExample {

    public static void main(String[] args) {
        // Создаем объект Exchanger для обмена строками
        Exchanger<String> exchanger = new Exchanger<>();

        // Создаем потоки Producer и Consumer
        Thread producerThread = new Thread(new Producer(exchanger));
        Thread consumerThread = new Thread(new Consumer(exchanger));

        // Запускаем потоки
        producerThread.start();
        consumerThread.start();
    }

    // Класс, представляющий поток Producer
    static class Producer implements Runnable {
        private final Exchanger<String> exchanger;

        public Producer(Exchanger<String> exchanger) {
            this.exchanger = exchanger;
        }

        @Override
        public void run() {
            for (int i = 1; i <= 3; i++) {
                String message = "Сообщение " + i + " от Producer";
                try {
                    // Отправляем сообщение Consumer через Exchanger
                    System.out.println("Producer отправляет: " + message);
                    String receivedMessage = exchanger.exchange(message);
                    System.out.println("Producer получил: " + receivedMessage);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    // Класс, представляющий поток Consumer
    static class Consumer implements Runnable {
        private final Exchanger<String> exchanger;

        public Consumer(Exchanger<String> exchanger) {
            this.exchanger = exchanger;
        }

        @Override
        public void run() {
            for (int i = 1; i <= 3; i++) {
                try {
                    // Получаем сообщение от Producer через Exchanger
                    String receivedMessage = exchanger.exchange("Сообщение " + i + " от Consumer");
                    System.out.println("Consumer получил: " + receivedMessage);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }
}
```

В этом примере:

1. Мы создаем объект `Exchanger<String>`, указав, что потоки будут обмениваться строками.
2. Создаем два потока: `Producer` и `Consumer`, передавая им объект `Exchanger`.
3. В методе `run()` каждого потока происходит цикл, в котором:
    * `Producer` генерирует сообщение и отправляет его через `exchanger.exchange(message)`. 
    * `Consumer` ожидает сообщение через `exchanger.exchange("Сообщение от Consumer")`. 
4. При вызове `exchange()` оба потока блокируются до тех пор, пока оба не достигнут этой точки. 
5. Происходит обмен сообщениями, и потоки продолжают свою работу. 

**Вывод программы:**

```
Producer отправляет: Сообщение 1 от Producer
Consumer получил: Сообщение 1 от Producer
Producer получил: Сообщение 1 от Consumer
Producer отправляет: Сообщение 2 от Producer
Consumer получил: Сообщение 2 от Producer
Producer получил: Сообщение 2 от Consumer
Producer отправляет: Сообщение 3 от Producer
Consumer получил: Сообщение 3 от Producer
Producer получил: Сообщение 3 от Consumer
```

###  Применение `Exchanger`

Класс `Exchanger` находит применение в различных сценариях, например:

* **Параллельная обработка данных:**  Один поток может выполнять предобработку данных, а другой — финальную обработку, обмениваясь данными через `Exchanger`.
* **Обмен буферами:** Два потока могут использовать `Exchanger` для обмена буферами данных, например, в приложениях для обработки изображений или видео.
* **Реализация паттернов "Производитель-потребитель":** `Exchanger` может быть использован в качестве альтернативы блокирующим очередям для реализации паттерна "Производитель-потребитель", когда требуется строгий попарный обмен данными.

### Заключение

Класс `Exchanger` предоставляет мощный механизм для организации синхронизированного обмена данными между двумя потоками. Он прост в использовании и может быть полезен в различных сценариях разработки многопоточных приложений на Java. 
