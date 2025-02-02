import React from 'react';
import './cart-item.styles.scss';

const CartItem = ({ item: { name, price, quantity, imageUrl } }) => (
  <div className='cart-item'>
    <img src={imageUrl} alt='item'/>
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span>{quantity} x ${price}</span>
    </div>
  </div>
);

export default CartItem;
