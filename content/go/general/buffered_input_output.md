<h2>Буферизированный ввод-вывод в Golang</h2>

В Golang работа с вводом-выводом по умолчанию не буферизирована. Это означает, что каждая операция чтения или записи из/в файл или сетевое соединение напрямую взаимодействует с операционной системой. Такой подход может быть неэффективным, особенно при частых операциях ввода-вывода с небольшими объемами данных.

Буферизированный ввод-вывод решает эту проблему, накапливая данные во временном буфере в памяти перед их отправкой или чтением.  Это уменьшает количество системных вызовов и, как следствие, повышает производительность.

<h3>Пакет bufio</h3>

Golang предоставляет пакет `bufio`, который упрощает работу с буферизированным вводом-выводом. Рассмотрим основные типы и функции этого пакета.

**bufio.NewReader**

Функция `bufio.NewReader()` создает новый буферизированный читатель, который оборачивает `io.Reader`.

```Go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	// Открываем файл для чтения
	file, err := os.Open("example.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Создаем новый буферизированный читатель
	reader := bufio.NewReader(file)

	// Читаем первую строку из файла
	line, err := reader.ReadString('\n')
	if err != nil {
		panic(err)
	}
	fmt.Println(line)
}
```

В этом примере `reader.ReadString('\n')` читает данные из файла до тех пор, пока не встретит символ новой строки (`\n`).

**bufio.NewWriter**

Функция `bufio.NewWriter()` создает новый буферизированный писатель, который оборачивает `io.Writer`.

```Go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	// Открываем файл для записи
	file, err := os.Create("example.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Создаем новый буферизированный писатель
	writer := bufio.NewWriter(file)

	// Записываем строку в файл
	fmt.Fprintln(writer, "Привет, мир!")

	// Сбрасываем буфер, записывая данные в файл
	writer.Flush()
}
```

Важно отметить вызов `writer.Flush()` после записи данных. Этот метод сбрасывает буфер, то есть записывает все данные из буфера в файл. 

**bufio.Reader.ReadBytes**

Метод `bufio.Reader.ReadBytes()` позволяет читать данные из буфера до тех пор, пока не встретится заданный байт.

```Go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	file, _ := os.Open("example.txt")
	defer file.Close()

	reader := bufio.NewReader(file)

	// Читаем данные до пробела
	data, _ := reader.ReadBytes(' ')
	fmt.Printf("Прочитанные данные: %s\n", data)
}
```

**bufio.Scanner**

Для более удобного чтения строк используется тип `bufio.Scanner`.

```Go
package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	file, _ := os.Open("example.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)

	// Читаем файл построчно
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
}
```

Метод `scanner.Scan()` читает следующую строку, а `scanner.Text()` возвращает содержимое прочитанной строки.

<h3>Заключение</h3>

Буферизированный ввод-вывод в Golang, реализованный пакетом `bufio`, повышает эффективность работы с файлами и сетевыми соединениями. Используйте `bufio.NewReader`, `bufio.NewWriter` и `bufio.Scanner` для удобной и быстрой работы с данными. 
