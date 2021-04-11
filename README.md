# patovi
This project listens to the input on the form and calculates color in two ways: on the client itself via the client.js script, and on the node server via the server.js script.

The color calculation is simple: if the input to a form is a positive number, it reads the first three digits only and translates the first to a relative red intensity, the second one to a relative green intensity, and the third one to a relative blue intensity.

In such a case, the client and server renderings should be exactly the same.

If not a positive number, then the client and the server randomize one color each, so the results will be mostly different.

The client script listens to the input and uses a simple algorithm to calculate the color locally.

The client script also sends a POST request to server.js (using fetch) to activate the server-side calculation.

The server uses express to serve routes, but this is not an actual express project.
