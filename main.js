var map = L.map('map', {
    center:[2672, 4096],
    zoom:-3,
    minZoom:-4,
    maxZoom:2,
    zoomDelta:0.5,
    zoomSnap:0.5,
    crs: L.CRS.Simple
});

var isZoominActive = false;
// var imageHeight = map.getContainer().clientHeight;
// var imageWidth = map.getContainer().clientWidth;

var bounds = [[-0, -0], [5344, 8192]];
var image = L.imageOverlay('background.jpg', bounds).addTo(map);
// var image = L.imageOverlay('image.jpg', bounds).addTo(map);


var zoomOutImage = L.imageOverlay('ZoomOUTTitles.png', bounds).addTo(map);
var zoomInImage = L.imageOverlay('ZoomINTitles.png', bounds, {opacity:0}).addTo(map);

map.setMaxBounds(bounds);
// map.fitBounds(bounds);

map.on('click', function(e) {
    console.log(e.latlng);
});

// map.on('load', function(e) {
//     console.log("Map loaded");
   
// });

// map.setView({lat: 2937.054833272866, lng: 3750.5839781754876}, -1);

map.on('zoomend', function(e) {
    console.log(e);
    let zoom = map.getZoom();

    console.log(zoom);

    if(zoom >= -2) {
        isZoominActive = true;
        zoomOutImage.setOpacity(0);
        zoomInImage.setOpacity(1);
    }

    if(zoom < -2) {
        isZoominActive = false;
        zoomOutImage.setOpacity(1);
        zoomInImage.setOpacity(0);
    }
});

var toggleTitleButton = document.getElementById('toggle-title');
toggleTitleButton.onclick = function(e) {
    e.stopPropagation();

    let opacity;

    if(isZoominActive) {
        opacity = zoomInImage.options.opacity;
        opacity == 0 ? zoomInImage.setOpacity(1) : zoomInImage.setOpacity(0); 
    } else {
        opacity = zoomOutImage.options.opacity;
        opacity == 0 ? zoomOutImage.setOpacity(1) : zoomOutImage.setOpacity(0); 
    }
    

    e.target.classList.toggle('active');
    e.target.textContent = opacity == 0 ? 'Hide Titles' : 'Show Titles';    
}