# Сайт-визитка АО «ТКРОС»

Одностраничный сайт дорожно-строительной компании.
Vite + React 19 + TypeScript + Lenis + GSAP ScrollTrigger.

## Команды

```bash
npm ci            # установка зависимостей; Node.js 20.19 или новее
npm run dev       # сервер разработки на порту 3000
npm run build     # продакшн-сборка в dist/
npm run preview   # локальный просмотр сборки на порту 4173
npm test          # юнит-тесты конфигурации
```

## Где править контент

Весь текст сайта (описания работ, контакты, реквизиты, партнёры,
пункты меню) лежит в одном файле — **`src/config.ts`**.
Чтобы добавить партнёра или вид деятельности, допишите элемент
в соответствующий массив в этом файле — больше ничего менять не нужно.

Текстуры и картинки лежат в `public/media/`, шрифты — в `public/fonts/`.

## Деплой на Render

1. Залейте содержимое этого архива в корень GitHub-репозитория
   (файл `package.json` должен лежать в корне, не во вложенной папке).
2. На Render: **New → Static Site**, подключите репозиторий.
3. Настройки:
   - **Root Directory** — оставить пустым
   - **Build Command** — `npm ci && npm run build`
   - **Publish Directory** — `dist`
4. Версию Node Render возьмёт автоматически из файла `.nvmrc`
   (или добавьте Environment Variable `NODE_VERSION` = `20`).
5. Deploy. При каждом пуше в `main` сайт будет пересобираться сам.

Опционально: в **Redirects/Rewrites** добавьте правило
Source `/*` → Destination `/index.html` (Rewrite), чтобы по любому
несуществующему адресу показывалась страница 404 сайта.

## Деплой на Vercel / Netlify

- Build command: `npm run build`
- Output directory: `dist`
