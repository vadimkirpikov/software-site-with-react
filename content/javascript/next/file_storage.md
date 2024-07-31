## Хранение файлов

Хранение и обработка файлов - неотъемлемая часть многих веб-приложений. Next.js, будучи фреймворком для создания универсальных React-приложений, предоставляет гибкие возможности для работы с файлами.

### Обработка файлов на стороне сервера

Next.js позволяет обрабатывать файлы на стороне сервера с помощью API Routes. Это особенно полезно для:

* **Загрузки файлов:** Принимайте файлы от пользователей и сохраняйте их на сервере.
* **Обработки изображений:** Изменяйте размер, обрезайте и оптимизируйте изображения перед отправкой клиенту.
* **Генерации отчетов:** Создавайте PDF-файлы, CSV-файлы или другие типы файлов на основе данных приложения.

**Пример:**

```javascript
// pages/api/upload.js
import fs from 'fs';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Отключаем встроенный bodyParser
  },
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка при загрузке файла' });
      }

      const file = files.file; // Получаем загруженный файл

      try {
        // Читаем содержимое файла
        const data = await fs.promises.readFile(file.filepath);

        // Записываем файл в папку public/uploads
        await fs.promises.writeFile(`./public/uploads/${file.originalFilename}`, data);

        res.status(200).json({ message: 'Файл успешно загружен!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при сохранении файла' });
      }
    });
  } else {
    res.status(405).end(); // Метод не разрешен
  }
};
```

Этот код демонстрирует обработку загрузки файла с помощью библиотеки `formidable`. Файл сохраняется в папку `public/uploads`, которая доступна по статическому пути `/uploads`.

### Хранение файлов в облачных сервисах

Для масштабируемости и надежности часто предпочтительнее хранить файлы в облачных хранилищах, таких как:

* **Amazon S3**
* **Google Cloud Storage**
* **Azure Blob Storage**

Эти сервисы предлагают API для загрузки, скачивания и управления файлами.

**Пример интеграции с Amazon S3:**

```javascript
// utils/s3.js
import AWS from 'aws-sdk';

// Настройте AWS SDK с вашими учетными данными
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = async (file, fileName) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // Название вашего бакета S3
    Key: fileName, // Имя файла в S3
    Body: file.buffer, // Содержимое файла
    ContentType: file.mimetype, // Тип MIME файла
  };

  try {
    await s3.upload(params).promise();
    console.log('Файл успешно загружен в S3!');
  } catch (error) {
    console.error('Ошибка при загрузке файла в S3:', error);
    throw error;
  }
};
```

Этот код демонстрирует использование AWS SDK для загрузки файла в S3. Не забудьте заменить примеры значений на свои.

### Валидация файлов

Перед обработкой файлов важно выполнить валидацию, чтобы убедиться, что они соответствуют требованиям:

* **Тип файла:** Проверьте, что загружаемый файл относится к разрешенным типам (например, изображения, документы).
* **Размер файла:** Установите ограничение на максимальный размер файла, чтобы предотвратить злоупотребления.
* **Содержимое файла:** В зависимости от приложения может потребоваться проверить содержимое файла на наличие вредоносного кода или несоответствия формату.

**Пример валидации типа и размера файла:**

```javascript
// utils/validation.js
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 МБ

export const validateFile = (file) => {
  if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    throw new Error('Недопустимый тип файла. Разрешены только JPG и PNG изображения.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Размер файла превышает допустимый предел ${MAX_FILE_SIZE / (1024 * 1024)} МБ.`);
  }
};
```

Этот код определяет функцию `validateFile`, которая проверяет тип и размер загруженного файла.

**Используйте эти концепции и примеры кода в качестве отправной точки для реализации собственной логики хранения и обработки файлов в вашем приложении Next.js.**
