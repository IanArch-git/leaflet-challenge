var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryURL, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
  
    function radiusSize(magnitude) {
      return magnitude * 20000;
    }
    function color(magnitude) {
      if (magnitude < 1) {
        return "#ffece6"
      }
      else if (magnitude < 2) {
        return "#ffaf94"
      }
      else if (magnitude < 3) {
        return "#ff7547"
      }
      else if (magnitude < 4) {
        return "#ff470a"
      }
      else if (magnitude < 5) {
        return "#bd2f00"
      }
      else {
        return "#701c00"
      }
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(earthquakeData, latlng) {
          return L.circle(latlng, {
            radius: radiusSize(earthquakeData.properties.mag),
            color: color(earthquakeData.properties.mag),
            fillOpacity: 1
          });  
        },
        onEachFeature: onEachFeature
    });

    createMap(earthquakes);
}

function createMap(earthquakes) {

    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
  
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };

    var overlayMaps = {
      Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  
    function colors(d) {
      return d > 5 ? '#701c00' :
  
             d > 4  ? '#bd2f00' :
  
             d > 3  ? '#ff470a' :
  
             d > 2  ? '#ff7547' :
  
             d > 1  ? '#ffaf94' :
  
                      '#ffece6';
        }
                    
  
    var legend = L.control({position: 'bottomright'}); 
  
    legend.onAdd = function (myMap) {  
        var div = L.DomUtil.create('div', 'info legend'),
            mags = [0, 1, 2, 3, 4, 5],
        labels=[];
  
        for (var i = 0; i < mags.length; i++) {
          div.innerHTML +=
          '<i  class="legend" style="background:' + colors(mags[i] + 1) + '"></i>'+ mags[i] 
          + (mags[i + 1] ? '&ndash;' + mags[i + 1] + '<br>' : '+');
  
                }
      return div;
    };
    legend.addTo(myMap);
  
    }

