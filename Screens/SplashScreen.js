import React, { Component } from 'react';
import { 
  StyleSheet, Image, View 
} from 'react-native';

class SplashScreen extends Component {

  constructor(){
    super()
  }

  componentDidMount() {

    this.animateToNextScreen('StartScreen', 2500)
  }

  componentDidUpdate(){
    const theNextScreen = this.props.navigation.getParam('nextScreen');
    const nextScreen = (theNextScreen) ? theNextScreen : 'StartScreen'

    if( theNextScreen ) {
      this.animateToNextScreen(theNextScreen, 500)
    } 


  }

  animateToNextScreen(nextScreen, animationTime){
    setTimeout(()=>{
      this.props.navigation.navigate(nextScreen)
    }, animationTime)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width:250, resizeMode:'contain'}
});

export default SplashScreen