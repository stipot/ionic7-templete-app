# Notes

 > This component is designed to manage notes in an Angular application. It allows users to add, edit, and delete text notes, making it easy and convenient to interact. 

The development of this component uses key HTML elements and Angular directives that provide functionality and visualization. The main elements include: 

```html
<ion-list> - is used to display a list of notes, each of which is represented by an element <ion-item>.
*ngFor is a structural directive for rendering a list of notes obtained from an array of notes.
<ion-button> - buttons for saving a new note, deleting an existing note, and switching to editing mode.
<ion-item> is the main element of the list, which is a container for each individual note.
<ion-reorder> is a user interface component in the Ionic framework that allows you to change the order of items in a list using drag and drop gestures.
```

# ToDo for the future:

- [x] Added saving data to Local Storage
- [x] When modified, notes are saved (isActive) in Local Storage
- [x] When new data is added (via the "+" button or by pressing Enter), they are sorted and can be moved up or down the list with a change in their sequence number (order)
- [x] Data can be changed by clicking on them
- [x] When you select a note (via checkbox), a delete button will appear. If you select several notes, you can delete them all via the "Delete all completed notes" button
- [ ] It is necessary to correct the change in existing notes. Now, when you change the note data, they are updated and a new note with the same data appears.
- [ ] You need to create a data save in Firebase