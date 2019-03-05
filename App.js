import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer  } from 'react-navigation';

import StartScreen from './Screens/StartScreen';
import SplashScreen from './Screens/SplashScreen';

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppStackNavigator />
//     );
//   }
// }

const AppStackNavigator = createStackNavigator({
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
  },
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