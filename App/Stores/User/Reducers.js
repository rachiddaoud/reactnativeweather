import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { UserTypes } from './Actions'

const success = (state, { user }) => ({
  ...state,
  profile: { name: user.displayName, email: user.email, photo: user.photoURL },
  errorCode: null,
  errorMessage: null,
  logged: true,
  loading: false,
})

const logout = (state) => ({
  ...state,
  profile: null,
  logged: false,
})

const failed = (state, { code, message }) => ({
  ...state,
  errorCode: code,
  errorMessage: message.substr(message.indexOf(']') + 1),
  loading: false,
})

const loading = (state) => ({
  ...state,
  loading: true,
})

export const reducer = createReducer(INITIAL_STATE, {
  [UserTypes.SUCCESS]: success,
  [UserTypes.LOGOUT]: logout,
  [UserTypes.FAILED]: failed,
  [UserTypes.LOADING]: loading,
})
