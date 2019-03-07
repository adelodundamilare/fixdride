import React, { Component } from 'react';
import { 
  Text,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base'

import countries from 'world-countries'
import flags from './CountryFlags'

class SelectCountry extends Component {

  _getCountries(countries, flags) {
    const removeCountries = [
      "United States Minor Outlying Islands",
      "United States Virgin Islands",
      "Åland Islands",
    ]

    // filter/remove, unwanted countries...
    const country = countries
    .filter(item => {
      if( !removeCountries.find( val => val == item.name.common ) ) {
        return item
      }
    })
    .sort((prev,cur)=> (prev.name.common > cur.name.common) ? 1: -1 )
    .map((item)=>{
      if(flags.hasOwnProperty(item.cca2)){
        return countryInfo = {
          image: flags[item.cca2], 
          name: `${item.name.common} (+${item.callingCode})`, 
          group: item.name.common.charAt(0)
        };
      }
    })
    .reduce((total, item) =>{ //group countries based on first char
      if(!total[item.group]) { total[item.group] = [] }
      total[item.group].push({ image: item.image, name: item.name })
      return total
    }, {})

    return country;
  }

  _renderCountries(countries, flags){
    const items = this._getCountries(countries, flags)

    return Object.entries(items).map((item, index)=>{
      return (
        <Animated.View key={index}>
          <Animated.View style={styles.country_title_view}>
            <Text style={styles.country_title}>{item[0]}</Text>
          </Animated.View>
          {
            item[1].map((obj, key)=>{
              return this._renderSingleCountry(obj, key)
            })
          }
        </Animated.View>
      )
    })
  }

  _renderSingleCountry(item, index){
    return (
      <TouchableOpacity key={index}>
        <Animated.View style={{flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white'}}>
          <Image style={{width:24, height:24, resizeMode: 'contain'}} source={{uri: item.image}} />
          <Text style={{fontSize: 16, marginLeft: 20}}>{item.name}</Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  _getCurrentLocation(){
    return (
      <Animated.View style={{flexDirection: 'row', alignItems: 'center', padding: 20}}>
        {/* <Image style={{width:24, height:24, resizeMode: 'contain'}} source={{uri: item.image}} /> */}
        <Text style={{fontSize: 16, marginLeft: 20}}>Nigeria</Text>
      </Animated.View>
    )
  }

  render() {

    const {
      height,
      opacity,
      goBack
    } = this.props

    return (
      
      <Animated.View style={[styles.container, {height: height, opacity: opacity}]}>
        <Animated.View style={styles.header}>
          <Animated.View style={styles.icon_box}>
            <TouchableOpacity onPress= { goBack }>
              <Icon name="md-arrow-back" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress= { goBack }>
              <Icon name="md-arrow-forward" style={styles.icon} />
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.title}>Select a Country</Text>
        </Animated.View>

        <ScrollView>
          {/* get current location */}
          <Animated.View>
            <Animated.View style={styles.country_title_view}>
              <Text style={styles.country_title}>{'Current Location'.toUpperCase()}</Text>
            </Animated.View>
            { this._getCurrentLocation() }
          </Animated.View>

          {/* get all countries */}
          <Animated.View>
            {/* { this._getCountries(countries, flags) } */}
            {/* { console.log(this._getCountries(countries, flags)) } */}
            { this._renderCountries(countries, flags) }
          </Animated.View>
        </ScrollView>

      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    zIndex: 300
  },
  header: {
    height: 120,
    backgroundColor: 'black',
    padding: 20,
  },
  icon_box: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    color: 'white',
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  country_title_view: {
    backgroundColor: '#ebebeb',
    padding: 20,
  },
  country_title: {
    textTransform: 'uppercase',
    fontSize: 16,
  }
});

export default SelectCountry