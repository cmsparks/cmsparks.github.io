import React from 'react'
import ReactDOM from 'react-dom'

import Map from './pages/components/Map.jsx'
import Nav from './pages/components/Nav.jsx'
import styles from './index.css'
import bus_stops from "../info/bus_stops.json"
import train_stops from "../info/train_stops.json"

//var busData = JSON.parse(bus_stops);
//var trainData = JSON.parse(train_stops);

var busMark = ""
var trainMark = ""
for (var i = 30000; i < 30500; i++) {
	if(train_stops[i]!=undefined)
	{
		trainMark=trainMark+'{"location": {'
		trainMark=trainMark+'"lat":'+JSON.stringify(train_stops[i].latlng.latitude);
	    trainMark=trainMark+', "lng":'+JSON.stringify(train_stops[i].latlng.longitude);
	    trainMark=trainMark+"}},"
	    /*if(i!=17967)
	    {
	    	busMark=busMark+","
	    } */
	}
}
for (var i = 1; i < 18000; i++) {
	if(bus_stops[i]!=undefined)
	{
		busMark=busMark+'{"location": {'
		busMark=busMark+'"lat":'+JSON.stringify(bus_stops[i].latlng.latitude);
	    busMark=busMark+', "lng":'+JSON.stringify(bus_stops[i].latlng.longitude);
	    busMark=busMark+"}}"
	    if(i!=17967)
	    {
	    	busMark=busMark+","
	    }
	}
}
var allMark="["+trainMark+busMark+"]"
var markJSON = JSON.parse(allMark)

class App extends React.Component {
	render() {


		const markers = markJSON

		return (
			<div className='wrapper'>
				<Nav />
				<Map 
					containerElement={<div className='containerElem'/>}
					mapElement={<div className='mapElem'/>}
					markers={ markers }
				/>
			</div>
		)
	}
}

ReactDOM.render( 
	<App />,
	document.getElementById('app')
)
