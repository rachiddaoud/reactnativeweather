import React, { Component } from 'react'
import {Text} from 'react-native'
import { connect } from 'react-redux'


class ConfigScreen extends Component {
    
    render(){
        return (
            <Text>im a text</Text>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigScreen)