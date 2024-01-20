# Development of the "Validations" component

>This component is developed to verify user data. His last name, first name and user nickname are checked. Also his gender, email address and phone number.

To implement this component, the following ionic methods were used:
- (ion-input) is used to enter variables. It itself is located in (ion-item) and contains several variables within it for the user to fully and correctly work with it. These include:
- (label) is used to name the field
- (type) is used to assign its type
- (fill) is used to select the frame for the input field
- (color) is used to select the text input highlight color.
- (labelPlacement) is used to select the type.
- (placeholder) is used to enter background text.
- (helperText) is used to enter help text.
- (errorText) is used to enter text in case of an error.
- (required) is used to assign a required entry item.
- (ion-select) is used to create a selection pad. A large component that includes both some previously used variables and new ones.
- (ion-select-option) is used to create selection variables.

Array "Gender":
     contains a list of possible genders.
Array "Countries":
     contains a list of possible countries.

Filter "Gender":
     allows the user to select their gender from the options presented.
Filter "Countries":
     allows the user to select their country from the options presented.

Function "validations":
     visually displays the need to fill out specific data on the form.

Button to confirm the terms of data use.