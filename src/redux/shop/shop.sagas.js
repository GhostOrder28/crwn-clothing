import { takeEvery, call, put, all } from 'redux-saga/effects';
import shopActionTypes from './shop.types';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';
import { firestore, onSnapshot, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';

function* fetchCollectionsAsync() {
  try {
    const collectionRef = yield collection(firestore, 'collections');
    const snapshot = yield getDocs(collectionRef);
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (err) {
    yield put(fetchCollectionsFailure(err))
  }

}

function* fetchCollectionsStart() {
  yield takeEvery(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  )
}

export function* shopSagas () {
  yield all([
    call(fetchCollectionsStart),
  ])
}
