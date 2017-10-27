import React from 'react'
import ReactDOM from 'react-dom'

import Map from './pages/components/Map.jsx'
import Nav from './pages/components/Nav.jsx'
import styles from './index.css'
import bus_stops from "../info/bus_stops.json"
import train_stops from "../info/train_stops.json"
const busIcon = require('./bus.png')
const trainIcon = require('./train.png')

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
var busMark = ""
var trainMark = ""
for (var i = 30000; i < 30500; i++) {
	if(train_stops[i]!=undefined)
	{
		
		//set up markers
		trainMark=trainMark+'{"location": {'
		trainMark=trainMark+'"lat": '+JSON.stringify(train_stops[i].latlng.latitude);
	    trainMark=trainMark+', "lng": '+JSON.stringify(train_stops[i].latlng.longitude);
	    trainMark=trainMark+'}, "icon": "'+trainIcon+'"},'
	}
}
for (var i = 1; i < 18000; i++) {
	if(bus_stops[i]!=undefined)
	{
		busMark=busMark+'{"location": {'
		busMark=busMark+'"lat":'+JSON.stringify(bus_stops[i].latlng.latitude);
	    busMark=busMark+', "lng":'+JSON.stringify(bus_stops[i].latlng.longitude);
	    busMark=busMark+'}, "icon": "'+busIcon+'"}'
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










/*

import { busKey, trainKey } from 'mycta/keys'
import { stringify } from 'querystring'
import moment from 'moment'

function formatTime (milliseconds) {
  let seconds = Math.floor(milliseconds / 1000)
  let result = ''

  if (seconds >= 60) {
    result += addUnit(Math.floor(seconds / 60), 'minute') + ' '
    seconds -= 60 * Math.floor(seconds / 60)
  }

  if (seconds) {
    result += addUnit(seconds, 'second')
  }

  return result
}

function addUnit (value, type) {
  return value + ' ' + type + (value > 1 ? 's' : '')
}

function formatBusDateTime (dateTime) {
  let list = dateTime.split('')
  list.splice(4, 0, '-')
  list.splice(7, 0, '-')
  list.splice(10, 1, 'T')
  return list.join('')
}

function getTimeDiff (dateTime) {
  console.log(Date.parse(dateTime), Date.now(), moment(dateTime).toISOString(), moment().toISOString())
  return moment(dateTime).diff(moment())
}

export function getPredictions (type, id, callback) {
  if (type === 'train') {
    trainRequest('ttarrivals', { stpid: id }, (data) => callback(
      data.eta
        .map(prediction => formatTime(getTimeDiff(prediction.arrT)))
    ))
  } else {
    busRequest('getpredictions', { stpid: id }, (data) => callback(
      data.error ? [data.error[0].msg] : data.prd
        .map(prediction => formatTime(getTimeDiff(formatBusDateTime(prediction.prdtm))))
    ))
  }
}

function busRequest (type, parameters, callback) {
  fetch(`http://ctabustracker.com/bustime/api/v2/${type}?` + stringify({
    key: busKey,
    format: 'json',
    ...parameters
  }))
    .then((resp) => resp.json())
    .then((data) => { console.log(data); callback(data['bustime-response']) })
}

function trainRequest (type, parameters, callback) {
  fetch(`http://lapi.transitchicago.com/api/1.0/${type}.aspx?` + stringify({
    key: trainKey,
    outputType: 'JSON',
    ...parameters
  }))
    .then((resp) => resp.json())
    .then((data) => { console.log(data); callback(data.ctatt) })
}
*/