import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow, KmlLayer } from 'react-google-maps'

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    const markers = this.props.markers.map((stopLoc, i) => {
      const marker = {
        position: {
          lat: stopLoc.location.lat,
          lng: stopLoc.location.lng
        },
        icon: stopLoc.icon
      }
      // ADD BTWN MARKER: {this.state.isOpen && <InfoWindow position={{lat:stopLoc.location.lat,lng:stopLoc.location.lng}} />}
      return (
        <Marker key={i} {...marker}>
        </Marker>
      )
    })
    return (
    	
      	<GoogleMap
      		//ref={this.mapLoaded.bind(this)}
          //onDragEnd={this.mapMoved.bind(this)}
          defaultZoom={10}
      		//TODO insert location for the loop
      		defaultCenter={{lat:41.8633925,lng:-87.7121565}}
      		options={{streetViewControl:false, mapTypeControl:false}}
      	>
          <KmlLayer
      url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
      options={{ preserveViewport: true }}
    />
          <KmlLayer url='./doc.kml' options={{ preserveViewport: true }} />
          { markers }
      	</GoogleMap>
    )
  }

}

export default withGoogleMap(Map)