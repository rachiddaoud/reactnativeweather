import React, { Component } from 'react'
import { navigationRef } from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import { connect } from 'react-redux'
import StartupActions from 'App/Stores/Startup/Actions'
import { PropTypes } from 'prop-types'
import { Helpers } from 'App/Theme'

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    // setTimeout(() => this.props.startup(), 100)
  }

  render() {
    return (
      <View style={Helpers.fill}>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </View>
    )
  }
}

RootScreen.propTypes = {
  startup: PropTypes.func,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
