import { StyleSheet } from 'react-native'
import { Colors } from './'

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  big: 20,
}

export default StyleSheet.create({
  big: {
    fontSize: size.big,
  },
  h1: {
    fontSize: size.h1,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  normal: {
    fontSize: size.regular,
  },
  primaryLight: {
    color: Colors.primaryLight,
  },
})
