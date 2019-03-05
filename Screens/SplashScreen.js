import React, { Component } from 'react';
import { 
  StyleSheet, Image, View 
} from 'react-native';

class SplashScreen extends Component {

  componentDidMount() {
    setTimeout(()=>{
      // go to next screen
      this.props.navigation.navigate('StartScreen')
    }, 2500)
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