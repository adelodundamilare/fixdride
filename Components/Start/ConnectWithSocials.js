import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';


import * as Animatable from 'react-native-animatable'
import { Icon } from 'native-base'

class ConnectWithSocials extends Component {

  constructor(){
    super()

    state = {
      displayItem: 'none'
    }
  }

  toggleItemDisplay() {
    if (this.props.displayItem == 'flex') {
      return 'none'
    }
    
    return 'flex'
  }

  render() {

    const { 
      displayLink,
      height,
      opacity,
      onPressLink,
      onPressBackLink
    } = this.props

    return (
      <Animatable.View animation="slideInUp" iterationCount={1} style={styles.container}>

        {/* this is the header bar, hidden at first glance */}
        <Animated.View style={[styles.backButton, {opacity: opacity}]}>
          <TouchableOpacity onPress= { onPressBackLink }>
            <Icon name="md-arrow-back" style={{color: 'black'}} />
          </TouchableOpacity>
        </Animated.View>

        <View>
          <Animated.View style={{ height: height }}>
            
            {/* this is the bottom link */}
            <Animated.View style={[styles.linkView, { display: displayLink }]}>
              <TouchableOpacity onPress={ onPressLink }>
                <Text style={styles.text}>
                  or connect using a social account
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* connect with socials pages */}
            <Animated.View style={[styles.innerContent, {opacity: opacity}]}>
              <Text>Choose an account</Text>

              <View>
                <TouchableOpacity>
                  <Text>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text>Google</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'white',
  },
  linkView: {
    alignItems: 'center', 
    justifyContent: 'center', 
    borderTopColor: '#e8e8ec', 
    borderTopWidth: 1, 
    paddingVertical: 25
  },
  text: {
    color:'#5a7fdf', 
    fontWeight: 'bold'
  },
  backButton: {
    position: "absolute", 
    height: 60, 
    width: 60, 
    top: 60, 
    left: 25, 
    zIndex: 100,
  },
  innerContent: {
    zIndex: 100,
    marginTop: 200,
  }
});

export default ConnectWithSocials