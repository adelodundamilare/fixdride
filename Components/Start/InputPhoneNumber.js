import React, { Component } from 'react';
import { 
  Text,
  View,
  Image,
  Animated,
  TextInput, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


import * as Animatable from 'react-native-animatable'
import { Icon } from 'native-base'

import GoBackButton from './GoBackButton';

class InputPhoneNumber extends Component {

  constructor(){
    super()

    state = {
      displayItem: 'none'
    }
  }

  render() {

    const {
      height,
      opacity,
      goBack,
      btnHeight,
      marginTop,
      placeholderText,
      headerOpacity,
      addPhoneNumber,
      borderBottom,
      titleBottomValue,
      leftValue,
      opacityValue,
      onRef,
    } = this.props

    return (
      <View>
        {/* go back button */}
        <GoBackButton 
          opacity={opacity} 
          goBackMethod={goBack} 
          height={btnHeight} 
        />

        {/* this is the main body! */}
        <Animatable.View animation="slideInUp" iterationCount={1}>
          <Animated.View style={{height: height, backgroundColor:'white'}}>
            <Animated.View style={{opacity: headerOpacity, alignItems:'flex-start', paddingHorizontal: 25, marginTop: marginTop}}>
              <Text style={{fontSize: 24}}>Get moving with FixDRide</Text>
            </Animated.View>

            <TouchableOpacity
              onPress = { addPhoneNumber }>
              <Animated.View style={{marginTop: marginTop, paddingHorizontal: 25, flexDirection: 'row'}}>
                <Animated.Text style={{fontSize:24, color: 'gray', position: 'absolute', bottom: titleBottomValue, left: leftValue, opacity: opacityValue}}>Enter your mobile number</Animated.Text>
                <Image style={{height:24,width:24, resizeMode:'contain'}} source={require('../../assets/ng-flag.jpg')} />
                <Animated.View pointerEvents="none" style={{flexDirection: 'row', flex:1, borderBottomWidth: borderBottom}}>
                  <Text style={{fontSize:20, paddingHorizontal:10}}>+234</Text>
                  <TextInput keyboardType="numeric" ref={onRef} style={{flex:1, fontSize: 20}} placeholder={placeholderText} underlineColorAndroid="transparent" />
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

export default InputPhoneNumber