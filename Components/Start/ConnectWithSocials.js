import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';


import * as Animatable from 'react-native-animatable'
import { Icon } from 'native-base'

import GoBackButton from './GoBackButton';

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
        
        {/* go back button */}
        <GoBackButton 
          opacity={opacity} 
          goBackMethod={onPressBackLink} 
          height={height} 
        />

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
              <Text style={styles.screen_title}>Choose an account</Text>

              <View style={styles.social_icons}>
                <TouchableOpacity>
                  <View style={styles.social_view}>
                    <Image style={styles.social_image} source={require('../../assets/fb_icon.png')} />
                    <Text style={styles.social_text}>Facebook</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.social_view}>
                    <Image style={styles.social_image} source={require('../../assets/google_icon.png')} />
                    <Text style={styles.social_text}>Google</Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.footer_text}>
                  By clicking on a social option yo ma receive an SMS for verification. Message and data rates may apply.
                </Text>
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
  innerContent: {
    zIndex: 100,
    marginTop: 150,
    left: 25,
  },
  screen_title: {
    fontSize:24, 
    color: 'gray',
  },
  social_icons: {
    marginVertical: 50,
  },
  social_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  social_text: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
  },
  social_image: {
    height:24,
    width:24, 
    resizeMode:'contain'
  },
  footer_text: {
    marginTop: 50,
  }
});

export default ConnectWithSocials