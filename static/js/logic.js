// Mapbox access token
var accessToken = 'pk.eyJ1IjoiZGl2eWFqaW5kYWwiLCJhIjoiY2x3Zmlib2RrMHphMTJrbGVnbnh5bzNsOCJ9.4z3JaSk-__7uWyzYfYU1CQ'; // Replace with your actual Mapbox access token

// Create a map object
var myMap = L.map("map", {
  center: [37.7749, -122.4194], // Center the map to a default location
  zoom: 5
});

// Add base maps
var outdoors = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
  attribution: "© Mapbox",
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
  accessToken: accessToken
}).addTo(myMap);

var grayscale = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
  attribution: "© Mapbox",
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
  accessToken: accessToken
});

var satellite = L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
  attribution: "© Mapbox",
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
  accessToken: accessToken
});

// Fetch Earthquake Data
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(earthquakeUrl).then(function(data) {
  function getColor(depth) {
    return depth > 90 ? '#d73027' :
           depth > 70 ? '#fc8d59' :
           depth > 50 ? '#fee08b' :
           depth > 30 ? '#d9ef8b' :
           depth > 10 ? '#91cf60' :
                        '#1a9850';
  }

  function getRadius(magnitude) {
    return magnitude * 4; // Adjust the multiplier to scale the circles appropriately
  }

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  var earthquakes = L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag +
                      "<br>Location: " + feature.properties.place +
                      "<br>Depth: " + feature.geometry.coordinates[2] + " km");
    }
  });

  earthquakes.addTo(myMap);

  // Add the legend
  function createLegendControl() {
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 10, 30, 50, 70, 90],
          labels = [];

      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
    };

    return legend;
  }

  var legend = createLegendControl();
  legend.addTo(myMap);

  // Fetch Tectonic Plates Data
  var tectonicPlatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

  d3.json(tectonicPlatesUrl).then(function(plateData) {
    var tectonicPlates = L.geoJson(plateData, {
      style: {
        color: "#ff6500",
        weight: 2
      }
    });

    // Base maps
    var baseMaps = {
      "Outdoors": outdoors,
      "Grayscale": grayscale,
      "Satellite": satellite
    };

    // Overlay maps
    var overlayMaps = {
      "Earthquakes": earthquakes,
      "Tectonic Plates": tectonicPlates
    };

    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);
  });
});
