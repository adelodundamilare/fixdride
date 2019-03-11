import React, { Component } from 'react';
import { 
  StyleSheet, Image, View, Text
} from 'react-native';

import { MapView, Permissions, Location } from 'expo'

import SearchBox from '../Components/Map/SearchBox'
import CurrentLocationButton from '../Components/Map/CurrentLocationButton'
import Driver from '../Components/Map/Driver'

class ShowMapScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      region: null
    }

    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted'){
      console.log('Permission to access location was denied.')
    }

    let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true})
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }

    this.setState({region: region})

  }

  centerMap(){
    const { 
      latitude, 
      longitude, 
      latitudeDelta, 
      longitudeDelta } = this.state.region

      this.map.animateToRegion({
        latitude, 
        longitude, 
        latitudeDelta, 
        longitudeDelta 
      })
  }

  render() {
    return (
      <View style={styles.container}>

        <SearchBox />
        <CurrentLocationButton cb={() => {this.centerMap()} } />

        <MapView 
          initialRegion = { this.state.region }
          showsUserLocation = { true }
          showsCompass = { true }
          rotateEnabled = { false }
          ref = {(map) => {this.map = map}}
          style= {styles.map} >

          <Driver driver={{ uid: 'null', location: {
            latitude: 37.78825,
            longitude: -122.4324
            }}} />

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {width:250, resizeMode:'contain'},
  map: {
    flex: 1,
  }
});

export default ShowMapScreen