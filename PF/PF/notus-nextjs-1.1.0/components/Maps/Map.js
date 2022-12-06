import React, { memo, useReducer } from "react";

var markersArray = [];

function Map({ studios, setPos }) {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "43.6426";
    let lng = "-79.3871";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 12,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#cbd5e0" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

	  {/*
    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Notus NextJS!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Notus NextJS</h2>' +
      "<p>A free Admin for Tailwind CSS, React, React Hooks, and NextJS.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    */}

	  // pin functions from 
	  // https://developers.google.com/maps/documentation/javascript/examples/marker-remove
	  let markers = [];
	  let studioMarkers = [];

	  function addMarker(position) {
		  const marker = new google.maps.Marker({
		    position,
		    map,
      			animation: google.maps.Animation.DROP,
      			title: "You",
		  });
		  setPos(position.toString());
		
		  markers.push(marker);
		}
	  function addStudioMarker(position, name, map) {
		  const marker = new google.maps.Marker({
			  position,
		    map,
      			//animation: google.maps.Animation.DROP,
      			title: name,
		  });
		  studioMarkers.push(marker);
		}


	  function setMapOnAll(map) {
		  for (let i = 0; i < markers.length; i++) {
		    markers[i].setMap(map);
		  }
		}

	function placeMarker(position, map) {
	    deleteMarkers();
		addMarker(position);
	    map.panTo(position);
	}

	  function deleteMarkers(){
		  setMapOnAll(null);
		  markers = [];
		}

	  function updateStudioMarkers(studios, map) {
		for (let i = 0; i < studios.length; i++) {
			addStudioMarker(new google.maps.LatLng(studios[i][0], studios[i][1]), studios[i][2], map);
		}
	}
    map.addListener("click", function (e) {
	    placeMarker(e.latLng, map);
	    try {
	    updateStudioMarkers(studios.current, map);
		} catch {
		}
    });
  });
  return (
    <>
      <div className="relative w-full rounded h-600-px">
        <div className="rounded h-full" ref={mapRef} />
      </div>
    </>
  );
}

export default memo(Map);
