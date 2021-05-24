var usgsURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
// console.log(usgsURL);

d3.json(usgsURL).then(function(data) {
    createFeatures(data.features);
});

function createFeatures(quakeData) {
    function onEachFeature(feature,layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }
    function pointFunction(feature,layer) {
        return L.circleMarker(layer, { radius: feature.properties.mag * 2});
    }
    var quakes = L.geoJSON(quakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: pointFunction
    });
    createMap(quakes);
}