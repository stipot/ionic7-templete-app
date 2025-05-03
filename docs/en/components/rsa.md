# RSA Key Generation Component

> This component is designed for generating RSA keys in an Ionic and Angular application. It allows users to select prime numbers P and Q, public exponent E, and private exponent D to generate public and private keys. The component also includes text encryption and decryption features using the generated keys. Also, the bigint-crypto-utils library is used to assist in implementing encryption and decryption, as JavaScript cannot handle large numbers natively.

## Used Components and Directives

> In the development of this component, Ionic and Angular components are used to create an interactive user interface and interact with data. Inside the component, key HTML elements and Angular directives are included for rendering forms to select prime numbers and exponents, as well as for displaying generated keys and text. These include:
- `ion-select` - an Ionic component for selecting prime numbers and exponents.
- `ion-select-option` - options for selecting prime numbers and exponents.
- `ion-popover` - an Ionic component for displaying tooltips on hover.
- `ion-input` - an Ionic component for displaying generated keys.
- `ion-textarea` - an Ionic component for inputting and displaying text.
- `[(ngModel)]` - two-way binding for updating selections and text.

## Key Features
- *RSA Key Generation*: Users can select prime numbers P and Q, public exponent E, and private exponent D to generate keys.
- *Key Display*: The generated public and private keys are displayed as a pair of values.
- *Text Encryption* and Decryption: Users can input text for encryption and decryption using the generated keys.

## Key HTML Elements and Angular Directives
- *Header*: Displays the title "RSA Key Generation".
- *Select Containers*: Contain dropdown lists for selecting prime numbers and exponents.
- *Key Display*: Displays the generated public and private keys.
- *Text Input*: Allows users to input text for encryption and decryption.
- *Popover*: Displays tooltips when hovering over question mark icons.

## Styling
- *Custom Icons*: Icons have a custom style and animation on hover.
- *Card Styles*: Text cards have borders, shadows, and animation on hover.
- *Popover Styles*: Tooltips have background dimming and a custom style.
