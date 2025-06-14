ToDo:

    Fix the "Delete All Completed" button functionality (add saving to Firebase)

    Save task state (isActive) to Firestore when a task is updated

Main Features of the Component

    Creating and Displaying Main Tasks:

        Users can add new main tasks using a button.

        Each task is represented as a text field with editing capability.

    Adding Subtasks to Each Main Task:

        Multiple subtasks can be added for each main task.

        Subtasks are displayed as separate text fields next to the main task.

    Changing Text Style of Tasks and Subtasks on Click:

        Clicking on a task or subtask cycles through text styles:

            Normal (no styling),

            Underlined,

            Strikethrough.

        Styles are applied dynamically using CSS classes and inline styles.

    Responsive Design and Usability:

        Tasks and subtasks are arranged in a horizontally scrollable area.

        On mobile devices, the layout adapts to a vertical arrangement.

        Compact buttons with icons enhance user interaction.

    Task Appearance Animation:

        Smooth animation is applied when new tasks are added.

Technologies and Approaches Used

    Angular and Ionic:

        Use of Ionic components (ion-header, ion-toolbar, ion-content, ion-item, ion-textarea, ion-button, ion-icon).

        Two-way data binding with [(ngModel)].

        *ngFor directive for dynamic rendering of tasks and subtasks.

        Click event handling for changing text styles.

    TypeScript:

        Interfaces Task and Subtask for typing data.

        Logic for generating unique IDs for tasks and subtasks.

        Methods for adding tasks and subtasks, and for changing styles.

    SCSS:

        Flexbox for element layout.

        Media queries for responsiveness across screen sizes.

        Styling of textareas and buttons to improve UX.

        Keyframe animations for task appearance.

    Renderer2:

        For safe dynamic modification of DOM element styles.

Code Structure

    HTML Template:

        Header and main content.

        List of tasks with subtasks and buttons to add subtasks.

        Button to add main tasks.

        Empty state display when there are no tasks.

    SCSS Styles:

        Styling of task and subtask rows.

        Button and icon styling.

        Responsive behavior for mobile devices.

        Classes for different text styles (normal, underline, line-through).

    TypeScript Component:

        Management of tasks and subtasks state.

        Click handling for style changes.

        Unique ID generation.

        Methods for adding and removing tasks/subtasks.

        Updating styles in the DOM via Renderer2.
