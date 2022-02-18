import { takeLatest, put, all, call } from 'redux-saga/effects';

import { clearCart } from './cart.actions';
import cartActionTypes from '../user/user.types';

function* clearCartOnSignOut () {
  yield put(clearCart())
}

function* onSignOutSuccess () {
  yield takeLatest(cartActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas () {
  yield all([
    call(onSignOutSuccess),
  ])
}
