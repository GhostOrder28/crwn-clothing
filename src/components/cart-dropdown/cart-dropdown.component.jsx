import React from 'react';
import CustomButtom from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.map(cartItem => <CartItem item={cartItem}/> )
      }
    </div>
    <CustomButtom>GO TO CHECKOUT</CustomButtom>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems
})

export default connect(mapStateToProps)(CartDropdown);
