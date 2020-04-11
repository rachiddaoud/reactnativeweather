import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'

GoogleSignin.configure({
  webClientId: '138165778645-6fatfl3atd96u7nnrutgsrmr2304pl77.apps.googleusercontent.com', // From Firebase Console Settings
  offlineAccess: true,
})
async function loginWithGoogle() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(googleCredential)
    .then((payload) => {
      return payload.user
    })
    .catch((error) => error)
}

const loginWithEmailAndPassword = ({ email, password }) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then((payload) => {
      return payload.user
    })
    .catch((error) => error)
}

const createUserWithEmailAndPassword = ({ email, password }) => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then((payload) => {
      return payload.user
    })
    .catch((error) => error)
}

export default { loginWithEmailAndPassword, loginWithGoogle, createUserWithEmailAndPassword }
