# Developing functionality for "Telegram Mini-App"

This functionality is designed to place an ionic application in Telegram Mini-App.

To deploy the application, you need to place it on the application server to get a public link.

## FireBase:
In the current case, the following services are used: Firebase from Google

- Creating an account in the service
- Creating a project inside the service
- Creating a Database inside the service
- Selecting a project and Initializing a project inside VSCodium: The console will give a link to enable API
- Getting a link

## Telegram:BotFather
Also, to implement this service, telegram (Mini-App) was used, in particular the bot for creating bots (BotFather).

- Create a bot using the command: /newbot
- Create and configure a button to call the Mini-Application: /setmenubutton
< First, insert the link https://ionic7-templete-app-public.web.app
< Then name the button any convenient name

For further development of the project, you need to use Telegram instructions, for example:

---------

Using the Telegram Bot API:

In the Ionic application, implement interaction with the Telegram API via HTTP requests.

To send messages, use a URL like this:

text
```
https://api.telegram.org/bot<token>/sendMessage?chat_id=<chat_id>&text=Your message
```
Here <token> is the bot token, and <chat_id> is the chat ID (can be obtained by sending a message to the bot and processing the response)
----------

- ​​DONE --
