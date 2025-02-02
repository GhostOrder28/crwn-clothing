import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import { CollectionsOverviewContainer } from '../../components/collections-overview/collections-overview.container';
import { CollectionPageContainer } from '../../pages/collection/collection.container';
import { ShopPageContainer } from './shop.styles';


const ShopPage = ({ match, fetchCollectionsStart }) => {

  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart])

  return (
    <ShopPageContainer>
      <Route exact path={match.path} component={CollectionsOverviewContainer} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
    </ShopPageContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
