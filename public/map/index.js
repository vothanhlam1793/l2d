let map;
let markers = [];
var checkCenter = true;
const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
function initMap() {
    const haightAshbury = { lat: 30, lng: 0 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: haightAshbury,
        mapTypeId: "terrain",
    });
}

// Adds a marker to the map and push to the array.
function addMarker(position, title) {
    if(title == undefined){
        title = "";
    }
    console.log(title);
    const marker = new google.maps.Marker({
        position,
        map,
        icon: "http://l2d.uudamstudio.com/design/images/logo64.png",
        // icon: "http://maps.google.com/mapfiles/kml/paddle/red-stars.png",
        animation: google.maps.Animation.DROP,
    });
    markers.push(marker);
    setCityMove(title);
    setTimeout(function(){
        marker.setAnimation(1);
        map.panTo(marker.getPosition());
        map.setZoom(4);
        checkCenter = false;
    }, 300);
    setTimeout(function(){
        marker.setMap(null);
        checkCenter = true;
    }, 8000);
}

// Check center
setInterval(function(){
    if(checkCenter == true){
        map.setZoom(2);
        map.setCenter({ lat: 30, lng: 0 });
    }
}, 5000)
// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function hideMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    hideMarkers();
    markers = [];
}
var sct;
function setCityMove(city){
    var a = jQuery("#citymove");
    a.animate({fontSize: '1em'}, "fast");
    clearTimeout(sct);
    a.text(city);
    a.animate({fontSize: '3em'}, "fast");
    sct = setTimeout(function(){
        a.animate({fontSize: '1em'});
    }, 1000);
}

function setTotal(total){
    jQuery("#total").text(total);
}

function setContries(contries){
    jQuery("#contries").text(contries);
}