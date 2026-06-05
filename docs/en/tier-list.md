# Tutorial for the "Tier List" Component

> This component helps users evaluate and sort any elements in the form of images (characters, movies, games) by levels, from best to worst, visualized as follows - S, A, B, C, D, E. The component supports drag-and-drop of images, uploading custom images, and saving the result in PNG format.

This component displays data from the following variables:
- sourceImages — an array containing the source images for the left panel (preset and user-uploaded images)
- placedItems — an array containing images distributed across the tiers

Main interface elements:

- Left panel with images
This panel contains all images available for drag-and-drop. The user can grab any image with the mouse and drag it into one of the tiers.
- Tiers S, A, B, C, D, E
Each tier corresponds to its own quality level:
S — best
A — very good
B — good
C — average
D — bad
E — worst
- The user can drag images from the left panel to any tier, as well as move already placed images between tiers
- Delete icon
Each image placed in a tier has a delete icon; when clicked, the image is removed from the tier
- "Upload Image" button
Allows the user to upload their own image from their device
- "Save" button
Takes a screenshot of the table with tiers and saves it as a PNG file

## TO DO
- Add the ability to edit tier names
- Add the ability to export the tier list to PDF
- Add to any page of the site
- Finalize the save/load button