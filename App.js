import { createStackNavigator, createAppContainer  } from 'react-navigation';

import SplashScreen from './Screens/SplashScreen';
import StartScreen from './Screens/StartScreen';
import VerifyNumberScreen from './Screens/VerifyNumberScreen';
import ShowMapScreen from './Screens/ShowMapScreen';

// export default class App extends React.Component {
//   render() {
//     return (
//       <AppStackNavigator />
//     );
//   }
// }

const AppStackNavigator = createStackNavigator({
  ShowMapScreen: {
    screen: ShowMapScreen,
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
  },
  VerifyNumberScreen: {
    screen: VerifyNumberScreen,
    navigationOptions: {
      header: null
    }
  },
  ShowMapScreen: {
    screen: ShowMapScreen,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(AppStackNavigator)