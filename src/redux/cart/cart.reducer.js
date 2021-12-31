import cartActionTypes from './cart.types';
import { addItemToCart } from './cart.utils'

const INITITAL_STATE = {
  isHidden: true,
  cartItems: []
};

const cartReducer = (state = INITITAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        isHidden: !state.isHidden
      }
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    default:
      return state
  }
};

export default cartReducer;
