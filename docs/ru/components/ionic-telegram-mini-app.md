# Разработка функционала для "Telegram Mini-App"

Этот функционал создан для того, чтоб поместить ionic-приложение в Telegram Mini-App.

Чтоб рзвернуть приложение, надо поместить его на сервере приложений, для получения публичной ссыоки.

## FireBase:
В текущем случае используются такие сервисы, как: Firebase от Google 

- Создание аккаунта в сервисе
- Создание проекта внутри сервиса
- Создание Базы данных внутри сервиса
- Выбор проекта и Инициализация проекта внутри VSCodium: Консоль даст ссылку на включение API
- Получение ссылки

## Telegram:BotFather
Так же, для внедрения этого сервиса, был использован telegram(Mini-App), в частности бот создания ботов(BotFather).

- Создание бота посредством комманды: /newbot
- Создание и настройка кнопки для вызова Мини-Приложения: /setmenubutton
< Для начала вставить ссылку https://ionic7-templete-app-public.web.app
< Далее назвать кнопку любым удобным именем

 Для дальнейшего развития проекта надо использовать инструкции Telegram, например:

---------

Использование Telegram Bot API:

    В  Ionic-приложении реализуйте взаимодействие с Telegram API через HTTP-запросы.

    Для отправки сообщений используйте URL вида:

text
```
https://api.telegram.org/bot<token>/sendMessage?chat_id=<chat_id>&text=Ваше сообщение
```
Сдесь <token> - токен бота, а <chat_id> - идентификатор чата (можно получить, отправив сообщение боту и обработав ответ)
----------

-- ГОТОВО --
