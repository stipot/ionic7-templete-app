# Development of the "CryptoRates" Component

> The CryptoRates component provides users with up-to-date information on prices for popular cryptocurrencies. It fetches data from the CoinGecko API and displays it in a card format.

## Crypto Interface

> The `Crypto` interface defines the data structure for cryptocurrencies, including an identifier, name, price, and logo.

### Interface Properties:
- `id: string` — a unique identifier for the cryptocurrency.
- `name: string` — the name of the cryptocurrency.
- `price: number | null` — the current price of the cryptocurrency in USD (can be null if the price is not yet loaded).
- `logo: string` — the URL of the cryptocurrency's logo.

This component is responsible for displaying a list of cryptocurrencies and their prices. It fetches price data from the API and updates the component's state.

### Key Functions:
- **ngOnInit**: A lifecycle method that is called when the component is initialized. It triggers the `getCryptoPrices` method to fetch current cryptocurrency prices.
  
- **getCryptoPrices**: A method that constructs the URL for the CoinGecko API request, retrieves price data, and updates the `cryptocurrencies` array with the latest values.
