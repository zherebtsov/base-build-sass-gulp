# Базовая сборка для верстки Gulp, Sass
>Сборка включает в себя основные инструменты для быстрого старта проекта по верстке.
## Начало работы
* `npm i`
* `npm run start`
## Файловая структура
````
build/        # папка с собранным проектом
source/       # папка с исходными файлами проекта
  fonts       # шрифты
  img/        # изображение
    icons     # папка для svg иконок, которые будут объединены в спрайт
  js          # скрипты
  sass/       # стили
    blocks    # стили для БЭМ блоков
````
## Основные команды
* `gulp style` -- конкатенирует стили, преобразует их в два css файла: `style.css`, `style.min.css`. Затем переносит их в папку `build/css`.
* `gulp watch` -- инициализирует локальный сервер и следит за изменениями `*.scss`, `*.sass`, `*.html` и `*.js` файлами. 
* `gulp images` -- оптимизирует изображения и отправляет их в папку `build/img`.
* `gulp tinypng` -- оптимизирует изображения по средствам сервиса [tinypng.com](https://tinypng.com/), готовые изображения складывает в папку `build/img/tinypng-compress`.
* `gulp webp` -- конвертирует изображения в формат `webp` для браузера Google Chrome. Далее переносит их в папку `build/img`.
* `gulp svg-sprite` -- собирает все svg иконки из папки `source/img/icons` в спрайт и отправляет спрайт в папку `build/img`.
* `gulp html` -- собирает html файлы и копирует их в папку `build`.
* `gulp js` -- копирует все js файлы в папку `build/js`. 
* `gulp copy` -- копирует шрифты и скрипты в папку `build`.
* `gulp clean` -- удаляет папку `build`.
* `gulp build` / `npm run build` -- собирает проект по средствам выполнения следующих команд: `clean`, `copy`, `style`, `svg-sprite`, `html`, `images`, `webp`.
