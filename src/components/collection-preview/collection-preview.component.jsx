import React from 'react';
import { useLocation, useHistory } from 'react-router';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, routeName }) => {
  const location = useLocation();
  const history = useHistory();
  console.log(`${location.pathname}/${routeName}`);
  return (
    <div className='collection-preview'>
      <h1 className='title pointer' onClick={() => history.push(`${location.pathname}/${routeName}`)}>
        {title.toUpperCase()}
      </h1>
      <div className='preview'>
        {items
          .filter((item, idx) => idx < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}

export default CollectionPreview;
