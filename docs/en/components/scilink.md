Documentation for ScilinkComponent
1. General Information
Component Name: ScilinkComponent
Description: This component is responsible for retrieving and displaying a list of scientific articles. Users can enter text to search for articles, and the component will filter the results based on the entered text.
2. Imported Modules
HttpClient: Used to perform HTTP requests to an API and retrieve article data.
IonicModule: The Ionic module necessary for using Ionic components.
CommonModule: Angular's common module that provides common directives and pipes.
DataService: A custom service that provides a method for retrieving article data.
3. Article Interface
TypeScript
копия
interface Article {
  doi: string;        // DOI of the article
  a_name: string;    // Title of the article
  a_authors: string; // Authors of the article
  abstract: string;  // Abstract of the article
  img_name: string;  // URL of the article image
}
4. Component Structure
@Component Decorator:
standalone: true: Indicates that the component is standalone and does not require a parent module.
selector: 'app-scilink': Used to include the component in templates.
templateUrl: Path to the component's HTML template.
styleUrls: Path to the component's styles.
5. Class Properties
articles_cards:

An array of objects of type Article that stores all the loaded articles.
filtered_articles:

An array of objects of type Article that stores filtered articles based on user input.
searchText:

A string that holds the text entered by the user for searching.
Result:

A string that displays a search message based on user input.
6. Class Methods
constructor(private http: HttpClient, private data: DataService):

The class constructor that initializes HttpClient and DataService.
ngOnInit():

An Angular lifecycle method that is called when the component is initialized. It loads article data through DataService and saves it to articles_cards and filtered_articles.
search_btn():

Description: A method that is called when the search button is clicked or the Enter key is pressed. It processes the entered text, updates the Result variable, and filters articles.
Logic:
Retrieves the value from the input field (ion-input).
If a value is entered, it filters the articles_cards array by the article title (a_name), ignoring case.
Updates filtered_articles and Result with the search text.
If no value is entered, it resets searchText, restores all articles, and updates Result with a message prompting for input.
7. Notes
Ensure that DataService implements the getData() method that returns an Observable with article data.
The component should be integrated into a parent component or module to correctly display data and handle events.