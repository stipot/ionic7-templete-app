## RSS Data Component Documentation

>This component is designed for loading, displaying, and managing news and RSS feeds in an Ionic and Angular application. It allows users to select news sources, parse RSS feeds, display news items with the ability to mark favorites, and manage the list of feeds. Unique identification of news items is done using MD5 hashing of titles. Favorite news and feeds data are synchronized with Firebase Firestore and local storage.

## Used Components and Directives

>The component uses standard Ionic and Angular components to build the UI and handle data interaction:

- ion-segment, ion-segment-button - switching between the "News" and "Feeds" sections.

- ion-list, ion-item - for displaying lists of news items and feeds.

- ion-button - control buttons (add, delete, favorite).

- ion-icon - icons, including those for marking favorites (star).

- ion-input, ion-textarea - for editing feed descriptions and URLs.

- Angular directives *ngFor, *ngIf - for rendering lists and conditional display.

- Two-way binding with [(ngModel)] and reactive forms for input management.

- FirestoreService - service for interacting with Firebase.

- Angular HTTP client - for loading RSS feeds via a proxy.

## Key Features

- RSS Feed Loading and Parsing: Loads RSS from multiple active sources, parses XML, extracts news, and generates unique GUIDs using MD5 hashing of titles.

- Feed Management: Users can add, edit, and delete RSS feeds stored locally and in Firebase.

- Favorite News: Users mark news as favorites; favorites list is stored in localStorage and Firebase and synchronized on load.

- Source Filtering: Ability to select a specific news source or view all.

- News Preview: In preview mode, news open inside the app via iframe.

- Description Translation: Basic logic to translate news descriptions to the selected language.

- Caching and Synchronization: Feeds and favorite news data are saved and loaded from localStorage and Firestore for offline access and device synchronization.

## Main Data Structures

- NewsSource (Feed):

        guid: unique feed identifier

        url: RSS feed URL

        name: source name

        isActive: whether the feed is active for loading

- NewsItem (News):

        title: news title

        description: description (text without HTML)

        link: link to full news

        image: image URL (if any)

        pubDate: publication date

        source: source name

        sourceGuid: source GUID

        guid: unique news identifier (MD5 of title)

        favicon: source icon

- FeedItem (Feed for editing):

        description: feed description

        url: feed URL

        guid: unique identifier

        isEditing: editing mode flag

        originalDescription: original description (for translation)

        sourceGuid: source GUID

## Key Methods and Logic

- fetchRssFromAllActiveSources() - loads news from all active feeds, parses and updates newsItems.

- fetchRssFromSource(source) - loads and parses RSS for a specific feed.

- toggleFavorite(news) - toggles favorite status for a news item, updates localStorage and Firestore.

- loadFavoritesFromFirestore() - loads favorite news list from Firestore on initialization.

- saveFavorites() - saves favorites list to localStorage and Firestore.

- loadFeedsFromFirestore() / saveFeedsToFirestore() - loads and saves feed list in Firestore.

- addNewFeedItem() / saveEditing(item) / deleteFeedItem(item) - feed management (create, edit, delete).

- translateDescription(item) - basic news description translation.

- fetchFavicons() - loads source icons.

- sortNewsByDate() - sorts news by publication date.

## Implementation Details

- Unique news GUIDs are generated using MD5 hashing of titles (md5 function).

- RSS is loaded via proxy https://api.allorigins.win/raw?url= to avoid CORS issues.

- Data synchronizes with Firestore under profiles/{userId}, storing components under different keys (favorites, feeds, etc.).

- Reactive forms are used for feed editing.

- Language switching is supported via @ngx-translate/core.

- UI is adapted for Ionic using standard components.

## Styling

- Uses standard Ionic styles for lists, buttons, and forms.

- Favorite icons use dynamic classes (filled/outlined star).

- Cards for news and feeds have shadows and padding.

- Responsive design ensures proper display on mobile devices.

