# Development of Functionality for "Telegram Mini-App"

This functionality is created to embed an Ionic application into a Telegram Mini-App.

The following services are used in this functionality: Firebase by Google & Telegram (BotFather).

> Firebase:

 - Create an account in the service

 -  Create a project inside the service

 -  Create a database inside the service

 -  Select the project and initialize it inside VSCodium: the console will provide a link to enable the API

 -  Obtain the URL

 -  Telegram: BotFather

 - Create a bot using the command: /newbot

 > Create and configure a button to launch the Mini-App: /setmenubutton
    < First, insert the link https://ionic7-templete-app-public.web.app
    < Then name the button with any convenient name

> For further project development, you need to use Telegram instructions, for example:

Using Telegram Bot API:

In the Ionic application, implement interaction with the Telegram API via HTTP requests.

To send messages, use a URL like:

------------

https://api.telegram.org/bot<token>/sendMessage?chat_id=<chat_id>&text=Your message

 where <token> is the bot token, and <chat_id> is the chat identifier (can be obtained by sending a message to the bot and processing the response).
 
------------
-- DONE --

