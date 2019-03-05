import React, { Component } from 'react';
import { 
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base'

class SelectCountry extends Component {

  render() {

    const {
      height,
      opacity,
      goBack
    } = this.props

    return (
      <Animated.View style={[styles.container, {height: height, opacity: opacity}]}>
        
        <Animated.View style={styles.header}>
          <Animated.View style={styles.icon_box}>
            <TouchableOpacity onPress= { goBack }>
              <Icon name="md-arrow-back" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress= { goBack }>
              <Icon name="md-arrow-forward" style={styles.icon} />
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.title}>Select a Country</Text>
        </Animated.View>

        <Text>Select Country</Text>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    zIndex: 300
  },
  header: {
    height: 120,
    backgroundColor: 'black',
    padding: 20,
  },
  icon_box: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    color: 'white',
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 24,
    color: 'white',
  }
});

export default SelectCountry