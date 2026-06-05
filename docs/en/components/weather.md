# Weather Component Tutorial (Weather Component)

> This component will help developers easily implement a weather widget in their Ionic/Angular applications. The component provides up-to-date weather information, weekly forecast, and supports multilingualism.

This component displays data from the following variables and API services:
- `weatherData` - a variable containing current weather data (temperature, humidity, wind speed, icon)
- `weeklyForecast` - an array containing the weather forecast for 7 days
- `currentCity` - the current selected city (default "Moscow")
- `WeatherAPI` - an external API service (weatherapi.com) for obtaining weather data
- `TranslateService` - an internationalization service (support for Russian, English, French, Italian)

Filter "City". This filter will help the user select any city to display the weather. Implemented via AlertController and ModalController.
Filter "Temperature" can help display the current temperature in degrees Celsius (°C).
Filter "Feels Like" calculates and shows the comfortable temperature taking into account humidity and wind speed.
Filter "Weekly Forecast" displays data for 7 days: day temperature, night temperature, date (day of week + date), weather condition icon.
Filter "Auto-update" automatically updates weather data every 10 minutes (600,000 ms).

## TO DO
- Finalize the city change button (add a popup window with popular cities POPUP)
- Improve the display of "current values" for the weather forecast
- Add additional weather indicators (pressure, UV index, visibility)