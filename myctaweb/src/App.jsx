import React from 'react'
import ReactDOM from 'react-dom'

import Map from './pages/components/Map.jsx'
import Nav from './pages/components/Nav.jsx'
import styles from './index.css'

class App extends React.Component {
	render() {

		const markers = [
			{
				location: {
					lat: 25,
					lng: 121
				}
			},
			{
				location: {
					lat: 27,
					lng: 121
				}
			}
		]

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
