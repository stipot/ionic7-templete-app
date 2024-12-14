# Video Player component

## Description

**The Video Player component** is an adaptive video player developed using **Angular**, which provides a user—friendly interface for watching videos. The component includes controls for playback, volume, speed, fullscreen mode, and progress. It also supports downloading videos from a folder and displaying thumbnails of video files as a slider.

---

## Functionality

- ** Playback control:**
- Play/pause the video.
  - Rewind the video using the progress bar.

- ** Sound control:**
- Adjust the volume using the slider.
  - Turn on/off the sound.

- Setting the playback speed:**
- Select the playback speed (0.5x, 1x, 1.5 x, 2x).

- Full-screen mode:**
- The ability to switch the video to full-screen mode.

- **Slider with thumbnails:**
- Displays a list of videos with thumbnails.
  - The ability to select videos using the slider.
  - Automatic thumbnail creation for uploaded videos.

- ** Video Download:**
- Support for downloading videos from a local folder.

---

## HTML structure

### Basic elements:
1. **Video element**
   - "<video>" is the main element for video playback.

2. ** Playback control buttons**
   - Play/pause button ("playPauseBtn").
   - The playback progress slider (`ProgressBar').
   - Display the current time and total duration.

3. **Sound control**
   - The sound on/off button ("muteBtn").
   - Volume control.

4. ** Speed setting**
- A button to select the playback speed (`speedBtn').

5. **Full-screen mode.**
   - A button to switch to full-screen mode ("fullScreenBtn").

6. **Slider with video**
   - A list of videos with thumbnails ("video list").
- Navigation support ("forward" and "back" buttons).
- A field for uploading videos from a folder.

7. **Folder upload button**
   - A field for selecting a folder with video files:
     ``html
     <input type="file" webkitdirectory (edit)="handleFolderSelection($event)" />
`
- All uploaded videos are automatically added to the list and thumbnails are generated.
---

## The main methods of operation of the component

### Video Management
- **`playPauseBtn`**: Enables or pauses video playback.
- **"Progress bar"**: Controls the playback time (rewind).
- **`setSpeed(speed: number)`**: Changes the video playback speed.
- **`Edit Video'**: Downloads and plays the selected video.

### Sound control
- **"Volume Control"**: Changes the volume.
- **`muteBtn`**: Turn on/off the sound.

### Full-screen mode Control
- **"fullScreenBtn"**: Enables or disables full-screen mode.

### Working with thumbnails and uploading
- **`generateThumbnail(videoUrl: string): Promise<string>`**: generates a thumbnail for the video (the first frame at the 5th second).
- **`handleFolderSelection(event: any)`**: Controls folder selection, creates a list of videos with thumbnails.

### Display controls
- **`showControls()"**: Displays the controls when hovering over the video.
- **"hideControls()"**: Hides controls when moving the cursor.

---