# Developing the "timer" component


 > This component was developed to configure a countdown, visualize the remaining time, and save the history of recent timers. 


 To implement this component, Ionic methods such as:
- <ion-grid>, <ion-row>, and <ion-col> were used to create an adaptive grid that allows you to arrange the hours, minutes, and seconds input fields in a single row.
- <ion-item>: acts as a container for input elements, providing proper padding and visual separation in the list.
- <ion-input>: used to enter numeric values and the name of the timer. 
- <ion-button>: used to control the state of the timer (Start, Stop, Reset)
- <ion-list>: used to display the "Recent Timers" section with the ability to quickly restart.

What needs to be completed:
Quick Clear Button: Add a single "Clear All" button that resets the name and all time fields with a single click.
History Sorting: Customize the list of recent times