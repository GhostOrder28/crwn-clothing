import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import { selectCollections } from '../../redux/shop/shop.selectors';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, onSnapshot, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';

import { ShopPageContainer } from './shop.styles';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  state = {
    loading: true,
  }

  unsubscribeFromSnapshop = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, 'collections');
    console.log(collectionRef);

    getDocs(collectionRef).then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap);
      this.setState({ loading: false })
    })
  }

  render(){
    const { match } = this.props;
    return (
      <ShopPageContainer>
        <Route exact path={match.path} render={
          (routeProps) => <CollectionOverviewWithSpinner isLoading={this.state.loading} {...routeProps} />
        } />
        <Route path={`${match.path}/:collectionId`} render={
          (routeProps) => <CollectionPageWithSpinner isLoading={this.state.loading} {...routeProps} />
        } />
      </ShopPageContainer>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  updateCollections: collections => dispatch(updateCollections(collections))
});

export default connect(null, mapDispatchToProps)(ShopPage);
