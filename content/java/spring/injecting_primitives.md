## Внедрение примитивных значений и коллекций в Spring Framework

Spring Framework предоставляет мощный механизм внедрения зависимостей, который позволяет легко конфигурировать и связывать компоненты вашего приложения. В этой статье мы рассмотрим основы внедрения примитивных значений, таких как строки и числа, а также коллекций, таких как списки и карты.

### Внедрение примитивных значений

Внедрение примитивных значений осуществляется с помощью аннотации `@Value`. Эта аннотация позволяет указывать значения свойств бина непосредственно в конфигурационном файле или классе.

**Пример:**

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

    @Value("John Doe")
    private String name;

    @Value("${app.version}")
    private String appVersion;

    public String getName() {
        return name;
    }

    public String getAppVersion() {
        return appVersion;
    }
}
```

В этом примере:

* `@Value("John Doe")` внедряет строковое значение "John Doe" в свойство `name`.
* `@Value("${app.version}")` внедряет значение свойства `app.version` из файла конфигурации приложения в свойство `appVersion`.

**Файл application.properties:**

```properties
app.version=1.0.0
```

### Внедрение коллекций

Spring Framework также позволяет внедрять коллекции, такие как списки, множества и карты.

#### Внедрение списков

Для внедрения списков используйте аннотацию `@Value` с синтаксисом SpEL (Spring Expression Language).

**Пример:**

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MyBean {

    @Value("#{'${cities}'.split(',')}")
    private List<String> cities;

    public List<String> getCities() {
        return cities;
    }
}
```

В этом примере:

* `@Value("#{'${cities}'.split(',')}")` внедряет список строк в свойство `cities`. 
* `${cities}` считывает строку значений из файла конфигурации.
* `split(',')` разделяет строку на список, используя запятую в качестве разделителя.

**Файл application.properties:**

```properties
cities=Moscow,London,Paris
```

#### Внедрение множеств

Внедрение множеств аналогично внедрению списков, но использует другой синтаксис SpEL.

**Пример:**

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class MyBean {

    @Value("#{'${colors}'.split(',').?[!T(java.lang.Character).isWhitespace(T(java.lang.String).valueOf(#this).charAt(0))]}")
    private Set<String> colors;

    public Set<String> getColors() {
        return colors;
    }
}
```

В этом примере:

* `@Value("#{'${colors}'.split(',').?[!T(java.lang.Character).isWhitespace(T(java.lang.String).valueOf(#this).charAt(0))]}")` внедряет множество строк в свойство `colors`, предварительно очищая его от элементов, начинающихся с пробела.
* `${colors}` считывает строку значений из файла конфигурации.
* `split(',')` разделяет строку на множество, используя запятую в качестве разделителя.

**Файл application.properties:**

```properties
colors=Red, Green, Blue 
```

#### Внедрение карт

Для внедрения карт используйте аннотацию `@Value` с синтаксисом SpEL, который создает объект `Map`.

**Пример:**

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class MyBean {

    @Value("#{${countries}}")
    private Map<String, String> countries;

    public Map<String, String> getCountries() {
        return countries;
    }
}
```

В этом примере:

* `@Value("#{${countries}}")` внедряет карту в свойство `countries`.
* `${countries}` считывает значения карты из файла конфигурации.

**Файл application.properties:**

```properties
countries={RU:'Russia',US:'United States',FR:'France'}
```

### Заключение

В этой статье мы рассмотрели основы внедрения примитивных значений и коллекций в Spring Framework. Используя аннотацию `@Value` и синтаксис SpEL, вы можете легко конфигурировать свойства ваших бинов, получая значения из различных источников, включая файлы конфигурации. 
