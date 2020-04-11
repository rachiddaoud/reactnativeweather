import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import UserActions from 'App/Stores/User/Actions'
import { PropTypes } from 'prop-types'
import { Colors } from 'App/Theme'
import { Button, Input } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'

class SubscribeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginBox}>
          {this.props.errorCode ? <Text style={styles.text}>{this.props.errorMessage}</Text> : null}
          <Input
            onChangeText={(email) => this.setState({ email })}
            containerStyle={styles.marginBottomSmall}
            placeholder="Email"
            autoCapitalize="none"
          />
          <Input
            onChangeText={(password) => this.setState({ password })}
            containerStyle={styles.marginBottomMedium}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Button
            onPress={() => {
              if (this.state.email !== '' && this.state.password !== '')
                this.props.subscribe(this.state.email, this.state.password)
            }}
            title="SignUp"
            loading={this.props.loading}
            containerStyle={styles.marginBottomMedium}
          />
        </View>
        <Text
          onPress={() => {
            this.props.navigation.navigate('LoginScreen')
          }}
        >
          I have already an account
        </Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
  loginBox: {
    marginBottom: 30,
    width: '100%',
  },
  marginBottomMedium: {
    marginBottom: 40,
  },
  marginBottomSmall: {
    marginBottom: 20,
  },
  text: {
    color: Colors.error,
    padding: 10,
  },
})

SubscribeScreen.propTypes = {
  subscribe: PropTypes.func,
  loading: PropTypes.bool,
  errorCode: PropTypes.number,
  errorMessage: PropTypes.string,
  navigation: PropTypes.func,
}

const mapStateToProps = (state, props) => ({
  loading: state.user.loading,
  errorMessage: state.user.errorMessage,
  errorCode: state.user.errorCode,
})

const mapDispatchToProps = (dispatch) => ({
  subscribe: (email, password) => dispatch(UserActions.subscribe(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeScreen)
