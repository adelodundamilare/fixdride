import React, { Component } from 'react';
import { 
  StyleSheet, Image, View, Text
} from 'react-native';

class VerifyNumberScreen extends Component {

  render() {
    const { navigation } = this.props;
    const userCode = (navigation.getParam('userCode')) ? navigation.getParam('userCode') : '';
    const userNumber = (navigation.getParam('userNumber')) ? navigation.getParam('userNumber') : '';

    return (
      <View style={styles.container}>
        <Text>
          Verify phone number here! {`${userCode} ${userNumber}`}
        </Text>
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

export default VerifyNumberScreen