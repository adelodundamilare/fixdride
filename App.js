import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer  } from 'react-navigation';

import SplashScreen from './Screens/SplashScreen';
import StartScreen from './Screens/StartScreen';
import VerifyNumberScreen from './Screens/VerifyNumberScreen';

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppStackNavigator />
//     );
//   }
// }

const AppStackNavigator = createStackNavigator({
  VerifyNumberScreen: {
    screen: VerifyNumberScreen,
    navigationOptions: {
      header: null
    }
  },
  SplashScreen: { 
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  StartScreen: { 
    screen: StartScreen,
    navigationOptions: {
      header: null
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createAppContainer(AppStackNavigator)