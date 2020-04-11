import FirebaseService from 'App/Services/FirebaseService'
import UserActions from 'App/Stores/User/Actions'
import { call, put } from 'redux-saga/effects'

export function* login(email, password) {
  yield put(UserActions.loading())

  const user = yield call(FirebaseService.loginWithEmailAndPassword, email, password)
  if (user.code) {
    yield put(UserActions.failed(user.code, user.message))
  } else {
    yield put(UserActions.success(user))
  }
}

export function* subscribe(email, password) {
  yield put(UserActions.loading())

  const user = yield call(FirebaseService.createUserWithEmailAndPassword, email, password)
  if (user.code) {
    yield put(UserActions.failed(user.code, user.message))
  } else {
    yield put(UserActions.success(user))
  }
}

export function* loginWithGoogle() {
  yield put(UserActions.loading())

  const user = yield call(FirebaseService.loginWithGoogle)
  if (user.code) {
    yield put(UserActions.failed(user.code, user.message))
  } else {
    yield put(UserActions.success(user))
  }
}
