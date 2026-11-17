# Keepsake: landing (Vite + Pug + SCSS)

Лендінг агенції Keepsake з лабораторної роботи №7, перенесений на Pug, SCSS і Vite.

**Демо:** https://alisaartemenko.github.io/landing-keepsake-vite/

## Вимоги

- Node.js 20 або новіший (LTS), npm

## Команди

| Команда           | Що робить                                        |
| ----------------- | ------------------------------------------------ |
| `npm install`     | встановлює залежності                            |
| `npm run dev`     | dev-сервер Vite                                  |
| `npm run build`   | збірка в `dist/`                                 |
| `npm run preview` | перегляд збірки                                  |
| `npm run format`  | форматує код Prettier                            |
| `npm run lint`    | Stylelint і перевірка Prettier                   |
| `npm run images`  | генерує AVIF, WebP і JPEG у двох ширинах (sharp) |

## Структура

    src/
    ├── assets/
    │   ├── images-src/   вихідні зображення
    │   └── images/       згенеровані AVIF, WebP, JPEG
    ├── components/       header, footer, sections/*.pug
    ├── data/             дані секцій (масиви об'єктів)
    ├── includes/         шрифти, svg-спрайт
    ├── layouts/main.pug  базовий макет
    ├── mixins/           btn, icon, picture, work-card, service-icon
    ├── pages/index.pug   сторінка
    └── styles/
        ├── utils/        змінні, міксини (mq, focus-ring, visually-hidden)
        ├── base/         reset, типографіка, :root
        ├── layout/       container, section
        ├── components/   один БЕМ-блок: один файл
        └── main.scss     точка входу

### Pug

Макет `layouts/main.pug` має блоки `meta`, `title`, `styles`, `content`, `scripts`, а `pages/index.pug` успадковує його через `extends`. Шапка, футер і секції підключаються через `include`. Дані повторюваних блоків лежать у `src/data/` як масиви об'єктів і виводяться через `each`. Повторювані фрагменти (кнопка, іконка, картка роботи, `<picture>`) винесено в міксини.

### SCSS

Модулі підключаються лише через `@use` і `@forward`, кожна папка має індексний файл. Кольори з map-а `$colors` генеруються в CSS custom properties через `@each`. Медіазапити пишуться міксином `mq()` за підходом mobile first. Класи побудовано за БЕМ через `&__` і `&--`, вкладеність не глибша за 3 рівні.

## Інструменти

| Інструмент                      | Для чого                              |
| ------------------------------- | ------------------------------------- |
| Vite                            | dev-сервер і збірка                   |
| Vituum + Pug                    | генерація HTML із шаблонів            |
| Sass                            | компіляція SCSS                       |
| PostCSS + Autoprefixer          | вендорні префікси за Browserslist     |
| sharp                           | AVIF, WebP, JPEG у кількох ширинах    |
| Prettier + @prettier/plugin-pug | форматування, включно з Pug           |
| Stylelint                       | перевірка SCSS і БЕМ-класів           |
| husky + lint-staged             | перевірка staged-файлів перед комітом |
| GitHub Actions                  | збірка й публікація на GitHub Pages   |

`sass`, `vituum`, плагіни й лінтери лежать у `devDependencies`, бо потрібні лише для збирання, а не під час роботи готової сторінки.

## Цільові браузери (Browserslist)

    last 2 Chrome versions
    last 2 Firefox versions
    last 2 Edge versions
    last 2 Safari versions
    last 2 iOS versions

## Оптимізація

| Що                                                   | До                              | Після                          |
| ---------------------------------------------------- | ------------------------------- | ------------------------------ |
| Зображення робіт (найбільша ширина 800px), JPEG/WebP | 48 KB (`src/assets/images-src`) | ~13.5 KB (JPEG) / ~7 KB (WebP) |
| Зображення, AVIF                                     | 48 KB (`src/assets/images-src`) | ~4.2 – 7.2 KB                  |
| CSS (`dist/assets/*.css`)                            | ~45 KB (умовно до мініфікації)  | 15.9 KB                        |

CSS мініфікується під час `npm run build` засобами Vite (esbuild), окремий cssnano не потрібен.
