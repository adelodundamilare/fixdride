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
import SelectCountry from './SelectCountry';

class InputPhoneNumber extends Component {

  constructor(){
    super()
    this.state = {
      currentLocation: {
        id: 'NG',
        code: '+234',
        imgUrl: require('../../assets/ng-flag.jpg'),
        phoneNumber: ''
      },
    }
  }

  componentWillMount(){
    this.height = new Animated.Value(0)
    this.opacity = new Animated.Value(0)
  }

  _selectedCountry(country){
    this.props.goBack()
    this.props.hideSelectCountryMethod()

    const countryNumberCode = this.getCountryCallCode(country.name)

    this.setState({
      currentLocation: {
        id: country.id,
        code: countryNumberCode,
        imgUrl: {uri: country.image}
      }
    })

    return;
  }

  getCountryCallCode(input){
    const re = /\((.*)\)/;
    const callCode = (input.match(re)[1])
    return (callCode) ? callCode : this.state.currentLocation.code
  }

  _verifyNumber(){
    if(this.state.phoneNumber == '') return
    // get country code
    // add country code to number and send to next screen.
    console.log(this.state.phoneNumber, this.state.currentLocation.code)
    // this.props.navigation.navigate('VerifyNumberScreen')
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

      // select country props
      showSelectCountryMethod,
      hideSelectCountryMethod, //used above
      selectCountryHeight,
      selectCountryOpacity,

      // next button props
      nextButtonOpacity,
      nextButtonKeyboardHeight,
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
                
                <TouchableOpacity onPress={ showSelectCountryMethod }>
                  <View style={styles.select_country}>
                    <Image style={styles.flag} source={ this.state.currentLocation.imgUrl } />
                    <Icon name="md-arrow-down" style={styles.icon}/>
                  </View>
                </TouchableOpacity>

                <Animated.View 
                  pointerEvents="none" 
                  style={[styles.number_input_container, { borderBottomWidth: borderBottom }]}>
                  <Text style={styles.country_code}>{ this.state.currentLocation.code }</Text>
                  <TextInput 
                    keyboardType="numeric" 
                    ref={onRef} 
                    style={styles.keyboard_input} 
                    placeholder={placeholderText} 
                    onChangeText = { (text)=>this.setState({phoneNumber: text}) }
                    underlineColorAndroid="transparent" 
                  />
                </Animated.View>

              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Animatable.View>

        <SelectCountry 
          height={ selectCountryHeight }
          opacity = { selectCountryOpacity }
          goBack = { hideSelectCountryMethod }
          location = { this.state.currentLocation.id }
          clickCountry = { this._selectedCountry.bind(this) }
        />

        {/* this is the next button */}
          <Animated.View style={[styles.button, { 
            bottom: nextButtonKeyboardHeight, 
            opacity: nextButtonOpacity
            }]}>
            <TouchableOpacity onPress={()=>this._verifyNumber()}>
              <Icon name="md-arrow-forward" style={{color: "white"}} />
            </TouchableOpacity>
          </Animated.View>
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
  },
  button: {
    position:"absolute", 
    height: 60, 
    width:60, 
    right:10, 
    zIndex:500, 
    backgroundColor: '#54575e', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 30
  }
});

export default InputPhoneNumber