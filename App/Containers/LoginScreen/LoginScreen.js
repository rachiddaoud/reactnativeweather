import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import UserActions from 'App/Stores/User/Actions'
import { PropTypes } from 'prop-types'
import { Images, Colors } from 'App/Theme'
import { Button, Input, Image, SocialIcon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'

class LoginScreen extends Component {
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
        <Image source={Images.logo} style={styles.image} />
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
                this.props.login(this.state.email, this.state.password)
            }}
            title="Login"
            loading={this.props.loading}
            containerStyle={styles.marginBottomMedium}
          />
          <SocialIcon
            raised={false}
            style={styles.socialIcons}
            type="google"
            onPress={() => {
              this.props.loginWithGoogle()
            }}
          />
        </View>
        <Text
          onPress={() => {
            this.props.navigation.navigate('SubscribeScreen')
          }}
        >
          I don't have an account
        </Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    margin: 20,
  },
  image: { height: 150, width: 150 },
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
  socialIcons: { alignSelf: 'center' },
  text: {
    color: Colors.error,
    padding: 10,
  },
})

LoginScreen.propTypes = {
  login: PropTypes.func,
  loginWithGoogle: PropTypes.func,
  loading: PropTypes.bool,
  errorCode: PropTypes.number,
  errorMessage: PropTypes.string,
}

const mapStateToProps = (state, props) => ({
  loading: state.user.loading,
  errorMessage: state.user.errorMessage,
  errorCode: state.user.errorCode,
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(UserActions.login(email, password)),
  loginWithGoogle: () => dispatch(UserActions.loginWithGoogle()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
