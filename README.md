Leaflet Challenge Part 2
========================

This repository contains the code for a web map displaying earthquake data and tectonic plate boundaries using Leaflet, D3.js, and Mapbox.

Features
--------

*   Leaflet map displaying earthquake data as circles with varying size and color based on magnitude and depth.
    
*   Tectonic plate boundaries displayed as lines.
    
*   Mapbox base maps with three styles: Outdoors, Grayscale, and Satellite.
    
*   Layer control to toggle the display of earthquakes and tectonic plates.
    
*   Legend control displaying earthquake depth ranges and corresponding colors.
    

Usage
-----

1.  Clone the repository to your local machine.
    
2.  Insert your mapbox access token into **logic.js** in the beginning
    
3.  Open **index.html** in a web browser.
    
4.  Observe the map displaying earthquake data, tectonic plate boundaries, and the layer and legend controls.
    

Code Structure
--------------

### index.html

The HTML file that sets up the basic structure of the web page and includes the necessary CSS and JavaScript files.

### style.css

The CSS file that styles the web page and the legend control.

### logic.js

The JavaScript file that contains the logic for creating the map, fetching earthquake and tectonic plates data, styling the circles and lines, and creating the layer and legend controls.

#### Variables

*   **accessToken**: A Mapbox access token.
    
*   **myMap**: A Leaflet map object.
    
*   **outdoors**, **grayscale**, **satellite**: Mapbox tile layer objects.
    
*   **earthquakeUrl**, **tectonicPlatesUrl**: URLs for fetching earthquake and tectonic plates data.
    

#### Functions

*   **getColor(depth)**: A function that returns a color based on the depth of an earthquake.
    
*   **getRadius(magnitude)**: A function that returns the radius of a circle based on the magnitude of an earthquake.
    
*   **styleInfo(feature)**: A function that returns the style information for a circle representing an earthquake.
    
*   **createLegendControl()**: A function that creates a legend control for the map.
    

Dependencies
------------

*   [Leaflet](https://leafletjs.com/)
    
*   [D3.js](https://d3js.org/)
    
*   [Mapbox](https://www.mapbox.com/)
