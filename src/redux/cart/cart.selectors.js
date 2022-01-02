import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectDropdownToggler = createSelector(
  [selectCart],
  cart => cart.isHidden
)
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
)
export const selectCartItemsCounter = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, currentItem) => {
    return acc + currentItem.quantity
  }, 0)
)
export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, currentItem) => {
    return acc + currentItem.quantity * currentItem.price
  }, 0)
)
