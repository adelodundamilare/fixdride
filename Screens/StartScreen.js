import React, { Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Animated,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native';

import * as Animatable from 'react-native-animatable'
import ConnectWithSocials from '../Components/Start/ConnectWithSocials'
import InputPhoneNumber from '../Components/Start/InputPhoneNumber';

// variables
const SCREEN_HEIGHT = Dimensions.get('window').height
const LOGIN_BACK_BTN_HEIGHT = 60;
const LOGIN_HEIGHT = 150;
const SOCIAL_CONNECT_HEIGHT = 70;
const DURATION = 500

class StartScreen extends Component {

  constructor(){
    super()

    this.state = {
      placeholderText: 'Enter your mobile number',
      displaySocialConnectLink: 'flex',
    }
  }

  componentWillMount(){
    this.loginHeight = new Animated.Value(LOGIN_HEIGHT)
    this.socialConnectHeight = new Animated.Value(SOCIAL_CONNECT_HEIGHT)

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)

    this.keyboardHeight = new Animated.Value(0)
    this.forwardArrowOpacity = new Animated.Value(0)
    this.borderBottomWidth = new Animated.Value(0)

    this.selectCountryHeight = new Animated.Value(0)
    this.selectCountryOpacity = new Animated.Value(0)
  }

  keyboardWillShow = (event) => {
    if(Platform.OS == 'android'){
      duration = 100
    }else {
      duration = event.duration
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: event.endCoordinates.height + 10
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 1
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 1
      })
    ]).start()
  }

  keyboardWillHide = (event) => {
    if(Platform.OS == 'android'){
      duration = 100
    }else {
      duration = event.duration
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: 0
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 0
      })
    ]).start()
  }

  increaseHeightOfLogin = () => {
    this.setState({placeholderText: "000 000 000"})
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: DURATION
    }).start(()=>{
      this.childRef.focus()
    })
  }

  decreaseHeightOfLogin = () => {
    this.setState({placeholderText: "Enter your mobile number"})
    Keyboard.dismiss()
    Animated.timing(this.loginHeight, {
      toValue: LOGIN_HEIGHT,
      duration: DURATION
    }).start(()=>{
      this.childRef.focus()
    })
  }

  _showConnectWithSocialSection = () => {

    this.setState({ displaySocialConnectLink: "none",})
    
    Animated.parallel([
      // increase social connect height
      Animated.timing(this.socialConnectHeight, {
        toValue: SCREEN_HEIGHT,
        duration: DURATION
      }),

      // set login height to zero
      Animated.timing(this.loginHeight, {
        toValue: 0,
        duration: DURATION
      })
    ]).start()
  }

  _hideConnectWithSocialSection = () => {
    this.setState({ displaySocialConnectLink: "flex"})

    Animated.parallel([
      // set social connect height to default
      Animated.timing(this.socialConnectHeight, {
        toValue: SOCIAL_CONNECT_HEIGHT,
        duration: DURATION
      }),

      // set login height to default
      Animated.timing(this.loginHeight, {
        toValue: LOGIN_HEIGHT,
        duration: DURATION
      })
    ]).start()
    
  }

  _setRef(ref){
    this.childRef = ref
    return
  }

  _showSelectCountry = () => {
    
    Animated.parallel([
      Animated.timing(this.selectCountryHeight, {
        duration: DURATION,
        toValue: SCREEN_HEIGHT
      }),
      Animated.timing(this.selectCountryOpacity, {
        duration: DURATION,
        toValue: 1
      }),
      Animated.timing(this.loginHeight, {
        duration: DURATION,
        toValue: 0
      })
    ]).start(()=>{
      this.childRef.blur()
    })
  }

  _hideSelectCountry = () => {
    
    Animated.parallel([
      Animated.timing(this.selectCountryHeight, {
        duration: DURATION,
        toValue: 0
      }),
      Animated.timing(this.selectCountryOpacity, {
        duration: DURATION,
        toValue: 0
      }),
      Animated.timing(this.loginHeight, {
        duration: DURATION,
        toValue: SCREEN_HEIGHT
      })
    ]).start(()=>{
      this.childRef.focus()
    })
  }

  render() {

    // interpolate loginHeight

    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1,0]
    })

    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25,100]
    })

    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0,1]
    })

    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [100,25]
    })

    const titleTextBottom = this.loginHeight.interpolate({
      inputRange: [150, 400, SCREEN_HEIGHT],
      outputRange: [0, 0, 100]
    })

    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0,1]
    })

    // interpolate social_connect_back_arrow

    const loginBackBtnHeight = this.socialConnectHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [LOGIN_BACK_BTN_HEIGHT, 0]
    })

    const socialConnectBackArrowOpacity = this.socialConnectHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0,1]
    })

    return (
      <View style={{flex:1}}>

        <ImageBackground
          source={require("../assets/bg.jpg")}
          style= {{flex: 1}}
        >
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Animatable.View 
              animation="zoomIn" iterationCount={1}
              style={{backgroundColor: 'white', height: 120, width: 150, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 26}}>FixDRide</Text>
            </Animatable.View>
          </View>

          {/* input your phone number */}
          <InputPhoneNumber
            opacity = {headerBackArrowOpacity}
            btnHeight = {loginBackBtnHeight}
            height = { this.loginHeight}
            marginTop = {marginTop}
            placeholderText = { this.state.placeholderText }
            headerOpacity = {headerTextOpacity }
            borderBottom = { this.borderBottomWidth }
            titleBottomValue = {titleTextBottom}
            leftValue = {titleTextLeft}
            opacityValue = {titleTextOpacity}
            onRef = {this._setRef.bind(this)}
            navigation
            addPhoneNumber = {()=> this.increaseHeightOfLogin()}
            goBack = { ()=>this.decreaseHeightOfLogin() }

            // navigation props
            navigation = { this.props.navigation }

            // select country props
            showSelectCountryMethod = { () => this._showSelectCountry() }
            hideSelectCountryMethod = { () => this._hideSelectCountry() }
            selectCountryHeight = {this.selectCountryHeight}
            selectCountryOpacity = {this.selectCountryOpacity}

            // next button props
            nextButtonKeyboardHeight = {this.keyboardHeight}
            nextButtonOpacity = {this.forwardArrowOpacity}
          />
          
          {/* connect with socials link here */}
          <ConnectWithSocials 
            onPressLink = { this._showConnectWithSocialSection } 
            onPressBackLink = { this._hideConnectWithSocialSection }
            displayLink = { this.state.displaySocialConnectLink }
            height = { this.socialConnectHeight }
            opacity = {socialConnectBackArrowOpacity}
          />
        </ImageBackground>
      </View>
    )
  }
}

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})