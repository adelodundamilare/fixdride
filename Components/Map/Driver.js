import React, { Component } from 'react';
import { 
  View,
  Image,
} from 'react-native';

import { MapView } from 'expo'

class Driver extends Component {

  constructor(props){
    super(props)

    const driver = this.props.driver ? this.props.driver : {
      uid: 'noDriversPassed', 
      location: { latitude: 0, longitude: 0 }
    }

    const coordinate = new MapView.AnimatedRegion({
      latitude: driver.location.latitude,
      longitude: driver.location.longitude
    })

    this.state = {
      driver: driver,
      coordinate: coordinate,
    }
  }

  render() {

    return (
      <MapView.Marker.Animated 
        coordinate = {this .state.coordinate}
        anchor = {{x: 0.35, y: 0.32}}
        ref = { marker => {this.marker = marker}}
        style={{width:50, height:50}} >

        <Image 
          source={require('../../assets/car.png')}
          style={{width: 32, height: 32}}/>

      </MapView.Marker.Animated>
    )
  }
}

export default Driver