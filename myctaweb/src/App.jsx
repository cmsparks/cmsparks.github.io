import React from 'react'
import ReactDOM from 'react-dom'

import Map from './pages/components/Map.jsx'
import Nav from './pages/components/Nav.jsx'
import styles from './index.css'
import stops from "../info/stops.json"
const busIcon = require('./bus.jpg')
const trainIcon = require('./train.jpg')

//var busData = JSON.parse(bus_stops);
//var trainData = JSON.parse(train_stops);
/*var sizedBus = new google.maps.MarkerImage(
    busIcon,
    null,
    null,
    /* Offset x axis 33% of overall size, Offset y axis 100% of overall size */
    /*new google.maps.Point(40, 110), 
    new google.maps.Size(120, 110)
);*/

//console.log(sizedBus)
/*var markerList = ""
for (var i = 1; i < 47001; i++) {
	if(stops[i]!=undefined)
	{
		markerList=markerList+'{"location": {'
		markerList=markerList+'"lat":'+JSON.stringify(stops[i].stop_lat);
	    markerList=markerList+', "lng":'+JSON.stringify(stops[i].stop_lon);
	    if(stops[i].location_type=0) {
	    	markerList=markerList+'}, "icon": "'+busIcon+'"}'
	    }
	    else {
	    	markerList=markerList+'}, "icon": "'+trainIcon+'"}'
	    }
	    if(i!=41700)
	    {
	    	markerList=markerList+","
	    }
	}
}
markerList="["+markerList+"]"
var markJSON = JSON.parse(markerList)

*/
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			route: 2
		}
	}
	//setRoute(i) {

	//}
	render() {
		return (
			<div className='wrapper'>
				<Nav route={this.state.route} /*routeSetter={this.setRoute.bind(this, i)}*//>
				<Map 
					containerElement={<div className='containerElem'/>}
					mapElement={<div className='mapElem'/>}
					route={this.state.route}
				/>
			</div>
		)
	}
}

ReactDOM.render( 
	<App />,
	document.getElementById('app')
)