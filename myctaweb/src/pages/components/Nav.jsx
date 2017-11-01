import React from 'react'
import bus_stops from "../../../info/bus_stops.json"
import train_stops from "../../../info/train_stops.json"
import routes from "../../../info/routes.json"
import train_lines from "../../../info/train_lines.json"
import bus_lines from "../../../info/bus_lines.json"
/*
var panels = ""
for (var i = 30000; i < 30500; i++) {
  if(train_stops[i]!=undefined)
  {
    panels = 
    train_stops[i].title
  }
}
for (var i = 1; i < 18000; i++) {
  if(bus_stops[i]!=undefined)
  {
    
  }
}
JSON.parse(panels)
*/
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.setFav = this.setFav.bind(this);
    this.setRoutes = this.setRoutes.bind(this);
    this.state = {routeSel: "all"}
  }
  setFav() {
    console.log("fav");
    this.setState({
      routeSel: "fav"
    });
  }
  setRoutes() {
    console.log("all");
    this.setState({
      routeSel: "all"
    });
  }
/*  setRoute(i) {
    console.log(i)
  }*/
  render () {
    return (
      <div className="nav">
        <div className="tabWrap">
          <div className="favTab" onClick={this.setFav}><h2>Favorites</h2></div>
          <div className="allTab" onClick={this.setRoutes}><h2>Routes</h2></div>
        </div>
        <Boxes/>
      </div>
    )
  }
}
class Boxes extends React.Component {
  constructor (props) {
    super(props)
    //this.handleClick = this.handleClick.bind(this,i)
    this.state = {
      onRoute: true,
      routeSel: "",
      typeSel: 0
    }
  }
  handleClick(i) {
    console.log(i)
    this.setState({routeSel: i,onRoute: false,typeSel: routes[i].route_type})
  }
  render () {
    var infoBox = <div></div>
    if(this.state.typeSel==3){
      console.log(this.state.routeSel)
      console.log("id"+routes[this.state.routeSel].route_id)
      id=routes[this.state.routeSel].route_id
      infoBox = bus_lines[id].map(function(bus_lines,i) {
        console.log(bus_lines["111A"][1])
        return(<InfoBox
          key={i}
          line={5}
          stop={bus_stops[bus_lines[i]].name}
          time1="3:00"/>)
      }.bind(this))
    }
    else if (this.state.typeSel==1){ 
      console.log("fdsjafdsj")
    }
    return (
        <div className="content">
          <div className="contentGrad"></div>
          {this.state.onRoute && routes.map(function(allroutes, i) {
            return (<RouteBox 
              key={i}
              route_id={i}
              routeName={routes[i].route_long_name}
              action={this.handleClick.bind(this, i)}
            />)
          }.bind(this))}
          {!this.state.onRoute && infoBox}
        </div>
    )
  }
}

class RouteBox extends React.Component {
  render () {
    return (
      <div className="routeBox">
        <h4>{this.props.routeName} {this.props.type} </h4>
        <div className="routeSel" onClick={this.props.action}>-></div>
      </div>
    )
  }
}
class InfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prediction: "0"
    }
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