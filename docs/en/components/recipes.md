# Recipes Component

> This component is designed to display and interact with recipes in an Angular application. It allows you to search for recipes by name or ingredients, and display the details of the selected recipe in a modal window.

> The development of this component utilizes Ionic and Angular components to create the user interface and interact with the data. Within the component, key HTML elements and Angular directives are included to render the list of recipes and display their details. These include:

- `*ngFor` - A structural directive for rendering a list of recipes.
- `[(ngModel)]` - two-way binding for a search query.
- `ion-card` - Ionic component to display each recipe as a card.
- `ion-searchbar` - Ionic component for recipe search.
- `ion-card-header`, `ion-card-title`, `ion-card-subtitle` - Ionic components to display the headings and subheadings of the recipe card.
- `convertNewlinesToBreaks` - method for converting a newline into an HTML tag `<br>`.

> The integration of this component provides users with a convenient and interactive way to search and browse recipes.

## Key Features

- **Recipe Search**: Users can search for recipes by name or ingredients using the search box.
- **Recipe List Display**: The recipe list is displayed as cards with image, title and description.
- **Recipe Details Modal Window**: When a recipe is selected, a modal window with details including ingredients and description is displayed.

## Key HTML Elements and Angular Directives

- **Header**: Displays the “Recipes” header on the right side.
- **Search Container**: Contains a search box and a button to toggle the search type (by name or ingredients).
- **Recipes List**: Uses `*ngFor` to display each recipe as a card.
- **Recipe Card**: Displays an image, title, description and a button to view the recipe details.
- **Recipe Details Modal**: Displayed when a recipe is selected and contains an image, title, ingredient list and detailed description.

## Styling

- **Custom Buttons**: Buttons have their own style with background color, borders and hover effect.
- **Card Styles**: Recipe cards have borders, shadows and hover animation.
- **Modal Styles**: Modal window has background darkening, custom style and appearance animation.

# Todo-list

- Storing recipe data and validating it.
- Adding functionality for adding and editing recipes.
- Improving the styling and adaptability of the component for different devices.