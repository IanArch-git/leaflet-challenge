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

function createMap(quakes) {
    var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });
}