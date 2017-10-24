import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow, } from 'react-google-maps'

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
  }
  toggleOpen(i) {
    console.log("Marker: ", i);
  }
  
  render () {
    const markers = this.props.markers.map((stopLoc, i) => {
      const marker = {
        position: {
          lat: stopLoc.location.lat,
          lng: stopLoc.location.lng
        }
      }
      // ADD BTWN MARKER: {this.state.isOpen && <InfoWindow position={{lat:stopLoc.location.lat,lng:stopLoc.location.lng}} />}
      return (
        <Marker key={i} {...marker} onClick={this.toggleOpen(i)}>
        </Marker>
      )
    })
    return (
    	
      	<GoogleMap
      		//ref={this.mapLoaded.bind(this)}
          //onDragEnd={this.mapMoved.bind(this)}
          defaultZoom={3}
      		//TODO insert location for the loop
      		defaultCenter={{lat:25,lng:121}}
      		options={{streetViewControl:false, mapTypeControl:false}}
      	>
          { markers }
      	</GoogleMap>
    )
  }

}

export default withGoogleMap(Map)