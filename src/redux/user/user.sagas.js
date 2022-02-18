import { takeLatest, put, all, call } from 'redux-saga/effects';
import userActionTypes from './user.types';
import { signInWithPopup } from 'firebase/auth';
import {
   createUserProfileDocument,
   auth,
   googleProvider,
   signInWithEmailAndPassword,
   getCurrentUser,
   createUserWithEmailAndPassword
 } from '../../firebase/firebase.utils';
import { getDoc } from 'firebase/firestore';
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user.actions';

function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield getDoc(userRef);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (err) {
    yield put(signInFailure(err))
  }
}

function* signInWithGoogle() {
  try {
    yield console.log(auth.currentUser.email);
    const { user } = yield signInWithPopup(auth, googleProvider);
    yield getSnapshotFromUserAuth(user)
  } catch (err) {
    yield put(signInFailure(err))
  }
}

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapshotFromUserAuth(user)
  } catch (err) {
    yield put(signInFailure(err))
  }
}

function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch (err) {
    yield put(signOutFailure(err))
  }
}

function* onUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth)
  } catch (err) {
    yield put(signInFailure(err))
  }
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createUserWithEmailAndPassword, auth, email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

function* signInAfterSignUp ({ payload: { user, additionalData } }) {
  yield call(getSnapshotFromUserAuth, user, additionalData)
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, onUserAuthenticated)
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onUserAuthenticated),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ])
}
