// Initialize and add the map
//reference (update map): https://stackoverflow.com/questions/12662469/google-maps-javascript-api-marker-setposition-issue
//import { faBus } from "@fortawesome/free-solid-svg-icons";
var my_dot;
var my_lat , my_lng;
const ncku_bounds = {
    //https://www.latlong.net/
    //右下22.993484, 120.224516
    //左下22.995640,120.212999
    //左上23.004085,120.215050
    //右上23.002302,120.225065
    north: 23.004085,
    south: 22.993484,
    east: 120.215050,
    west: 120.225065,
};


function init_GMap() {
    const ncku = { lat: 22.996040, lng: 120.221030 };
    //center
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: ncku,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
        gestureHandling: "cooperative",
    });

    //******************************marker with messages******************************
    //日後enable json
    setMarkers(map);

    //******************************create polygons*********************************
    set_poly(map);

    /*******************************real time gps *******************************/
    //init
    updatePosition(getLocation());
    my_dot = new google.maps.Marker(
    {
        position: {
            lat: 22.993484,
            lng: 120.224516,
        },
        //icon: 'https://www.oxxostudio.tw/img/articles/201801/google-maps-3-marker-icon.png',
        map: map,
    });



    new ClickEventHandler(map, ncku);
}
//poi testing ******************************************************************************************************
function isIconMouseEvent(e) {
    return "placeId" in e;
}

class ClickEventHandler {
    origin;
    map;
    directionsService;
    directionsRenderer;
    placesService;
    infowindow;
    infowindowContent;
    constructor(map, origin) {
        this.origin = origin;
        this.map = map;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(map);
        this.placesService = new google.maps.places.PlacesService(map);
        this.infowindow = new google.maps.InfoWindow();
        this.infowindowContent = document.getElementById("infowindow-content");
        this.infowindow.setContent(this.infowindowContent);
        // Listen for clicks on the map.
        this.map.addListener("click", this.handleClick.bind(this));
    }
    handleClick(event) {
        console.log("You clicked on: " + event.latLng);
        // If the event has a placeId, use it.
        if (isIconMouseEvent(event)) {
            console.log("You clicked on place:" + event.placeId);
            // Calling e.stop() on the event prevents the default info window from
            // showing.
            // If you call stop here when there is no placeId you will prevent some
            // other map click event handlers from receiving the event.
            event.stop();
            if (event.placeId) {
                this.calculateAndDisplayRoute(event.placeId);
                this.getPlaceInformation(event.placeId);
            }
        }
    }
    calculateAndDisplayRoute(placeId) {
        const me = this;

        this.directionsService
            .route({
                origin: this.origin,
                destination: { placeId: placeId },
                travelMode: google.maps.TravelMode.WALKING,
            })
            .then((response) => {
                me.directionsRenderer.setDirections(response);
            })
            .catch((e) => window.alert("Directions request failed due to " + status));
    }
    getPlaceInformation(placeId) {
        const me = this;

        this.placesService.getDetails({ placeId: placeId }, (place, status) => {
            if (
                status === "OK" &&
                place &&
                place.geometry &&
                place.geometry.location
            ) {
                me.infowindow.close();
                me.infowindow.setPosition(place.geometry.location);
                me.infowindowContent.children["place-icon"].src = place.icon;
                me.infowindowContent.children["place-name"].textContent = place.name;
                me.infowindowContent.children["place-id"].textContent = place.place_id;
                me.infowindowContent.children["place-address"].textContent =
                    place.formatted_address;
                me.infowindow.open(me.map);
            }
        });
    }
}
//poi testing ******************************************************************************************************


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
    }
    console.log("fuck2023")
    return null;
};

function updatePosition(position) {
    if (position) {
        my_lat = position.coords.latitude;
        my_lng = position.coords.longitude;
    }
}

function currentLocation() {
    return { lat: my_lat, lng: my_lng };
};



////模擬 22.993484 120.224516
my_lat = 22.993484
my_lng = 120.224516
/* uncomment to enable gps
setInterval(function () {
    //updatePosition(getLocation());
    console.log(my_lat);
    console.log(my_lng);
    //模擬 22.993484 120.224516
    //my_lat += 0.03
    //my_lng += 0.02
    myLatlng = new google.maps.LatLng(my_lat, my_lng);
    my_dot.setPosition(myLatlng);
}, 1500);
*/

//******************************current location***********************************
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}


function setMarkers(map) {
    const secretMessages = ["station name\n# of Scooter : 50", "station name\n# of Scooter : 35", "station name\n# of Scooter : 10", "station name\n# of Scooter : 20", "station name\n# of Scooter : 33", "station name\n# of Scooter : 48", "station name\n# of Scooter : 2", "station name\n# of Scooter : 3", "station name\n# of Scooter : 11", "station name\n# of Scooter : 50", "station name\n# of Scooter : 50", "station name\n# of Scooter : 50"];
    const lngSpan = ncku_bounds.east - ncku_bounds.west - 0.00007;
    const latSpan = ncku_bounds.north - ncku_bounds.south - 0.00015;

    const stations = [
        ["EE_department", 22.996501, 120.222252],
        ["E_design_department", 22.999904, 120.215624],
        ["mechanical_department" , 22.997471, 120.223849],
        ["civil engineering_department", 22.999473, 120.220737],
        ["CSIE_department" , 22.997361, 120.220421],
        ["dental_department", 23.000668, 120.219396],
        ["management_department", 22.998453, 120.217422],
        ["Liberal_Art_department", 22.999661, 120.217649],
        ["Academy of Social Sciences", 23.002181, 120.216325],
        ["medical_center1" , 23.001381,120.219098],
        ["medical_center2", 23.002419, 120.222273],
        ["zhi_chuang_sports_court" , 22.999874, 120.222756],
        ["library", 22.999451, 120.219298],
        ["museum",22.996743, 120.219204] ,
        ["parking_lot2", 22.997999, 120.218493],
        ["chung_cheng_stadium", 22.996735, 120.216886],
        ["student_center", 22.998240, 120.215732],
        ["ching_ye_dorm", 23.001257, 120.224339],
        ["sheng_li_dorm", 22.994352, 120.220393],
        ["Kuang_fu_dorm", 22.998618, 120.214817],
        ["Kuang_fu_court", 22.996948, 120.214977],
        ["train_station", 22.997098, 120.213863],
    ];


    function attachSecretMessage(marker, station_name) {
        //要傳入車子數量
        //停車位數量
        const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading" style="color:#00c0f6; font-size : 16px;">' + station_name + '</h1>'
            '<div id="bodyContent">' + 
            //'<h2 id="scooter_remain" style="color:#00c0f6; font-size : 13px;">' + 'scooter : 17' + '</h2>' +
            //'<h2 id="parking_remain" style="color:#00c0f6; font-size : 13px;">' + 'parking : 5' + '</h2>' +
                '<h1 id="firstHeading" class="firstHeading" style="color:#00c0f6; font-size : 16px;">' + 'scooter : 17' + '</h1>'
            "</div>" +
            "</div>";
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });

        marker.addListener("click", () => {
            infowindow.open(marker.get("map"), marker);
        });
    }

    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
    const image = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //url: "https://imgur.com/g6NgoHX" , 
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    const shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
    };

    for (let i = 0; i < stations.length; i++) {
        const station = stations[i];

        const marker = new google.maps.Marker({
            position: { lat: station[1], lng: station[2] },
            map,
            icon: image,
            shape: shape,
            title: station[0],
            zIndex: station[3],
        });
        //車子數量  , 加入button 之類的
        attachSecretMessage(marker, station[0]);
    }

    //for (let i = 0; i < secretMessages.length; ++i) {
    //    const marker = new google.maps.Marker({
    //        position: {
    //            lat: ncku_bounds.south + latSpan * Math.random(),
    //            lng: ncku_bounds.west + lngSpan * Math.random(),
    //        },
    //        animation: google.maps.Animation.DROP,
    //        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    //        map: map,
    //    });
//
    //    attachSecretMessage(marker, secretMessages[i]);
    //    marker.addListener("click", toggleBounce(marker));
    //}
}

function set_poly (map) {
    const square_Coords = [
        /*
        //右下22.993484, 120.224516
        //左下22.995640,120.212999
        //左上23.004085,120.215050
        //右上23.002302,120.225065
        */
        { lat: 22.993484, lng: 120.224516 },
        { lat: 22.995640, lng: 120.212999 },
        { lat: 23.004085, lng: 120.215050 },
        { lat: 23.002302, lng: 120.225065 },
    ];
    // Construct the polygon.
    const ncku_poly = new google.maps.Polygon({
        paths: square_Coords,
        strokeColor: "#00c0f6",
        strokeOpacity: 0.3,
        strokeWeight: 2,
        fillColor: "#00c0f6",
        fillOpacity: 0.35,
    });
    ncku_poly.setMap(map);
}


//******************************current location***********************************

//******************************marker with messages******************************
//******************************marker with messages******************************

//window.initMap = init_GMap;

