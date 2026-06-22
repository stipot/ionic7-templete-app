# Development of the "Clothing Shop" Component

This component was developed as a store with the ability to select clothing types and add them to a shopping cart for purchases.

## The following Ionic methods were used to implement this component:

<ion-segment> - used for filtering products by categories. Allows the user to quickly switch between sections (T-shirts, Jeans, Jackets, Dresses, etc.)
<ion-card> - used to display each product. Contains:
    A colored tile with the product name (instead of an image)
    Product name and category
    Price in rubles
    Size selection via <ion-select>
    Add to cart button
<ion-grid> and <ion-col size="6"> - used to create a two-row product grid. Responsively displays 2 products per row on mobile devices.
<ion-badge> - displays the number of items in the cart on the cart icon
<ion-item-sliding> - used in the cart for swipe-to-delete functionality
localStorage - used to persist the cart between sessions
TranslateService - used for multi-language support (Russian, English, French, Italian)
[style.backgroundColor] - dynamically changes the tile color for each product

## TODO:
1. Add the ability to edit the quantity of items in the cart via direct input
2. Implement product search by name
3. Add saving of the selected language to localStorage
4. Replace colored tiles with real product images
5. Add navigation from the cart back to the product list
