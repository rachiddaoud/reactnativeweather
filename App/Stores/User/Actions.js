import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  login: ['email', 'password'],
  subscribe: ['email', 'password'],
  loginWithGoogle: null,
  success: ['user'],
  failed: ['code', 'message'],
  logout: null,
  loading: null,
})

export const UserTypes = Types
export default Creators
