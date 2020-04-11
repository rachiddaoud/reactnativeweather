/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import SubscribeScreen from 'App/Containers/SubscribeScreen/SubscribeScreen'
import ViewScreen from 'App/Containers/ViewScreen/ViewScreen'
import ConfigScreen from 'App/Containers/ConfigScreen/ConfigScreen'
import LoginScreen from 'App/Containers/LoginScreen/LoginScreen'

import CustomDrawerContent from 'App/Navigators/CustomDrawerContent'

const Stack = createStackNavigator()
function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ gestureEnabled: false }}
      headerMode={'none'}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SubscribeScreen" component={SubscribeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  )
}

/* const Stack = createStackNavigator()
function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Weather"
      screenOptions={{ gestureEnabled: false }}
      headerMode={'none'}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Weather" component={ViewScreen} />
    </Stack.Navigator>
  )
} */

const Drawer = createDrawerNavigator()
function RootDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Stack.Screen name="Home" component={ViewScreen} />
      {/* <<Drawer.Screen name="Config" component={ConfigScreen} /> */}
    </Drawer.Navigator>
  )
}
class RootNavigator extends Component {
  render() {
    if (this.props.logged) {
      return <RootDrawer />
    } else {
      return <LoginStack />
    }
  }
}
const mapStateToProps = (state, ownProps) => ({
  logged: state.user.logged,
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator)
