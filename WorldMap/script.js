//uses https://github.com/johan/world.geo.json as the json file
//TODO implement usage of the UN Comtrade API and also clean up
//the map so that it is not quite as cluttered.


var map;
let selected;
let currentPolys = [];
let countries = JSON.parse(countryData);

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 8,
	  styles: [
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#f5f5f5"
		      },
		      {
		        "saturation": -100
		      },
		      {
		        "lightness": -100
		      },
		      {
		        "weight": 1
		      }
		    ]
		  },
		  {
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#f5f5f5"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "saturation": -100
		      },
		      {
		        "lightness": -95
		      },
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.country",
		    "stylers": [
		      {
		        "visibility": "on"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.country",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#ffffff"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#bdbdbd"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.locality",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.neighborhood",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.province",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "landscape",
		    "stylers": [
		      {
		        "color": "#e9e1d5"
		      },
		      {
		        "visibility": "on"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#ffffff"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "road.arterial",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#dadada"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "featureType": "road.local",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.line",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#e5e5e5"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#eeeeee"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "stylers": [
		      {
		        "visibility": "on"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#d2f4f4"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  }]
	});

	map.data.loadGeoJson('countries.geo.json');
	map.data.setStyle(function(feature) {
	  var color = 'transparent';
	  if (feature.getProperty('isColorful')) {
	    color = 'blue';
	  }
	  return /** @type {google.maps.Data.StyleOptions} */({
	    fillColor: color,
	    strokeColor: color,
	    strokeWeight: 2
	  });
	});

	map.data.addListener('click', function(event) {
	  event.feature.setProperty('isColorful', !event.feature.getProperty('isColorful'));
	  drawLines(event.feature.f.name);
	});

	// When the user hovers, tempt them to click by outlining the letters.
	// Call revertStyle() to remove all overrides. This will use the style rules
	// defined in the function passed to setStyle()
	map.data.addListener('mouseover', function(event) {
	  map.data.revertStyle();
	  map.data.overrideStyle(event.feature, {strokeWeight: 8});
	});
	map.data.addListener('mouseout', function(event) {
	  map.data.revertStyle();
	});
}

function drawLines(name) {
	clearLines();
	let lat;
	let lng;
	for(key in countries)
	{
		if(countries[key].name === name) {
			lat = countries[key].latitude;
			lng = countries[key].longitude;
			console.log(countries[key])
		}

	}
	for(key in countries)
	{
		currentPolys[key] = new google.maps.Polyline({
			strokeColor: '#FF0000',
      		strokeOpacity: 1.0,
     		strokeWeight: .25,
			geodesic: true,
			path: [{lat:countries[key].latitude, lng:countries[key].longitude}, {lat: lat, lng: lng}]
		});
		currentPolys[key].setMap(map);
	}
}
function clearLines() {
	for(key in currentPolys){
		currentPolys[key].setMap(null);
	}
	currentPolys = [];
}