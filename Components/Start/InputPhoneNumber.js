import React, { Component } from 'react';
import { 
  Text,
  View,
  Image,
  Animated,
  TextInput, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import { Icon } from 'native-base'

import GoBackButton from './GoBackButton';
import SelectCountry from './SelectCountry';

const SCREEN_HEIGHT = Dimensions.get('window').height
const DURATION = 500

class InputPhoneNumber extends Component {

  componentWillMount(){
    this.height = new Animated.Value(0)
    this.opacity = new Animated.Value(0)
  }

  _showSelectCountry = () => {
    
    Animated.parallel([
      Animated.timing(this.height, {
        duration: DURATION,
        toValue: SCREEN_HEIGHT
      }),
      Animated.timing(this.opacity, {
        duration: DURATION,
        toValue: 1
      }),
      Animated.timing(this.props.height, {
        duration: DURATION,
        toValue: 0
      })
    ]).start()
  }

  _hideSelectCountry = () => {
    
    Animated.parallel([
      Animated.timing(this.height, {
        duration: DURATION,
        toValue: 0
      }),
      Animated.timing(this.opacity, {
        duration: DURATION,
        toValue: 0
      }),
      Animated.timing(this.props.height, {
        duration: DURATION,
        toValue: SCREEN_HEIGHT
      })
    ]).start()
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
              <Animated.View style={[styles.number_container, {marginTop: marginTop}]}>
                <Animated.Text style={[styles.title, {bottom: titleBottomValue, left: leftValue, opacity: opacityValue}]}>Enter your mobile number</Animated.Text>
                
                <TouchableOpacity onPress={ this._showSelectCountry }>
                  <View style={styles.select_country}>
                    <Image style={styles.flag} source={require('../../assets/ng-flag.jpg')} />
                    <Icon name="md-arrow-down" style={styles.icon}/>
                  </View>
                </TouchableOpacity>

                <Animated.View 
                  pointerEvents="none" 
                  style={[styles.number_input_container, {borderBottomWidth: borderBottom}]}>
                  <Text style={styles.country_code}>+234</Text>
                  <TextInput 
                    keyboardType="numeric" 
                    ref={onRef} 
                    style={styles.keyboard_input} 
                    placeholder={placeholderText} 
                    underlineColorAndroid="transparent" 
                  />
                </Animated.View>

              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animatable.View>

        <SelectCountry 
          height={ this.height }
          opacity = { this.opacity }
          goBack = { this._hideSelectCountry }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  country_code: {
    fontSize:20, 
    paddingHorizontal:10
  },
  keyboard_input: {
    flex:1, 
    fontSize: 20
  },
  number_input_container: {
    flexDirection: 'row', 
    flex:1, 
  },
  flag: {
    height:24,
    width:24, 
    resizeMode:'contain'
  },
  icon: {
    fontSize: 14,
    color: '#999999',
    paddingHorizontal: 10,
  },
  title: {
    fontSize:24, 
    color: 'gray', 
    position: 'absolute', 
  },
  number_container: {
    paddingHorizontal: 25, 
    flexDirection: 'row',
    alignItems: 'center'
  },
  select_country: {
    flex:1, 
    flexDirection: 'row', 
    alignItems: 'center'
  }
});

export default InputPhoneNumber