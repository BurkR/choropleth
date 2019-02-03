// 3. Add airports GeoJSON Data
// Null variable that will hold cell tower data
var airports = null;
// 4. build up a set of colors from colorbrewer's dark2 category
//var colors = chroma.scale('Dark2').mode('lch').colors(9);
// 5. dynamically append style classes to this page. This style classes will be used for colorize the markers.
//for (i = 0; i < 9; i++) {
   // $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
//}
// Get GeoJSON and put on it on the map when it loads
airports= L.geoJson.ajax("assets/airports.geojson", {
    // assign a function to the onEachFeature parameter of the airports object.
    // Then each (point) feature will bring a popup window.
    // The content of the popup window is the value of `feature.properties.company`
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.company);
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.company == "Airport") { id = 0; }
        else if (feature.properties.company == "Cellco")  { id = 1; }
        else if (feature.properties.company == "RCC Minnesota")  { id = 2; }
        else if (feature.properties.company == "Verizon")  { id = 3; }
        else if (feature.properties.company == "US Cellular")  { id = 4; }
        else if (feature.properties.company == "Hood River Cellular")  { id = 5; }
        else if (feature.properties.company == "Medford Cellular")  { id = 6; }
        else if (feature.properties.company == "Oregon RSA")  { id = 7; }
        else { id = 8;} // "Salem Cellular"
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-signal marker-color-' + (id + 1).toString() })});
    },
    attribution: 'Airports &copy; Map Cruzin | Oregon counties &copy; Oregon Explorer | Base Map &copy; CartoDB | Made By Rene Burk'
}).addTo(mymap);
// 7. Set style function that sets fill color.md property equal to cell tower density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.CT_CNT),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}
   // 12. Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);