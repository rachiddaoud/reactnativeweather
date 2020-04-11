/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Avatar, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import WeatherActions from 'App/Stores/Weather/Actions'
import UserActions from 'App/Stores/User/Actions'
import { Colors } from 'App/Theme'

const CONTAINER = {
  justifyContent: 'center',
  marginVertical: 4,
  padding: 8,
  marginHorizontal: 10,
  alignItems: 'center',
  flexDirection: 'row',
}
const WIDE_TEXT = { flex: 1 }
const DRAWER_STYLE = { backgroundColor: Colors.complementLight2 }
class CustomDrawerContent extends Component {
  constructor(props) {
    super(props)
    this.input = React.createRef()
    this.state = {
      newCity: '',
      city: this.props.city,
      isEditing: false,
      isAdding: false,
    }
  }

  componentDidUpdate(){
    this.input.current?.focus()
  }

  _changeCity(city){
    this.props.changeCity(city)
    this.props.fetchForecast()
    this.props.fetchWeather()
    this.props.drawerProps.navigation.closeDrawer()
  }

  _updateCity(index){
    this.setState({ isEditing: false })
    this.props.updateCity(this.state.city, index)
  }

  _addCity(){
    this.setState({ isAdding: false })
    if(this.state.newCity)
    this.props.addCity(this.state.newCity)
  }

  _removeCity(index) {
    this.setState({ isEditing: false, city: '' })
    this.props.removeCity(index)
  }

  render() {
    return (
      <DrawerContentScrollView {...this.props.drawerProps} style={DRAWER_STYLE}>
        <View style={CONTAINER}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: this.props.profile.photo ? this.props.profile.photo : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
        </View>
        { this.props.cities.map((city, index) => {
          return this.state.isEditing !== index ? (
            <View style={CONTAINER}>
              <View style={WIDE_TEXT}>
                <TouchableOpacity onPress={() => {this._changeCity(city)}}>
                  <Text style={this.props.city == city ? styles.select_text : null}>{city}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => this.setState({ isEditing: index, city })}>
                <Icon name="edit" color={Colors.complementDark2} />
              </TouchableOpacity>
            </View> 
          ) : (
            <View style={CONTAINER}>
              <View style={WIDE_TEXT}>
                <TextInput
                  ref={this.input}
                  value={this.state.city}
                  onChangeText={(city) => this.setState({ city })}
                />
              </View>
              <TouchableOpacity
                onPress={() => this._removeCity(index)}
              >
                <Icon name="clear" color={Colors.complementDark2} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ isEditing: false, city: city })}
              >
                <Icon name="undo" color={Colors.complementDark2} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this._updateCity(index)}}>
                <Icon name="done" color={Colors.complementDark2} />
              </TouchableOpacity>
            </View>
          )
        })}
        
        {!this.state.isAdding ? (
          <View style={CONTAINER}>
            <TouchableOpacity onPress={() => this.setState({ isAdding: true, newCity: '' })}>
              <Icon name="add" color={Colors.complementDark2}/>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={CONTAINER}>
            <View style={WIDE_TEXT}>
              <TextInput
                ref={this.input}
                value={this.state.newCity}
                onChangeText={(newCity) => this.setState({ newCity })}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ isAdding: false, newCity: '' })}
            >
              <Icon name="close" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this._addCity()}}>
              <Icon name="done" />
            </TouchableOpacity>
          </View>
        )}
        <DrawerItemList
          {...this.props.drawerProps} 
          activeBackgroundColor={Colors.complementDark2}
          activeTintColor={Colors.complementLight2} 
          inactiveTintColor={Colors.complementDark}/>
        <DrawerItem label="Logout" onPress={this.props.logout} inactiveTintColor={Colors.complementDark} />
      </DrawerContentScrollView>
    )
  }
}
const styles = StyleSheet.create({
  select_text: {
      color: Colors.complementDark
  },
})

const mapStateToProps = (state, ownProps) => ({
  profile: state.user.profile,
  city: state.weather.city,
  cities: state.weather.cities,
  drawerProps: ownProps,
})

const mapDispatchToProps = (dispatch) => ({
  fetchWeather: () => dispatch(WeatherActions.fetchWeather()),
  fetchForecast: () => dispatch(WeatherActions.fetchForecast()),
  changeCity: (city) => dispatch(WeatherActions.changeCity(city)),
  updateCity: (city,index) => dispatch(WeatherActions.updateCity(city,index)),
  addCity: (city) => dispatch(WeatherActions.addCity(city)),
  removeCity: (index) => dispatch(WeatherActions.removeCity(index)),
  logout: () => dispatch(UserActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)
