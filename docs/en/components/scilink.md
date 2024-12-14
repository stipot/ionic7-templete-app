Development of the "scilink (scientific articles)" component

This component was developed to display scientific article cards. The cards contain information about the article title, authors, abstract, and image. The data for the articles is loaded from the server when the component is initialized.

The following ionic methods were used to implement this component:

ion-card is used to create cards. The card contains the following elements:
ion-img is used to display the article image. It contains the following attributes:
src is used to specify the path to the image.
alt is used to add alternative text.
class is used to apply CSS styles.
ion-card-header is used to create the card header. It contains:
ion-card-title is used to display the article title, abstract, and authors, a is used to create links to the article and display the abstract and authors text.
ion-card-subtitle is used to add a card subtitle.

The component also uses the following Angular and Ionic modules:

HttpClient is used to make HTTP requests to the server and retrieve data.
IonicModule and CommonModule are used for integration with Ionic and Angular.
Thus, this component allows you to display scientific article cards using various Ionic and Angular elements, providing ease of working with data and its visualization.