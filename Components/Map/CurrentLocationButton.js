import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class CurrentLocationButton extends Component {

  _searchBoxFunc(){
    console.log('search box ooo!');
  }

  render() {

    const cb = this.props.cb ? this.props.cb : console.log('Callback function not passed')
    const bottom = this.props.bottom ? this.props.bottom: 65;

    return (
      <View style={[styles.container, {top: HEIGHT - bottom}]}>
        <MaterialIcons 
          name="my-location" 
          color="#000000" 
          size={25}
          onPress={ ()=>{ cb() }} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    width: 45,
    height: 45,
    left: WIDTH-70,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000000',
    elevation: 7,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default CurrentLocationButton