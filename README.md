# patovi
This project calculates color in two ways: on the client via the client.js script, and on the node server via the server.js script.

Color calculation: if form input is a positive number, read the first three digits only and translate the first to a relative red intensity, the second one to green, and the third one to blue.

In such a case, the client and server renderings should be exactly the same.

If form input is not a positive number, the client and the server randomize one color each, so the results will be mostly different.

The client script listens to the input and uses a simple algorithm to calculate the color locally, and also sends POST requests to server.js (using fetch) to activate the server-side calculation.

When clicking the Randomize button, 10 random rounds are displayed with approx. 1.5 sec delay.

The server uses express to serve routes, but this is not an actual express project.
