# User Guide for the Internet Speedometer Component

The component allows you to measure real internet speed (Download and Ping) using the Cloudflare API. The result is displayed on an animated speedometer with color indicators.

---

## The component displays data from the following variables:

- downloadSpeed - current download speed in Mbps
- ping - server response time in milliseconds
- isTesting - flag indicating whether testing is in progress

---

## Main Functions

### 1. Download Speed Test

Downloads a 5 MB test file from the Cloudflare server, measures the time, and calculates the speed.

Algorithm:
- 3 measurements are performed
- Minimum and maximum values are discarded
- Final speed = arithmetic mean of the remaining measurements

### 2. Ping Test

Sends a HEAD request to the current application's favicon.ico and measures the response time.

### 3. Speedometer Visualization

- The needle rotates from -90° (0 Mbps) to +90° (300 Mbps)
- The scale is marked from 0 to 300 Mbps in steps of 50

---

## Color Indicators

### Download Speed

- 0 Mbps - grey
- less than 30 Mbps - red
- 30-60 Mbps - orange
- more than 60 Mbps - green

### Ping

- 0 ms - grey
- less than 30 ms - green
- 30-90 ms - orange
- more than 90 ms - red

### Text Status

- 0 Mbps - Not measured
- less than 10 Mbps - Very slow
- 10-30 Mbps - Normal
- 30-60 Mbps - Good
- more than 60 Mbps - Excellent

---

## APIs Used

- https://speed.cloudflare.com/__down?bytes=5000000 - Download test
- window.location.origin + '/favicon.ico' - Ping test

---

## TO DO

- Add upload speed test
- Add measurement history
- Add server selection for testing
- Add speed graph