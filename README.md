# bunch-whois

## Назначение

Приложение построчно считывает домены из входного файла (по-умолчанию `source.txt`) и запрашивает данные по каждому домену у whois-сервиса.
Записывает результат в csv-формате в выходной файл (по-умолчанию `output.csv`). Работает в многопоточном режиме (параметр `--concurent`)

__Код представлен в ознакомительных целях, находится под проприетарной лицензией и полностью пренадлежит его автору__

Реализация задачи с FL.ru - [Скрипт который определяет свободные домены по Whois](https://www.fl.ru/projects/5318741/skript-kotoryiy-opredelyaet-svobodnyie-domenyi-po-whois.html)

> 1. Я заливаю например 20 000 доменов
> 2. Жму кнопку старт
> 3. Получаю список свободных доменов

## Технологический стэк

* Nodejs v20.12
* Typescript v5.4

## Развертывание

План:

1. [Установка Nodejs](#установка-nodejs)
2. [Сборка](#сборка)

### Установка Nodejs

С сайта [Nodejs](https://nodejs.org/download/release/v20.12.0/) скачать и установить подходящий тип дистрибутива

Пользователям MacOS рекомендуется воспользоваться утилитой [Homebrew](https://brew.sh/index_ru).
Выполнить в терминале `brew install node@20.12`. Либо скачать и установить `pkg`-пакет вручную.

Пользователям Linux воспользоваться системным [пакетным менеджером](https://nodejs.org/en/download/package-manager). Либо с помощью утилиты `nvm` установить требуемую версию - `nvm use`

### Сборка

```bash
npm run i

npm run build
```

## Эксплуатация

* [Запуск](#запуск)
* [Помощь](#помощь)
* [Остановка](#остановка)

### Запуск

```bash
npm run start
...
npm run start -- -s /home/user/sources.txt -o /home/user/output.csv -c 10 
```

### Помощь

```bash
npm run help
```

### Остановка

`CTRL+C`

## Связь с автором

[br4instormer](https://www.fl.ru/users/br4instormer/portfolio/) на fl.ru

[Telegram](https://t.me/br4instormer)

[Github](https://github.com/br4instormer)
