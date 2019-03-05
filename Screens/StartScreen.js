import React, { Component } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Animated,
  Dimensions,
  Keyboard,
  Platform
} from 'react-native';

import { Icon } from 'native-base'
import * as Animatable from 'react-native-animatable'
import ConnectWithSocials from '../Components/Start/ConnectWithSocials'

// variables
const SCREEN_HEIGHT = Dimensions.get('window').height
const LOGIN_BACK_BTN_HEIGHT = 60;
const LOGIN_HEIGHT = 150;
const SOCIAL_CONNECT_HEIGHT = 70;


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
    this.setState({placeholderText: "08099868604"})
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500
    }).start(()=>{
      this.refs.textInputMobile.focus()
    })
  }

  decreaseHeightOfLogin = () => {
    this.setState({placeholderText: "Enter your mobile number"})
    Keyboard.dismiss()
    Animated.timing(this.loginHeight, {
      toValue: LOGIN_HEIGHT,
      duration: 500
    }).start()
  }

  _showConnectWithSocialSection = () => {

    this.setState({ displaySocialConnectLink: "none",})
    
    Animated.parallel([
      // increase social connect height
      Animated.timing(this.socialConnectHeight, {
        toValue: SCREEN_HEIGHT,
        duration: 500
      }),

      // set login height to zero
      Animated.timing(this.loginHeight, {
        toValue: 0,
        duration: 500
      })
    ]).start()
  }

  _hideConnectWithSocialSection = () => {
    this.setState({ displaySocialConnectLink: "flex"})

    Animated.parallel([
      // set social connect height to default
      Animated.timing(this.socialConnectHeight, {
        toValue: SOCIAL_CONNECT_HEIGHT,
        duration: 500
      }),

      // set login height to default
      Animated.timing(this.loginHeight, {
        toValue: LOGIN_HEIGHT,
        duration: 500
      })
    ]).start()
    
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

    const loginContainerHeight = this.socialConnectHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [LOGIN_BACK_BTN_HEIGHT, 0]
    })

    const socialConnectBackArrowOpacity = this.socialConnectHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0,1]
    })

    return (
      <View style={{flex:1}}>

        <Animated.View style={{position: "absolute", height: loginBackBtnHeight, width: 60, top: 60, left: 25, zIndex: 100}}>
          <Animated.View style = {{ opacity: headerBackArrowOpacity }}>
            <TouchableOpacity onPress= {()=>this.decreaseHeightOfLogin()}>
              <Icon name="md-arrow-back" style={{color: 'black'}} />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* this is the next button */}
        <Animated.View
          style={{position:"absolute", height: 60, width:60, right:10, bottom: this.keyboardHeight, opacity: this.forwardArrowOpacity, zIndex:500, backgroundColor: '#54575e', alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
          <Icon name="md-arrow-forward" style={{color: "white"}} />
        </Animated.View>

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

          {/* this is the bottom half */}
          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View style={{height: this.loginHeight, backgroundColor:'white'}}>
              <Animated.View style={{opacity: headerTextOpacity, alignItems:'flex-start', paddingHorizontal: 25, marginTop: marginTop}}>
                <Text style={{fontSize: 24}}>Get moving with FixDRide</Text>
              </Animated.View>

              <TouchableOpacity
                onPress = {()=> this.increaseHeightOfLogin()}>
                <Animated.View style={{marginTop: marginTop, paddingHorizontal: 25, flexDirection: 'row'}}>
                  <Animated.Text style={{fontSize:24, color: 'gray', position: 'absolute', bottom: titleTextBottom, left: titleTextLeft, opacity: titleTextOpacity}}>Enter your mobile number</Animated.Text>
                  <Image style={{height:24,width:24, resizeMode:'contain'}} source={require('../assets/ng-flag.jpg')} />
                  <Animated.View pointerEvents="none" style={{flexDirection: 'row', flex:1, borderBottomWidth: this.borderBottomWidth}}>
                    <Text style={{fontSize:20, paddingHorizontal:10}}>+234</Text>
                    <TextInput keyboardType="numeric" ref="textInputMobile" style={{flex:1, fontSize: 20}} placeholder={this.state.placeholderText} underlineColorAndroid="transparent" />
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          </Animatable.View>
          
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