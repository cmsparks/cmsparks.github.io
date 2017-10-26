import React from 'react'

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

function InfoBox(props) {
    return (
    <div className="infoBox">
        <h4>{props.line} {props.stop}</h4>
        <div className="favorite"></div>
        <p>Next Arrival: <span style={{color: 'green', fontWeight: 'bold'}}>{props.time1}</span></p>
    </div>
    )
}
export default Nav