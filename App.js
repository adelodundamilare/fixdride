import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer  } from 'react-navigation';

import LoginScreen from './Screens/LoginScreen'

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppStackNavigator />
//     );
//   }
// }

const AppStackNavigator = createStackNavigator({
  LoginScreen: { 
    screen: LoginScreen,
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