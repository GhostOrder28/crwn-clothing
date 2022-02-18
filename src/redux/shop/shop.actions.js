import shopActionTypes from './shop.types';
import { collection, getDocs } from 'firebase/firestore';
import { firestore, onSnapshot, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
})
export const fetchCollectionsSuccess = collectionsMap => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
})
export const fetchCollectionsFailure = errorMessage => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
})

export const fetchCollections = () => {
  return dispatch => {
    dispatch(fetchCollectionsStart());

    const collectionRef = collection(firestore, 'collections');
    getDocs(collectionRef).then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionsSuccess(collectionsMap));
    }).catch(err => dispatch(fetchCollectionsFailure(err)))
  }
}
