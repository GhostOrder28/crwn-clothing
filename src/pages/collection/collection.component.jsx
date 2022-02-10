import React from 'react';
import { selectCollection } from '../../redux/shop/shop.selectors';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({ match, collection, propa }) => {
  const { title, items } = collection;
  // console.log(collection);
  // console.log(propa);

  // console.log(match.params.collectionId);

    // console.log(isLoading);

  return(
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      {/* <h2 className='title'>title</h2> */}
      <div className='items'>
        {
          items.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  )
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  propa: ownProps
});

export default connect(mapStateToProps)(CollectionPage);
