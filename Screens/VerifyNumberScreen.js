import React, { Component } from 'react';
import { 
  StyleSheet, View, Text, TouchableHighlight, TextInput
} from 'react-native';

import { Icon } from 'native-base'

class VerifyNumberScreen extends Component {

  constructor(props){
    super(props)
    
    this.state = {
      firstCode: "0",
      secondCode: "0",
      thirdCode: "0",
      fourthCode: "0",
    }
  }

  render() {
    const { navigation } = this.props;
    const userCode = (navigation.getParam('userCode')) ? navigation.getParam('userCode') : '+234';
    const userNumber = (navigation.getParam('userNumber')) ? navigation.getParam('userNumber') : '8099868604';

    return (
      <View style={styles.container}>
        <View style={styles.back_button}>
          <TouchableHighlight>
            <View>
              <Icon name="md-arrow-back" />
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.main_view}>
          <Text style={styles.body_text}>
            <Text>Enter the 4-digit code sent to you at</Text>
            <Text style={styles.big_text}> {`${userCode} ${userNumber}`}.</Text>
          </Text>
        </View>

        <View style={styles.input_view}>
          <TextInput 
              keyboardType="numeric" 
              style={styles.keyboard_input} 
              placeholder={ this.state.firstCode } 
              onChangeText = { (text)=>this.setState({firstCode: text}) }
              underlineColorAndroid="black" 
            />
            <TextInput 
              keyboardType="numeric" 
              style={styles.keyboard_input} 
              placeholder={ this.state.secondCode } 
              onChangeText = { (text)=>this.setState({secondCode: text}) }
              underlineColorAndroid="black" 
            />
            <TextInput 
              keyboardType="numeric" 
              style={styles.keyboard_input} 
              placeholder={ this.state.thirdCode } 
              onChangeText = { (text)=>this.setState({thirdCode: text}) }
              underlineColorAndroid="black" 
            />
            <TextInput 
              keyboardType="numeric" 
              style={styles.keyboard_input} 
              placeholder={ this.state.fourthCode } 
              onChangeText = { (text)=>this.setState({fourthCode: text}) }
              underlineColorAndroid="black" 
            />
        </View>

        <View style={styles.footer_text_view}>
        <View>
            <TouchableHighlight>
              <Text style={styles.footer_text}>I'm having trouble</Text>
            </TouchableHighlight>
          </View>

          <View>
            <TouchableHighlight>
              <Text style={styles.footer_text}>Edit my mobile number</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.footer_button}>
          <TouchableHighlight>
            <View style={styles.button}>
              <Icon style={styles.icon} name="md-arrow-forward" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  back_button: {
    padding: 20,
    position: 'absolute',
    top: 20,
  },
  main_view: {
    position: 'absolute',
    top: 70,
    padding: 20,
  },
  body_text: {
    fontSize: 20,
    color: '#333',
    lineHeight: 35,
  },
  big_text: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold'
  },
  icon: {
    color: 'white'
  },
  button: {
    flex: 1,
    width:60, 
    height: 60,
    backgroundColor: 'black', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: 30,
  },
  input_view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    top: 150,
  },
  keyboard_input: {
    fontSize: 22,
    width: 60,
    textAlign: 'center',
    padding: 20,
    marginRight: 10,
  },
  footer_text_view: {
    position: 'absolute',
    bottom: 10,
    padding: 20,
  },
  footer_text: {
    color: 'blue'
  },
  footer_button:{
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default VerifyNumberScreen