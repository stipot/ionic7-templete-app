# Development of the "Deals — Discounts and Promotions List" Component
> The Deals component displays a list of products with discounts and promotions. It uses the DataService to fetch product data and provides users with the ability to search and filter by product name or discount status.

# Product Interface
> The Product interface describes the data structure of a single product.

# Interface Properties:
- `id: number` — unique identifier of the product.

- `name: string` — name of the product.

- `desc: string` — description and terms of the promotion.

- `checked: boolean` — discount status flag (used for filtering).

- `imageUrl: string` — URL of the product image.

- `link: string` — link to the product detail page.

# DataService
> The DataService stores and provides product data.

# Main Methods:
- `getProducts():` Returns an array of all products.

- `getProductById(id: number):` Returns a product by its identifier (currently returns by array index; improvement is recommended).

# DealsComponent
> The component is responsible for displaying the product list, search, and filtering.

# Main Properties:
- `products: Product[]` — full list of products loaded from the service.

- `searchText: string` — search input text.

- `searchType: 'name' | 'checked'` — search type: by name or by discount status.

# Main Methods:
- `ngOnInit():` Loads products from the service during component initialization.

- `getProducts():` Returns a filtered list of products based on searchText and searchType.

- `toggleSearchType():` Toggles the search type between name and discount, clearing the search text.

- `openLink(url: string):` Opens an external link in a new browser tab.

- `refresh(ev: any):` Handles refresh events (e.g., pull-to-refresh).

> The component is implemented using Ionic and Angular, supporting dynamic search and providing a user-friendly interface for browsing discounts and promotions.