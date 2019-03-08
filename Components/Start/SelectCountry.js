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

  constructor(props){
    super(props)

    this.state = {
      currentLocation: props.location
    }
  }

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
          group: item.name.common.charAt(0),
          id: item.cca2
        };
      }
    })
    .reduce((total, item) =>{ //group countries based on first char
      if(!total[item.group]) { total[item.group] = [] }
      total[item.group].push({ image: item.image, name: item.name, id: item.id })
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
                return (
                  <TouchableOpacity key={key} onPress={ this.props.clickCountry.bind(this, obj)}>
                    <Animated.View style={styles.single_country_view}>
                      <Image style={styles.single_country_img} source={{uri: obj.image}} />
                      <Text style={styles.single_country_name}>{obj.name}</Text>
                    </Animated.View>
                  </TouchableOpacity>
                )
              })
            }
        </Animated.View>
      )
    })
  }

  _getCurrentLocation(countries, flags, current){
    const countryName = Array.from(countries).find(item => (item.cca2 == current) )

    const flag = (flags.hasOwnProperty(current)) ? flags[current] : '';

    if(!flag && !countryName) return

    return (      
      <Animated.View>
        <Animated.View style={styles.country_title_view}>
          <Text style={styles.country_title}>{'Current Location'.toUpperCase()}</Text>
        </Animated.View>
        
        <Animated.View style={styles.single_country_view}>
          <Image style={styles.single_country_img} source={{uri: flag}} />
          <Text style={styles.single_country_name}>{`${countryName.name.common} (+${countryName.callingCode})`}</Text>
        </Animated.View>

      </Animated.View>
    )
  }

  _onScroll(){
    console.log('scrolling...')
  }

  render() {

    const {
      height,
      opacity,
      goBack,
      location,
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

        <ScrollView onScroll={this._onScroll}>
          {
            /* get current location this shouldn't be hardcoded! */
            this._getCurrentLocation(countries, flags, location)
          }

          {             
            /* get all countries */
            this._renderCountries(countries, flags) 
          }
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
  },
  single_country_view: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: 'white'
  },
  single_country_name: {
    fontSize: 16, 
    marginLeft: 20
  },
  single_country_img: {
    width:24, 
    height:24, 
    resizeMode: 'contain'
  }
});

export default SelectCountry