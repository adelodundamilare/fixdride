import React, { Component } from 'react';
import { 
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base'

import GoBackButton from './GoBackButton';

class SelectCountry extends Component {

  render() {

    const {
      height,
      opacity,
      goBack
    } = this.props

    return (
      <Animated.View style={[styles.container, {height: height, opacity: opacity}]}>
        
        <GoBackButton 
          opacity={1} 
          goBackMethod={goBack} 
          height={60} 
        />

        <Text>Select Country</Text>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    zIndex: 300
  }
});

export default SelectCountry