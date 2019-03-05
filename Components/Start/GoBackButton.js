import React, { Component } from 'react';
import { 
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


import { Icon } from 'native-base'

class GoBackButton extends Component {

  render() {

    const {
      goBackMethod,
      height,
      opacity
    } = this.props

    return (
      <Animated.View style={[styles.container, {height: height}]}>
        <Animated.View style = {{ opacity: opacity }}>
          <TouchableOpacity onPress= { goBackMethod }>
            <Icon name="md-arrow-back" style={{color: 'black'}} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute", 
    width: 60, 
    top: 60, 
    left: 25, 
    zIndex: 100
  }
});

export default GoBackButton