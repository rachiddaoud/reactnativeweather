import React from 'react'
import { View, Image, Text } from 'react-native'
import { Fonts } from 'App/Theme'

const RIGHT_TEXT = { textAlign: 'right' }
const TOP_CONTAINER = { alignItems: 'center', margin: 5 }
const BOTTOM_CONTAINER = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 5,
}
const IMAGE = { width: 100, height: 100 }
const PrincipalWeatherDay = (props) => {
  return (
    <View style={props.style}>
      <View style={TOP_CONTAINER}>
        <Text style={[Fonts.h1, Fonts.primaryLight]}>{props.city.toUpperCase()}</Text>
        <Image
          style={IMAGE}
          source={{ uri: `https://openweathermap.org/img/wn/${props.icon}@2x.png` }}
        />
        <Text style={[Fonts.big, Fonts.primaryLight]}>{props.description}</Text>
        <Text style={[Fonts.h1, Fonts.primaryLight]}>{props.temp.now}° C</Text>
      </View>
      <View style={BOTTOM_CONTAINER}>
        <View>
          <Text style={Fonts.primaryLight}>humid. {props.humidity} %</Text>
        </View>
        <Text style={Fonts.primaryLight}>vent {props.wind} m/s</Text>
        <View>
          <Text style={[Fonts.primaryLight, RIGHT_TEXT]}>min {props.temp.min} °</Text>
          <Text style={[Fonts.primaryLight, RIGHT_TEXT]}>max {props.temp.max} °</Text>
        </View>
      </View>
    </View>
  )
}

export default PrincipalWeatherDay
