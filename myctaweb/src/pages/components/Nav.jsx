import React from 'react'
import bus_stops from "../../../info/bus_stops.json"
import train_stops from "../../../info/train_stops.json"

/*var busMark = ""
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
*/

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.setFav = this.setFav.bind(this);
    this.setAll = this.setAll.bind(this);
    this.state = {isFav: false}
  }
  setFav() {
    console.log("fav");
    this.setState({
      isFav: true
    });
  }
  setAll() {
    console.log("all");
    this.setState({
      isFav: false
    });
  }
  render () {
    return (
            <div className="nav">
        		<div className="tabWrap">
        			<div className="favTab" onClick={this.setFav}><h2>Favorites</h2></div>
        			<div className="allTab" onClick={this.setAll}><h2>All</h2></div>
        		</div>
                <InfoBoxes />
        	</div>
    )
  }
}
class InfoBoxes extends React.Component {
    render () {
        return (
            <div className="content">
              <div className="contentGrad"></div>
              <InfoBox line="84 Bus" stop="Catalpa" time1="3:02"/>
              <InfoBox line="Brown Line" stop="Kimball" time1="3:03"/>
              <InfoBox line="Blue Line" stop="Midway" time1="3:15"/>
              <InfoBox line="92 Bus" stop="Montrose" time1="3:05"/>
              <InfoBox line="Brown Line" stop="Montrose" time1="2:59"/>
            </div>
        )
    }
}

class InfoBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="infoBox">
        <h4>{this.props.line} {this.props.stop}</h4>
        <div className="favorite"></div>
        <p>Next Arrival: <span style={{color: 'green', fontWeight: 'bold'}}>{this.props.time1}</span></p>
    </div>
    )
  }
}
export default Nav