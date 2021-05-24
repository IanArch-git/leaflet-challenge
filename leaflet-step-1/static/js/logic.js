var usgsURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
// console.log(usgsURL);

d3.json(usgsURL).then(function(data) {
    createFeatures(data.features);
});